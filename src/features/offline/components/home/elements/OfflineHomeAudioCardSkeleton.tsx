import { Skeleton } from "#components/ui/skeleton";

export function OfflineHomeAudioCardSkeleton() {
  return (
    <div className="w-full space-y-2">
      <Skeleton className="aspect-square w-full rounded-xl" />

      <div className="space-y-1 px-0.5">
        <Skeleton className="h-3.5 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
      </div>
    </div>
  );
}
