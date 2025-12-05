import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { projects } from "@/db/schema";
import { protectedProcedure } from "../init";

export const projectMiddleware = protectedProcedure
	.input(
		z.object({
			projectId: z.number(),
		}),
	)
	.use(async ({ ctx, next, input }) => {
		const project = await ctx.db.query.projects.findFirst({
			where: and(
				eq(projects.id, input.projectId),
				eq(projects.userId, ctx.session.user.id),
			),
		});

		if (!project) {
			throw new TRPCError({
				code: "FORBIDDEN",
				message: "You are not authorized to access this resource",
			});
		}

		return next({ ctx: { ...ctx, project } });
	});
