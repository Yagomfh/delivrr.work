import * as React from "react";

import { LayoutDashboard, ChartBar, Search, Settings, Zap, Bell, User, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useNavigate } from "@tanstack/react-router";

const searchItems = [
  { group: "Summaries", icon: LayoutDashboard, label: "Overview", to: "/app" },
  { group: "Summaries", icon: ChartBar, label: "Analytics", to: "/analytics" },
  { group: "Summaries", icon: Settings, label: "Settings", to: "/settings" },
  { group: "Summaries", icon: Zap, label: "Integrations", to: "/integrations" },
  { group: "Alerts", icon: Bell, label: "Notifications", to: "/notifications" },
  { group: "Settings", icon: User, label: "Profile", to: "/profile" },
  { group: "Settings", icon: CreditCard, label: "Billing", to: "/billing" },
];

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="link"
        className="text-muted-foreground px-0! font-normal hover:no-underline"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        Search
        <kbd className="bg-muted inline-flex h-5 items-center gap-1 rounded border px-1.5 text-[10px] font-medium select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search dashboards, users, and more…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {[...new Set(searchItems.map((item) => item.group))].map((group, i) => (
            <React.Fragment key={group}>
              {i !== 0 && <CommandSeparator />}
              <CommandGroup heading={group} key={group}>
                {searchItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <CommandItem className="py-1.5!" key={item.label} onSelect={() => {
                      setOpen(false);
                      navigate({ to: item.to });
                    }}>
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}