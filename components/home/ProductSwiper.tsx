"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

// وارد کردن استایل‌های پیش‌فرض سوئیپر (حتما باید ایمپورت بشن)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// تعریف تایپ پروپ‌ها برای محصول
interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  features: string;
  countInStock: number;
}

interface ProductSliderProps {
  products: Product[];
}

export default function ProductSlider({ products }: ProductSliderProps) {
  return (
    <div className="w-full my-8 text-right p-4" dir="rtl">
      <h2 className="text-xl font-bold mb-6 text-rose-800 mr-2">محصولات ویژه</h2>

      <Swiper
        // اضافه کردن ماژول‌های ناوبری و نقطه‌چین
        modules={[Navigation, Pagination]}
        spaceBetween={30} // فاصله بین کارت‌ها به پیکسل
        slidesPerView={1} // تعداد اسلاید در حالت موبایل
        navigation // فعال‌سازی دکمه‌های چپ و راست
        pagination={{ clickable: true }} // فعال‌سازی نقاط پایین با قابلیت کلیک
        // تنظیمات ریسپانسیو برای تبلت و دسکتاپ
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="pb-12" // فاصله دادن به پایین برای اینکه دکمه‌های نقاط روی کارت‌ها نیفتن
      >
       {products.map((product)=>(
        <SwiperSlide key={product.id}>
          <div>
            <div>
              {product.images?.[0]?(
                <img
                src={product.images[0]}
                alt={product.name}
                className="rounded-4xl"
                />
              ):("بدون تصویر")}
            </div>
            <h3 className="text-base font-semibold text-rose-700 truncate">{product.name}</h3>
          
          </div>
          <h3 className="text-base font-semibold text-rose-950 truncate">{product.name}</h3>
          <div className="flex justify-between items-center mt-4">
            
                <span className="text-amber-700 font-bold text-sm">
                  {product.price.toLocaleString()} تومان
                </span>
                
                {product.countInStock > 0 ? (
                  <span className="text-[10px] bg-green-100 text-amber-700 px-2 py-1 rounded">موجود</span>
                ) : (
                  <span className="text-[10px] bg-red-100 text-amber-700 px-2 py-1 rounded">ناموجود</span>
                )}
              </div>

              <Link 
                href={`/products/${product.slug}`}
                className="block text-center bg-white text-rose-700 text-xs font-medium py-2 rounded-lg mt-4 border border-amber-200 hover:bg-amber-50 transition"
              >
                مشاهده محصول
              </Link>
        </SwiperSlide>
       ))}
      </Swiper>
    </div>
  );
}