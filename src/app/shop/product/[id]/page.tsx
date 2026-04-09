import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/actions/products";
import ProductDetailClient from "./product-detail-client";

const SITE_URL = "https://mymy-store.vercel.app";

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id));
  if (!product) return {};

  const title = product.subtitle
    ? `${product.name} — ${product.subtitle}`
    : product.name;
  const description =
    product.description?.slice(0, 160) ??
    product.story?.slice(0, 160) ??
    product.subtitle?.slice(0, 160) ??
    product.name;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/shop/product/${product.id}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
    alternates: {
      canonical: `${SITE_URL}/shop/product/${product.id}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }

  // Up to 3 from same category, falling back to others if needed
  const allProducts = await getProducts();
  const sameCategory = allProducts.filter(
    (p) => p.id !== product.id && p.categoryId === product.categoryId
  );
  const others = allProducts.filter(
    (p) => p.id !== product.id && p.categoryId !== product.categoryId
  );
  const recommended = [...sameCategory, ...others].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? product.story ?? product.subtitle ?? product.name,
    image: product.gallery?.length ? product.gallery : [product.image],
    brand: { "@type": "Brand", name: "Mymy Atelier" },
    ...(product.materials?.length && { material: product.materials.join(", ") }),
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/shop/product/${product.id}`,
      priceCurrency: "DZD",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Mymy Atelier" },
    },
    ...(product.ratingScore && product.ratingCount && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.ratingScore,
        reviewCount: product.ratingCount,
      },
    }),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Shop",
        item: `${SITE_URL}/shop`,
      },
      ...(product.categoryName && product.categorySlug
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: product.categoryName,
              item: `${SITE_URL}/shop/${product.categorySlug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: product.categoryName ? 3 : 2,
        name: product.name,
        item: `${SITE_URL}/shop/product/${product.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ProductDetailClient product={product} recommended={recommended} />
    </>
  );
}
