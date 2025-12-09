import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { BadgeQuestionMark, ChevronsUpDown, Plus } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSelectedProject } from "@/hooks/use-project";
import { useTRPC } from "@/integrations/trpc/react";

export function ProjectSwitcher() {
  const navigate = useNavigate();
  const trpc = useTRPC();
  const { data } = useQuery(trpc.projects.list.queryOptions());
  const { id, setSelected } = useSelectedProject();
  const { isMobile } = useSidebar();
  const activeProject = data?.find((project) => project.id === id);

  useEffect(() => {
    // If there's no data, set to null if there's an ID
    if (!data || data.length === 0) {
      if (id !== null) {
        setSelected(null);
      }
      return;
    }

    // If there's no ID but project data, select the first
    if (!id) {
      setSelected(data[0].id);
      return;
    }

    // If ID doesn't match with any project, select the first item again
    const projectExists = data.some((project) => project.id === id);
    if (!projectExists) {
      setSelected(data[0].id);
    }
  }, [data, id, setSelected]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {activeProject?.icon ? (
                  <DynamicIcon
                    name={activeProject.icon as never}
                    className="size-4"
                  />
                ) : (
                  <Plus className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeProject?.name || "Create a project"}
                </span>
                <span className="truncate text-xs">
                  {activeProject?.description}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Projects
            </DropdownMenuLabel>
            {data?.map((project, index) => (
              <DropdownMenuItem
                key={project.name}
                onClick={() => setSelected(project.id)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  {project.icon ? (
                    <DynamicIcon
                      name={project.icon as never}
                      className="size-3"
                    />
                  ) : (
                    <BadgeQuestionMark className="size-4" />
                  )}
                </div>
                {project?.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => navigate({ to: "/projects/add" })}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Add project
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
