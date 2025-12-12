import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ProjectSwitcher } from "../ui/project-switcher";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant={"inset"} collapsible={"icon"} {...props}>
      <SidebarHeader className="dark:bg-neutral-900">
        <ProjectSwitcher />
      </SidebarHeader>
      <SidebarContent className="dark:bg-neutral-900">
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter className="dark:bg-neutral-900">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
