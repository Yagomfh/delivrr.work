import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Loader } from "@/components/loader";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSession } from "@/integrations/better-auth/auth-client";
import { useTRPC } from "@/integrations/trpc/react";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/sidebar/search-dialog";
import { ThemeSwitcher } from "@/components/sidebar/theme-switcher";
import { NotificationsPopover } from "@/components/popovers/notifications-popover";

export const Route = createFileRoute("/_app")({
	component: RouteComponent,
});

function RouteComponent() {
	const trpc = useTRPC();
	const { data: session, isPending } = useSession();
	const { data: projects, isPending: isProjectsPending } = useQuery(
		trpc.projects.list.queryOptions(),
	);
	const navigate = Route.useNavigate();

	if (!session?.user && !isPending) {
		navigate({ to: "/sign-in", search: { redirect: location.pathname } });
	}

	if (isPending || isProjectsPending) {
		return <Loader />;
	}

	if (!projects?.length) {
		navigate({ to: "/projects/add" });
	}

	return (
		<SidebarProvider className="dark:bg-neutral-900">
			<AppSidebar className="dark:bg-neutral-900" />
			<SidebarInset className={cn(
          "mx-auto! max-w-screen-2xl!",
          // Adds right margin for inset sidebar in centered layout up to 113rem.
          // On wider screens with collapsed sidebar, removes margin and sets margin auto for alignment.
          "max-[113rem]:mr-2! min-[101rem]:peer-data-[state=collapsed]:mr-auto!",
        )}>
				<header
          className={cn(
            "flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
            // Handle sticky navbar style with conditional classes so blur, background, z-index, and rounded corners remain consistent across all SidebarVariant layouts.
            "bg-background/50 sticky top-0 z-50 overflow-hidden rounded-t-[inherit] backdrop-blur-md",
          )}
        >
          <div className="flex w-full items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-1 lg:gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
              <SearchDialog />
            </div>
            <div className="flex items-center gap-2">
							<NotificationsPopover />
              <ThemeSwitcher />
            </div>
          </div>
        </header>
				<div className="h-full p-4 md:p-6">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
