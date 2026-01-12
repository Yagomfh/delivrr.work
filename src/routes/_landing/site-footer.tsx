import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background py-6 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="order-2 sm:order-1">
          © {new Date().getFullYear()} Delivrr Work. All rights reserved.
        </p>
        <div className="order-1 flex items-center gap-4 sm:order-2">
          <Link
            to="/privacy-policy"
            className="hover:text-foreground transition"
          >
            Privacy
          </Link>
          <Link
            to="/terms-of-service"
            className="hover:text-foreground transition"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
