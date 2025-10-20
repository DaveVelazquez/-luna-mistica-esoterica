'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/store/cart-store'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, total } = useCartStore()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null)

  const handleQuantityChange = (productId: string, variantId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId, variantId)
    } else {
      updateQuantity(productId, variantId, newQuantity)
    }
  }

  const applyCoupon = () => {
    // Simular aplicación de cupón
    if (couponCode.toLowerCase() === 'descuento10') {
      setAppliedCoupon({ code: 'DESCUENTO10', discount: 0.1 })
    }
  }

  const subtotal = total
  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0
  const finalTotal = subtotal - discount

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">
              Descubre nuestros productos esotéricos y comienza tu viaje espiritual
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/productos">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Explorar Productos
              </Button>
            </Link>
            <Link href="/servicios">
              <Button variant="outline" className="w-full">
                Ver Servicios de Lectura
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/productos" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Seguir comprando
        </Link>
        <h1 className="text-3xl font-bold text-purple-800">🛒 Carrito de Compras</h1>
        <p className="text-gray-600 mt-2">Revisa tus productos antes de proceder al pago</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.product.id}-${item.variant.id}`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  {/* Imagen del producto */}
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.media?.[0]?.url ? (
                      <Image
                        src={item.product.media[0].url}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        📦
                      </div>
                    )}
                  </div>

                  {/* Información del producto */}
                  <div className="flex-1">
                    <Link href={`/productos/${item.product.slug}`}>
                      <h3 className="font-semibold text-lg hover:text-purple-600 transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      SKU: {item.variant.sku}
                    </p>
                    {item.variant.attrs && Object.keys(item.variant.attrs).length > 0 && (
                      <div className="flex space-x-2 mt-2">
                        {Object.entries(item.variant.attrs).map(([key, value]) => (
                          <span key={key} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.product.id, item.variant.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.product.id, item.variant.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Precio */}
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      ${(item.product.price_mxn * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.product.price_mxn.toFixed(2)} c/u
                    </p>
                  </div>

                  {/* Botón eliminar */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeItem(item.product.id, item.variant.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Limpiar carrito */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Vaciar Carrito
            </Button>
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cupón de descuento */}
              <div>
                <label className="text-sm font-medium mb-2 block">Código de descuento</label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="DESCUENTO10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={applyCoupon} variant="outline">
                    Aplicar
                  </Button>
                </div>
                {appliedCoupon && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ Cupón {appliedCoupon.code} aplicado
                  </p>
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento ({appliedCoupon.code}):</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                
                <div className="border-t pt-2">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-purple-600">${finalTotal.toFixed(2)} MXN</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Link href="/checkout">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Proceder al Pago
                  </Button>
                </Link>
                
                <Link href="/productos">
                  <Button variant="outline" className="w-full">
                    Seguir Comprando
                  </Button>
                </Link>
              </div>

              {/* Información adicional */}
              <div className="text-xs text-gray-500 space-y-1 pt-4 border-t">
                <p>✓ Envío gratuito en compras mayores a $500</p>
                <p>✓ Garantía de satisfacción 30 días</p>
                <p>✓ Productos auténticos y energéticamente limpiados</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}