import type { Metadata } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import { AuthNavbar } from '@/components/auth-navbar'
import { Footer } from '@/components/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap'
})

export const metadata: Metadata = {
  title: '🌙 Luna Mística | Tienda Esotérica & Servicios Místicos',
  description: '✨ Descubre el universo místico con nuestra colección de cristales, cartas del tarot, velas sagradas y lecturas profesionales. Tu portal al mundo esotérico.',
  keywords: 'tarot, esoterismo, cristales, velas, lecturas místicas, astrología, luna nueva, chakras, sanación, energía',
  openGraph: {
    title: '🌙 Luna Mística - Tienda Esotérica',
    description: '✨ Tu portal al mundo místico y esotérico',
    images: ['/logo-mystic.png'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${cinzel.variable}`}>
      <body className={`${inter.className} relative overflow-x-hidden`}>
        {/* Estrellas flotantes de fondo */}
        <div className="floating-stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
        
        {/* Partículas sutiles de fondo */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-8 animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-8 animate-float" style={{ animationDelay: '6s' }}></div>
        </div>

        <div className="relative z-10 min-h-screen text-white">
          <AuthNavbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}