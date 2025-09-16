import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import ProductsSkeletonPage from "./ProductsSkeleton";
import { ProductListServerWrapper } from "@/components/ProductListServerWrapper";
import { getProductsCountCached } from "@/lib/actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const pageSize = 3;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  const total = await getProductsCountCached();
  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="container mx-auto py-4 flex-1">
      <Breadcrumbs items={[{ label: "Products", href: "/" }]} />

      <Suspense key={page} fallback={<ProductsSkeletonPage />}>
        <ProductListServerWrapper params={{ page, pageSize }} />
      </Suspense>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${page - 1}`} />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?page=${index + 1}`}
                isActive={page === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href={`?page=${page + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
