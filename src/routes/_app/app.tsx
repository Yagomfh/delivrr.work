import { createFileRoute } from "@tanstack/react-router";
import { useSubscription } from "@trpc/tanstack-react-query";
import Markdown from "markdown-to-jsx/react";
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
					<Markdown
						options={{
							overrides: {
								p: { component: "p" },
								h1: { component: "h1" },
								h2: { component: "h2" },
								h3: { component: "h3" },
								h4: { component: "h4" },
								h5: { component: "h5" },
								h6: { component: "h6" },
								ul: { component: "ul" },
								ol: { component: "ol" },
								li: { component: "li" },
								blockquote: { component: "blockquote" },
								code: { component: "code" },
								pre: { component: "pre" },
								img: { component: "img" },
								a: { component: "a" },
								strong: { component: "strong" },
							},
						}}
					>
						{summary.summary}
					</Markdown>
					<p>{summary.status}</p>
				</div>
			))}
		</div>
	);
}
