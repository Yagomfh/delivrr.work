import { summaries } from "@/db/schema";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";
import { BadgeXIcon, BadgeCheckIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function StatusBadge({
  status,
}: {
  status?: (typeof summaries.$inferSelect)["status"];
}) {
  return (
    <div className=" flex-1 flex flex-col justify-center items-start">
      {status === "completed" && (
        <Badge
          variant="secondary"
          className="bg-green-500 text-white dark:bg-green-600"
        >
          <BadgeCheckIcon />
          Completed
        </Badge>
      )}

      {status === "failed" && (
        <Badge
          variant="secondary"
          className="bg-red-500 text-white dark:bg-red-600"
        >
          <BadgeXIcon />
          Failed
        </Badge>
      )}
      {status === "pending" && (
        <Badge
          variant="secondary"
          className="bg-yellow-500 text-white dark:bg-yellow-600"
        >
          <Spinner />
          Generating
        </Badge>
      )}
    </div>
  );
}
