import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { WaitingListDialog } from "@/components/dialogs/waiting-list-dialog";
import { ThemeSwitcher } from "@/components/sidebar/theme-switcher";
import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/60 backdrop-blur-xl backdrop-saturate-150 px-6 py-3 shadow-lg shadow-black/5 dark:shadow-black/20">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/favicon.svg"
                alt="Delivrr Work"
                className="h-8 w-8 rounded-lg"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-tight">
                  Delivrr Work
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
              <a
                href="/#features"
                className="hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="/#how-it-works"
                className="hover:text-foreground transition-colors"
              >
                How it works
              </a>
              <a
                href="/#pricing"
                className="hover:text-foreground transition-colors"
              >
                Pricing
              </a>
              <a
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <Button
                size="sm"
                className="text-xs sm:text-sm"
                onClick={() => setDialogOpen(true)}
              >
                Get started
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <WaitingListDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
