/** biome-ignore-all lint/correctness/noChildrenProp: this is a valid use case */

import { useQuery } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import { CheckIcon, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { useTRPC } from "@/integrations/trpc/react";
import { GithubOwnerCombobox } from "../comboboxes/gtihub-owner-combobox";
import { Skeleton } from "../ui/skeleton";

export function GithubRepoField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const trpc = useTRPC();
  const [selectedOwner, setSelectedOwner] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const repositories = useQuery(
    trpc.github.authorizedRepositories.queryOptions(
      {
        installationId: selectedOwner ?? "",
      },
      { enabled: !!selectedOwner }
    )
  );

  const filteredRepositories =
    repositories?.data?.repositories
      ?.filter((repository) =>
        repository.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort(
        (a, b) =>
          (b.created_at ? new Date(b.created_at as string).getTime() : 0) -
          (a.created_at ? new Date(a.created_at as string).getTime() : 0)
      )
      .slice(0, 5) ?? [];

  return (
    <FieldGroup>
      <FieldGroup className="flex flex-row gap-4">
        <GithubOwnerCombobox
          className="flex-1"
          value={selectedOwner}
          onChange={setSelectedOwner}
        />
        <InputGroup className="flex-1">
          <InputGroupInput
            placeholder="Search repository..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {filteredRepositories.length} results
          </InputGroupAddon>
        </InputGroup>
      </FieldGroup>

      <FieldGroup>
        <FieldGroup className="flex flex-col gap-4">
          {repositories.isFetching && (
            <ItemGroup className="rounded-md border border-border">
              {Array.from({ length: 5 }).map((_, index) => (
                <>
                  {index !== 0 && <ItemSeparator />}
                  <Item key={`loading-${Math.random()}`}>
                    <ItemContent>
                      <ItemTitle>
                        <Skeleton className="h-4 w-[150px]" />
                        {" · "}
                        <Skeleton className="h-4 w-[50px]" />
                      </ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <Button
                        variant={"outline"}
                        type="button"
                        size="sm"
                        disabled
                      >
                        Select
                      </Button>
                    </ItemActions>
                  </Item>
                </>
              ))}
            </ItemGroup>
          )}
          {filteredRepositories.length > 0 && !repositories.isFetching && (
            <ItemGroup className="rounded-md border border-border">
              {filteredRepositories.map((repository, index) => (
                <>
                  {index !== 0 && <ItemSeparator />}
                  <Item key={repository.id}>
                    <ItemContent>
                      <ItemTitle>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                        </svg>
                        {repository.name}
                        {" · "}
                        <p className="text-muted-foreground text-xs text-left">
                          {formatDistance(
                            new Date(repository.created_at as string),
                            new Date(),
                            { addSuffix: true }
                          )}
                        </p>
                      </ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <Button
                        variant={
                          value === repository.full_name ? "default" : "outline"
                        }
                        type="button"
                        size="sm"
                        onClick={() =>
                          onChange(repository.full_name ?? repository.name)
                        }
                      >
                        {value === repository.full_name && (
                          <CheckIcon className="size-4" />
                        )}
                        {value === repository.full_name ? "Selected" : "Select"}
                      </Button>
                    </ItemActions>
                  </Item>
                </>
              ))}
            </ItemGroup>
          )}
        </FieldGroup>
      </FieldGroup>
    </FieldGroup>
  );
}
