import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageSquare, Zap } from "lucide-react";
import { useState } from "react";
import { WaitingListDialog } from "@/components/dialogs/waiting-list-dialog";

const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_landing/for-agencies")({
  head: () => ({
    meta: [
      {
        title: "GitHub Reporting for Agencies & Consultancies | delivrr.work",
      },
      {
        name: "description",
        content:
          "Automate client reporting from GitHub for agencies and consultancies. Generate professional status updates, pull request summaries, and project progress reports automatically—no manual work required.",
      },
      {
        name: "robots",
        content: "index,follow",
      },
      {
        property: "og:title",
        content: "GitHub Reporting for Agencies & Consultancies | delivrr.work",
      },
      {
        property: "og:description",
        content:
          "Automate client reporting from GitHub. Generate professional status updates and pull request summaries automatically.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: `${baseUrl}/for-agencies`,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/for-agencies`,
      },
    ],
  }),
  component: ForAgenciesPage,
});

function ForAgenciesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main className="flex-1">
      <section className="relative border-b border-border/60 bg-linear-to-b from-background via-background to-muted/40 overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-medium text-foreground">
                For Agencies & Consultancies
              </span>
            </div>

            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Automated client reporting from GitHub
            </h1>

            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              Stop spending hours on manual status updates. Delivrr Work
              automatically generates professional client reports from your
              GitHub activity, delivering pull request summaries and project
              progress updates directly to your clients via email—keeping them
              informed without the manual work.
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
              Why agencies use Delivrr Work for client reporting
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              Automate the reporting work that eats into your billable hours
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold">
                  Professional email reports
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Automatically generate and send professional client status
                updates via email. Customize tone and technical depth to match
                your client's needs—from technical stakeholders to non-technical
                decision makers.
              </p>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-6">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold">
                  Save hours every week
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Eliminate manual status update work. What used to take hours of
                writing and formatting client reports now happens automatically
                when code is merged—freeing your team to focus on billable work.
              </p>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold">
                  Multi-client management
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Manage reporting for multiple clients from one dashboard. Each
                client gets their own delivery configuration, ensuring the right
                updates reach the right stakeholders automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-3 text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              The impact of automated client reporting
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              See why agencies choose Delivrr Work for client reporting
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2 rounded-lg border border-border bg-background p-6 text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <p className="text-sm font-medium text-foreground">
                Client satisfaction
              </p>
              <p className="text-xs text-muted-foreground">
                Agencies report higher client satisfaction with automated,
                consistent reporting
              </p>
            </div>

            <div className="space-y-2 rounded-lg border border-border bg-background p-6 text-center">
              <div className="text-3xl font-bold text-primary">8+ hrs</div>
              <p className="text-sm font-medium text-foreground">
                Saved per week
              </p>
              <p className="text-xs text-muted-foreground">
                Average time saved on manual status updates and client reporting
                each week
              </p>
            </div>

            <div className="space-y-2 rounded-lg border border-border bg-background p-6 text-center">
              <div className="text-3xl font-bold text-primary">40%</div>
              <p className="text-sm font-medium text-foreground">
                More billable hours
              </p>
              <p className="text-xs text-muted-foreground">
                Teams redirect time from reporting to billable client work
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl text-center">
              How client reporting from GitHub works
            </h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Connect client repositories
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Link your client's GitHub repositories to Delivrr. Configure
                    project scopes and delivery settings specific to each
                    client.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Customize report tone
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configure AI parameters to match your client's communication
                    style. Create technical summaries for engineering teams or
                    accessible updates for business stakeholders.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Set up client email delivery
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configure email distribution lists for each client. When
                    pull requests are merged or deployments occur, professional
                    summaries automatically deliver to your client's inbox.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                  4
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Automated client updates
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Every GitHub activity automatically generates a client
                    report. Your clients stay informed about project progress,
                    feature delivery, and code changes—without you writing a
                    single status update.
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
            Ready to automate your client reporting?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Join agencies and consultancies using Delivrr to automate client
            reporting from GitHub. Request early access to start saving hours on
            manual status updates.
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
