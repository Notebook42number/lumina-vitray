"use client";

import toast from "react-hot-toast"
import { createOrder } from "@/app/actions/createOrders"
import { useCartStore } from "@/lib/cart-store"
import { useCheckoutStore } from "@/lib/checkout-store"
import {  useRouter } from "next/navigation"
import { startPayment } from "@/app/actions/startPayment"

export default  function PaymentPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const shippingInfo = useCheckoutStore((state) => state.shippingInfo)

 const totalPrice = useCartStore((state) => state.getTotalPrice())



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

const handlePayment = async () => {

  try {

    const orderData = items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }))


    const result = await createOrder(orderData)


    const payment = await startPayment(result.orderId)


    const authority = payment.authority


    router.push(`/checkout/payment/${authority}`)


  } catch(error) {

 if (error instanceof Error) {
    toast.error(error.message)
  } else {
    toast.error("خطایی رخ داد")
  }
  }

}
if (!shippingInfo) {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#eef6ff] px-4"
    >
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
          <p className="text-lg font-semibold text-amber-800">
            لطفاً اول اطلاعات ارسال را تکمیل کنید
          </p>
        </div>

        <button
          onClick={() => router.push("/checkout")}
          className="font-medium text-primary-ink transition hover:underline"
        >
          برگشت به فرم اطلاعات
        </button>
      </div>
    </div>
  )
}

return (
  <div
    dir="rtl"
    className="min-h-screen bg-[#eef6ff] px-4 pb-16 pt-28"
  >
    <div className="mx-auto max-w-3xl">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-primary-ink/60">
          Lumina Vitray
        </p>

        <h1 className="text-3xl font-bold text-primary-ink">
          خلاصه سفارش
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          اطلاعات سفارش را بررسی کنید و سپس پرداخت را انجام دهید.
        </p>
      </div>

      {/* Shipping */}
      <div className="mb-5 rounded-[2rem] border border-white/60 bg-white/50 p-6 shadow-lg backdrop-blur-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary-ink">
            اطلاعات ارسال
          </h2>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-ink">
            آدرس تحویل
          </span>
        </div>

        <div className="grid gap-3 text-sm text-neutral-600">
          <p>
            <span className="font-semibold text-primary-ink">
              نام:
            </span>{" "}
            {shippingInfo.fullName}
          </p>

          <p>
            <span className="font-semibold text-primary-ink">
              تماس:
            </span>{" "}
            {shippingInfo.phone}
          </p>

          <p>
            <span className="font-semibold text-primary-ink">
              آدرس:
            </span>{" "}
            {shippingInfo.city}، {shippingInfo.address}
          </p>

          <p>
            <span className="font-semibold text-primary-ink">
              کد پستی:
            </span>{" "}
            {shippingInfo.postalCode}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="mb-5 rounded-[2rem] border border-white/60 bg-white/50 p-6 shadow-lg backdrop-blur-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary-ink">
            محصولات
          </h2>

          <span className="text-sm text-neutral-500">
            {items.length} آیتم
          </span>
        </div>

        <div className="flex flex-col divide-y divide-primary/10">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div>
                <p className="font-medium text-primary-ink">
                  {item.name}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  تعداد: {item.quantity}
                </p>
              </div>

              <span className="whitespace-nowrap text-sm font-semibold text-neutral-700">
                {(item.price * item.quantity).toLocaleString()} تومان
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment */}
      <div className="rounded-[2rem] border border-white/60 bg-white/60 p-6 shadow-xl backdrop-blur-2xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm text-neutral-500">
              مبلغ قابل پرداخت
            </p>

            <p className="mt-1 text-3xl font-bold text-primary-ink">
              {totalPrice.toLocaleString()}
              <span className="mr-2 text-sm font-medium text-neutral-500">
                تومان
              </span>
            </p>
          </div>

          <button
            onClick={handlePayment}
            className="rounded-2xl bg-primary px-8 py-4 font-semibold text-primary-ink shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-xl"
          >
            پرداخت
          </button>

        </div>
      </div>
    </div>
  </div>
)
}
























