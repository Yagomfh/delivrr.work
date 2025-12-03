import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useSession } from "@/integrations/better-auth/auth-client";

export const Route = createFileRoute("/_app")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session, isPending } = useSession();
	const navigate = Route.useNavigate();

	if (!session?.user && !isPending) {
		navigate({ to: "/sign-in", search: { redirect: location.pathname } });
	}

	return <Outlet />;
}
