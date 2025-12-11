import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useSession } from "@/integrations/better-auth/auth-client";
import { useEffect } from "react";

export const Route = createFileRoute("/_landing/")({ component: App });

function App() {
  const { data: session } = useSession();
  const navigate = Route.useNavigate();

  useEffect(() => {
    if (session?.user) {
      navigate({ to: "/app" });
    }
  }, [session?.user, navigate]);

  return (
    <div>
      <Button asChild>
        <Link to="/app">Go to app</Link>
      </Button>
    </div>
  );
}
