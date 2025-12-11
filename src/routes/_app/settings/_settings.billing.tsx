import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/settings/_settings/billing")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>This is supposed to be the billing page</div>;
}
