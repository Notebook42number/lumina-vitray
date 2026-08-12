import ProductDetail from "@/components/home/ProductDetail";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug: slug,
    },
    include: {
      images: true,
    },
    
  });
console.log("SLUG:", slug);
console.log("PRODUCT:", product);
  if (!product) {
    notFound();
  }

  return (
    <ProductDetail product={product} />
  );
}