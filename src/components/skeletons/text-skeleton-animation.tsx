import { Skeleton } from "../ui/skeleton";

export function TextSkeletonAnimation() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Skeleton
        className="h-4 w-0"
        style={{
          animation: "skeleton-grow-line-1 3.2s ease-in-out infinite",
        }}
      />
      <Skeleton
        className="h-4 w-0"
        style={{
          animation: "skeleton-grow-line-2 3.2s ease-in-out infinite",
        }}
      />
      <Skeleton
        className="h-4 w-0"
        style={{
          animation: "skeleton-grow-line-3 3.2s ease-in-out infinite",
        }}
      />
    </div>
  );
}
