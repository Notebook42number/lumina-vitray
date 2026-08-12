"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // ۱. استیت‌ها برای ذخیره مقادیر ورودی کاربر، وضعیت لودینگ و ارورها
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ۲. مدیریت ارسال فرم
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ارسال اطلاعات فرم به بخش بک‌اند نکست‌ات (NextAuth)
    const result = await signIn("credentials", {
      redirect: false, // جلوگیری از رفرش خودسرانه صفحه توسط نکست‌ات
      email,
      password,
    });

    setLoading(false);

    // ۳. بررسی نتیجه ورود
    if (result?.error) {
      setError("ایمیل یا رمز عبور اشتباه است.");
    } else {
      // اگر ورود موفق بود، کاربر به صفحه اصلی منتقل و سشن‌ها بروزرسانی می‌شوند
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-amber-100 p-4">
      {/* کادر شیشه‌ای فرم لاگین با افکت بلور (Glassmorphism) */}
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 flex flex-col gap-6">
        
        {/* سربرگ فرم */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-rose-800 font-katibeh mb-2">خوش آمدید به لومینا ویترا</h2>
          <p className="text-sm text-rose-800/60">برای دسترسی به پنل، وارد حساب خود شوید</p>
        </div>

        {/* نمایش باکس ارور در صورت وجود خطا */}
        {error && (
          <div className="bg-rose-100 border border-rose-300 text-rose-700 text-sm px-4 py-2 rounded-xl text-center animate-shake">
            {error}
          </div>
        )}

        {/* فرم اصلی */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* فیلد ورودی ایمیل */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-rose-900/80 mr-1">ایمیل</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/80 border border-rose-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-rose-900 transition"
              placeholder="example@gmail.com"
            />
          </div>

          {/* flex فیلد ورودی رمز عبور */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-rose-900/80 mr-1">رمز عبور</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/80 border border-rose-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-rose-900 transition"
              placeholder="••••••••"
            />
          </div>

          {/* دکمه ارسال فرم */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-rose-800 hover:bg-rose-900 text-white py-3 rounded-xl font-medium shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "در حال بررسی..." : "ورود به حساب"}
          </button>
        </form>
      </div>
    </div>
  );
}