import { Card, CardContent, CardHeader } from "#components/ui/card";
import { Skeleton } from "#components/ui/skeleton";

const PAGINATION_SKELETON_IDS = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4"];

// Deliberately no wrapping <div>/grid here — these are meant to be dropped
// directly into NoMusicBrowser's existing grid so they continue the same
// row/column flow as the real cards instead of forming a separate block.
export function NoMusicPaginationSkeleton() {
  return (
    <>
      {PAGINATION_SKELETON_IDS.map((id) => (
        <Card key={id} className="w-full overflow-hidden bg-card">
          <CardHeader className="aspect-square bg-card p-0" />

          <CardContent className="space-y-2 p-3 md:space-y-2.5 md:p-4">
            <Skeleton className="h-4 w-4/5 bg-muted/80" />
            <Skeleton className="h-3 w-3/5 bg-muted/70" />
            <Skeleton className="h-3 w-2/5 bg-muted/70" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
