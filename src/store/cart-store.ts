import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartState, CartItem, Product, ProductVariant } from '@/types'

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (product: Product, variant: ProductVariant, quantity = 1) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          item => item.product.id === product.id && item.variant.id === variant.id
        )

        if (existingItemIndex >= 0) {
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += quantity
          set({
            items: updatedItems,
            total: calculateTotal(updatedItems)
          })
        } else {
          const newItems = [...items, { product, variant, quantity }]
          set({
            items: newItems,
            total: calculateTotal(newItems)
          })
        }
      },
      
      removeItem: (productId: string, variantId: string) => {
        const items = get().items.filter(
          item => !(item.product.id === productId && item.variant.id === variantId)
        )
        set({
          items,
          total: calculateTotal(items)
        })
      },
      
      updateQuantity: (productId: string, variantId: string, quantity: number) => {
        const items = get().items
        const itemIndex = items.findIndex(
          item => item.product.id === productId && item.variant.id === variantId
        )

        if (itemIndex >= 0) {
          const updatedItems = [...items]
          if (quantity <= 0) {
            updatedItems.splice(itemIndex, 1)
          } else {
            updatedItems[itemIndex].quantity = quantity
          }
          
          set({
            items: updatedItems,
            total: calculateTotal(updatedItems)
          })
        }
      },
      
      clearCart: () => {
        set({ items: [], total: 0 })
      },
      
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage', // unique name for localStorage
    }
  )
)

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + (item.product.price_mxn * item.quantity)
  }, 0)
}