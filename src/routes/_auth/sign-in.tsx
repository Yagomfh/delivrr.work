import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { signIn } from "@/integrations/better-auth/auth-client";
import { useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/_auth/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const [isPending, startTransition] = useTransition();

  const handleSignIn = async () => {
    startTransition(async () => {
      await signIn.social({
        provider: "github",
        newUserCallbackURL: search.redirect,
        callbackURL: search.redirect,
      });
    });
  };
  return (
    <Button onClick={handleSignIn} disabled={isPending}>
      {isPending ? <Spinner /> : "Sign in with Github"}
    </Button>
  );
}
