
"use client";

import { useCartStore } from "@/lib/cart-store";
import Image from "next/image";
import Link from "next/link";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({
  isOpen,
  onClose,
}: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (!isOpen) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50"
    >
      {/* پس‌زمینه تیره */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />

      {/* خود Drawer */}
      <aside
        className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl p-6 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-primary-ink">
            سبد خرید
          </h2>

          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-neutral-500">
              سبد خرید خالی است
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-3 border-b pb-4"
              >
                <Image
                  src={
                    item.image ||
                    "/images/placeholder.jpg"
                  }
                  alt={item.name}
                  width={70}
                  height={70}
                  className="rounded-xl object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium text-neutral-800">
                    {item.name}
                  </p>

                  <p className="text-sm text-neutral-500">
                    {item.price.toLocaleString()} تومان
                  </p>

                  <p className="text-sm text-neutral-500 mt-1">
                    تعداد: {item.quantity}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between font-bold text-neutral-800">
              <span>جمع کل</span>
              <span>
                {totalPrice.toLocaleString()} تومان
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center bg-primary text-primary-ink py-3 rounded-xl font-semibold hover:bg-primary-light transition"
            >
              تکمیل خرید
            </Link>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition"
            >
              ادامه خرید
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

