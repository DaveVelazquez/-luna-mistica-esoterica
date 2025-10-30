import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductCard } from '@/components/product-card'
import { Product } from '@/types'
import { Star, Moon, Sparkles, Gem } from 'lucide-react'

// Datos de ejemplo - esto vendrá de Supabase más adelante
const featuredProducts: Product[] = [
  {
    id: '1',
    slug: 'tarot-rider-waite',
    name: 'Tarot Rider-Waite Original',
    description_md: 'El tarot más popular del mundo, perfecto para principiantes y expertos',
    price_mxn: 450,
    tax_included: true,
    active: true,
    featured: true,
    created_at: '2024-01-01',
    media: [{ id: '1', product_id: '1', url: 'data:image/svg+xml,%3Csvg width=\'400\' height=\'400\' viewBox=\'0 0 400 400\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3ClinearGradient id=\'tarot\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%234c1d95;stop-opacity:1\' /%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23c026d3;stop-opacity:1\' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\'400\' height=\'400\' fill=\'url(%23tarot)\'/%3E%3Crect x=\'80\' y=\'60\' width=\'240\' height=\'320\' rx=\'20\' fill=\'%23000\' opacity=\'0.3\'/%3E%3Crect x=\'90\' y=\'70\' width=\'220\' height=\'300\' rx=\'15\' fill=\'%23fff\' opacity=\'0.1\'/%3E%3Ccircle cx=\'200\' cy=\'150\' r=\'40\' fill=\'none\' stroke=\'%23fbbf24\' stroke-width=\'3\' opacity=\'0.8\'/%3E%3Cpath d=\'M200 120 L210 140 L230 140 L215 155 L220 175 L200 165 L180 175 L185 155 L170 140 L190 140 Z\' fill=\'%23fbbf24\'/%3E%3Ctext x=\'200\' y=\'250\' font-family=\'serif\' font-size=\'18\' fill=\'%23fbbf24\' text-anchor=\'middle\'%3ETAROT%3C/text%3E%3Ctext x=\'200\' y=\'280\' font-family=\'serif\' font-size=\'14\' fill=\'%23fff\' text-anchor=\'middle\'%3ERider-Waite%3C/text%3E%3C/svg%3E', alt: 'Tarot Rider-Waite', sort: 0 }]
  },
  {
    id: '2',
    slug: 'cristal-amatista',
    name: 'Amatista Natural Brasileña',
    description_md: 'Cristal de amatista natural para meditación y protección energética',
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
    description_md: 'Vela artesanal con hierbas naturales para rituales de protección',
    price_mxn: 95,
    tax_included: true,
    active: true,
    featured: true,
    created_at: '2024-01-01',
    media: [{ id: '3', product_id: '3', url: '/placeholder-vela.jpg', alt: 'Vela de Protección', sort: 0 }]
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Místico */}
      <section className="relative py-32 text-center overflow-hidden">
        {/* Efectos sutiles de fondo - solo escritorio */}
        <div className="absolute inset-0 hidden lg:block">
          <div className="absolute top-1/3 left-1/5 w-1 h-1 bg-yellow-300/40 rounded-full animate-twinkle"></div>
          <div className="absolute top-2/5 right-1/5 w-1 h-1 bg-purple-300/30 rounded-full animate-twinkle" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-1/3 left-2/5 w-1 h-1 bg-pink-300/30 rounded-full animate-twinkle" style={{ animationDelay: '6s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Moon className="w-20 h-20 text-purple-300 animate-float" />
              <div className="absolute -top-2 -right-2">
                <Star className="w-8 h-8 text-yellow-300 animate-twinkle" />
              </div>
            </div>
          </div>

          <h1 className="font-cinzel text-6xl md:text-7xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent animate-pulse-mystic">
              Luna Mística
            </span>
          </h1>
          
          <p className="text-2xl text-purple-100/90 mb-4 max-w-3xl mx-auto font-light">
            ✨ Portal al Universo Esotérico ✨
          </p>
          
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Descubre los secretos del cosmos con nuestra colección de cristales sagrados, 
            cartas del tarot ancestrales y servicios de consulta espiritual guiados por la sabiduría lunar
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/productos">
              <Button 
                size="lg" 
                className="mystic-button text-white px-8 py-4 text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Explorar Productos Místicos
              </Button>
            </Link>
            <Link href="/servicios">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
              >
                <Moon className="w-5 h-5 mr-2" />
                Consultar el Cosmos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Secciones principales */}
      <section className="container mx-auto px-4 grid md:grid-cols-2 gap-8 mb-20">
        <Card className="mystic-card group hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 bg-white/95">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3 text-black font-cinzel">
              <Gem className="w-8 h-8 text-purple-600" />
              <span className="text-black">Productos Místicos</span>
            </CardTitle>
            <CardDescription className="text-lg text-gray-900 font-medium">
              Cristales sagrados, tarots ancestrales y elementos mágicos para tu despertar espiritual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-900 font-medium mb-8">
              <li className="flex items-center gap-2">
                <Gem className="w-4 h-4 text-purple-600" />
                Cristales naturales con energía purificada
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-600" />
                Tarots tradicionales y oráculos modernos
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-600" />
                Velas rituales con hierbas consagradas
              </li>
              <li>🌿 Inciensos y aceites esenciales</li>
            </ul>
            <Link href="/productos">
              <Button className="w-full group-hover:bg-purple-700 transition-colors">
                Ver Catálogo Completo
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="mystic-card group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 text-white font-cinzel">
              🔮 Servicios de Lectura
            </CardTitle>
            <CardDescription className="text-lg text-purple-100/80">
              Consultras personalizadas con lecturas de tarot, astrología y guía espiritual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-white/80 mb-6">
              <li>🃏 Lecturas de Tarot personalizadas</li>
              <li>⭐ Cartas natales y astrología</li>
              <li>💫 Consultas espirituales</li>
              <li>📹 Modalidad presencial y virtual</li>
            </ul>
            <Link href="/servicios">
              <Button className="w-full mystic-button">
                Reservar Consulta
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Productos destacados */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white font-cinzel mb-8">
          ⭐ Productos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/productos">
            <Button variant="outline" size="lg">
              Ver Todos los Productos
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar tu viaje espiritual?</h2>
        <p className="text-lg mb-6 opacity-90">
          Únete a nuestra comunidad y recibe consejos exclusivos, ofertas especiales y guías espirituales
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary">
            Suscribirse al Newsletter
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
            Contactar Whatsapp
          </Button>
        </div>
      </section>
    </div>
  )
}