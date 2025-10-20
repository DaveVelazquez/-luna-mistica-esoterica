'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Home, Package, CreditCard, Clock } from 'lucide-react'
import Link from 'next/link'

export default function OrderConfirmationPage() {
  const orderNumber = "EST-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Pedido Confirmado! 🎉</h1>
        <p className="text-gray-600">Tu orden ha sido recibida exitosamente</p>
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mt-4">
          <p className="font-medium text-purple-800">Número de pedido: <span className="font-bold">{orderNumber}</span></p>
        </div>
      </div>

      {/* Order Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-purple-600" />
            Estado del Pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-green-700">Pedido confirmado</p>
                <p className="text-sm text-gray-500">Tu orden ha sido recibida y está siendo procesada</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-500">En preparación</p>
                <p className="text-sm text-gray-400">Preparamos tu pedido con amor</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-500">Enviado</p>
                <p className="text-sm text-gray-400">Tu pedido está en camino</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Instructions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-600" />
            Instrucciones de Pago
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Transferencia SPEI</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Banco:</strong> BBVA Bancomer</p>
                <p><strong>CLABE:</strong> 012180001234567890</p>
                <p><strong>Beneficiario:</strong> Tienda Esotérica Luna Mística</p>
                <p><strong>Concepto:</strong> {orderNumber}</p>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Importante:</h4>
                  <ul className="text-sm text-amber-700 mt-1 space-y-1">
                    <li>• Realiza tu pago dentro de las próximas 24 horas</li>
                    <li>• Envía tu comprobante de pago por WhatsApp: +52 55 1234-5678</li>
                    <li>• Una vez confirmado el pago, procesaremos tu pedido</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>¿Qué sigue?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0">1</span>
              <p>Realiza tu transferencia bancaria usando los datos proporcionados</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0">2</span>
              <p>Envía tu comprobante de pago por WhatsApp o correo electrónico</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0">3</span>
              <p>Recibirás confirmación y número de seguimiento dentro de 2-4 horas</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0">4</span>
              <p>Tu pedido será enviado y llegará en 2-5 días hábiles</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 text-center mb-8">
        <h3 className="font-semibold text-gray-800 mb-2">¿Tienes preguntas?</h3>
        <p className="text-gray-600 mb-4">Estamos aquí para ayudarte en cada paso del camino</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            WhatsApp: +52 55 1234-5678
          </Button>
          <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            Email: hola@lunamisica.com
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full">
            <Home className="h-4 w-4 mr-2" />
            Volver al inicio
          </Button>
        </Link>
        <Link href="/productos" className="flex-1">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Package className="h-4 w-4 mr-2" />
            Seguir comprando
          </Button>
        </Link>
      </div>
    </div>
  )
}