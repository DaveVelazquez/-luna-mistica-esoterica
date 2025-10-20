'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Product } from '@/types'
import { useCartStore } from '@/store/cart-store'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const mainImage = product.media?.[0]?.url || '/placeholder-product.jpg'
  
  const handleAddToCart = () => {
    // Crear una variante por defecto si no existe
    const defaultVariant = product.variants?.[0] || {
      id: `${product.id}-default`,
      product_id: product.id,
      sku: `${product.slug}-default`,
      stock: 100,
      weight_g: 0,
      attrs: {}
    }
    
    addItem(product, defaultVariant, 1)
  }
  
  return (
    <Card className="mystic-card group hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 overflow-hidden">
      <CardContent className="p-0 relative">
        <div className="relative overflow-hidden">
          <Image
            src={mainImage}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay místico */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {product.featured && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              ✨ Destacado ✨
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 rounded-full cosmic-glow"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6">
          <Link href={`/productos/${product.slug}`}>
            <h3 className="font-semibold text-lg mb-3 line-clamp-2 text-white group-hover:text-purple-200 transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              ${product.price_mxn.toFixed(2)}
            </span>
            {product.tax_included && (
              <span className="text-xs text-purple-200/70">✨ Energizado</span>
            )}
          </div>
          
          <p className="text-white/70 text-sm line-clamp-3 mb-6 leading-relaxed">
            {product.description_md?.substring(0, 100)}...
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 px-6 pb-6">
        <Button 
          className="w-full mystic-button text-white font-semibold py-3"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}