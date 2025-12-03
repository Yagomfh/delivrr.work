import { createFileRoute } from "@tanstack/react-router";
import { inngest } from "@/integrations/inngest/client";

export const Route = createFileRoute("/api/webhooks/github")({
	server: {
		handlers: {
			POST: async ({ request }: { request: Request }) => {
				const headers = Object.fromEntries(request.headers.entries());
				const body = await request.json();

				const eventName = headers["x-github-event"]; // note lowercase in JS
				if (!eventName) {
					return new Response("Missing X-GitHub-Event", { status: 400 });
				}

				// Emit to Inngest as "github.<event>"
				await inngest.send({
					name: "github." + eventName.trim().replace("Event", "").toLowerCase(),
					data: body,
				});

				return new Response("ok", { status: 200 });
			},
		},
	},
});
