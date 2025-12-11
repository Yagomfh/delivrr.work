import { FileRoutesByTo } from "@/routeTree.gen";
import { CircleUser, LucideIcon, CreditCard, Shield } from "lucide-react";

type Item = {
  title: string;
  url: keyof FileRoutesByTo;
  icon: LucideIcon;
};

export const settingsItems: Item[] = [
  {
    title: "Account",
    url: "/settings/account",
    icon: CircleUser,
  },
  {
    title: "Security",
    url: "/settings/security",
    icon: Shield,
  },
  {
    title: "Billing",
    url: "/settings/billing",
    icon: CreditCard,
  },
];
