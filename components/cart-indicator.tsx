"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/use-cart";

function CartButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link href="/cart">{children}</Link>
    </Button>
  );
}

export default function CartIndicatorPage() {
  const { itemCount, isLoading } = useCart();

  if (isLoading) {
    return (
      <CartButton>
        <ShoppingCart className="w-5 h-5" />
      </CartButton>
    );
  }

  return (
    <CartButton>
      <ShoppingCart className="w-5 h-5" />
        {itemCount > 0 && (
          <span
            className="
              absolute top-0 right-0 flex items-center justify-center h-4 w-4 rounded-full
              bg-red-500 text-xs text-white"
          >
            {itemCount}
          </span>
        )}
    </CartButton>
  );
}
