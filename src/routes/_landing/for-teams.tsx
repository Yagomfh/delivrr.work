import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Clock, Users } from "lucide-react";
import { useState } from "react";
import { WaitingListDialog } from "@/components/dialogs/waiting-list-dialog";

const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_landing/for-teams")({
  head: () => ({
    meta: [
      {
        title: "GitHub Summary Reports for Teams | delivrr.work",
      },
      {
        name: "description",
        content:
          "Stay informed about team progress with automated GitHub summary reports. Get high-level overviews of pull requests, deployments, and team activity without diving into GitHub.",
      },
      {
        name: "robots",
        content: "index,follow",
      },
      {
        property: "og:title",
        content: "GitHub Summary Reports for Teams | delivrr.work",
      },
      {
        property: "og:description",
        content:
          "Automated GitHub summary reports for teams. Stay informed about team progress without manual reporting.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: `${baseUrl}/for-teams`,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/for-teams`,
      },
    ],
  }),
  component: ForTeamsPage,
});

function ForTeamsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main className="flex-1">
      <section className="relative border-b border-border/60 bg-linear-to-b from-background via-background to-muted/40 overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-medium text-foreground">For Teams</span>
            </div>

            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              GitHub summary reports for teams
            </h1>

            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              Stay informed about team progress without diving into GitHub. Get
              automated summary reports of pull requests, deployments, and team
              activity delivered to your inbox or Slack—perfect for status
              updates, sprint reviews, and keeping everyone aligned.
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
              Why teams use Delivrr Work
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              Get the visibility you need without the manual reporting work
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold">
                  High-level team visibility
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Get automated summaries of what's been shipped, what's in
                progress, and key changes across your team. Perfect for sprint
                reviews, status updates, and understanding team velocity without
                digging through GitHub.
              </p>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold">
                  Save time on status updates
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Stop manually compiling status updates for stakeholders. GitHub
                summary reports automatically deliver to your inbox or Slack,
                giving you the information you need without the manual work.
              </p>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-6">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold">Team-wide insights</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Track activity across multiple repositories and teams. Get
                aggregated summaries that show overall progress, or drill down
                into specific projects when needed. All delivered automatically
                to keep you informed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-3 text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Why teams choose Delivrr Work
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              See the measurable impact of automated GitHub summaries
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2 rounded-lg border border-border bg-background p-6 text-center">
              <div className="text-3xl font-bold text-primary">5+ hrs</div>
              <p className="text-sm font-medium text-foreground">
                Saved per week
              </p>
              <p className="text-xs text-muted-foreground">
                Teams save time on manual status updates and progress reporting
                each week
              </p>
            </div>

            <div className="space-y-2 rounded-lg border border-border bg-background p-6 text-center">
              <div className="text-3xl font-bold text-primary">90%</div>
              <p className="text-sm font-medium text-foreground">
                Better alignment
              </p>
              <p className="text-xs text-muted-foreground">
                Teams report improved visibility and alignment across
                stakeholders
              </p>
            </div>

            <div className="space-y-2 rounded-lg border border-border bg-background p-6 text-center">
              <div className="text-3xl font-bold text-primary">3x</div>
              <p className="text-sm font-medium text-foreground">
                Faster updates
              </p>
              <p className="text-xs text-muted-foreground">
                Status updates delivered automatically in real-time instead of
                weekly manual reports
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl text-center">
              How GitHub summary reports work for teams
            </h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Connect team repositories
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Link your team's GitHub repositories to Delivrr. Configure
                    which repositories and branches generate summaries for your
                    team reports.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Configure delivery channels
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Set up email or Slack delivery for your GitHub summary
                    reports. Choose to receive summaries individually or as
                    aggregated digests that give you a high-level view of team
                    activity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Get automated team updates
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    When pull requests are merged or deployments occur, you
                    automatically receive GitHub summary reports. Stay informed
                    about team progress, feature delivery, and code changes
                    without manually checking GitHub or asking for status
                    updates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground">
                  4
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    Search delivery history
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Use Delivrr's semantic search to query your team's delivery
                    history. Quickly find when features were deployed, verify
                    status, or review past summaries—perfect for sprint reviews
                    and retrospectives.
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
            Ready to automate your team status updates?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Join teams using Delivrr to stay informed about progress with
            automated GitHub summary reports. Request early access to get
            started.
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
