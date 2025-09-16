import { getProductsCached, GetProductsParams } from "@/lib/actions";
import ProductListPage from "./product-list";

interface ProductListServerWrapperProps {
  params: GetProductsParams;
}

export async function ProductListServerWrapper({
  params,
}: ProductListServerWrapperProps) {
  const products = await getProductsCached(params);

  return <ProductListPage products={products} />;
}
