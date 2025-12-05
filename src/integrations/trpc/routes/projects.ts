import type { TRPCRouterRecord } from "@trpc/server";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { projects } from "@/db/schema";
import { protectedProcedure } from "../init";

const projectInsertSchema = createInsertSchema(projects).omit({ userId: true });

export const projectsRouter = {
	create: protectedProcedure
		.input(projectInsertSchema)
		.mutation(async ({ ctx, input }) => {
			const { user } = ctx.session;

			const project = await ctx.db
				.insert(projects)
				.values({
					...input,
					userId: user.id,
				})
				.returning();

			return project;
		}),
	list: protectedProcedure.query(async ({ ctx }) =>
		ctx.db.query.projects.findMany({
			where: eq(projects.userId, ctx.session.user.id),
		}),
	),
} satisfies TRPCRouterRecord;
