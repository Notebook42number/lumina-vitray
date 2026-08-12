"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface FloatingItemProps {
  children: React.ReactNode;
  intensity?: number;
}

export default function FloatingItem({ children, intensity = 30 }: FloatingItemProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 70, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 25 });

  const moveX = useTransform(springX, [-0.5, 0.5], [`-${intensity}px`, `${intensity}px`]);
  const moveY = useTransform(springY, [-0.5, 0.5], [`-${intensity}px`, `${intensity}px`]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div style={{ x: moveX, y: moveY }} className="will-change-transform">
      {children}
    </motion.div>
  );
}