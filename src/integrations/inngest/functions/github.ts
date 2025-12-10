import { Octokit } from "@octokit/core";
import { generateText } from "ai";
import { eq } from "drizzle-orm";
import { NonRetriableError } from "inngest";
import { db } from "@/db";
import { projects, summaries } from "@/db/schema";
import { auth } from "@/integrations/better-auth/auth";
import { ee } from "@/integrations/trpc/events";
import { inngest } from "../client";

export const githubPushFn = inngest.createFunction(
  { id: "github-push" },
  { event: "github.push" },
  async ({ event, step }) => {
    console.log("[github-push] Event received:", {
      eventId: event.id,
      eventName: event.name,
      repository: event.data.repository?.full_name,
      after: event.data.after,
      before: event.data.before,
      sender: event.data.sender?.login,
    });

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

    const [summary] = await step.run("create-summary", async () => {
      const input = {
        projectId: project.id,
        commitUrl: `https://github.com/${data.repository.owner.login}/${data.repository.name}/commit/${data.after}`,
        senderName: data.sender.login,
        senderAvatar: data.sender.avatar_url,
        headCommitMessage: data.head_commit?.message ?? "",
        headCommitTimestamp: data.head_commit?.timestamp
          ? new Date(data.head_commit.timestamp)
          : new Date(),
      };
      console.log(
        "[step:create-summary] Input:",
        JSON.stringify(input, null, 2)
      );

      const result = await db
        .insert(summaries)
        .values({
          projectId: input.projectId,
          commitUrl: input.commitUrl,
          senderName: input.senderName,
          senderAvatar: input.senderAvatar,
          headCommitMessage: input.headCommitMessage,
          headCommitTimestamp: input.headCommitTimestamp,
          errorMessage: null,
          summary: null,
        })
        .returning({ id: summaries.id });

      console.log(
        "[step:create-summary] Output:",
        JSON.stringify(result, null, 2)
      );
      return result;
    });
    ee.emit("summary", "created", project.userId);

    if (!summary) {
      return;
    }

    // Get git diff
    const gitDiff = await step.run("get-git-diff", async () => {
      const { repository, after, before } = data;
      const input = {
        owner: repository.owner.login,
        repo: repository.name,
        base: before,
        head: after,
      };
      console.log("[step:get-git-diff] Input:", JSON.stringify(input, null, 2));

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
        input
      );

      const output = {
        filesCount: diff.data.files?.length ?? 0,
        commitsCount: diff.data.commits?.length ?? 0,
        totalCommits: diff.data.total_commits,
        aheadBy: diff.data.ahead_by,
        behindBy: diff.data.behind_by,
      };
      console.log(
        "[step:get-git-diff] Output summary:",
        JSON.stringify(output, null, 2)
      );
      console.log(
        "[step:get-git-diff] Full diff data files:",
        diff.data.files?.map((f) => ({
          filename: f.filename,
          status: f.status,
          additions: f.additions,
          deletions: f.deletions,
        }))
      );

      return diff.data;
    });

    // Extract patches and filter out empty ones
    const patches = await step.run("extract-patches", async () => {
      console.log(
        "[step:extract-patches] Input: gitDiff.files count:",
        gitDiff.files?.length ?? 0
      );

      const result =
        gitDiff.files
          ?.map((file) => file.patch ?? "")
          .filter((patch) => patch.length > 0) ?? [];

      console.log("[step:extract-patches] Output:", {
        totalPatches: result.length,
        patchLengths: result.map((p, i) => ({ index: i, length: p.length })),
      });

      return result;
    });

    const patchesBytes = await step.run("calculate-patches-bytes", async () => {
      console.log(
        "[step:calculate-patches-bytes] Input: patches count:",
        patches.length
      );

      const result = patches.reduce((sum, str) => {
        return sum + Buffer.byteLength(str, "utf8");
      }, 0);

      console.log("[step:calculate-patches-bytes] Output:", {
        totalBytes: result,
        totalKB: (result / 1024).toFixed(2),
        totalMB: (result / (1024 * 1024)).toFixed(2),
      });

      return result;
    });

    //TODO: If the patches are > 0.5MB, don't summarize them

    // Generate summaries for all patches in parallel
    // Use allSettled to handle partial failures gracefully
    const patchesSummaries = await Promise.allSettled(
      patches.map((patch, index) => {
        return step.run(`summarize-patch-${index}`, async () => {
          console.log(
            `[step:summarize-patch-${index}] Input: patch length:`,
            patch.length,
            "characters"
          );
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

            console.log(
              `[step:summarize-patch-${index}] Output: summary length:`,
              result.text.length,
              "characters"
            );
            console.log(
              `[step:summarize-patch-${index}] Output preview:`,
              result.text.substring(0, 200)
            );

            return result.text;
          } catch (error) {
            // For LLM errors (rate limits, API errors, etc.), don't retry
            // This prevents wasting credits on retries
            console.error(`[step:summarize-patch-${index}] Error:`, error);

            throw new NonRetriableError(
              `Failed to generate summary for patch ${index}: ${error instanceof Error ? error.message : String(error)}`,
              { cause: error }
            );
          }
        });
      })
    );

    // Extract successful summaries and handle failures
    const successfulSummaries = await Promise.all(
      patchesSummaries.map(async (result, index) => {
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
            patchesInKB: patchesBytes / 1024,
          })
          .where(eq(summaries.id, summary.id));

        ee.emit("summary", "updated", project.userId);
        return `[Summary unavailable: ${result.reason instanceof Error ? result.reason.message : String(result.reason)}]`;
      })
    );

    const finalSummary = await step.run("generate-final-summary", async () => {
      const input = {
        summariesCount: successfulSummaries.length,
        totalInputLength: successfulSummaries.join("\n\n").length,
        summariesPreview: successfulSummaries.map((s, i) => ({
          index: i,
          length: s.length,
          preview: s.substring(0, 100),
        })),
      };
      console.log(
        "[step:generate-final-summary] Input:",
        JSON.stringify(input, null, 2)
      );

      const result = await generateText({
        model: "google/gemini-2.5-flash",
        prompt: `You will be given a list of summaries from a github commit for which you're gonna write a client summary as if you were a expert writer.

Expected behavior:
- Write a non-technical summary of the work delivered
- Structure the content in a way that is easy to understand for a non-technical audience
- Only output the answer and nothing more
- Be factual and transparent, we want the client to know what is hapening
- Output the summary in markdown format only

Text to summarise:
${successfulSummaries.join("\n\n")}
			`,
      });

      console.log("[step:generate-final-summary] Output:", {
        summaryLength: result.text.length,
        preview: result.text.substring(0, 300),
      });

      return result;
    });

    // Update the summary with the final generated text
    await step.run("update-summary", async () => {
      const input = {
        summaryId: summary.id,
        summaryLength: finalSummary.text.length,
        patchesInKB: patchesBytes / 1024,
      };
      console.log(
        "[step:update-summary] Input:",
        JSON.stringify(input, null, 2)
      );

      const result = await db
        .update(summaries)
        .set({
          summary: finalSummary.text,
          status: "completed",
          patchesInKB: patchesBytes / 1024,
        })
        .where(eq(summaries.id, summary.id));

      console.log("[step:update-summary] Output: update completed");

      return result;
    });

    await step.run("emit-summary-updated", async () => {
      console.log("[step:emit-summary-updated] Input: userId:", project.userId);
      ee.emit("summary", "updated", project.userId);
      console.log("[step:emit-summary-updated] Output: event emitted");
    });
  }
);
