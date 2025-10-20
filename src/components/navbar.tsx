import Link from 'next/link'
import { ShoppingCart, User, Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'

export function Navbar() {
  const itemCount = useCartStore((state) => state.getItemCount())

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🔮</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tienda Esotérica
            </span>
          </Link>

          {/* Menu principal - oculto en móvil */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/productos" className="text-gray-700 hover:text-purple-600 transition-colors">
              Productos
            </Link>
            <Link href="/servicios" className="text-gray-700 hover:text-purple-600 transition-colors">
              Servicios
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-purple-600 transition-colors">
              Blog
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-purple-600 transition-colors">
              Contacto
            </Link>
          </div>

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            <Link href="/carrito">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* Menú móvil */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}