import { authClient, useSession } from "@/integrations/better-auth/auth-client";
import { FileRoutesByTo } from "@/routeTree.gen";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      redirect: z.string().default("/app"),
    })
  ),
  beforeLoad: async ({ search }) => {
    const session = await authClient.getSession();
    if (session.data) {
      throw redirect({ to: search.redirect ?? "/app" });
    }
  },
});

function RouteComponent() {
  const { data: session, isPending } = useSession();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  if (!isPending && session?.user) {
    navigate({ to: search.redirect as keyof FileRoutesByTo });
  }
  return <Outlet />;
}
