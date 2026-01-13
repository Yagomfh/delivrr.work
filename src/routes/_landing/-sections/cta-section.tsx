import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { WaitingListDialog } from "@/components/dialogs/waiting-list-dialog";

export function CtaSection() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <section className="bg-linear-to-b from-background via-background to-muted/50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
            Alpha stage · Early users wanted
          </p>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Help shape Delivrr Work as an early user
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            We&apos;re currently in alpha and onboarding a small group of teams.
            Request early access to try Delivrr Work in your workflow, share
            feedback that shapes the beta, and secure preferential pricing for
            our public launch.
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
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-dashed"
            >
              <a href="#pricing">View pricing</a>
            </Button>
          </div>
        </div>
      </section>
      <WaitingListDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
