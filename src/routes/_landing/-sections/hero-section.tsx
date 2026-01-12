import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { AnimatedSummaryCard } from "@/routes/_landing/-sections/animated-summary-card";
import { WaitingListDialog } from "@/components/dialogs/waiting-list-dialog";
import { BackgroundBeams } from "@/components/ui/background-beams";

export function HeroSection() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <section className="relative border-b border-border/60 bg-linear-to-b from-background via-background to-muted/40 overflow-hidden">
        <BackgroundBeams />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-12 pt-0 md:pt-12 sm:px-6 md:flex-row md:items-center lg:px-8 lg:py-20">
          <div className="order-2 flex-1 space-y-6 md:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-medium text-foreground">Pre-release</span>
            </div>

            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-foreground">
                Turn noisy GitHub activity
              </span>
              <br />
              <span className="text-muted-foreground">
                into clear, AI-crafted summaries.
              </span>
            </h1>

            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              Delivrr Work connects to your GitHub projects, generates concise
              AI summaries of pull requests and commits, and automatically
              delivers them to your teams or your client&apos;s inboxes and
              Slack channels.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="gap-1.5"
                onClick={() => setDialogOpen(true)}
              >
                Join the waiting list
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-dashed"
              >
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>

            <div className="mt-4 grid gap-4 text-xs text-muted-foreground sm:grid-cols-3 sm:text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Set up in minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>GitHub integration</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Email &amp; Slack deliveries</span>
              </div>
            </div>
          </div>

          <div className="order-1 flex-1 md:order-2">
            <AnimatedSummaryCard />
          </div>
        </div>
      </section>
      <WaitingListDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
