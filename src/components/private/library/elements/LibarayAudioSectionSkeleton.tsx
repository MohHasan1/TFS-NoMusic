import { Skeleton } from "#components/ui/skeleton";

const SKELETON_ROW_COUNT = 5;

export function LibarayAudioSectionSkeleton() {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <div className="grid grid-cols-[22px_minmax(0,1fr)_44px] items-center gap-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35 md:grid-cols-[40px_minmax(0,1fr)_minmax(120px,180px)_56px] md:gap-4 md:px-4">
          <span>#</span>
          <span>Title</span>
          <span className="hidden md:block">Artist</span>
          <span className="text-right">Time</span>
        </div>

        <div className="space-y-1.5">
          {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[22px_minmax(0,1fr)_44px] items-center gap-3 rounded-3xl px-3 py-3 md:grid-cols-[40px_minmax(0,1fr)_minmax(120px,180px)_56px] md:gap-4 md:px-4"
            >
              <Skeleton className="h-4 w-4 bg-white/8" />
              <div className="flex min-w-0 items-center gap-3">
                <Skeleton className="size-10 rounded-xl bg-white/8 md:size-11" />
                <div className="min-w-0 space-y-2">
                  <Skeleton className="h-4 w-32 bg-white/8" />
                  <Skeleton className="h-3 w-20 bg-white/6 md:hidden" />
                </div>
              </div>
              <Skeleton className="hidden h-4 w-24 bg-white/6 md:block" />
              <Skeleton className="ml-auto h-4 w-10 bg-white/8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
