import CategorySidebarPage from "@/components/category-sidebar";
import SortingControlsPage from "@/components/sorting-controls";
import { ReactNode, Suspense } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

async function CategorySidebarServerWrapper() {
  const categories = await unstable_cache(
    () => {
      return prisma.category.findMany({
        select: {
          name: true,
          slug: true,
        },
        orderBy: {
          name: "asc",
        },
      });
    },
    ["categories"],
    {
      tags: ["categories"],
      revalidate: 3600,
    }
  )();
  return <CategorySidebarPage categories={categories} />;
}

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <main className="container mx-auto py-4 flex-1">
      <div className="flex gap-6">
        <div className="hidden md:block w-[125px] flex-none">
          <Suspense fallback={<div className="w-[125px]">Loading...</div>}>
            <CategorySidebarServerWrapper />
          </Suspense>
        </div>
        <div className="flex-1">{children}</div>
        <div className="hidden md:block w-[125px] flex-none">
          <SortingControlsPage />
        </div>
      </div>
    </main>
  );
}
