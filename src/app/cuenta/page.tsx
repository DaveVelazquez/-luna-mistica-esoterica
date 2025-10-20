'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Package, Clock, CreditCard, MapPin, Settings, LogOut } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { isSupabaseConfigured, checkSupabaseConfig } from '@/lib/supabase'

interface UserData {
  id: string
  email: string
  full_name?: string
  phone?: string
  created_at: string
}

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  created_at: string
  items: any[]
}

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const router = useRouter()

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Verificar si Supabase está configurado
        if (!checkSupabaseConfig()) {
          // Datos de demo para desarrollo
          setUser({
            id: 'demo-user',
            email: 'usuario@demo.com',
            full_name: 'Usuario Demo',
            phone: '+52 55 1234-5678',
            created_at: '2024-01-01T00:00:00Z'
          })
          return
        }

        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error || !user) {
          router.push('/login')
          return
        }

        setUser({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name,
          phone: user.user_metadata?.phone,
          created_at: user.created_at!
        })

        // Fetch user orders (simulado por ahora)
        const mockOrders: Order[] = [
          {
            id: '1',
            order_number: 'EST-ABC123',
            status: 'delivered',
            total_amount: 450.00,
            created_at: '2024-01-15T10:30:00Z',
            items: []
          },
          {
            id: '2',
            order_number: 'EST-XYZ789',
            status: 'shipped',
            total_amount: 280.00,
            created_at: '2024-01-20T14:15:00Z',
            items: []
          }
        ]
        setOrders(mockOrders)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [supabase, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100'
      case 'shipped':
        return 'text-blue-600 bg-blue-100'
      case 'processing':
        return 'text-yellow-600 bg-yellow-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregado'
      case 'shipped':
        return 'Enviado'
      case 'processing':
        return 'En proceso'
      case 'cancelled':
        return 'Cancelado'
      default:
        return 'Desconocido'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Cargando información de la cuenta...</p>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">👤 Mi Cuenta</h1>
        <p className="text-gray-600">Gestiona tu información personal y pedidos</p>
      </div>

      {/* User Info Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{user.full_name || 'Usuario'}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Miembro desde {new Date(user.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Mis Pedidos
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Direcciones
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Historial de Pedidos</h3>
            <Link href="/productos">
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Nueva Compra
              </Button>
            </Link>
          </div>
          
          {orders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No tienes pedidos aún</h3>
                <p className="text-gray-600 mb-4">¡Descubre nuestros productos esotéricos y realiza tu primera compra!</p>
                <Link href="/productos">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Explorar Productos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-lg">#{order.order_number}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Realizado el {new Date(order.created_at).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="font-semibold text-purple-600 text-lg">
                          ${order.total_amount.toFixed(2)} MXN
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre completo</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                    {user.full_name || 'No especificado'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                    {user.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Teléfono</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                    {user.phone || 'No especificado'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Fecha de registro</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                    {new Date(user.created_at).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>
              <Button className="mt-4">
                <Settings className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Direcciones de Envío</h3>
            <Button size="sm" variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Agregar Dirección
            </Button>
          </div>
          
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No tienes direcciones guardadas</h3>
              <p className="text-gray-600 mb-4">Agrega una dirección para agilizar tus futuras compras</p>
              <Button variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Agregar Primera Dirección
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}