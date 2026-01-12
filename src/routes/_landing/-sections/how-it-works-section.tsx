function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-muted/40 p-4">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border text-[11px] font-mono text-muted-foreground">
        {step}
      </span>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground sm:text-base">
          {title}
        </p>
        <p className="text-xs text-muted-foreground sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-b border-border/60 bg-background py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
            How it works
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Set up automated delivery in minutes
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Configure your delivery pipelines once and let Delivrr handle the
            rest. Event-driven automation ensures stakeholders receive updates
            without manual intervention.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StepCard
            step="01"
            title="Connect repositories"
            description="Connect GitHub repositories and configure project scopes for internal or external delivery."
          />
          <StepCard
            step="02"
            title="Set the tone"
            description="Customize AI parameters to control summary tone, verbosity, and technical depth."
          />
          <StepCard
            step="03"
            title="Configure delivery channels"
            description="Set up email lists or Slack webhooks. Summaries automatically deliver to selected recipients."
          />
          <StepCard
            step="04"
            title="Automate and search"
            description="Summaries generate and deliver automatically on merge or deployment. Search history to verify feature status."
          />
        </div>
      </div>
    </section>
  );
}
