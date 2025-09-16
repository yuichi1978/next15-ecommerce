import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function CartIndicatorSkeletonPage() {
  return (
    <Button variant="ghost" size="icon" asChild className="relative animate-pulse" disabled>
      <Link href="/cart">
        <ShoppingCart className="w-5 h-5" />
      </Link>
    </Button>
  );
}
