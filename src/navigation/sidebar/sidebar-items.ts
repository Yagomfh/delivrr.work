import {
  LayoutDashboard,
  type LucideIcon,
  Settings,
  Folder,
  Zap,
  ListTodo,
  Box,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "",
    items: [
      {
        title: "Overview",
        url: "/app",
        icon: LayoutDashboard,
      },
      {
        title: "Commitments",
        url: "/config",
        icon: ListTodo,
      },
    ],
  },
  {
    id: 2,
    label: "Workspace",
    items: [
      {
        title: "Projects",
        url: "/settings/account",
        icon: Box,
      },
      {
        title: "Integrations",
        url: "/integrations",
        icon: Zap,
      },
    ],
  },
];
