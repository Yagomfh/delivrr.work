import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import { useTRPC } from "@/integrations/trpc/react";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter at least 2 characters")
    .max(100, "Name is too long"),
  email: z.email("Please enter a valid email address"),
  subject: z
    .string()
    .min(3, "Please enter a subject")
    .max(200, "Subject is too long"),
  message: z
    .string()
    .min(10, "Please provide a bit more detail")
    .max(2000, "Message is too long"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_landing/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact Us | delivrr.work",
      },
      {
        name: "description",
        content:
          "Get in touch with the delivrr.work team. Questions about GitHub integrations, early access, or partnerships? We'd love to hear from you.",
      },
      {
        name: "robots",
        content: "index,follow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/contact`,
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const trpc = useTRPC();
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});

  const sendMessage = useMutation(
    trpc.contact.send.mutationOptions({
      onSuccess: () => {
        toast.success("Message sent. We’ll get back to you soon.");
        setValues({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
      },
      onError: (error) => {
        toast.error(
          error.message || "Something went wrong. Please try again later."
        );
      },
    })
  );

  const handleChange =
    (field: keyof ContactFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (data: ContactFormValues) => {
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0] as keyof ContactFormValues | undefined;
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate(values) || sendMessage.isPending) return;

    try {
      await sendMessage.mutateAsync(values);
    } catch {
      // error handled in onError
    }
  };

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-12 pt-0 md:pt-12 sm:px-6 md:flex-row md:items-center lg:px-8 lg:py-20">
      <section className="space-y-8">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Contact
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s talk about your workflow
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Whether you&apos;re exploring Delivrr Work for your team, have a
            question about integrations, or just want to say hi, drop us a
            message and we&apos;ll reply as soon as possible.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)]">
          <div className="rounded-xl border border-border/60 bg-linear-to-b from-background via-background to-muted/40 p-6 shadow-sm sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Ada Lovelace"
                    value={values.name}
                    onChange={handleChange("name")}
                    disabled={sendMessage.isPending}
                    aria-invalid={errors.name ? true : undefined}
                  />
                  {errors.name && (
                    <FieldError errors={[{ message: errors.name }]} />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Work email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    value={values.email}
                    onChange={handleChange("email")}
                    disabled={sendMessage.isPending}
                    aria-invalid={errors.email ? true : undefined}
                  />
                  {errors.email && (
                    <FieldError errors={[{ message: errors.email }]} />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input
                  id="contact-subject"
                  placeholder="e.g. Evaluating Delivrr Work for my team"
                  value={values.subject}
                  onChange={handleChange("subject")}
                  disabled={sendMessage.isPending}
                  aria-invalid={errors.subject ? true : undefined}
                />
                {errors.subject && (
                  <FieldError errors={[{ message: errors.subject }]} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell us a bit about your team, your GitHub setup, and what you’d like Delivrr Work to help with."
                  rows={6}
                  value={values.message}
                  onChange={handleChange("message")}
                  disabled={sendMessage.isPending}
                  aria-invalid={errors.message ? true : undefined}
                />
                {errors.message && (
                  <FieldError errors={[{ message: errors.message }]} />
                )}
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-1.5 sm:w-auto"
                  disabled={sendMessage.isPending}
                >
                  {sendMessage.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground sm:text-[13px]">
                  We&apos;ll only use your details to reply to your message. No
                  marketing spam.
                </p>
              </div>
            </form>
          </div>

          <aside className="space-y-5 rounded-xl border border-border/60 bg-linear-to-b from-muted/40 via-background to-background p-5 text-sm text-muted-foreground sm:p-6">
            <div className="space-y-1.5">
              <h2 className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Mail className="h-4 w-4 text-primary" />
                Direct email
              </h2>
              <p>
                Prefer email? Reach us directly at{" "}
                <a
                  href="mailto:yago@delivrr.work"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  yago@delivrr.work
                </a>
                .
              </p>
            </div>

            <div className="space-y-1.5">
              <h2 className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MessageSquare className="h-4 w-4 text-primary" />
                Typical topics
              </h2>
              <ul className="space-y-1.5 text-xs">
                <li>— Questions about GitHub or Slack integrations</li>
                <li>— Early access and onboarding for your team</li>
                <li>— Feedback, partnerships, or anything else</li>
              </ul>
            </div>

            <p className="text-[11px] text-muted-foreground/80">
              We usually reply within 1–2 business days. If it&apos;s urgent,
              mention that in your subject line.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
