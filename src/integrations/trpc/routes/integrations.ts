import { integrations } from "@/db/schema";
import { z } from "zod";
import type { TRPCRouterRecord } from "@trpc/server";
import { createInsertSchema } from "drizzle-zod";
import { projectMiddleware } from "../middlewares/project";
import { and, eq } from "drizzle-orm";
import { ee } from "../events";
import { on } from "node:events";

const integrationInsertSchema = createInsertSchema(integrations);

type ConfigMap = {
  slack: {
    channel: string;
    token: string;
  };
  email: {
    from: string;
    cc: string;
  };
};

export type Integration<T extends keyof ConfigMap = keyof ConfigMap> = {
  type: T;
  enabled: boolean | null;
  config: ConfigMap[T] | null;
  id: string;
};

export const integrationsRouter = {
  list: projectMiddleware.subscription(async function* (opts) {
    const { id: projectId } = opts.ctx.project;
    const list = await opts.ctx.db.query.integrations.findMany({
      where: and(eq(integrations.projectId, projectId)),
    });

    yield list.reduce(
      (acc, integration) => {
        acc[integration.type] = {
          enabled: integration.enabled,
          id: integration.id,
          config: integration.config as
            | ConfigMap[typeof integration.type]
            | null,
        };
        return acc;
      },
      {} as Partial<
        Record<keyof ConfigMap, Omit<Integration<keyof ConfigMap>, "type">>
      >
    );

    for await (const [userId] of on(ee, "integration", {
      // Passing the AbortSignal from the request automatically cancels the event emitter when the request is aborted
      signal: opts.signal,
    })) {
      if (opts.ctx.session.user.id === userId) {
        const updatedList = await opts.ctx.db.query.integrations.findMany({
          where: and(eq(integrations.projectId, projectId)),
        });
        yield updatedList.reduce(
          (acc, integration) => {
            acc[integration.type] = {
              enabled: integration.enabled,
              id: integration.id,
              config: integration.config as
                | ConfigMap[typeof integration.type]
                | null,
            };
            return acc;
          },
          {} as Partial<
            Record<keyof ConfigMap, Omit<Integration<keyof ConfigMap>, "type">>
          >
        );
      }
    }
  }),
  update: projectMiddleware
    .input(
      z.object({
        ...integrationInsertSchema.pick({ config: true, id: true }).shape,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, config } = input;

      const result = await ctx.db
        .update(integrations)
        .set({ config })
        .where(and(eq(integrations.id, id)))
        .returning({ id: integrations.id, enabled: integrations.enabled });

      ee.emit("integration", ctx.session.user.id);

      return result;
    }),
  switch: projectMiddleware
    .input(
      z.object({
        ...integrationInsertSchema.pick({ type: true }).shape,
        action: z.enum(["on", "off"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: projectId } = ctx.project;
      const { type, action } = input;

      const result = await ctx.db
        .insert(integrations)
        .values({
          id: `${projectId}-${type}`,
          type,
          projectId,
          enabled: action === "on",
        })
        .onConflictDoUpdate({
          target: integrations.id,
          set: { enabled: action === "on" },
        })
        .returning({ id: integrations.id, enabled: integrations.enabled });

      ee.emit("integration", ctx.session.user.id);

      return result;
    }),
} satisfies TRPCRouterRecord;
