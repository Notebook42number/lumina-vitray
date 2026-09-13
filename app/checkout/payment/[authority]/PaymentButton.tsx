"use client"

import { useCartStore } from "@/lib/cart-store"
import { verifyPayment } from "@/app/actions/verify-payment"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function PaymentButton({
  authority,
}: {
  authority: string
}) {

  const router = useRouter()

  const clearCart = useCartStore(
    (state) => state.clearCart
  )

  const [loading, setLoading] = useState(false)


  const handlePayment = async () => {

    try {

      setLoading(true)

      const result = await verifyPayment(authority)


      if (result.success) {

        clearCart()
router.push(`/checkout/payment/success/${result.orderId}`)

      }


    } catch(error){

      console.log(error)

    } finally {

      setLoading(false)

    }

  }


  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="rounded-lg bg-rose-600 px-6 py-3 text-white disabled:opacity-50"
    >
      {
        loading 
        ? "در حال بررسی..."
        : "پرداخت"
      }
    </button>
  )
}