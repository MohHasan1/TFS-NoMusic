import { BrandLogo } from "#components/shared/BrandLogo";
import { LoadingCatTablet } from "#components/shared/LoadingCatTablet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Skeleton } from "#components/ui/skeleton";

export function NoMusicContentSkeleton() {
  return (
    <section
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="relative w-full overflow-hidden pb-40"
    >
      <Card className="relative overflow-hidden rounded-4xl border-primary-400/20 bg-card/75 p-5 backdrop-blur-xl md:p-7">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/12 via-transparent to-primary-600/10" />
        <div className="pointer-events-none absolute -left-10 top-10 size-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 size-44 rounded-full bg-primary-400/10 blur-3xl" />

        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
          <CardHeader className="min-w-0 gap-2 p-0 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <BrandLogo className="hidden text-lg md:flex" />
            </div>

            <CardTitle className="text-2xl tracking-tight md:text-3xl">
              Loading the collection
            </CardTitle>

            <CardDescription>
              Server cat is sorting the queue and lining up your next batch.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <LoadingCatTablet contentClassName="p-4">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="aspect-square w-full rounded-[1.25rem] bg-muted/70"
                  />
                ))}
              </div>
            </LoadingCatTablet>
          </CardContent>
        </div>

        <span className="sr-only">Loading NoMusic collection...</span>
      </Card>
    </section>
  );
}
