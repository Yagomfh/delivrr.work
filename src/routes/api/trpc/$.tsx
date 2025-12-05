import { createFileRoute } from "@tanstack/react-router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/integrations/trpc/init";
import { trpcRouter } from "@/integrations/trpc/router";

function handler({ request }: { request: Request }) {
	return fetchRequestHandler({
		req: request,
		router: trpcRouter,
		endpoint: "/api/trpc",
		/**
		 * Wire up our tRPC context so that middleware & procedures
		 * receive `ctx` with `db` and `session`.
		 */
		createContext: () => createTRPCContext(request),
	});
}

export const Route = createFileRoute("/api/trpc/$")({
	server: {
		handlers: {
			GET: handler,
			POST: handler,
		},
	},
});
