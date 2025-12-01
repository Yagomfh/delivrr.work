import { Button } from "@/components/ui/button";
import { signOut } from "@/integrations/better-auth/auth-client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/app")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Button onClick={async () => await signOut()}>Sign out</Button>;
}
