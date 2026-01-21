import { commitments } from "@/db/schema";
import { TRPCRouterRecord } from "@trpc/server";
import { createInsertSchema } from "drizzle-zod";
import { protectedProcedure } from "../init";

const commitmentInsertSchema = createInsertSchema(commitments).omit({ projectId: true, createdAt: true, updatedAt: true });

export const commitmentsRouter = {
  create: protectedProcedure.input(commitmentInsertSchema).mutation(async ({ ctx, input }) => {
    const { user } = ctx.session;
    
  }),
} satisfies TRPCRouterRecord;