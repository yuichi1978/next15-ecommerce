"use client";

import { ProductCard } from "@/app/ProductCard";
import { Product } from "@prisma/client";

interface ProductListPageProps {
  products: Product[];
}

export default function ProductListPage({ products }: ProductListPageProps) {
  if (products.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
