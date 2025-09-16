import { NextResponse } from "next/server";
import { getCart } from "@/lib/actions";

export async function GET() {
  try {
    const cart = await getCart();
    return NextResponse.json({
      itemCount: cart?.size || 0,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ itemCount: 0 }, { status: 500 });
  }
}
