import { on } from "node:events";
import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { and, count, desc, eq, ilike, or, sql } from "drizzle-orm";
import { z } from "zod";
import { summaries } from "@/db/schema";
import { ee } from "../events";
import { projectMiddleware } from "../middlewares/project";
import { db } from "@/db";

const ITEMS_PER_PAGE = 9;

const getSummaries = async (
  projectId: number,
  search: string | undefined,
  page: number | undefined
) => {
  const searchTerm = search?.trim();
  const hasSearch = searchTerm && searchTerm.length > 0;
  const currentPage = page ?? 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const whereClause = and(
    eq(summaries.projectId, projectId),
    hasSearch
      ? or(
          sql`${summaries.summarySearch} @@ websearch_to_tsquery('english', ${searchTerm})`,
          ilike(summaries.headCommitMessage, `%${searchTerm}%`),
          ilike(summaries.summarySearch, `%${searchTerm}%`)
        )
      : undefined
  );

  const [data, totalCountResult] = await Promise.all([
    db
      .select()
      .from(summaries)
      .where(whereClause)
      .orderBy(desc(summaries.headCommitTimestamp))
      .limit(ITEMS_PER_PAGE)
      .offset(offset),
    db.select({ count: count() }).from(summaries).where(whereClause),
  ]);

  return {
    data,
    total: totalCountResult[0]?.count ?? 0,
    page: currentPage,
    totalPages: Math.ceil((totalCountResult[0]?.count ?? 0) / ITEMS_PER_PAGE),
  };
};

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
        page: z.number().optional(),
      })
    )
    .subscription(async function* (opts) {
      const userId = opts.ctx.session.user.id;

      const initialResult = await getSummaries(
        opts.input.projectId,
        opts.input.search,
        opts.input.page
      );
      // Send initial summaries when client connects
      yield initialResult;

      // Listen for new events
      for await (const [_action, eventUserId] of on(ee, "summary", {
        // Passing the AbortSignal from the request automatically cancels the event emitter when the request is aborted
        signal: opts.signal,
      })) {
        if (userId === eventUserId) {
          // Refetch all summaries for the user when an event occurs
          const updatedResult = await getSummaries(
            opts.input.projectId,
            opts.input.search,
            opts.input.page
          );
          yield updatedResult;
        }
      }
    }),
} satisfies TRPCRouterRecord;
