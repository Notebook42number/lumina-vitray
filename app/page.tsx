
import Navbar from "@/components/layout/Navbar";
import { prisma } from "@/lib/prisma";
import Slider from "@/components/home/Slider";
import ProductSlider from "@/components/home/ProductSwiper";
import ProductCard from "@/components/home/ProductCard";
import FloatingItem from "@/components/motions/FloatingItem";
import Input from "@/components/home/Input";
import Link from "next/link";
import Gallery from "@/components/home/Gallery";

type HomeProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { search } = await searchParams;

  const products = await prisma.product.findMany({
    where: search
      ? {
          name: {
            contains: search,
          },
        }
      : {},
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-bg-base pb-16 text-right"
      dir="rtl"
    >
      {/* Navbar */}
      <Navbar />

      {/* Background Layer */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />

        <div className="absolute left-1/3 top-1/3 h-[250px] w-[250px] rounded-full bg-primary/10 blur-3xl sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]" />

        <div className="absolute bottom-1/4 right-1/4 h-[220px] w-[220px] rounded-full bg-accent/10 blur-3xl sm:h-[350px] sm:w-[350px] md:h-[450px] md:w-[450px]" />

        <div className="absolute right-[-50px] top-10 h-[220px] w-[220px] rounded-full bg-primary-light/20 blur-3xl sm:right-0 sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 pt-24 sm:gap-12 sm:px-6 sm:pt-28 lg:px-8">

        {/* Brand Intro */}
        <div className="glass relative w-full overflow-hidden rounded-3xl p-5 text-center shadow-sm sm:p-8 md:p-12">

          <h1 className="mb-3 text-4xl font-bold tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Lumina Vitray
          </h1>

          <p className="mb-6 text-sm text-neutral-400 sm:text-base md:text-lg">
            تلالو نور و رنگ روی شیشه‌های دست‌ساز
          </p>

          <div className="mx-auto w-full max-w-xl">
            <Input />
          </div>

          {/* Search Results */}
          {search && (
            <div className="mx-auto mt-2 w-full max-w-xl overflow-hidden rounded-xl shadow-lg">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="block min-h-[48px] border-b border-primary/20 bg-primary px-4 py-3 text-sm text-primary-ink transition hover:bg-primary-light sm:text-base"
                >
                  {product.name}
                </Link>
              ))}
            </div>
          )}

          {/* Floating Items */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

            {/* بالا چپ */}
            <div className="absolute left-[-10px] top-6 sm:left-6 sm:top-8">
              <FloatingItem intensity={60}>
                <div className="h-8 w-8 rounded-full bg-primary opacity-50 blur-xl sm:h-12 sm:w-12 md:h-14 md:w-14" />
              </FloatingItem>
            </div>

            {/* پایین راست */}
            <div className="absolute bottom-4 right-2 sm:bottom-8 sm:right-8">
              <FloatingItem intensity={85}>
                <div className="h-12 w-12 rounded-full bg-accent opacity-40 blur-2xl sm:h-20 sm:w-20 md:h-24 md:w-24" />
              </FloatingItem>
            </div>

            {/* وسط */}
            <div className="absolute left-1/2 top-1/4 -translate-x-1/2">
              <FloatingItem intensity={90}>
                <div className="h-5 w-5 rounded-full bg-secondary opacity-60 blur-md sm:h-7 sm:w-7 md:h-8 md:w-8" />
              </FloatingItem>
            </div>

            {/* پایین چپ */}
            <div className="absolute bottom-2 left-1/4">
              <FloatingItem intensity={15}>
                <div className="h-16 w-16 rounded-full bg-primary-light opacity-20 blur-3xl sm:h-24 sm:w-24 md:h-32 md:w-32" />
              </FloatingItem>
            </div>
          </div>
        </div>

        {/* Main Slider */}
        <div className="w-full">
          <Slider />
        </div>

        {/* Featured Products */}
        <section className="w-full">
          <h2 className="mb-5 mr-1 text-xl font-bold text-neutral-200 sm:mb-6 sm:mr-2 sm:text-2xl">
            محصولات ویژه
          </h2>

          <ProductSlider products={products} />
        </section>

        {/* All Products */}
        <section className="w-full">
          <h2 className="mb-5 mr-1 text-xl font-bold text-neutral-200 sm:mb-6 sm:mr-2 sm:text-2xl">
            همه محصولات فروشگاه
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <div className="mt-10">
            <Gallery />
          </div>
        </section>
      </div>
    </main>
  );
}

