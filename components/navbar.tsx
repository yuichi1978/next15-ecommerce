import Link from "next/link";
import ModeToggle from "@/components/mode-toggle";
import Mobilenav from "@/components/mobile-nav";
import SearchInput from "@/components/search-input";
import AuthStatus from "@/components/auth-status";
import CartIndicatorPage from "@/components/cart-indicator";

export const categories = [
  {
    id: 1,
    name: "Electronics",
    href: "/search/electronics",
  },
  {
    id: 2,
    name: "Clothing",
    href: "/search/clothing",
  },
  {
    id: 3,
    name: "Home",
    href: "/search/home",
  },
];

export function Navbar() {
  return (
    <div className="border-b border-dashed px-4">
      <div className="container mx-auto flex items-center justify-between h-16">
        <div className="">
          <div className="flex items-center gap-6">
            <Link className="text-2xl font-bold hidden md:block" href="/">
              Store
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {categories.map((category) => (
                <Link
                  href={category.href}
                  key={category.id}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            {/* Mobile Nav */}
            <Mobilenav />
          </div>
        </div>

        <div className="block w-full mx-4 md:mx-8">
          <SearchInput />
        </div>

        <div className="flex items-center gap-0">
          <AuthStatus />
          <CartIndicatorPage />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
