import { Card, CardContent, CardHeader } from "#components/ui/card";
import { Skeleton } from "#components/ui/skeleton";

const SKELETON_CARD_COUNT = 8;

export function NoMusicGridSkeleton() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 pb-40 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
        <Card key={index} className="w-full overflow-hidden bg-card">
          <CardHeader className="aspect-square bg-card p-0" />

          <CardContent className="space-y-2 p-3 md:space-y-2.5 md:p-4">
            <Skeleton className="h-4 w-4/5 bg-muted/80" />
            <Skeleton className="h-3 w-3/5 bg-muted/70" />
            <Skeleton className="h-3 w-2/5 bg-muted/70" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
