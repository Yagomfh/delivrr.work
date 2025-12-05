import { Octokit } from "@octokit/core";
import { generateText } from "ai";
import { eq } from "drizzle-orm";
import { NonRetriableError } from "inngest";
import { db } from "@/db";
import { projects, summaries } from "@/db/schema";
import { auth } from "@/integrations/better-auth/auth";
import { inngest } from "../client";

export const githubPushFn = inngest.createFunction(
	{ id: "github-push" },
	{ event: "github.push" },
	async ({ event, step }) => {
		const { data } = event;

		const project = await db.query.projects.findFirst({
			columns: {
				userId: true,
				id: true,
			},
			where: eq(projects.repository, data.repository.full_name),
		});

		if (!project) {
			return;
		}

		const [summary] = await db
			.insert(summaries)
			.values({
				projectId: project.id,
				commitUrl: `https://github.com/${data.repository.owner.login}/${data.repository.name}/commit/${data.after}`,
				senderName: data.sender.name,
				senderAvatar: data.sender.avatar_url,
				headCommitMessage: data.head_commit?.message ?? "",
				headCommitTimestamp: data.head_commit?.timestamp
					? new Date(data.head_commit.timestamp)
					: new Date(),
				errorMessage: null,
				summary: null,
			})
			.returning({ id: summaries.id });

		if (!summary) {
			return;
		}

		// Get git diff
		const gitDiff = await step.run("get-git-diff", async () => {
			const { repository, after, before } = data;

			const { accessToken } = await auth.api.getAccessToken({
				body: {
					providerId: "github",
					userId: String(project.userId),
				},
			});

			const octokit = new Octokit({
				auth: accessToken,
			});

			const diff = await octokit.request(
				"GET /repos/{owner}/{repo}/compare/{base}...{head}",
				{
					owner: repository.owner.login,
					repo: repository.name,
					base: before,
					head: after,
				},
			);

			return diff.data;
		});

		// Extract patches and filter out empty ones
		const patches =
			gitDiff.files
				?.map((file) => file.patch ?? "")
				.filter((patch) => patch.length > 0) ?? [];

		const patchesInKB = patches.reduce((sum, str) => {
			return sum + Buffer.byteLength(str, "utf8");
		}, 0);

		// If the patches are > 0.5MB, don't summarize them
		if (patchesInKB > 500000) {
			await db
				.update(summaries)
				.set({
					errorMessage: "The content of the commit is too large to summarize",
					status: "failed",
				})
				.where(eq(summaries.id, summary.id));
			return;
		}

		if (patches.length === 0) {
			return [];
		}

		// Generate summaries for all patches in parallel
		// Use allSettled to handle partial failures gracefully
		const patchesSummaries = await Promise.allSettled(
			patches.map((patch, index) => {
				return step.run(`summarize-patch-${index}`, async () => {
					try {
						const result = await generateText({
							model: "google/gemini-2.0-flash",
							prompt: `You are a helpful assistant that summarizes code changes.

Desired behavior:
- Summarize the changes in the patch
- Be super factual and don't assume anything
- Only output the summary, no other text
- This will be used for a client summary, so mention any relevant info for context

Patch:
${patch}`,
						});

						return result.text;
					} catch (error) {
						// For LLM errors (rate limits, API errors, etc.), don't retry
						// This prevents wasting credits on retries
						throw new NonRetriableError(
							`Failed to generate summary for patch ${index}: ${error instanceof Error ? error.message : String(error)}`,
							{ cause: error },
						);
					}
				});
			}),
		);

		// Extract successful summaries and handle failures
		const successfulSummaries = patchesSummaries.map(async (result, index) => {
			if (result.status === "fulfilled") {
				return result.value;
			}
			// Return a fallback message for failed summaries
			console.error(`Failed to summarize patch ${index}:`, result.reason);
			await db
				.update(summaries)
				.set({
					errorMessage:
						result.reason instanceof Error
							? result.reason.message
							: String(result.reason),
					status: "failed",
				})
				.where(eq(summaries.id, summary.id));
			return `[Summary unavailable: ${result.reason instanceof Error ? result.reason.message : String(result.reason)}]`;
		});

		const finalSummary = await generateText({
			model: "google/gemini-2.5-flash",
			prompt: `You will be given a list of summaries from a github commit for which you're gonna write a client summary as if you were a expert writer.

Expected behavior:
- Write a non-technical summary of the work delivered
- Use bullet list
- Only output the answer and nothing more
- Be factual and transparent, we want the client to know what is hapening

Text to summarise:
${successfulSummaries.join("\n\n")}
			`,
		});

		// Update the summary with the final generated text
		await db
			.update(summaries)
			.set({
				summary: finalSummary.text,
				status: "completed",
			})
			.where(eq(summaries.id, summary.id));
	},
);
