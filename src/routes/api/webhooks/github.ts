import { Webhooks } from "@octokit/webhooks";
import { createFileRoute } from "@tanstack/react-router";
import { inngest } from "@/integrations/inngest/client";

const webhooks = new Webhooks({
	secret: process.env.GITHUB_WEBHOOK_SECRET as string,
});

export const Route = createFileRoute("/api/webhooks/github")({
	server: {
		handlers: {
			POST: async ({ request }: { request: Request }) => {
				const headers = Object.fromEntries(request.headers.entries());
				const rawBody = await request.text();

				const eventName = headers["x-github-event"]; // note lowercase in JS

				if (!eventName) {
					return new Response("Missing X-GitHub-Event", { status: 400 });
				}

				const verified = await webhooks.verify(
					rawBody,
					headers["x-hub-signature-256"] as string,
				);

				if (!verified) {
					return new Response("Unauthorized", { status: 401 });
				}

				// Emit to Inngest as "github.<event>"
				if (eventName === "push") {
					await inngest.send({
						name: `github.push`,
						data: JSON.parse(rawBody),
					});
				}

				return new Response("ok", { status: 200 });
			},
		},
	},
});
