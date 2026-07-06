import { Card, CardContent, CardHeader } from "#components/ui/card";
import { Skeleton } from "#components/ui/skeleton";

export function ProfileOverviewSkeleton() {
  return (
    <section>
      <Card className="rounded-4xl border-primary/15 bg-card/80">
        <CardHeader className="p-6 sm:p-8">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
            <Skeleton className="size-64 rounded-4xl sm:size-72" />

            <div className="min-w-0 flex-1 space-y-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-52" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 w-full max-w-lg" />
              <Skeleton className="h-8 w-36 rounded-full" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-3 p-6 pt-0 sm:grid-cols-2 sm:p-8 sm:pt-0">
          <Skeleton className="h-36 rounded-3xl" />
          <Skeleton className="h-36 rounded-3xl" />
        </CardContent>
      </Card>
    </section>
  );
}
