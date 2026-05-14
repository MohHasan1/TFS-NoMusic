import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const VerifyEmailSkeleton = () => {
  return (
    <Card className="w-full sm:max-w-md space-y-5 rounded-2xl bg-white/3 py-6">
      <CardHeader className="space-y-3">
        <Skeleton className="h-8 w-3/4 mr-auto" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-4 w-6/7" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
};

export default VerifyEmailSkeleton;
