"use client";

import {
	BookOpen,
	Bot,
	Command,
	GalleryVerticalEnd,
	LifeBuoy,
	ScrollText,
	Send,
	Settings2,
	SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ProjectSwitcher } from "../ui/project-switcher";
import { Link } from "@tanstack/react-router";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Summaries",
			url: "/app",
			icon: ScrollText,
			isActive: true,
			items: [
				{
					title: "All",
					url: "/app",
				},
				{
					title: "Settings",
					url: "/settings",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "General",
					url: "#",
				},
				{
					title: "Team",
					url: "#",
				},
				{
					title: "Billing",
					url: "#",
				},
				{
					title: "Limits",
					url: "#",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: GalleryVerticalEnd,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: GalleryVerticalEnd,
			plan: "Free",
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant={"inset"} collapsible={"icon"} {...props}>
      <SidebarHeader className="dark:bg-neutral-900">
        <ProjectSwitcher />
      </SidebarHeader>
      <SidebarContent className="dark:bg-neutral-900">
        <NavMain items={sidebarItems} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter className="dark:bg-neutral-900">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
	);
}
