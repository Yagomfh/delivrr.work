import { FileRoutesByTo } from "@/routeTree.gen";
import { CircleUser, LucideIcon, CreditCard } from "lucide-react";

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
    title: "Billing",
    url: "/settings/billing",
    icon: CreditCard,
  },
];
