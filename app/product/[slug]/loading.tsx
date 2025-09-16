import BreadcrumbsSkeleton from "@/components/breadcrumbs-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default async function LoadingPage() {
  return (
    <main className="container mx-auto py-4 flex-1">
      <BreadcrumbsSkeleton />
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <h1 className="text-3xl font-bold mb-2"></h1>

          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
