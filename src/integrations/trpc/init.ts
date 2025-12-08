import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { db } from "@/db";
import { auth } from "../better-auth/auth";

export const createTRPCContext = async ({ headers }: { headers: Headers }) => {
	const session = await auth.api.getSession({
		headers,
	});

	return {
		db,
		session,
	};
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
});

const enforceUserIsAuthenticated = t.middleware(({ ctx, next }) => {
	if (!ctx.session?.user) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	return next({
		ctx: {
			// Preserve the rest of the context (e.g. `db`) while ensuring
			// `session.user` is non-null inside protected procedures.
			...ctx,
			session: { ...ctx.session, user: ctx.session.user },
		},
	});
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(enforceUserIsAuthenticated);
