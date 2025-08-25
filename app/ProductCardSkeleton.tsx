import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeletonPage() {
  return (
    <Card className="pt-0 overflow-hidden">
      <div className="relative aspect-video">
        <Skeleton className="w-full h-full" />
      </div>

      <CardHeader>
        <Skeleton className="w-4/5 h-5" />
        <Skeleton className="w-full h-4 mt-2" />
        <Skeleton className="w-2/3 h-4 mt-1" />
      </CardHeader>

      <CardFooter className="flex justify-between items-center">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-20 h-6" />
      </CardFooter>
    </Card>
  );
}
