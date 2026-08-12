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

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setShippingInfo({ fullName, phone, address, city, postalCode })
    router.push("/checkout/payment")
  }

  return (
    <div dir="rtl" className="max-w-2xl mx-auto px-4 pt-32 pb-16">
      <h1 className="text-2xl font-bold text-rose-950 mb-8">
        اطلاعات ارسال
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="نام و نام خانوادگی"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="rounded-xl border border-rose-200 px-4 py-3 bg-white/60 backdrop-blur-md"
        />

        <input
          type="tel"
          placeholder="شماره تماس"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="rounded-xl border border-rose-200 px-4 py-3 bg-white/60 backdrop-blur-md"
        />

        <input
          type="text"
          placeholder="شهر"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="rounded-xl border border-rose-200 px-4 py-3 bg-white/60 backdrop-blur-md"
        />

        <input
          type="text"
          placeholder="کد پستی"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
          className="rounded-xl border border-rose-200 px-4 py-3 bg-white/60 backdrop-blur-md"
        />

        <textarea
          placeholder="آدرس کامل"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          rows={3}
          className="rounded-xl border border-rose-200 px-4 py-3 bg-white/60 backdrop-blur-md"
        />

        <div className="flex items-center justify-between border-t border-rose-200 pt-4 mt-4">
          <span className="text-lg font-bold text-rose-950">
            جمع کل: {totalPrice.toLocaleString()} تومان
          </span>
          <button
            type="submit"
            className="bg-rose-800 text-white px-6 py-3 rounded-xl hover:bg-rose-900 transition"
          >
            ادامه به پرداخت
          </button>
        </div>
      </form>
    </div>
  )
}