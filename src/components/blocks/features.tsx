import { Zap, Mail, Search, Settings } from "lucide-react";

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="border-b border-border/60 bg-muted/40 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
            Why Delivrr
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Automate work delivery
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            We turn raw commits, pull requests, and deployment events into
            readable summaries that non-engineers can follow, and engineers can
            skim in seconds.
          </p>
        </div>

        <div className="relative mb-12 rounded-3xl p-3 md:-mx-8">
          <div className="relative aspect-[88/36]">
            <div className="absolute inset-0 z-1 bg-gradient-to-t from-background to-transparent"></div>
            <img
              src="/dashboard.png"
              className="absolute inset-0 z-0"
              alt="Delivrr email summary illustration"
              width={"100%"}
            />
            <img
              src="/dashboard-dark.png"
              className="hidden dark:block absolute inset-0"
              alt="Delivrr email summary illustration dark"
              width={"100%"}
            />
            <img
              src="/dashboard.png"
              className="dark:hidden absolute inset-0"
              alt="Delivrr email summary illustration light"
              width={"100%"}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Zap}
            title="Automated delivery workflows"
            description="Configure automated delivery pipelines for internal teams or external stakeholders. Event-driven distribution ensures stakeholders receive updates without manual intervention."
          />
          <FeatureCard
            icon={Mail}
            title="Automatic multi-channel delivery"
            description="When a summary is generated, it's automatically delivered via your chosen channel—email distribution lists or Slack channels. Configure once and every summary ships to your selected recipients."
          />
          <FeatureCard
            icon={Search}
            title="Semantic search engine"
            description="Query your delivery history with full-text search capabilities. Verify feature deployment status and track delivery artifacts across your entire project timeline."
          />
          <FeatureCard
            icon={Settings}
            title="Configurable AI parameters"
            description="Fine-tune summary generation through parameterized prompts. Customize tone, verbosity, and technical depth to align with your organization's communication standards."
          />
        </div>
      </div>
    </section>
  );
}
