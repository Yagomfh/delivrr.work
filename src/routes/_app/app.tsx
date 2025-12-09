import { createFileRoute, Link } from "@tanstack/react-router";
import { useSubscription } from "@trpc/tanstack-react-query";
import { formatDistance } from "date-fns";
import { BadgeCheckIcon, BadgeXIcon, GitBranch } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ItemGroup, ItemSeparator } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { useSelectedProject } from "@/hooks/use-project";
import { useTRPC } from "@/integrations/trpc/react";

export const Route = createFileRoute("/_app/app")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { id } = useSelectedProject();
  const subscription = useSubscription(
    trpc.summaries.list.subscriptionOptions(
      { projectId: id as number },
      {
        enabled: !!id,
      }
    )
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Overview</h1>
      {subscription.data?.length === 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">No summaries found</p>
        </div>
      )}
      {subscription?.data?.length && subscription.data.length > 0 && (
        <ItemGroup className="flex flex-col border border-border rounded-md">
          {subscription.data?.map((summary, idx) => (
            <>
              {idx !== 0 && <ItemSeparator />}
              <Link
                to={"/summaries/$id"}
                params={{ id: summary.id.toString() }}
                key={summary.id}
                className="cursor-pointer flex flex-row gap-2 p-4 justify-between hover:bg-muted"
              >
                <div className=" flex-1 flex flex-col justify-center items-start">
                  {summary.status === "completed" && (
                    <Badge
                      variant="secondary"
                      className="bg-green-500 text-white dark:bg-green-600"
                    >
                      <BadgeCheckIcon />
                      Completed
                    </Badge>
                  )}

                  {summary.status === "failed" && (
                    <Badge
                      variant="secondary"
                      className="bg-red-500 text-white dark:bg-red-600"
                    >
                      <BadgeXIcon />
                      Failed
                    </Badge>
                  )}
                  {summary.status === "pending" && (
                    <Badge
                      variant="secondary"
                      className="bg-yellow-500 text-white dark:bg-yellow-600"
                    >
                      <Spinner />
                      Generating
                    </Badge>
                  )}
                </div>
                <div className=" flex-1 flex flex-row gap-1 items-center justify-start">
                  <GitBranch className="size-4" />
                  <a
                    href={summary.commitUrl}
                    className="text-sm font-medium"
                    target="_blank"
                  >
                    {summary.headCommitMessage}
                  </a>
                </div>
                <div className=" flex-1 flex flex-row gap-2 items-center justify-end">
                  <p className="text-sm text-muted-foreground">
                    {formatDistance(
                      new Date(summary.headCommitTimestamp ?? ""),
                      new Date(),
                      { addSuffix: true }
                    )}{" "}
                    by {summary.senderName}
                  </p>
                  <Avatar>
                    <AvatarImage
                      src={summary.senderAvatar ?? undefined}
                      alt={summary.senderName ?? undefined}
                    />
                    <AvatarFallback>
                      {summary.senderName?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </Link>
            </>
          ))}
        </ItemGroup>
      )}
    </div>
  );
}
