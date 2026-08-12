// lib/store/cart-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// این تایپ باید با فیلدهای مدل Product تو هماهنگ باشه
export type CartItem = {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId
          )

          if (existingItem) {
            // اگه محصول از قبل توی سبد هست، فقط تعدادشو زیاد کن
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }

          // محصول جدیده، به لیست اضافه کن
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          }
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'lumina-cart-storage', // اسم کلید توی localStorage
    }
  )
)