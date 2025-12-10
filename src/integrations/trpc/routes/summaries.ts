import { on } from "node:events";
import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { z } from "zod";
import { summaries } from "@/db/schema";
import { ee } from "../events";
import { projectMiddleware } from "../middlewares/project";

export const summariesRouter = {
  get: projectMiddleware
    .input(
      z.object({
        id: z.number(),
      })
    )
    .subscription(async function* (opts) {
      const summary = await opts.ctx.db.query.summaries.findFirst({
        where: and(
          eq(summaries.projectId, opts.ctx.project.id),
          eq(summaries.id, opts.input.id)
        ),
      });

      if (!summary) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Summary not found",
        });
      }

      yield summary;

      for await (const [_action, eventUserId] of on(ee, "summary", {
        // Passing the AbortSignal from the request automatically cancels the event emitter when the request is aborted
        signal: opts.signal,
      })) {
        if (opts.ctx.session.user.id === eventUserId) {
          // Refetch all summaries for the user when an event occurs
          const updatedSummary = await opts.ctx.db.query.summaries.findFirst({
            where: and(
              eq(summaries.projectId, opts.ctx.project.id),
              eq(summaries.id, opts.input.id)
            ),
          });
          yield updatedSummary;
        }
      }
    }),
  list: projectMiddleware
    .input(
      z.object({
        search: z.string().optional(),
      })
    )
    .subscription(async function* (opts) {
      const userId = opts.ctx.session.user.id;

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
                  sql`${summaries.summarySearch} @@ websearch_to_tsquery('english', ${searchTerm})`,
                  ilike(summaries.headCommitMessage, `%${searchTerm}%`)
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
