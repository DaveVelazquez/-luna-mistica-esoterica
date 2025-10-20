'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Search, 
  DollarSign, 
  Eye,
  Save,
  X
} from 'lucide-react'
import { requireAdminAuth, clearAdminSession, AdminSession } from '@/lib/admin-auth'
import { Product } from '@/types'

// Datos de productos iniciales (en una app real vendrían de la base de datos)
const initialProducts: Product[] = [
  {
    id: '1',
    slug: 'tarot-rider-waite',
    name: 'Tarot Rider-Waite Original',
    description_md: 'El tarot más popular del mundo, perfecto para principiantes y expertos. Incluye libro de instrucciones en español.',
    price_mxn: 450,
    tax_included: true,
    active: true,
    featured: true,
    created_at: '2024-01-01',
    media: []
  },
  {
    id: '2',
    slug: 'cristal-amatista',
    name: 'Amatista Natural Brasileña',
    description_md: 'Cristal de amatista natural para meditación y protección energética. Pieza única.',
    price_mxn: 180,
    tax_included: true,
    active: true,
    featured: true,
    created_at: '2024-01-01',
    media: []
  },
  {
    id: '3',
    slug: 'vela-proteccion',
    name: 'Vela de Protección Blanca',
    description_md: 'Vela artesanal con hierbas naturales para rituales de protección y purificación.',
    price_mxn: 95,
    tax_included: true,
    active: true,
    featured: false,
    created_at: '2024-01-01',
    media: []
  }
]

