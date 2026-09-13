"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCheckoutStore } from "@/lib/checkout-store"
import { useCartStore } from "@/lib/cart-store"



export default function CheckoutPage() {
  const router = useRouter()
  const setShippingInfo = useCheckoutStore((state) => state.setShippingInfo)
  const items = useCartStore((state) => state.items)

  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")

  const totalPrice = useCartStore((state) => state.getTotalPrice())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setShippingInfo({ fullName, phone, address, city, postalCode })
    router.push("/checkout/payment")
  }
return (
  <div
    dir="rtl"
    className="min-h-screen bg-[#eef6ff] px-4 pb-16 pt-28"
  >
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-primary-ink/60">
          Lumina Vitray
        </p>

        <h1 className="text-3xl font-bold text-primary-ink">
          اطلاعات ارسال
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          اطلاعات تحویل سفارش خود را وارد کنید.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-[2rem] border border-white/60 bg-white/50 p-6 shadow-xl backdrop-blur-2xl md:p-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-primary-ink">
              نام و نام خانوادگی
            </label>

            <input
              type="text"
              placeholder="مثلاً کوثر احمدی"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-2xl border border-primary/15 bg-white/70 px-4 py-3.5 text-primary-ink outline-none transition placeholder:text-neutral-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-primary-ink">
              شماره تماس
            </label>

            <input
              type="tel"
              placeholder="09xxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full rounded-2xl border border-primary/15 bg-white/70 px-4 py-3.5 text-primary-ink outline-none transition placeholder:text-neutral-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
          </div>

          {/* City + Postal */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-primary-ink">
                شهر
              </label>

              <input
                type="text"
                placeholder="مثلاً تهران"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full rounded-2xl border border-primary/15 bg-white/70 px-4 py-3.5 text-primary-ink outline-none transition placeholder:text-neutral-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-primary-ink">
                کد پستی
              </label>

              <input
                type="text"
                placeholder="۱۰ رقمی"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="w-full rounded-2xl border border-primary/15 bg-white/70 px-4 py-3.5 text-primary-ink outline-none transition placeholder:text-neutral-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-medium text-primary-ink">
              آدرس کامل
            </label>

            <textarea
              placeholder="آدرس دقیق محل تحویل..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={4}
              className="w-full resize-none rounded-2xl border border-primary/15 bg-white/70 px-4 py-3.5 text-primary-ink outline-none transition placeholder:text-neutral-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
          </div>

          {/* Footer */}
          <div className="mt-3 flex flex-col gap-4 border-t border-primary/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-neutral-500">
                مبلغ سفارش
              </p>

              <p className="mt-1 text-2xl font-bold text-primary-ink">
                {totalPrice.toLocaleString()}{" "}
                <span className="text-sm font-medium text-neutral-500">
                  تومان
                </span>
              </p>
            </div>

            <button
              type="submit"
              className="rounded-2xl bg-primary px-7 py-3.5 font-semibold text-primary-ink shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-xl"
            >
              ادامه به پرداخت
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)
}