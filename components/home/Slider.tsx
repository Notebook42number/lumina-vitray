"use client";

import { useState } from "react";
import Image from "next/image"; // حتماً بالا ایمپورت باشه
import FloatingItem from "../motions/FloatingItem";

const slideItems = [
  {
    id: 1,
    title: "به دنیای شیشه‌ای خوش آمدید",
    description: "تخفیفات تابستانی ویژه محصولات پوستی",
    bgClass: "from-pink-500 to-rose-400",
    image: "/images/banner1.jpg"
  },
  {
    id: 2,
    title: "محصولات جدید رسید!",
    description: "قاب های متنوع و رویایی",
    bgClass: "from-purple-600 to-indigo-500",
    image: "/images/banner2.jpg"
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="top-9  relative w-full h-[320px] md:h-[400px] overflow-hidden rounded-2xl my-6 shadow-md transition-all duration-500">
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* توپ اول: بالا سمت چپ - رنگ طلایی، حرکت نرم (شدت ۲۰) */}
        <div className="absolute top-8 left-12">
          <FloatingItem intensity={20}>
            <div className="bg-amber-400 h-14 w-14 rounded-full blur-xl opacity-60" />
          </FloatingItem>
        </div>

        {/* توپ دوم: پایین سمت راست - رنگ صورتی، حرکت سریع‌تر (شدت ۴5) */}
        <div className="absolute bottom-10 right-16">
          <FloatingItem intensity={45}>
            <div className="bg-rose-500 h-24 w-24 rounded-full blur-2xl opacity-50" />
          </FloatingItem>
        </div>

        {/* توپ سوم: وسط صفحه کمی متمایل به بالا - رنگ ارغوانی، سایز کوچک و تیزتر */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
          <FloatingItem intensity={30}>
            <div className="bg-purple-500 h-8 w-8 rounded-full blur-md opacity-70" />
          </FloatingItem>
        </div>

        {/* توپ چهارم: پایین سمت چپ - یک هاله بزرگ طلایی بسیار ملایم */}
        <div className="absolute bottom-6 left-1/4">
          <FloatingItem intensity={15}>
            <div className="bg-amber-200 h-32 w-32 rounded-full blur-3xl opacity-30" />
          </FloatingItem>
        </div>

      </div>

      <div className={`absolute inset-0 bg-gradient-to-r ${slideItems[current].bgClass} -z-10`} />

      <div className=" w-full h-full flex flex-col md:flex-row items-center justify-between p-6 md:p-12 text-white gap-6">
      {/* کانتینر محتوا و عکس */}
        
        {/* بخش متن‌ها */}
        <div className="text-rose-900 flex-1 flex flex-col justify-center items-start text-right z-10 order-2 md:order-1">
          <h2 className="text-xl md:text-4xl font-bold mb-4">
            {slideItems[current].title}
          </h2>
          <p className="text-xs md:text-lg opacity-90 mb-6">
            {slideItems[current].description}
          </p>
          <button className=" bg-rose-900 text-stone-100 px-6 py-2 rounded-lg font-semibold shadow hover:bg-opacity-90 transition text-sm md:text-base">
            خرید آنلاین
          </button>
        </div>

        {/* بخش نمایش عکس محلی از پوشه public */}
        <div className="flex-1 w-full h-full relative  order-1 md:order-2">
          <Image
            //src={slideItems[current].image} // آدرس‌های محلی /images/... را می‌خواند
            alt={slideItems[current].title}
            fill
            priority // لود سریع به محض باز شدن سایت
            sizes="(max-width: 268px) 100vw, 50vw" // برای بهینه‌سازی سایز عکس در موبایل و دسکتاپ
            className="object-cover rounded-xl"
          />
        </div>

      </div>

      {/* دکمه‌های ناوبری پایین */}
      <div className="absolute bottom-4 right-6 flex gap-2 z-20">
        {slideItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}