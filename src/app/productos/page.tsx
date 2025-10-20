import { Suspense } from 'react'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Filter, Sparkles, Star } from 'lucide-react'

// Datos de ejemplo hasta que Supabase esté configurado
const sampleProducts = [
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
    media: [{ id: '1', product_id: '1', url: '/placeholder-tarot.jpg', alt: 'Tarot Rider-Waite', sort: 0 }]
  },
  {
    id: '2',
    slug: 'cristal-amatista',
    name: 'Amatista Natural Brasileña',
    description_md: 'Cristal de amatista natural de Brasil para meditación y protección energética. Tamaño mediano (5-7 cm).',
    price_mxn: 180,
    tax_included: true,
    active: true,
    featured: true,
    created_at: '2024-01-01',
    media: [{ id: '2', product_id: '2', url: '/placeholder-amatista.jpg', alt: 'Amatista', sort: 0 }]
  },
  {
    id: '3',
    slug: 'vela-proteccion',
    name: 'Vela de Protección Blanca',
    description_md: 'Vela artesanal con hierbas naturales para rituales de protección. Tiempo de quemado: 8 horas.',
    price_mxn: 95,
    tax_included: true,
    active: true,
    featured: false,
    created_at: '2024-01-01',
    media: [{ id: '3', product_id: '3', url: '/placeholder-vela.jpg', alt: 'Vela de Protección', sort: 0 }]
  },
  {
    id: '4',
    slug: 'incienso-copal',
    name: 'Incienso de Copal Natural',
    description_md: 'Copal natural mexicano para limpia energética y purificación de espacios. Paquete de 50g.',
    price_mxn: 120,
    tax_included: true,
    active: true,
    featured: false,
    created_at: '2024-01-01',
    media: [{ id: '4', product_id: '4', url: '/placeholder-copal.jpg', alt: 'Incienso de Copal', sort: 0 }]
  },
  {
    id: '5',
    slug: 'cuarzo-rosa',
    name: 'Cuarzo Rosa del Amor',
    description_md: 'Cuarzo rosa natural para atraer el amor y fortalecer relaciones. Piedra pulida de 3-4 cm.',
    price_mxn: 85,
    tax_included: true,
    active: true,
    featured: false,
    created_at: '2024-01-01',
    media: [{ id: '5', product_id: '5', url: '/placeholder-cuarzo.jpg', alt: 'Cuarzo Rosa', sort: 0 }]
  },
  {
    id: '6',
    slug: 'aceite-esencial-lavanda',
    name: 'Aceite Esencial de Lavanda',
    description_md: 'Aceite esencial puro de lavanda francesa para relajación y armonización energética. 10ml.',
    price_mxn: 150,
    tax_included: true,
    active: true,
    featured: false,
    created_at: '2024-01-01',
    media: [{ id: '6', product_id: '6', url: '/placeholder-aceite.jpg', alt: 'Aceite de Lavanda', sort: 0 }]
  }
]

const categories = [
  { id: 'tarots', name: 'Tarots y Oráculos', count: 15 },
  { id: 'cristales', name: 'Cristales y Piedras', count: 28 },
  { id: 'velas', name: 'Velas Rituales', count: 12 },
  { id: 'inciensos', name: 'Inciensos y Sahumerios', count: 18 },
  { id: 'aceites', name: 'Aceites Esenciales', count: 10 },
  { id: 'libros', name: 'Libros Esotéricos', count: 22 },
  { id: 'joyas', name: 'Joyería Mística', count: 14 }
]

function ProductFilters() {
  return (
    <Card className="mystic-card border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Filter className="h-5 w-5 text-purple-300" />
          <span className="mystic-text">Filtros Mágicos</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Búsqueda */}
        <div>
          <label className="text-sm font-medium mb-2 block">Buscar</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar productos..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Categorías */}
        <div>
          <label className="text-sm font-medium mb-3 block">Categorías</label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">{category.name}</span>
                </label>
                <span className="text-xs text-gray-500">({category.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rango de precios */}
        <div>
          <label className="text-sm font-medium mb-3 block">Precio (MXN)</label>
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input placeholder="Mín" type="number" />
              <Input placeholder="Máx" type="number" />
            </div>
          </div>
        </div>

        {/* Aplicar filtros */}
        <Button className="w-full">
          Aplicar Filtros
        </Button>
      </CardContent>
    </Card>
  )
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Místico */}
      <div className="mb-12 text-center">
        <div className="flex justify-center mb-6">
          <Sparkles className="w-16 h-16 text-purple-300 animate-float" />
        </div>
        <h1 className="font-cinzel text-5xl font-bold mb-6">
          <span className="mystic-text">Tesoros Místicos</span>
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          Explora nuestra colección sagrada de artefactos esotéricos, 
          cristales energizados y herramientas ancestrales para tu despertar espiritual
        </p>
        <div className="flex justify-center mt-6">
          <Star className="w-6 h-6 text-yellow-300 animate-twinkle mx-2" />
          <Star className="w-4 h-4 text-purple-300 animate-twinkle mx-2" style={{ animationDelay: '0.5s' }} />
          <Star className="w-5 h-5 text-pink-300 animate-twinkle mx-2" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros (sidebar) */}
        <div className="lg:col-span-1">
          <ProductFilters />
        </div>

        {/* Productos */}
        <div className="lg:col-span-3">
          {/* Barra superior */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Mostrando {sampleProducts.length} de {sampleProducts.length} productos
            </p>
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>Más relevantes</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Más nuevos</option>
              <option>Mejor valorados</option>
            </select>
          </div>

          {/* Grid de productos */}
          <Suspense fallback={<div>Cargando productos...</div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sampleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Suspense>

          {/* Paginación */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <Button variant="outline" disabled>
                Anterior
              </Button>
              <Button variant="outline" className="bg-purple-600 text-white">
                1
              </Button>
              <Button variant="outline">
                2
              </Button>
              <Button variant="outline">
                3
              </Button>
              <Button variant="outline">
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}