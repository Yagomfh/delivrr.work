import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_landing/")({ component: App });

function App() {
  return (
    <div>
      <Button asChild>
        <Link to="/app">Go to app</Link>
      </Button>
    </div>
  );
}
