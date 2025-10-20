'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/store/cart-store'
import { CreditCard, Truck, Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Información personal
    name: '',
    email: '',
    phone: '',
    
    // Dirección de envío
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Método de pago
    paymentMethod: 'spei'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Aquí se haría la llamada a la API para crear el pedido
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simular proceso
      
      // Limpiar carrito y redirigir
      clearCart()
      router.push('/pedido-confirmado')
    } catch (error) {
      console.error('Error al procesar el pedido:', error)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">No hay productos en el carrito</h1>
        <p className="text-gray-600 mb-8">Agrega algunos productos antes de proceder al checkout</p>
        <Link href="/productos">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Ir a Productos
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/carrito" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver al carrito
        </Link>
        <h1 className="text-3xl font-bold text-purple-800">💳 Finalizar Compra</h1>
        <p className="text-gray-600 mt-2">Completa tu información para procesar el pedido</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario de checkout */}
        <div className="space-y-6">
          {/* Información personal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre completo *</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Teléfono *</label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+52 55 1234-5678"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Dirección de envío */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                Dirección de Envío
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Dirección *</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Calle, número, colonia"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ciudad *</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Ciudad"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estado *</label>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Estado"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">C.P. *</label>
                  <Input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="12345"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Método de pago */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                Método de Pago
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {/* SPEI */}
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="spei"
                    checked={formData.paymentMethod === 'spei'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="font-medium">Transferencia SPEI</span>
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Gratis</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Recibirás los datos bancarios para realizar tu transferencia
                    </p>
                  </div>
                </label>

                {/* Contraentrega */}
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-green-600" />
                      <span className="font-medium">Pago contraentrega</span>
                      <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">+$50 MXN</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Paga en efectivo cuando recibas tu pedido (solo CDMX)
                    </p>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumen del pedido */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Productos */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.variant.id}`} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-gray-500">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.product.price_mxn * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                {formData.paymentMethod === 'cash' && (
                  <div className="flex justify-between">
                    <span>Comisión contraentrega:</span>
                    <span>$50.00</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-purple-600">
                      ${(total + (formData.paymentMethod === 'cash' ? 50 : 0)).toFixed(2)} MXN
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Confirmar Pedido'}
                </Button>
              </form>

              <div className="flex items-center justify-center text-xs text-gray-500 pt-4 border-t">
                <Shield className="h-4 w-4 mr-1" />
                <span>Pago 100% seguro y protegido</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}