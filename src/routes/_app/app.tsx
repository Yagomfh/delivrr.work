import { createFileRoute } from "@tanstack/react-router";
import { useSubscription } from "@trpc/tanstack-react-query";
import { useSelectedProject } from "@/hooks/use-project";
import { useTRPC } from "@/integrations/trpc/react";
import { SummaryCard } from "@/components/cards/summary-card";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_app/app")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { id } = useSelectedProject();
  const [search, setSearch] = useState("");
  const subscription = useSubscription(
    trpc.summaries.list.subscriptionOptions(
      { projectId: id as number, search: search.trim() || undefined },
      {
        enabled: !!id,
      }
    )
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Overview</h1>
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {subscription.data?.length} results
        </InputGroupAddon>
      </InputGroup>
      {subscription.data?.length === 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">No summaries found</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subscription.data?.map((summary, idx) => (
          <SummaryCard key={idx} summary={summary} />
        ))}
      </div>
    </div>
  );
}
