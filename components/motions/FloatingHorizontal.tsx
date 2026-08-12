"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  intensity?: number;
}

export default function FloatingHorizontal({ children, intensity = 100 }: Props) {
  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 22 });

  // تغییر مهم: چون می‌خواهیم کل صفحه را پوشش دهد، بازه حرکت را بر اساس درصد یا پیکسل بزرگتر (مثلاً ۵۰۰ پیکسل چپ و راست) تنظیم می‌کنیم
  const moveX = useTransform(springX, [-0.5, 0.5], [`-${intensity}px`, `${intensity}px`]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      mouseX.set(x);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  return (
    // w-full و وسط‌چین کردن کمک می‌کند گربه آزادانه جابه‌جا شود
    <motion.div style={{ x: moveX }} className="will-change-transform w-full flex justify-center">
      {children}
    </motion.div>
  );
}