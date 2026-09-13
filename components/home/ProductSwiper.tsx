
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: {
    id: string;
    url: string;
    productId: string;
  }[];
  features: string;
  countInStock: number;
}

interface ProductSliderProps {
  products: Product[];
}

export default function ProductSlider({
  products,
}: ProductSliderProps) {
  return (
    <div
      className="my-6 w-full overflow-hidden px-1 text-right sm:my-8 sm:px-2 md:px-4"
      dir="rtl"
    >
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1.15}
        spaceBetween={12}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          480: {
            slidesPerView: 1.4,
            spaceBetween: 14,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 2.3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 28,
          },
        }}
        className="!pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="h-full rounded-2xl border border-neutral-200/70 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-4">

              {/* Image */}
              <div className="h-52 w-full overflow-hidden rounded-xl bg-neutral-100 sm:h-56 md:h-60 lg:h-64">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                    بدون تصویر
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="mt-3 truncate text-sm font-semibold text-neutral-800 sm:text-base">
                {product.name}
              </h3>

              {/* Price + Stock */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-primary-ink sm:text-sm">
                  {product.price.toLocaleString()} تومان
                </span>

                {product.countInStock > 0 ? (
                  <span className="whitespace-nowrap rounded-full bg-green-50 px-2 py-1 text-[9px] text-green-700 sm:text-[10px]">
                    موجود
                  </span>
                ) : (
                  <span className="whitespace-nowrap rounded-full bg-red-50 px-2 py-1 text-[9px] text-red-700 sm:text-[10px]">
                    ناموجود
                  </span>
                )}
              </div>

              {/* Button */}
              <Link
                href={`/product/${product.slug}`}
                className="mt-4 block rounded-xl border border-primary-light/50 bg-white py-2.5 text-center text-xs font-medium text-primary-ink transition hover:bg-primary/10 sm:text-sm"
              >
                مشاهده محصول
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
