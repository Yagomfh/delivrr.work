export function CompaniesSection() {
  return (
    <section
      aria-label="Trusted by modern engineering teams"
      className="border-b border-border/60 bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Built for fast-moving teams
            </p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Delivrr fits neatly into your existing GitHub workflow, no new
              rituals, just better visibility.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground sm:grid-cols-3">
            <span className="rounded-full border border-dashed border-border px-3 py-1.5 text-center">
              Remote-first startups
            </span>
            <span className="rounded-full border border-dashed border-border px-3 py-1.5 text-center">
              Platform teams
            </span>
            <span className="rounded-full border border-dashed border-border px-3 py-1.5 text-center">
              Agencies &amp; consultancies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
