"use client"




import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
import Link from "next/link"



export default function CartPage(){
const items=useCartStore((state)=>state.items)
const removeFromCart=useCartStore((state)=>state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)


  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // حالت خالی بودن سبد
  if (items.length === 0) {
    return (
      <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-xl text-rose-900">سبد خرید شما خالیه</p>
        <Link href="/" className="text-rose-600 hover:underline">
          برو به فروشگاه
        </Link>
      </div>
    )
  }
    return(

  
    <div dir="rtl" className="max-w-3xl mx-auto px-4 pt-32 pb-16">
      <h1 className="text-2xl font-bold text-rose-950 mb-8">سبد خرید</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/20"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="rounded-xl object-cover"
            />

            <div className="flex-1">
              <p className="font-medium text-rose-950">{item.name}</p>
              <p className="text-sm text-rose-800/70">
                {item.price.toLocaleString()} تومان
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="w-7 h-7 rounded-full bg-rose-100 hover:bg-rose-200 disabled:opacity-30 transition"
              >
                -
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="w-7 h-7 rounded-full bg-rose-100 hover:bg-rose-200 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.productId)}
              className="text-sm text-rose-600 hover:text-rose-800 transition"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-rose-200 pt-4">
        <span className="text-lg font-bold text-rose-950">
          جمع کل: {totalPrice.toLocaleString()} تومان
        </span>
        <Link 
        href="/checkout"
        className="bg-rose-800 text-white px-6 py-3 rounded-xl hover:bg-rose-900 transition">
          ادامه فرآیند خرید
        </Link>
      </div>
    </div>
    )
}