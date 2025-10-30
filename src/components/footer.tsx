import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🔮</span>
              <span className="text-xl font-bold">Tienda Esotérica</span>
            </div>
            <p className="text-purple-200 mb-4 max-w-md">
              Tu tienda especializada en productos esotéricos y servicios de consulta espiritual. 
              Encuentra todo lo que necesitas para tu crecimiento personal y espiritual.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-purple-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-purple-200">
              <li>
                <Link href="/productos" className="hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-white transition-colors">
                  Servicios de Lectura
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog Esotérico
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-purple-200">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>lunatiendaesoterica@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+52 55 56 42 43 41</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Mérida, Yucatán</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria y derechos */}
        <div className="border-t border-purple-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-200 text-sm">
            © 2025 Tienda Esotérica. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacidad" className="text-purple-200 hover:text-white text-sm transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-purple-200 hover:text-white text-sm transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}