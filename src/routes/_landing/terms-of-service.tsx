import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/terms-of-service")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_landing/terms-of-service"!</div>;
}
