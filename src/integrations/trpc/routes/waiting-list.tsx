import type { TRPCRouterRecord } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { waitingList } from "@/db/schema";
import { publicProcedure } from "../init";
import { Resend } from "resend";
import WaitingListEmail from "@/integrations/react-email/waiting-list";

const emailSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export const waitingListRouter = {
  add: publicProcedure.input(emailSchema).mutation(async ({ ctx, input }) => {
    // Check if email already exists
    const existing = await ctx.db
      .select()
      .from(waitingList)
      .where(eq(waitingList.email, input.email))
      .limit(1);

    if (existing.length > 0) {
      // Return success even if already exists (don't reveal if email is in list)
      return { success: true, message: "Email added to waiting list" };
    }

    // Insert new email
    await ctx.db.insert(waitingList).values({
      email: input.email,
    });

    await resend.emails.send({
      from: "Yago at Delivrr Work <yago@delivrr.work>",
      to: input.email,
      subject: "Waiting List Confirmation",
      react: <WaitingListEmail />,
    });

    return { success: true, message: "Email added to waiting list" };
  }),
} satisfies TRPCRouterRecord;
