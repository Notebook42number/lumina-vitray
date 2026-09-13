"use client";
import Link from "next/link";
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
  <div
    dir="rtl"
    className="min-h-screen flex items-center justify-center bg-[#eef6ff] p-4"
  >

    {/* Glass Card */}
    <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-8 flex flex-col gap-6">

      {/* Header */}
      <div className="text-center">

        <h2 className="text-3xl font-bold text-primary-ink mb-2">
         به Lumina خوش اومدید
        </h2>

        <p className="text-sm text-neutral-500">
          برای ورود به حساب کاربری وارد شوید
        </p>

      </div>


      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 text-sm px-4 py-2 rounded-xl text-center">
          {error}
        </div>
      )}



      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >


        <div className="flex flex-col gap-1">

          <label className="text-sm font-medium text-primary-ink mr-1">
            ایمیل
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="
            w-full px-4 py-3
            bg-white/80
            border border-primary/30
            rounded-xl
            text-primary-ink
            focus:outline-none
            focus:ring-2
            focus:ring-primary
            transition
            "
            placeholder="example@gmail.com"
          />

        </div>



        <div className="flex flex-col gap-1">

          <label className="text-sm font-medium text-primary-ink mr-1">
            رمز عبور
          </label>


          <input
            type="password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="
            w-full px-4 py-3
            bg-white/80
            border border-primary/30
            rounded-xl
            text-primary-ink
            focus:outline-none
            focus:ring-2
            focus:ring-primary
            transition
            "
            placeholder="••••••••"
          />

        </div>



        <button
          type="submit"
          disabled={loading}
          className="
          w-full mt-2
          bg-primary
          hover:bg-primary-light
          text-primary-ink
          py-3
          rounded-xl
          font-semibold
          shadow-md
          transition
          disabled:opacity-50
          "
        >
          {loading ? "در حال بررسی..." : "ورود به حساب"}
        </button>

<div className="text-center text-sm text-neutral-500">
  حساب کاربری ندارید؟{" "}
  <Link
    href="/signup"
    className="text-primary-ink font-semibold hover:underline"
  >
    ثبت نام کنید
  </Link>
</div>

      </form>


    </div>

  </div>
)
}