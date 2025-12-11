import { Link } from "@tanstack/react-router";
import { Badge } from "../ui/badge";
import { Check, GitBranch, X } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { TextSkeletonAnimation } from "../skeletons/text-skeleton-animation";
import { formatDistance } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ExtractAsyncIterableValue, trpcOut } from "@/integrations/trpc/types";
import { cn } from "@/lib/utils";
import Markdown from "markdown-to-jsx/react";

type SummaryListType = ExtractAsyncIterableValue<trpcOut["summaries"]["list"]>;

export function SummaryCard({
  summary,
}: {
  summary: SummaryListType["data"][number];
}) {
  return (
    <Link
      to={"/summaries/$id"}
      params={{ id: summary.id.toString() }}
      key={summary.id}
      className="flex flex-col gap-3 border border-border rounded-md p-4 cursor-pointer hover:bg-muted/50 transition-colors group"
    >
      <div className="flex items-start justify-between gap-2 border-b border-border pb-2">
        <div className="flex-1 min-w-0 flex items-start gap-2">
          <div className="py-1">
            <GitBranch className="size-3" />
          </div>
          <h2 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-foreground/80 transition-colors">
            {summary.headCommitMessage}
          </h2>
        </div>
        <div className="shrink-0">
          {summary.status === "completed" && (
            <Badge
              variant="secondary"
              className="bg-green-500 text-white dark:bg-green-600 h-6 min-w-6 rounded-full px-1 font-mono tabular-nums"
            >
              <Check className="size-2" />
            </Badge>
          )}
          {summary.status === "failed" && (
            <Badge
              variant="secondary"
              className="bg-red-500 text-white dark:bg-red-600 h-6 min-w-6 rounded-full px-1 font-mono tabular-nums"
            >
              <X className="size-2" />
            </Badge>
          )}
          {summary.status === "pending" && (
            <Badge
              variant="secondary"
              className="bg-yellow-500 text-white dark:bg-yellow-600 h-6 min-w-6 rounded-full px-1 font-mono tabular-nums"
            >
              <Spinner className="size-2" />
            </Badge>
          )}
        </div>
      </div>
      <div className="flex-1 flex items-start">
        {summary.status === "pending" ? (
          <TextSkeletonAnimation />
        ) : summary.status === "completed" ? (
          <div className="text-sm line-clamp-4">
            <Markdown>{summary.summary}</Markdown>
          </div>
        ) : (
          <p
            className={cn(
              "text-sm text-muted-foreground line-clamp-4",
              "text-red-400"
            )}
          >
            {summary.errorMessage}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground whitespace-nowrap">
          {formatDistance(
            new Date(summary.headCommitTimestamp ?? ""),
            new Date(),
            { addSuffix: true }
          )}
        </p>

        <div className="flex items-center gap-2 min-w-0">
          <p className="text-xs text-muted-foreground truncate">
            by {summary.senderName}
          </p>
          <Avatar className="size-5">
            <AvatarImage
              src={summary.senderAvatar ?? undefined}
              alt={summary.senderName ?? undefined}
            />
            <AvatarFallback className="text-xs">
              {summary.senderName?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </Link>
  );
}
