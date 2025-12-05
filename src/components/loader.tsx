import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";

export function Loader({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"flex items-center justify-center h-screen w-screen",
				className,
			)}
		>
			<Spinner />
		</div>
	);
}
