import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { categories } from "@/components/navbar";

export default function Mobilenav() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button variant="ghost" size="icon">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-4 p-4">
          <SheetClose asChild>
            <Link href="/">Home</Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/products">Products</Link>
          </SheetClose>

          <div>
            <h3 className="text-xs font-medium mb-2 text-muted-foreground">
              Categories
            </h3>

            {categories.map((category) => (
              <SheetClose key={category.id} asChild>
                <Link
                  href={category.href}
                  className="block py-2 text-sm font-medium"
                >
                  {category.name}
                </Link>
              </SheetClose>
            ))}

          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
