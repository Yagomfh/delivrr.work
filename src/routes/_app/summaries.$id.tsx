import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { formatDistance } from "date-fns";
import { BadgeCheckIcon, BadgeXIcon, Copy, GitBranch } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useSelectedProject } from "@/hooks/use-project";
import { useTRPC } from "@/integrations/trpc/react";
import Markdown from "markdown-to-jsx";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_app/summaries/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { id } = Route.useParams();
  const { id: projectId } = useSelectedProject();
  const { data: summary, isPending } = useQuery(
    trpc.summaries.get.queryOptions(
      {
        id: Number(id),
        projectId: projectId as number,
      },
      {
        enabled: !!id && !!projectId,
      }
    )
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 p-4 justify-between border border-border rounded-md">
        <div className=" flex-1 flex flex-col justify-center items-start">
          {summary?.status === "completed" && (
            <Badge
              variant="secondary"
              className="bg-green-500 text-white dark:bg-green-600"
            >
              <BadgeCheckIcon />
              Completed
            </Badge>
          )}

          {summary?.status === "failed" && (
            <Badge
              variant="secondary"
              className="bg-red-500 text-white dark:bg-red-600"
            >
              <BadgeXIcon />
              Failed
            </Badge>
          )}
          {summary?.status === "pending" && (
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
            href={summary?.commitUrl}
            className="text-sm font-medium"
            target="_blank"
          >
            {summary?.headCommitMessage}
          </a>
        </div>
        <div className=" flex-1 flex flex-row gap-2 items-center justify-end">
          <p className="text-sm text-muted-foreground">
            {formatDistance(
              new Date(summary?.headCommitTimestamp ?? 0),
              new Date(),
              { addSuffix: true }
            )}{" "}
            by {summary?.senderName}
          </p>
          <Avatar>
            <AvatarImage
              src={summary?.senderAvatar ?? undefined}
              alt={summary?.senderName ?? undefined}
            />
            <AvatarFallback>{summary?.senderName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="markdown-content p-4 border border-border rounded-md relative">
        <Button
          size={"icon"}
          variant={"ghost"}
          className="absolute top-2 right-2"
          disabled={isPending}
          onClick={() => {
            navigator.clipboard.writeText(summary?.summary ?? "");
            toast.success("Copied to clipboard");
          }}
        >
          <Copy className="size-4" />
        </Button>
        {isPending && (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}
        <Markdown
          options={{
            overrides: {
              h1: {
                props: {
                  className:
                    "text-3xl font-bold mt-8 mb-4 pb-2 border-b border-border",
                },
              },
              h2: {
                props: {
                  className: "text-2xl font-bold mt-6 mb-3",
                },
              },
              h3: {
                props: {
                  className: "text-xl font-semibold mt-5 mb-2",
                },
              },
              h4: {
                props: {
                  className: "text-lg font-semibold mt-4 mb-2",
                },
              },
              h5: {
                props: {
                  className: "text-base font-semibold mt-3 mb-2",
                },
              },
              h6: {
                props: {
                  className: "text-sm font-semibold mt-3 mb-2",
                },
              },
              p: {
                props: {
                  className: "my-4 leading-7",
                },
              },
              a: {
                props: {
                  className:
                    "text-primary underline underline-offset-4 hover:text-primary/80",
                },
              },
              ul: {
                props: {
                  className: "list-disc list-outside my-4 ml-6 space-y-2",
                },
              },
              ol: {
                props: {
                  className: "list-decimal list-outside my-4 ml-6 space-y-2",
                },
              },
              li: {
                props: {
                  className: "pl-2",
                },
              },
              blockquote: {
                props: {
                  className:
                    "border-l-4 border-border pl-4 my-4 italic text-muted-foreground",
                },
              },
              code: {
                props: {
                  className:
                    "bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground",
                },
              },
              pre: {
                props: {
                  className: "bg-muted p-4 rounded-md my-4 overflow-x-auto",
                },
              },
              hr: {
                props: {
                  className: "my-8 border-t border-border",
                },
              },
              strong: {
                props: {
                  className: "font-bold",
                },
              },
              em: {
                props: {
                  className: "italic",
                },
              },
              img: {
                props: {
                  className: "my-4 rounded-md max-w-full h-auto",
                },
              },
              table: {
                props: {
                  className: "w-full my-4 border-collapse",
                },
              },
              thead: {
                props: {
                  className: "bg-muted",
                },
              },
              tbody: {
                props: {
                  className: "divide-y divide-border",
                },
              },
              tr: {
                props: {
                  className: "border-b border-border",
                },
              },
              th: {
                props: {
                  className: "px-4 py-2 text-left font-semibold",
                },
              },
              td: {
                props: {
                  className: "px-4 py-2",
                },
              },
            },
          }}
        >
          {summary?.summary ?? ""}
        </Markdown>
      </div>
    </div>
  );
}
