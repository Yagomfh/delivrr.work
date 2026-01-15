import { createFileRoute } from "@tanstack/react-router";
import { MainCard } from "@/components/cards/main-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDistance, format } from "date-fns";
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  Sparkles,
  ArrowRight,
  Loader2,
  Settings,
  X,
} from "lucide-react";

const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_app/settings/_settings/billing")({
  head: () => ({
    meta: [
      {
        title: "Billing & Subscription | delivrr.work",
      },
      {
        name: "description",
        content:
          "Manage your subscription, billing information, and view available plans.",
      },
      {
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/settings/billing`,
      },
    ],
  }),
  component: RouteComponent,
});

const PLANS = [
  {
    name: "hobby",
    displayName: "Hobby",
    description: "Perfect for personal projects",
    icon: Zap,
    limits: {
      summaries: 10,
      summarySizeInKB: 500,
    },
  },
  {
    name: "pro",
    displayName: "Pro",
    description: "For professional use",
    icon: Sparkles,
    limits: {
      summaries: 100,
      summarySizeInKB: 1000,
    },
  },
] as const;

type SubscriptionData = {
  plan: "hobby" | "pro";
  status: string;
  periodEnd?: string | Date;
  trialEnd?: string | Date;
  cancelAtPeriodEnd?: boolean;
  stripeSubscriptionId?: string;
};

function RouteComponent() {
  // Mock subscription data - replace with your own data source
  const subscription: SubscriptionData | null = null; // Set to null for no subscription, or provide mock data
  const isLoading = false;

  const getStatusBadge = (status?: string | null) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="default"
            className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
          >
            <CheckCircle2 className="size-3" />
            Active
          </Badge>
        );
      case "trialing":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
          >
            <Clock className="size-3" />
            Trial
          </Badge>
        );
      case "canceled":
      case "incomplete":
      case "past_due":
        return (
          <Badge
            variant="destructive"
            className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
          >
            <XCircle className="size-3" />
            {status === "past_due" ? "Past Due" : "Inactive"}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Clock className="size-3" />
            {status || "No Subscription"}
          </Badge>
        );
    }
  };

  const currentPlan = subscription
    ? PLANS.find((p) => p.name === (subscription as SubscriptionData).plan)
    : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Current Subscription */}
      <MainCard.Root className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 border border-primary/20">
                <CreditCard className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Current Plan</h3>
                <p className="text-xs text-muted-foreground">
                  Manage your subscription and billing
                </p>
              </div>
            </div>
            {isLoading ? (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            ) : (
              getStatusBadge(
                subscription ? (subscription as SubscriptionData).status : null
              )
            )}
          </div>

          <Separator />

          {isLoading ? (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">
                Loading subscription...
              </p>
            </div>
          ) : subscription ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {currentPlan && (
                    <>
                      {(() => {
                        const Icon = currentPlan.icon;
                        return (
                          <Icon className="size-5 text-muted-foreground mt-0.5 shrink-0" />
                        );
                      })()}
                      <div>
                        <p className="text-sm font-medium">
                          {currentPlan.displayName} Plan
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {currentPlan.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {(subscription as SubscriptionData).periodEnd && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  <span>
                    {(subscription as SubscriptionData).cancelAtPeriodEnd
                      ? "Cancels on "
                      : "Renews on "}
                    {format(
                      new Date((subscription as SubscriptionData).periodEnd!),
                      "MMM d, yyyy"
                    )}
                  </span>
                </div>
              )}

              {(subscription as SubscriptionData).trialEnd && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  <span>
                    Trial ends{" "}
                    {formatDistance(
                      new Date((subscription as SubscriptionData).trialEnd!),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>
                </div>
              )}

              <Separator />

              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="w-fit">
                  <Settings className="size-4" />
                  Manage Billing
                </Button>
                {(subscription as SubscriptionData).status === "active" &&
                  !(subscription as SubscriptionData).cancelAtPeriodEnd && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-fit text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="size-4" />
                      Cancel Subscription
                    </Button>
                  )}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                No active subscription
              </p>
              <p className="text-xs text-muted-foreground">
                Choose a plan below to get started
              </p>
            </div>
          )}
        </div>
      </MainCard.Root>

      {/* Available Plans */}
      <MainCard.Root className="p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-semibold">Available Plans</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Choose the plan that fits your needs
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              const isCurrentPlan =
                subscription &&
                (subscription as SubscriptionData).plan === plan.name &&
                (subscription as SubscriptionData).status === "active";

              return (
                <div
                  key={plan.name}
                  className="flex flex-col gap-4 p-4 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 border border-primary/20">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          {plan.displayName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                    {isCurrentPlan && (
                      <Badge variant="secondary" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Summaries:</span>
                      <span className="font-medium text-foreground">
                        {plan.limits.summaries}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Summary Size:</span>
                      <span className="font-medium text-foreground">
                        {plan.limits.summarySizeInKB} KB
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-2">
                    <Button
                      variant={isCurrentPlan ? "outline" : "default"}
                      size="sm"
                      disabled={!!isCurrentPlan}
                      className="w-full"
                    >
                      {isCurrentPlan ? (
                        "Current Plan"
                      ) : (
                        <>
                          Upgrade to {plan.displayName}
                          <ArrowRight className="size-4" />
                        </>
                      )}
                    </Button>
                    {plan.name === "pro" && !isCurrentPlan && (
                      <Button variant="outline" size="sm" className="w-full">
                        Upgrade to Annual
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MainCard.Root>
    </div>
  );
}
