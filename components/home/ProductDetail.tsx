'use client'
import { useCartStore } from "@/lib/cart-store";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast"
import CartDrawer from "../cart/cartDrawer";
type ProductDetailProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    features: string;
    category: string;
    countInStock: number;
    images: {
      id: string;
      url: string;
    }[];
  };
};

export default function ProductDetail({
  product,
}: ProductDetailProps) {

  const addToCart = useCartStore((state) => state.addToCart)
const [isCartOpen, setIsCartOpen] = useState(false);

return (
  <section
    className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10"
    dir="rtl"
  >
    <div className="mx-auto overflow-hidden rounded-3xl border border-white/50 bg-white/30 shadow-2xl backdrop-blur-2xl sm:rounded-[2rem]">
      <div className="flex flex-col-reverse gap-0 md:flex-row-reverse">

        {/* اطلاعات محصول */}
        <div className="flex w-full flex-1 flex-col justify-center p-5 sm:p-7 md:p-10 lg:p-14">

          {/* نام محصول */}
          <h1 className="mb-4 text-2xl font-bold leading-tight text-primary-ink sm:text-3xl md:mb-5 md:text-5xl">
            {product.name}
          </h1>

          {/* قیمت */}
          <div className="mb-5 flex items-end gap-2 sm:mb-6">
            <span className="text-2xl font-bold text-emerald-600 sm:text-3xl md:text-4xl">
              {product.price.toLocaleString()}
            </span>

            <span className="pb-0.5 text-xs text-neutral-300 sm:pb-1 sm:text-sm">
              تومان
            </span>
          </div>

          {/* خط جداکننده */}
          <div className="mb-5 h-px w-full bg-neutral-200/70 sm:mb-6" />

          {/* توضیحات */}
          <p className="mb-6 max-w-xl text-sm leading-7 text-neutral-600 sm:mb-8 sm:text-base sm:leading-8">
            {product.features}
          </p>

          {/* موجودی */}
          <div className="mb-6 sm:mb-8">
            {product.countInStock > 0 ? (
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-2 text-xs font-medium text-emerald-700 sm:px-4 sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  موجود
                </span>

                <span className="text-xs text-neutral-300 sm:text-sm">
                  تعداد موجودی: {product.countInStock}
                </span>
              </div>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3.5 py-2 text-xs font-medium text-red-700 sm:px-4 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                ناموجود
              </span>
            )}
          </div>

          {/* دکمه */}
          <button
            className="w-full rounded-2xl border border-primary/30 bg-accent px-5 py-3.5 text-sm font-semibold text-primary-ink shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-accent-ink hover:text-white hover:shadow-xl sm:px-6 sm:py-4 sm:text-base md:w-fit md:min-w-[260px]"
            onClick={() => {
              addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                image:
                  product.images[0]?.url ??
                  "/images/placeholder.jpg",
              });

              setIsCartOpen(true);

              toast.success(
                `${product.name} به سبد خرید اضافه شد`
              );
            }}
          >
            افزودن به سبد خرید
          </button>
        </div>

        {/* تصویر محصول */}
        <div className="relative h-[320px] w-full flex-1 overflow-hidden bg-white/20 sm:h-[420px] md:h-auto md:min-h-[560px]">
          <Image
            src={
              product.images[0]?.url ??
              "/images/placeholder.jpg"
            }
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />

          {/* لایه خیلی ظریف روی عکس */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>

      </div>
    </div>
  </section>
);
 }