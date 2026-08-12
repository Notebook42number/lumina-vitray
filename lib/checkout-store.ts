import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ShippingInfo = {
  fullName: string
  phone: string
  address: string
  city: string
  postalCode: string
}

type CheckoutState = {
  shippingInfo: ShippingInfo | null
  setShippingInfo: (info: ShippingInfo) => void
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      shippingInfo: null,
      setShippingInfo: (info) => set({ shippingInfo: info }),
    }),
    {
      name: 'lumina-checkout-storage',
    }
  )
)