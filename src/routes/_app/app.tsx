import { createFileRoute } from "@tanstack/react-router";
import { useSubscription } from "@trpc/tanstack-react-query";
import { useTRPC } from "@/integrations/trpc/react";

export const Route = createFileRoute("/_app/app")({
	component: RouteComponent,
});

function RouteComponent() {
	const trpc = useTRPC();
	const subscription = useSubscription(
		trpc.summaries.list.subscriptionOptions(),
	);

	console.log(subscription);
	return (
		<div>
			{subscription.data?.map((summary) => (
				<div key={summary.id}>
					<h1>{summary.headCommitMessage}</h1>
					{/* <p>{summary.summary}</p> */}
					<p>{summary.status}</p>
				</div>
			))}
		</div>
	);
}
