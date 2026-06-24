import { Skeleton } from "#components/ui/skeleton";

export function NoMusicLanguageFilterSkeleton() {
  return (
    <section className="flex justify-center">
      <Skeleton className="h-9 w-60 rounded-full md:w-52" />
    </section>
  );
}
