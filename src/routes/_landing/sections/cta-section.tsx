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
            Join the beta
          </p>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Be among the first to automate your delivery workflows
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Our beta users are already transforming how their teams stay
            aligned. Join the waiting list to get early access, lock in
            preferential pricing, and start automating your GitHub summaries as
            soon as we launch.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
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
              <a href="#pricing">View pricing</a>
            </Button>
          </div>
        </div>
      </section>
      <WaitingListDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
