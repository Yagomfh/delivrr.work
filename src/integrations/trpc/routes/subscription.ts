import type { TRPCRouterRecord } from "@trpc/server";
import { eq } from "drizzle-orm";
import { subscription } from "@/db/auth-schema";
import { protectedProcedure } from "../init";

export const subscriptionRouter = {
  get: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;

    const userSubscription = await ctx.db.query.subscription.findFirst({
      where: eq(subscription.referenceId, user.id),
    });

    return userSubscription;
  }),
} satisfies TRPCRouterRecord;
