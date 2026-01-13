import { landingMiddleware } from "@/integrations/better-auth/middlewares";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "./_landing/-sections/site-header";
import { SiteFooter } from "./_landing/-sections/site-footer";

export const Route = createFileRoute("/_landing")({
  component: RouteComponent,
  server: {
    middleware: [landingMiddleware],
  },
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <Outlet />
      <SiteFooter />
    </div>
  );
}
