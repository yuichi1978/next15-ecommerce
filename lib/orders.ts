"use server";

import { cookies } from "next/headers";
import { getCart } from "./actions";
import { prisma } from "./prisma";
import { createCheckoutSession, OrderWithItemsAndProduct } from "./stripe";
import { auth } from "@/lib/auth";

export interface ProcessCheckoutResponse {
  sessionUrl: string;
  order: OrderWithItemsAndProduct;
}

export async function processCheckout(): Promise<ProcessCheckoutResponse> {
  const cart = await getCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let orderId: string | null = null;

  try {
    const order = await prisma.$transaction(async (tx) => {
      const total = cart.subtotal;

      const newOrder = await tx.order.create({
        data: {
          total,
          userId: userId || null,
        },
      });

      const orderItems = cart.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        orderId: newOrder.id,
        price: item.product.price,
      }));

      await tx.orderItem.createMany({
        data: orderItems,
      });

      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      await tx.cart.delete({
        where: {
          id: cart.id,
        },
      });

      return newOrder;
    });

    orderId = order.id;

    // 1. 注文全体を再読み込み
    const fullOrder = await prisma.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    // 2. 注文が読み込まれたことを確認
    if (!fullOrder) {
      throw new Error("Order not found");
    }
    // 3. Stripeセッションを作成
    const { sessionId, sessionUrl } = await createCheckoutSession(fullOrder);
    // 4. セッションURLを返却し、エラーを処理
    if (!sessionId || !sessionUrl) {
      throw new Error("Failed to create Stripe session");
    }
    // 5. セッションIDを注文に保存
    await prisma.order.update({
      where: {
        id: fullOrder.id,
      },
      data: {
        stripeSessionId: sessionId,
        status: "pending_payment",
      },
    });

    (await cookies()).delete("cartId");

    return {
      sessionUrl,
      order: fullOrder,
    };
  } catch (error) {
    if (orderId && error instanceof Error && error.message.includes("Stripe")) {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "failed",
        },
      });
    }

    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }

  // TODO
  // 1. 合計金額を計算する
  // 2. 注文レコードを作成する
  // 3. 注文アイテムレコードを作成する
  // 4. カートをクリアする
  // 5. キャッシュを再検証する
  // 6. 注文を返す
}
