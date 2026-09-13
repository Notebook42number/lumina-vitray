"use client"




import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
import Link from "next/link"



export default function CartPage(){
const items=useCartStore((state)=>state.items)
const removeFromCart=useCartStore((state)=>state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
const totalPrice = useCartStore((state) => state.getTotalPrice())


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
  }return (
  <div
    dir="rtl"
    className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6"
  >

    <h1
      className="
      mb-8
      text-2xl
      font-bold
      text-neutral-100
      sm:text-3xl
      "
    >
      سبد خرید
    </h1>


    <div className="flex flex-col gap-4">

      {items.map((item) => (

        <div
          key={item.productId}
          className="
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-4
          backdrop-blur-md
          sm:flex-row
          sm:items-center
          "
        >

          {/* Image + name */}
          <div className="flex flex-1 items-center gap-4">

            <Image
              src={item.image || "/images/placeholder.jpg"}
              alt={item.name}
              width={80}
              height={80}
              className="
              h-16
              w-16
              rounded-xl
              object-cover
              sm:h-20
              sm:w-20
              "
            />


            <div>

              <p
                className="
                font-medium
                text-neutral-100
                "
              >
                {item.name}
              </p>


              <p className="mt-1 text-sm text-neutral-400">
                {item.price.toLocaleString()} تومان
              </p>

            </div>

          </div>



          {/* Quantity */}

          <div
            className="
            flex
            items-center
            justify-between
            gap-3
            sm:justify-center
            "
          >

            <button
              onClick={() =>
                updateQuantity(
                  item.productId,
                  item.quantity - 1
                )
              }
              disabled={item.quantity <= 1}
              className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-neutral-100
              transition
              hover:bg-white/20
              disabled:opacity-30
              "
            >
              -
            </button>


            <span className="w-6 text-center text-neutral-100">
              {item.quantity}
            </span>


            <button
              onClick={() =>
                updateQuantity(
                  item.productId,
                  item.quantity + 1
                )
              }
              className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-neutral-100
              transition
              hover:bg-white/20
              "
            >
              +
            </button>

          </div>



          {/* Remove */}

          <button
            onClick={() =>
              removeFromCart(item.productId)
            }
            className="
            text-sm
            text-neutral-400
            transition
            hover:text-red-400
            "
          >
            حذف
          </button>


        </div>

      ))}

    </div>



    {/* Checkout */}

    <div
      className="
      mt-8
      flex
      flex-col
      gap-5
      border-t
      border-white/10
      pt-6
      sm:flex-row
      sm:items-center
      sm:justify-between
      "
    >

      <span
        className="
        text-lg
        font-bold
        text-neutral-100
        "
      >
        جمع کل:
        {" "}
        {totalPrice.toLocaleString()}
        {" "}
        تومان
      </span>


      <Link
        href="/checkout"
        className="
        rounded-xl
        bg-primary
        px-6
        py-3
        text-center
        font-medium
        text-primary-ink
        transition
        hover:bg-primary-light
        "
      >
        ادامه فرآیند خرید
      </Link>


    </div>


  </div>
)
}