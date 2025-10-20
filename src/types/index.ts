export interface Product {
  id: string
  slug: string
  name: string
  description_md?: string
  price_mxn: number
  tax_included: boolean
  active: boolean
  featured: boolean
  created_at: string
  variants?: ProductVariant[]
  media?: ProductMedia[]
}

export interface ProductVariant {
  id: string
  product_id: string
  sku: string
  stock: number
  weight_g: number
  attrs: Record<string, any>
}

export interface ProductMedia {
  id: string
  product_id: string
  url: string
  alt?: string
  sort: number
}

export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  role: 'customer' | 'admin'
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  total_mxn: number
  tax_mxn: number
  discount_mxn: number
  status: 'pending' | 'paid' | 'preparing' | 'shipped' | 'completed' | 'cancelled'
  payment_method?: 'cash' | 'spei' | 'mp' | 'stripe'
  payment_ref?: string
  created_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id: string
  qty: number
  unit_price_mxn: number
  product?: Product
  variant?: ProductVariant
}

export interface Service {
  id: string
  slug: string
  name: string
  duration_min: number
  price_mxn: number
  mode: 'in_person' | 'video'
  active: boolean
}

export interface ServiceSlot {
  id: string
  service_id: string
  starts_at: string
  ends_at: string
  status: 'available' | 'held' | 'booked' | 'blocked'
}

export interface ServiceBooking {
  id: string
  user_id: string
  service_id: string
  slot_id: string
  status: 'pending' | 'paid' | 'completed' | 'cancelled'
  video_link?: string
  notes?: string
  created_at: string
  service?: Service
  slot?: ServiceSlot
}

export interface Coupon {
  id: string
  code: string
  kind: 'percent' | 'fixed'
  value: number
  min_total: number
  starts_at?: string
  ends_at?: string
  max_uses?: number
  used: number
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  md?: string
  published_at?: string
  cover_url?: string
  tags?: string[]
}

// Cart types
export interface CartItem {
  product: Product
  variant: ProductVariant
  quantity: number
}

export interface CartState {
  items: CartItem[]
  total: number
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void
  removeItem: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
}