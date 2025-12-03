import { createFileRoute } from "@tanstack/react-router";
import { serve } from "inngest/edge";
import { inngest } from "@/integrations/inngest/client";
import { helloFn } from "@/integrations/inngest/functions/hello";

const handler = serve({ client: inngest, functions: [helloFn] });

export const Route = createFileRoute("/api/inngest")({
	server: {
		handlers: {
			GET: async ({ request }: { request: Request }) => handler(request),
			POST: async ({ request }: { request: Request }) => handler(request),
			PUT: async ({ request }: { request: Request }) => handler(request),
		},
	},
});
