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
			{ enabled: !!selectedOwner },
		),
	);

	const filteredRepositories =
		repositories?.data?.repositories
			?.filter((repository) =>
				repository.name.toLowerCase().includes(search.toLowerCase()),
			)
			.sort(
				(a, b) =>
					(b.created_at ? new Date(b.created_at as string).getTime() : 0) -
					(a.created_at ? new Date(a.created_at as string).getTime() : 0),
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
						placeholder="Search..."
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
												{repository.name}
												{" · "}
												<span className="text-muted-foreground text-xs">
													{formatDistance(
														new Date(repository.created_at as string),
														new Date(),
														{ addSuffix: true },
													)}
												</span>
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
