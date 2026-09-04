import { Skeleton } from "#components/ui/skeleton";

export function PlaylistHeroSkeleton() {
  return (
    <section className="relative">
      <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:items-center lg:gap-8">
        <Skeleton className="aspect-square rounded-[1.75rem] border border-white/8 bg-white/8" />

        <div className="space-y-4 lg:space-y-5">
          <div className="space-y-3">
            <Skeleton className="h-10 w-3/5 bg-white/8 sm:h-12" />
            <Skeleton className="h-4 w-full bg-white/6" />
            <Skeleton className="h-4 w-4/5 bg-white/6" />
          </div>

          <Skeleton className="h-4 w-28 bg-white/8" />
        </div>
      </div>
    </section>
  );
}
