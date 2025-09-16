import { AddToCartButton } from "@/components/add-to-cart-button";
import Breadcrumbs from "@/components/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image
        ? [
            {
              url: product.image,
            },
          ]
        : [],
    },
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: {
      slug: true,
    },
  });
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.inventory > 0 ? "InStock" : "OutOfStock",
    },
  };

  const breadcrumbs = [
    { label: "Products", href: "/" },
    {
      label: product.category?.name,
      href: `/search/${product.category?.slug}`,
    },
    { label: product.name, href: `/product/${product.slug}` },
  ];

  return (
    <main className="container mx-auto py-4 flex-1">
      <Breadcrumbs items={breadcrumbs} />

      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-square rounded-lg overflow-hidden w-full !h-[300px] md:!h-[340px]">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="font-semibold text-lg">
                {formatPrice(product.price)}
              </span>

              <Badge variant="outline">{product.category?.name}</Badge>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h2 className="font-medium">Description</h2>
              <p>{product.description}</p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h2 className="font-medium">Availibility</h2>

              <div className="flex items-center gap-2">
                {product.inventory > 0 ? (
                  <Badge variant="outline" className="text-green-600">
                    In stock
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600">
                    Out of stock
                  </Badge>
                )}

                {product.inventory > 0 && (
                  <span className="text-xs text-gray-500">
                    ({product.inventory} items available)
                  </span>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            <AddToCartButton product={product} />
          </div>
        </CardContent>
      </Card>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
