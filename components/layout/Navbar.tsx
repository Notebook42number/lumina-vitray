"use client"
import { ShoppingCart } from "lucide-react";
import FloatingItem from "../motions/FloatingItem";
import FloatingHorizontal from "../motions/FloatingHorizontal";
import Image from "next/image";
import { useSession , signOut } from "next-auth/react";
import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";




// ۱. تایپ مشخصات توپ
interface LightBall {


  id: number;
  style: React.CSSProperties; // این بار به جای کلاس‌های محدود تلویند، از استایل‌های دقیق ریاضی استفاده می‌کنیم
  colorClass: string;
  blurClass: string;
  opacityClass: string;
  intensity: number;
}

// ۲. تابع فرمولساز ریاضی
const generateRandomBalls = (count: number): LightBall[] => {
  const colors = ["bg-gray-900", "bg-rose-900", "bg-purple-500", "bg-sky-400", "bg-emerald-500"];
  const blurs = ["blur-md", "blur-lg", "blur-xl", "blur-2xl", "blur-3xl"];
  const opacities = ["opacity-30", "opacity-40", "opacity-50", "opacity-60", "opacity-70"];

  return Array.from({ length: count }).map((_, index) => {
    // فرمول تصادفی‌سازی بین چند گزینه
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomBlur = blurs[Math.floor(Math.random() * blurs.length)];
    const randomOpacity = opacities[Math.floor(Math.random() * opacities.length)];
    
    // فرمول ریاضی برای سایز، شدت و موقعیت (بین بازه‌های منطقی)
    const size = Math.floor(Math.random() * 120) + 30; // سایز تصادفی بین ۳۰ تا ۱۵۰ پیکسل
    const intensity = Math.floor(Math.random() * 70) + 15; // شدت حرکت تصادفی بین ۱۵ تا ۸۵

    return {
      id: index,
      colorClass: randomColor,
      blurClass: randomBlur,
      opacityClass: randomOpacity,
      intensity: intensity,
      // با استفاده از درصد به صورت inline style، توپ‌ها کاملاً در سراسر صفحه پخش می‌شوند
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
      }
    };
  });
};





export default function Navbar() {
const { data: session, status } = useSession();

const items = useCartStore((state) => state.items);
const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

 return (
  /* کانتینر اصلی برای وسط‌چین نگه‌داشتن ناف‌بار در بالای صفحه */
  <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 font-vazirmatn" dir="rtl">
    
    {/* خودِ نوار ناوبری اصلی */}
    <div className="text-rose-800 bg-amber-50/90 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-4 flex flex-row items-center justify-between px-8">
      
      {/* بخش راست: منوها */}
    <div className="flex items-center gap-6">
  <Link
    href="/shop"
    className="cursor-pointer transition hover:text-rose-600"
  >
    فروشگاه
  </Link>

  <Link
    href="/gallery"
    className="cursor-pointer transition hover:text-rose-600"
  >
    گالری
  </Link>

  <Link
    href="/orders"
    className="cursor-pointer transition hover:text-rose-600"
  >
    سفارشات
  </Link>

  <Link
    href="/aboutus"
    className="cursor-pointer transition hover:text-rose-600"
  >
    درباره ما
  </Link>

  <Link
    href="/contact"
    className="cursor-pointer transition hover:text-rose-600"
  >
    تماس با ما
  </Link>
</div>
      
      {/* افکت توت‌فرنگی یا گربه شناور شما */}
      <div className=" -bottom-6 left-10 pointer-events-none">
        <FloatingHorizontal intensity={120}>
          <Image 
            src="/images/strawberry.png"
            alt="icon"
            width={40} 
            height={40} 
            className="object-contain"
          />
          <span className="text-3xl select-none"></span>
        </FloatingHorizontal>
      </div>

      {/* 🔐 بخش چپ: آیکون سبد خرید و دکمه‌های هوشمند احراز هویت */}
      <div className="flex items-center gap-4">
      <Link href="/cart" className="relative cursor-pointer hover:text-rose-600 transition">
  <ShoppingCart className="w-5 h-5" />
  {totalItems > 0 && (
    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] text-black">
      {totalItems}
    </span>
  )}
</Link>
        
        <div className="h-4 w-[1px] bg-rose-800/20" /> {/* خط جداکننده ظریف */}
        
        {/* شروع شرط منطقی نکست‌ات */}
        {status === "loading" ? (
          <span className="text-xs text-rose-800/55 animate-pulse">در حال بررسی...</span>
        ) : session ? (
          // حالت اول: کاربر لاگین است (نام او را نشان بده + دکمه خروج)
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-rose-950">
              سلام، {session.user?.name || "کاربر"} ✨
            </span>
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-xs bg-rose-200/60 hover:bg-rose-200 text-rose-900 px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              خروج
            </button>
          <Link href="/profile">پروفایل</Link>
          <Link href="/cart">سبد خرید</Link>
          </div>
        ) : (
          // حالت دوم: هیچ‌کس لاگین نیست (دکمه‌های ورود و عضویت عادی)
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm cursor-pointer hover:text-rose-600 transition">
              وارد شوید
            </Link>
            <button className="bg-rose-800 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:bg-rose-900 transition cursor-pointer">
              عضویت
            </button>
          </div>
        )}
      </div>

    </div>
  </div>
);}