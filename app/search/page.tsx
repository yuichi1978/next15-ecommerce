import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import ProductsSkeletonPage from "../ProductsSkeleton";
import { ProductListServerWrapper } from "@/components/ProductListServerWrapper";

interface SearchPageProps {
  searchParams: Promise<{ query?: string; sort?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.query?.trim() ?? "";
  const sort = params.sort ?? "";

  const breadcrumbs = [
    { label: "Products", href: "/" },
    {
      label: `Results for ${query}`,
      href: `/search?query=${encodeURIComponent(query)}`,
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <Suspense key={`${query}-${sort}`} fallback={<ProductsSkeletonPage />}>
        <ProductListServerWrapper params={{ query, sort }} />
      </Suspense>
    </>
  );
}
