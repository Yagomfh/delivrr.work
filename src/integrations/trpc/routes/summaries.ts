import { on } from "node:events";
import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { and, asc, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";
import { z } from "zod";
import { projects, summaries } from "@/db/schema";
import { ee } from "../events";
import { protectedProcedure } from "../init";
import { projectMiddleware } from "../middlewares/project";

export const summariesRouter = {
  get: projectMiddleware
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.query.summaries.findFirst({
        where: and(
          eq(summaries.id, input.id),
          eq(summaries.projectId, ctx.project.id)
        ),
      });
    }),
  list: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
        search: z.string().optional(),
      })
    )
    .subscription(async function* (opts) {
      const userId = opts.ctx.session.user.id;

      // Get user's project IDs
      const project = await opts.ctx.db.query.projects.findFirst({
        columns: { id: true },
        where: and(
          eq(projects.userId, userId),
          eq(projects.id, opts.input.projectId)
        ),
      });

      if (!project) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to access this resource",
        });
      }

      const searchTerm = opts.input.search?.trim();
      const hasSearch = searchTerm && searchTerm.length > 0;

      const initialSummaries = await opts.ctx.db
        .select()
        .from(summaries)
        .where(
          and(
            eq(summaries.projectId, opts.input.projectId),
            hasSearch
              ? or(
                  sql`to_tsvector('english', ${summaries.headCommitMessage}) @@ websearch_to_tsquery('english', ${searchTerm})`
                )
              : undefined
          )
        )
        .orderBy(asc(summaries.headCommitTimestamp));

      // Send initial summaries when client connects
      yield initialSummaries;

      // Listen for new events
      for await (const [_action, eventUserId] of on(ee, "summary", {
        // Passing the AbortSignal from the request automatically cancels the event emitter when the request is aborted
        signal: opts.signal,
      })) {
        if (userId === eventUserId) {
          // Refetch all summaries for the user when an event occurs
          const updatedSummaries = await opts.ctx.db.query.summaries.findMany({
            where: eq(summaries.projectId, opts.input.projectId),
            orderBy: [desc(summaries.headCommitTimestamp)],
          });
          yield updatedSummaries;
        }
      }
    }),
} satisfies TRPCRouterRecord;
