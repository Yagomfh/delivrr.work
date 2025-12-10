import { useSession } from "@/integrations/better-auth/auth-client";
import { FileRoutesByTo } from "@/routeTree.gen";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      redirect: z.string().default("/app"),
    })
  ),
});

function RouteComponent() {
  const { data: session, isPending } = useSession();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  if (!isPending && session?.user) {
    navigate({ to: search.redirect as keyof FileRoutesByTo });
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-accent dark:bg-neutral-900">
      <div className="w-full max-w-sm px-6 py-12 bg-background rounded-lg shadow-lg">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/favicon.svg"
                alt="Delivrr"
                className="w-6 h-6 rounded-xs"
              />
              <span className="text-sm tracking-tight text-foreground/80">
                DELIVRR WORK
              </span>
            </div>
            <h1 className="text-2xl font-medium tracking-tight text-foreground">
              Welcome on board! 🎉
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use GitHub authentication to securely connect with your
              repositories and generate summaries for you.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <Outlet />

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                By continuing, you agree to our{" "}
                <Link
                  to="/terms-of-service"
                  className="text-foreground hover:text-foreground/80 underline underline-offset-4 transition-colors"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="text-foreground hover:text-foreground/80 underline underline-offset-4 transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
