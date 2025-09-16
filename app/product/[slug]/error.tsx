"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="container mx-auto gap-4 flex flex-col flex-1 items-center justify-center min-h-[clac(100vh-4rem)]">
      <h1 className="text-2xl font-bold">Something went worng!</h1>
      <p className="text-sm text-muted-foreground">An error occurred while</p>
      <Button asChild onClick={() => reset()}>
        Try again
      </Button>
      <Link href="/" className="text-sm">
        Go back to home
      </Link>
    </main>
  );
}
