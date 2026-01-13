import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { WaitingListDialog } from "@/components/dialogs/waiting-list-dialog";

export function PricingSection() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <section
        id="pricing"
        className="border-b border-border/60 bg-muted/30 py-12 sm:py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-3 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
              Pricing
            </p>
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Simple pricing that scales with your team
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              Our beta users have been loving Delivrr. Join the waiting list to
              get early access and lock in preferential pricing when we launch.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {/* Free Tier */}
            <div className="flex flex-col gap-6 rounded-2xl border border-border bg-background/80 p-6 shadow-sm shadow-black/5">
              <div>
                <h3 className="text-lg font-semibold">Free</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Perfect for small teams and side projects
                </p>
              </div>

              <div className="flex items-end gap-1">
                <span className="text-3xl font-semibold tracking-tight">
                  $0
                </span>
                <span className="mb-1 text-xs text-muted-foreground">
                  /month
                </span>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Up to 25 summaries per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Max commit payload size: 1MB</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Connect 1 GitHub repository</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Email delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Basic AI summaries</span>
                </li>
              </ul>

              <Button
                variant="outline"
                className="mt-auto w-full"
                onClick={() => setDialogOpen(true)}
              >
                Join the waitlist
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>

            {/* Pro Tier */}
            <div className="relative flex flex-col gap-6 rounded-2xl border-2 border-primary bg-background p-6 shadow-sm shadow-black/5">
              <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                Most Popular
              </div>

              <div>
                <h3 className="text-lg font-semibold">Pro</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  For teams that need unlimited automation
                </p>
              </div>

              <div className="flex items-end gap-1">
                <span className="text-3xl font-semibold tracking-tight">
                  $24
                </span>
                <span className="mb-1 text-xs text-muted-foreground">
                  /month
                </span>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>1000 summaries per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Max commit payload size: 10MB</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Unlimited GitHub repositories</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Email & Slack delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Advanced AI configuration</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Semantic search & history</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Automated delivery workflows</span>
                </li>
              </ul>

              <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">
                  Beta users get 20% off forever
                </p>
                <p className="mt-1">
                  Join the waiting list now to lock in preferential pricing when
                  we launch.
                </p>
              </div>

              <Button
                className="mt-auto w-full"
                onClick={() => setDialogOpen(true)}
              >
                Join the waitlist
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              All plans include cancel anytime, no lock-in. Beta users who join
              the waiting list will receive early access and special pricing.
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Summaries are subject to a reasonable commit payload size limit to
              keep performance fast, very large pull requests may be skipped.
            </p>
          </div>
        </div>
      </section>
      <WaitingListDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
