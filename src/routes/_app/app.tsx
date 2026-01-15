import { createFileRoute } from "@tanstack/react-router";
import { useSubscription } from "@trpc/tanstack-react-query";
import { useSelectedProject } from "@/hooks/use-project";
import { useTRPC } from "@/integrations/trpc/react";
import { useState, useEffect } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { PaginationComponent } from "@/components/ui/pagination";
import { PageHeader } from "@/components/headers/page-header";
import { Spinner } from "@/components/ui/spinner";
import { SummaryCard } from "@/components/cards/summary-card";
import { useDebouncedState } from "@tanstack/react-pacer/debouncer";

const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_app/app")({
  head: () => ({
    meta: [
      {
        title: "Summaries Overview | delivrr.work",
      },
      {
        name: "description",
        content:
          "View and manage your GitHub activity summaries. Track pull requests, commits, and project updates in one place.",
      },
      {
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/app`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { id } = useSelectedProject();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useDebouncedState(search, {
    wait: 500,
    enabled: search.length > 2,
  });
  const [page, setPage] = useState(1);
  const subscription = useSubscription(
    trpc.summaries.list.subscriptionOptions(
      {
        projectId: id as number,
        search: debouncedSearch.trim() || undefined,
        page,
      },
      {
        enabled: !!id,
      }
    )
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const summaries = subscription.data?.data ?? [];
  const totalPages = subscription.data?.totalPages ?? 0;
  const total = subscription.data?.total ?? 0;

  return (
    <div className="flex flex-col gap-4 h-full">
      <PageHeader title="Overview" description="Manage your summaries" />
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setDebouncedSearch(e.target.value);
          }}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">{total} results</InputGroupAddon>
      </InputGroup>
      {subscription.data === undefined && (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      )}
      {summaries.length === 0 && subscription.data !== undefined && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">No summaries found</p>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {summaries.map((summary, idx) => (
          <SummaryCard key={summary.id ?? idx} summary={summary} />
        ))}
      </div>
      <PaginationComponent
        page={page}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}
