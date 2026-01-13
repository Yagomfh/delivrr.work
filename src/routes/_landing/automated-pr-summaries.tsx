import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Mail,
  MessageSquare,
  GitBranch,
} from "lucide-react";
import { useState } from "react";
import { WaitingListDialog } from "@/components/dialogs/waiting-list-dialog";

const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_landing/automated-pr-summaries")({
  head: () => ({
    meta: [
      {
        title: "Automated PR Summaries for Slack and Email | delivrr.work",
      },
      {
        name: "description",
        content:
          "Automate pull request summaries for Slack and email. Get AI-powered PR summaries delivered automatically to your team channels and email lists when code is merged—no manual work required.",
      },
      {
        name: "robots",
        content: "index,follow",
      },
      {
        property: "og:title",
        content: "Automated PR Summaries for Slack and Email | delivrr.work",
      },
      {
        property: "og:description",
        content:
          "Automate pull request summaries for Slack and email. AI-powered PR summaries delivered automatically when code is merged.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: `${baseUrl}/automated-pr-summaries`,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/automated-pr-summaries`,
      },
    ],
  }),
  component: AutomatedPrSummariesPage,
});

function AutomatedPrSummariesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main className="flex-1">
      <section className="relative border-b border-border/60 bg-linear-to-b from-background via-background to-muted/40 overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-medium text-foreground">
                Automated PR Summaries
              </span>
            </div>

            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Automated PR summaries for Slack and email
            </h1>

            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              Get AI-powered pull request summaries delivered automatically to
              your Slack channels and email lists when code is merged. Keep your
              team informed about code changes, feature delivery, and
              deployments without manual updates.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="gap-1.5"
                onClick={() => setDialogOpen(true)}
              >
                Request early access
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">View main features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-3 text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Why automate PR summaries?
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              Keep your team aligned without manual status updates
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold">
                  Slack channel updates
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Automatically post PR summaries to your Slack channels when pull
                requests are merged. Keep engineering teams, product teams, and
                stakeholders informed in real-time without manual notifications.
              </p>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold">
                  Email distribution lists
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Send automated PR summaries to email distribution lists. Perfect
                for stakeholders who prefer email updates, client reporting, or
                executive summaries that need to reach specific audiences.
              </p>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-6">
              <div className="flex items-center gap-3">
                <GitBranch className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold">
                  Multi-channel delivery
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Deliver PR summaries to both Slack and email simultaneously.
                Configure different channels for different audiences—engineering
                teams get Slack updates, stakeholders get email summaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl text-center">
              How automated PR summaries work
            </h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Connect GitHub repositories
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Link your GitHub repositories to Delivrr. Configure which
                    branches and events trigger automated PR summaries.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Set up Slack and email channels
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configure Slack webhooks for team channels and email
                    distribution lists for stakeholders. Set up once and every
                    PR summary automatically delivers to your selected channels.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Customize AI summaries
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configure AI parameters to control PR summary tone,
                    verbosity, and technical depth. Create summaries that match
                    your team's communication style—from detailed technical
                    updates to high-level feature summaries.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                  4
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Automatic delivery
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    When a pull request is merged, Delivrr automatically
                    generates an AI-powered summary and delivers it to your
                    configured Slack channels and email lists. No manual work
                    required—your team stays informed automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-b from-background via-background to-muted/50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to automate your PR summaries?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Join teams using Delivrr to automate pull request summaries for
            Slack and email. Request early access to get started.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="gap-1.5"
              onClick={() => setDialogOpen(true)}
            >
              Request early access
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <WaitingListDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </main>
  );
}