export default function AdminCatalogoPage() {
  const [session, setSession] = useState<AdminSession | null>(null)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const adminSession = requireAdminAuth()
    if (adminSession) {
      setSession(adminSession)
    }
  }, [])

  const handleLogout = () => {
    clearAdminSession()
    router.push('/admin/login')
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product })
    setIsAddingNew(false)
  }

  const handleAddNew = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      slug: '',
      name: '',
      description_md: '',
      price_mxn: 0,
      tax_included: true,
      active: true,
      featured: false,
      created_at: new Date().toISOString(),
      media: []
    }
    setEditingProduct(newProduct)
    setIsAddingNew(true)
  }

  const handleSaveProduct = () => {
    if (!editingProduct) return

    if (isAddingNew) {
      setProducts([...products, editingProduct])
    } else {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p))
    }

    setEditingProduct(null)
    setIsAddingNew(false)
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== productId))
    }
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
    setIsAddingNew(false)
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900">
      {/* Header */}
      <div className="border-b border-purple-500/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-purple-300" />
              <div>
                <h1 className="text-3xl font-cinzel font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Panel de Administración</h1>
                <p className="text-base text-white font-bold mt-1 drop-shadow-md">Gestión del Catálogo - {session.username}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => router.push('/')}
                className="h-10 px-4 border-2 border-blue-400 text-white hover:bg-blue-100 hover:text-blue-900 font-bold bg-blue-600"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Tienda
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="h-10 px-4 border-2 border-red-400 text-white hover:bg-red-100 hover:text-red-900 font-bold bg-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-96 bg-purple-900/30 border border-purple-500/30">
            <TabsTrigger value="products" className="data-[state=active]:bg-purple-600">
              <Package className="w-4 h-4 mr-2" />
              Productos
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              <DollarSign className="w-4 h-4 mr-2" />
              Estadísticas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Controles */}
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-purple-600 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gray-900 font-cinzel font-bold">Catálogo de Productos</CardTitle>
                    <CardDescription className="text-base text-gray-700 mt-2 font-medium">
                      Gestiona todos los productos de la tienda esotérica
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700 text-white font-bold border-0 h-10 px-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Producto
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 text-base bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-600 font-medium"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lista de productos */}
            <div className="grid gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="bg-white/95 backdrop-blur-sm border-2 border-purple-300 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            product.active 
                              ? 'bg-green-200 text-green-800 border-2 border-green-400' 
                              : 'bg-red-200 text-red-800 border-2 border-red-400'
                          }`}>
                            {product.active ? 'Activo' : 'Inactivo'}
                          </span>
                          {product.featured && (
                            <span className="px-3 py-1 rounded-full text-sm font-bold bg-yellow-200 text-yellow-800 border-2 border-yellow-400">
                              Destacado
                            </span>
                          )}
                        </div>
                        <p className="text-gray-800 text-base mb-3 font-medium">{product.description_md}</p>
                        <div className="flex items-center space-x-6">
                          <span className="text-xl font-bold text-green-700">
                            ${product.price_mxn.toFixed(2)} MXN
                          </span>
                          <span className="text-sm text-gray-600 font-mono bg-gray-200 px-3 py-1 rounded border">ID: {product.slug}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProduct(product)}
                          className="h-9 px-3 border-2 border-blue-600 text-blue-800 hover:bg-blue-100 hover:text-blue-900 font-bold"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="h-9 px-3 border-2 border-red-600 text-red-800 hover:bg-red-100 hover:text-red-900 font-bold"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-purple-600 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 font-cinzel font-bold">Estadísticas del Catálogo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-purple-100 p-6 rounded-lg border-2 border-purple-400 shadow-md">
                    <div className="flex items-center space-x-3 mb-3">
                      <Package className="w-6 h-6 text-purple-800" />
                      <span className="text-gray-900 font-bold text-lg">Total Productos</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-800">{products.length}</p>
                  </div>
                  <div className="bg-green-100 p-6 rounded-lg border-2 border-green-400 shadow-md">
                    <div className="flex items-center space-x-3 mb-3">
                      <Eye className="w-6 h-6 text-green-800" />
                      <span className="text-gray-900 font-bold text-lg">Productos Activos</span>
                    </div>
                    <p className="text-3xl font-bold text-green-800">
                      {products.filter(p => p.active).length}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-6 rounded-lg border-2 border-yellow-400 shadow-md">
                    <div className="flex items-center space-x-3 mb-3">
                      <DollarSign className="w-6 h-6 text-yellow-800" />
                      <span className="text-gray-900 font-bold text-lg">Precio Promedio</span>
                    </div>
                    <p className="text-3xl font-bold text-yellow-800">
                      ${(products.reduce((sum, p) => sum + p.price_mxn, 0) / products.length).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de edición */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm border-2 border-purple-600 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 font-cinzel font-bold">
                {isAddingNew ? 'Nuevo Producto' : 'Editar Producto'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-base font-bold text-gray-900">Nombre del Producto</label>
                  <Input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="h-11 text-base bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-600 font-medium"
                    placeholder="Nombre del producto"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base font-bold text-gray-900">Slug/ID</label>
                  <Input
                    value={editingProduct.slug}
                    onChange={(e) => setEditingProduct({...editingProduct, slug: e.target.value})}
                    className="h-11 text-base bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-600 font-mono"
                    placeholder="identificador-producto"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-base font-bold text-gray-900">Descripción</label>
                <textarea
                  value={editingProduct.description_md}
                  onChange={(e) => setEditingProduct({...editingProduct, description_md: e.target.value})}
                  className="w-full h-24 bg-white border-2 border-gray-300 rounded-md p-4 text-base text-gray-900 placeholder-gray-500 resize-none focus:border-purple-600 focus:outline-none font-medium"
                  placeholder="Descripción detallada del producto"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-base font-bold text-gray-900">Precio (MXN)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editingProduct.price_mxn}
                    onChange={(e) => setEditingProduct({...editingProduct, price_mxn: parseFloat(e.target.value) || 0})}
                    className="h-11 text-base bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-600 font-medium"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={editingProduct.active}
                      onChange={(e) => setEditingProduct({...editingProduct, active: e.target.checked})}
                      className="w-5 h-5 text-purple-600 bg-white border-2 border-gray-400 rounded focus:ring-purple-300"
                    />
                    <label className="text-base font-bold text-gray-900">Producto activo</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={editingProduct.featured}
                      onChange={(e) => setEditingProduct({...editingProduct, featured: e.target.checked})}
                      className="w-5 h-5 text-purple-600 bg-white border-2 border-gray-400 rounded focus:ring-purple-300"
                    />
                    <label className="text-base font-bold text-gray-900">Producto destacado</label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardContent className="flex justify-end space-x-4 pt-0">
              <Button variant="outline" onClick={handleCancelEdit} className="h-11 px-6 text-base border-2 border-gray-600 text-gray-800 hover:bg-gray-100 hover:text-gray-900 font-bold bg-white">
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleSaveProduct} className="h-11 px-6 text-base bg-purple-700 hover:bg-purple-800 text-white font-bold border-0">
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}