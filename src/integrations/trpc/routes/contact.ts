import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import { Resend } from "resend";
import { publicProcedure } from "../init";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(3, "Please enter a subject")
    .max(200, "Subject is too long"),
  message: z
    .string()
    .min(10, "Please provide a bit more detail")
    .max(2000, "Message is too long"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export const contactRouter = {
  send: publicProcedure.input(contactSchema).mutation(async ({ input }) => {
    await resend.emails.send({
      from: "Delivrr Work Website <contact@delivrr.work>",
      to: "yagomfh@gmail.com",
      subject: `[Website] ${input.subject}`,
      text: [
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        "",
        "Message:",
        input.message,
      ].join("\n"),
    });

    return { success: true };
  }),
} satisfies TRPCRouterRecord;
