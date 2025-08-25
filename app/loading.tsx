import ProductCardSkeletonPage from "./ProductCardSkeleton";

export default function LoadingPage() {
  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <p>Showing products</p>
      <div className="grid grid-cols-1 gap-4 mb:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeletonPage key={i} />
        ))}
      </div>
    </main>
  );
}
