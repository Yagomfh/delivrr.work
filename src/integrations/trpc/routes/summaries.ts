import { on } from "node:events";
import type { TRPCRouterRecord } from "@trpc/server";
import { eq, inArray } from "drizzle-orm";
import { projects, summaries } from "@/db/schema";
import { ee } from "../events";
import { protectedProcedure } from "../init";

export const summariesRouter = {
	list: protectedProcedure.subscription(async function* (opts) {
		const userId = opts.ctx.session.user.id;

		// Get user's project IDs
		const userProjects = await opts.ctx.db.query.projects.findMany({
			columns: { id: true },
			where: eq(projects.userId, userId),
		});

		const projectIds = userProjects.map((p) => p.id);

		// Send initial summaries when client connects
		if (projectIds.length > 0) {
			const initialSummaries = await opts.ctx.db.query.summaries.findMany({
				where: inArray(summaries.projectId, projectIds),
			});
			yield initialSummaries;
		} else {
			yield [];
		}

		// Listen for new events
		for await (const [_action, eventUserId] of on(ee, "summary", {
			// Passing the AbortSignal from the request automatically cancels the event emitter when the request is aborted
			signal: opts.signal,
		})) {
			if (userId === eventUserId) {
				// Refetch all summaries for the user when an event occurs
				const updatedSummaries = await opts.ctx.db.query.summaries.findMany({
					where: inArray(summaries.projectId, projectIds),
				});
				yield updatedSummaries;
			}
		}
	}),
} satisfies TRPCRouterRecord;
