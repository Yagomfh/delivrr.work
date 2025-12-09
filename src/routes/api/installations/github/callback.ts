import { Octokit } from "@octokit/core";
import { createFileRoute } from "@tanstack/react-router";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { githubInstallations } from "@/db/schema";
import { auth } from "@/integrations/better-auth/auth";

export const Route = createFileRoute("/api/installations/github/callback")({
	server: {
		handlers: {
			GET: async ({ request }: { request: Request }) => {
				const params = new URLSearchParams(request.url.split("?")[1]);
				const state = params.get("state");
				const installationId = params.get("installation_id");

				if (!state || !installationId) {
					return new Response("Bad Request", { status: 400 });
				}

				const installation = await db.query.githubInstallations.findFirst({
					where: eq(githubInstallations.installationToken, state),
				});

				if (!installation) {
					return new Response("Installation not found", { status: 404 });
				}

				const { accessToken } = await auth.api.getAccessToken({
					body: {
						providerId: "github",
						userId: installation.userId,
					},
				});

				const octokit = new Octokit({
					auth: accessToken,
				});

				const repositories = await octokit.request(
					"GET /user/installations/{installation_id}/repositories",
					{
						installation_id: parseInt(installationId, 10),
						headers: {
							"X-GitHub-Api-Version": "2022-11-28",
						},
					},
				);

				const { owner } = repositories.data.repositories[0];

				// Delete old installations for the user for the same owner
				await db
					.delete(githubInstallations)
					.where(
						and(
							eq(githubInstallations.userId, installation.userId),
							eq(githubInstallations.ownerLogin, owner.login),
						),
					);

				// Update the installation
				await db
					.update(githubInstallations)
					.set({
						installationId: installationId,
						ownerLogin: owner.login,
					})
					.where(eq(githubInstallations.id, installation.id));

				return Response.redirect(`/app`);
			},
		},
	},
});
