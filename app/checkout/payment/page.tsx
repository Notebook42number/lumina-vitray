
"use client"

import { useCartStore } from "@/lib/cart-store"
import { useCheckoutStore } from "@/lib/checkout-store"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const shippingInfo = useCheckoutStore((state) => state.shippingInfo)

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // اگه کاربر مستقیم اومده اینجا بدون پر کردن فرم قبلی
  if (!shippingInfo) {
    return (
      <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg text-rose-900">
          لطفاً اول اطلاعات ارسال رو تکمیل کن
        </p>
        <button
          onClick={() => router.push("/checkout")}
          className="text-rose-600 hover:underline"
        >
          برگشت به فرم اطلاعات
        </button>
      </div>
    )
  }

  const handlePayment = () => {
    // اینجا مرحله بعدی (فردا) وصل می‌شه: ساخت سفارش + اتصال زرین‌پال
    console.log("آماده اتصال به درگاه پرداخت")
  }

  return (
    <div dir="rtl" className="max-w-2xl mx-auto px-4 pt-32 pb-16">
      <h1 className="text-2xl font-bold text-rose-950 mb-8">
        خلاصه سفارش
      </h1>

      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
        <h2 className="font-medium text-rose-950 mb-3">اطلاعات ارسال</h2>
        <p className="text-sm text-rose-800/80">{shippingInfo.fullName}</p>
        <p className="text-sm text-rose-800/80">{shippingInfo.phone}</p>
        <p className="text-sm text-rose-800/80">
          {shippingInfo.city}، {shippingInfo.address}
        </p>
        <p className="text-sm text-rose-800/80">کد پستی: {shippingInfo.postalCode}</p>
      </div>

      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
        <h2 className="font-medium text-rose-950 mb-3">محصولات</h2>
        {items.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm py-2">
            <span>{item.name} × {item.quantity}</span>
            <span>{(item.price * item.quantity).toLocaleString()} تومان</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-rose-200 pt-4">
        <span className="text-lg font-bold text-rose-950">
          مبلغ قابل پرداخت: {totalPrice.toLocaleString()} تومان
        </span>
        <button
          onClick={handlePayment}
          className="bg-rose-800 text-white px-6 py-3 rounded-xl hover:bg-rose-900 transition"
        >
          پرداخت
        </button>
      </div>
    </div>
  )
}