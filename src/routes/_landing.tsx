import { landingMiddleware } from "@/integrations/better-auth/middlewares";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing")({
  component: RouteComponent,
  server: {
    middleware: [landingMiddleware],
  },
});

function RouteComponent() {
  return <Outlet />;
}
