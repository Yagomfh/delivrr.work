import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/db";
import { githubInstallations } from "@/db/schema";
import { auth } from "@/integrations/better-auth/auth";

export const Route = createFileRoute("/api/installations/github/new")({
	server: {
		handlers: {
			GET: async ({ request }: { request: Request }) => {
				const session = await auth.api.getSession({
					headers: request.headers,
				});

				if (!session?.user) {
					return new Response("Unauthorized", { status: 401 });
				}

				await auth.api.getAccessToken({
					body: {
						providerId: "github",
						userId: session.user.id,
					},
				});

				const token = crypto.randomUUID();

				await db
					.insert(githubInstallations)
					.values({
						userId: session.user.id,
						installationToken: token,
					})
					.returning();

				return Response.redirect(
					`https://github.com/apps/delivrr-work/installations/select_target?state=${token}`,
				);
			},
		},
	},
});
