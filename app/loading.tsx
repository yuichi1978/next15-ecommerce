import BreadcrumbsSkeleton from "@/components/breadcrumbs-skeleton";
import ProductsSkeletonPage from "./ProductsSkeleton";

export default function LoadingPage() {
  return (
    <main className="container mx-auto py-4 flex-1">
      <BreadcrumbsSkeleton />
      <ProductsSkeletonPage />
    </main>
  );
}
