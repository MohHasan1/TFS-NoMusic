import { Card, CardContent, CardHeader } from "#components/ui/card";
import { Skeleton } from "#components/ui/skeleton";

type TProps = {
  count?: number;
};

export function OfflineCardGridSkeleton({ count = 8 }: TProps) {
  const skeletonCardKeys = Array.from({ length: count }, (_, index) => `card-${index + 1}`);

  return (
    <div className="grid w-full grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {skeletonCardKeys.map((key) => (
        <Card key={key} className="w-full overflow-hidden bg-card">
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
