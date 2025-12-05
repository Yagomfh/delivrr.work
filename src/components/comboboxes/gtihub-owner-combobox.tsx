import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useTRPC } from "@/integrations/trpc/react";
import { cn } from "@/lib/utils";

export function GithubOwnerCombobox({
	value,
	onChange,
	className,
}: {
	value: string | null;
	onChange: (value: string | null) => void;
	className?: string;
}) {
	const trpc = useTRPC();
	const owners = useQuery(trpc.github.authorizedOwners.queryOptions());
	const [search, setSearch] = useState("");
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!value && owners.data?.length && owners.data.length > 0) {
			onChange(owners.data[0].installationId ?? null);
		}
	}, [owners.data, value, onChange]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn("justify-between", className)}
				>
					{value
						? (owners.data?.find((owner) => owner.installationId === value)
								?.ownerLogin ?? "Select account...")
						: "Select account..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput
						placeholder="Search framework..."
						className="h-9"
						value={search}
						onValueChange={setSearch}
					/>
					<CommandList>
						<CommandEmpty>No account found.</CommandEmpty>
						<CommandGroup>
							{owners.data
								?.filter((owner) =>
									owner.ownerLogin
										?.toLowerCase()
										.includes(search.toLowerCase()),
								)
								.map((owner) => (
									<CommandItem
										key={owner.installationId}
										value={owner.ownerLogin ?? ""}
										onSelect={(currentValue) => {
											onChange(
												currentValue === value
													? null
													: (owners.data?.find(
															(owner) => owner.ownerLogin === currentValue,
														)?.installationId ?? null),
											);
											setOpen(false);
										}}
									>
										{owner.ownerLogin}
										<Check
											className={cn(
												"ml-auto",
												value === owner.ownerLogin
													? "opacity-100"
													: "opacity-0",
											)}
										/>
									</CommandItem>
								))}
							<CommandItem>
								<Plus />
								<a href="/api/installations/github/new">Add Github Account</a>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
