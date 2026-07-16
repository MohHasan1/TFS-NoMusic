import { Skeleton } from "#components/ui/skeleton";

export function OfflineHomeLibRowSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-border/70 bg-card/70 p-4 md:gap-5 md:p-5">
      <Skeleton className="size-20 shrink-0 rounded-2xl md:size-24" />

      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-2.5 w-16" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>

      <Skeleton className="size-6 shrink-0 rounded-full" />
    </div>
  );
}
