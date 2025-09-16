import CartEntry from "@/components/cart-entry";
import CartSummaryPage from "@/components/cart-summary";
import { getCart } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { processCheckout, ProcessCheckoutResponse } from "@/lib/orders";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const cart = await getCart();

  const handleCheckout = async () => {
    "use server";
    let result: ProcessCheckoutResponse | null = null;

    try {
      result = await processCheckout();
    } catch (error) {
      console.error("Checkout error:", error);
      // Handle error (e.g., show a notification)
    }

    if (result) {
      redirect(result.sessionUrl);
    }
  };

  return (
    <main className="container mx-auto py-4 flex-1">
      {!cart || cart.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          <h2 className="text-2xl">Your cart is empty</h2>
          <p className="text-gray-500">
            Add some items to your cart to get started.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            {cart.items.map((item) => (
              <CartEntry key={item.id} cartItem={item} />
            ))}
          </div>
          <CartSummaryPage />
          <form action={handleCheckout}>
            <Button size="lg" className="mt-4 w-full">
              Proceed to Checkout
            </Button>
          </form>
        </>
      )}
    </main>
  );
}
