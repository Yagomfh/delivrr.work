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
					headers["x-hub-signature"] as string,
				);

				console.log("verified", verified, process.env.GITHUB_WEBHOOK_SECRET);

				// Emit to Inngest as "github.<event>"
				// await inngest.send({
				// 	name: "github." + eventName.trim().replace("Event", "").toLowerCase(),
				// 	data: body,
				// });

				return new Response("ok", { status: 200 });
			},
		},
	},
});
