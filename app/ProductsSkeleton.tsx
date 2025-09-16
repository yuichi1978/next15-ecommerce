import ProductCardSkeletonPage from "./ProductCardSkeleton";

export default function ProductsSkeletonPage() {
  return (
    <div className="grid grid-cols-1 gap-4 mb:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <ProductCardSkeletonPage key={i} />
      ))}
    </div>
  );
}
