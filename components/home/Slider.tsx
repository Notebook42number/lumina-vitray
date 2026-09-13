
"use client";

import { useState } from "react";
import Image from "next/image";
import FloatingItem from "../motions/FloatingItem";

const slideItems = [
  {
    id: 1,
    title: "نور، رنگ، شیشه",
    description: "هر گوشه، یک تکه هنر",
    image: "/images/banner1.jpg",
  },
  {
    id: 2,
    title: "چیزی که معمولی نیست",
    description: "ویترای‌های دست‌ساز برای فضای تو",
    image: "/images/banner2.jpg",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative my-4 h-[520px] w-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 sm:h-[450px] md:my-6 md:h-[400px]">
      {/* Floating decorative elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-4 top-6 sm:left-8 sm:top-8">
          <FloatingItem intensity={20}>
            <div className="h-10 w-10 rounded-full bg-primary opacity-50 blur-xl sm:h-14 sm:w-14" />
          </FloatingItem>
        </div>

        <div className="absolute bottom-8 right-6 sm:bottom-10 sm:right-12">
          <FloatingItem intensity={45}>
            <div className="h-16 w-16 rounded-full bg-accent opacity-40 blur-2xl sm:h-24 sm:w-24" />
          </FloatingItem>
        </div>

        <div className="absolute left-1/2 top-1/4 -translate-x-1/2">
          <FloatingItem intensity={30}>
            <div className="h-6 w-6 rounded-full bg-secondary opacity-60 blur-md sm:h-8 sm:w-8" />
          </FloatingItem>
        </div>

        <div className="absolute bottom-4 left-1/4">
          <FloatingItem intensity={15}>
            <div className="h-20 w-20 rounded-full bg-primary-light opacity-20 blur-3xl sm:h-32 sm:w-32" />
          </FloatingItem>
        </div>
      </div>

      {/* Slider content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between gap-4 p-4 sm:gap-6 sm:p-6 md:flex-row md:p-10 lg:p-12">

        {/* Text */}
        <div className="order-2 flex w-full flex-1 flex-col items-start justify-center text-right md:order-1">
          <h2 className="mb-3 text-2xl font-bold leading-tight text-primary-ink sm:text-3xl md:mb-4 md:text-4xl">
            {slideItems[current].title}
          </h2>

          <p className="mb-5 text-sm leading-6 text-primary-ink/70 sm:text-base md:mb-6 md:text-lg">
            {slideItems[current].description}
          </p>

          <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-ink shadow transition hover:bg-primary-light sm:px-6 sm:py-3 sm:text-base">
            مشاهده محصولات
          </button>
        </div>

        {/* Image */}
        <div className="relative order-1 h-[250px] w-full flex-1 sm:h-[270px] md:order-2 md:h-full">
          <Image
            src={slideItems[current].image}
            alt={slideItems[current].title}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 50vw"
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Slider dots */}
      <div className="absolute bottom-3 right-1/2 z-20 flex translate-x-1/2 gap-2 sm:bottom-4 sm:right-6 sm:translate-x-0">
        {slideItems.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            aria-label={`نمایش اسلاید ${index + 1}`}
            className={`h-2.5 rounded-full transition-all sm:h-3 ${
              current === index
                ? "w-6 bg-white"
                : "w-2.5 bg-white/50 sm:w-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

