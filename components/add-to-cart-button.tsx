"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { addToCart } from "@/lib/actions";
import { useCart } from "@/lib/use-cart";

export function AddToCartButton({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false);
  const { revalidateCart } = useCart();

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart(product.id, 1);
      revalidateCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={product.inventory === 0 || isAdding}
      className="w-full"
    >
      <ShoppingCart className="w-4 h-4 mr-1" />
      {product.inventory > 0 ? "Add to cart" : "Out of stock"}
    </Button>
  );
}
