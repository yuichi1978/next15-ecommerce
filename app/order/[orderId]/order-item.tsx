import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Prisma } from "@prisma/client";

interface OrderItemProps {
  orderItem: Prisma.OrderItemGetPayload<{
    include: {
      product: true;
    };
  }>;
}

export default function OrderItem({ orderItem }: OrderItemProps) {
  return (
    <li className="border-b border-muted flex justify-between py-4">
      <div className="flex space-x-4">
        <div className="overflow-hidden rounded-md border border-muted w-16 h-16">
          {orderItem.product.image && (
            <Image
              src={orderItem.product.image}
              alt={orderItem.product.name}
              className="w-full h-full object-cover"
              width={128}
              height={128}
            />
          )}
        </div>
        <div className="flex flex-col">
          <div className="font-medium">{orderItem.product.name}</div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end gap-2">
        <p className="font-medium">{formatPrice(orderItem.price)}</p>
        <div className="flex items-center border border-muted rounded-full">
          <p className="px-1 py-1 text-center">
            Quantity: {orderItem.quantity}
          </p>
        </div>
      </div>
    </li>
  );
}
