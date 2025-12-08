import {
  LayoutDashboard,
  ChartBar,
  type LucideIcon,
  Settings,
  Zap,
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
    label: "Summaries",
    items: [
      {
        title: "Overview",
        url: "/app",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics",
        url: "/dashboard/crm",
        icon: ChartBar,
      },
      {
        title: "Settings",
        url: "/dashboard/finance",
        icon: Settings,
      },
      {
        title: "Integrations",
        url: "/dashboard/coming-soon",
        icon: Zap,
      },
    ],
  },
  
];