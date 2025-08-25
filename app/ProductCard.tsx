import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/lib/mocks";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="pt-0 overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>

      <CardFooter>
        <p className="text-gray-600">{formatPrice(product.price)}</p>
      </CardFooter>
    </Card>
  );
}
