import { settingsItems } from "@/navigation/sidebar/settings-items";
import { createFileRoute } from "@tanstack/react-router";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/headers/page-header";

export const Route = createFileRoute("/_app/settings/_settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const isMobile = useIsMobile();
  const location = useLocation();

  const activeItem =
    settingsItems.find((item) => location.pathname === item.url) ||
    settingsItems[0];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings and set e-mail preferences."
      />
      <div className={cn("flex gap-4", isMobile && "flex-col")}>
        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  {activeItem.icon && <activeItem.icon className="size-4" />}
                  {activeItem.title}
                </span>
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
              {settingsItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <DropdownMenuItem key={item.url} asChild>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-2",
                        isActive && "bg-accent"
                      )}
                    >
                      {item.icon && <item.icon className="size-4" />}
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex flex-col gap-2 p-2 rounded-md border border-border min-w-48">
            {settingsItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <Link
                  key={item.url}
                  to={item.url}
                  className={cn(
                    "hover:bg-accent text-sm p-2 rounded-sm flex items-center gap-2",
                    isActive && "bg-accent"
                  )}
                >
                  {item.icon && <item.icon className="size-4" />}
                  {item.title}
                </Link>
              );
            })}
          </div>
        )}
        <div className="flex-1 p-2 rounded-md border border-border">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
