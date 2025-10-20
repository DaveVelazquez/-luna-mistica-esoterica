'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, User, Search, Menu, LogOut, Settings, Moon, Star, Sparkles, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { createClientComponentClient } from '@/lib/supabase'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function AuthNavbar() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const itemCount = useCartStore((state) => state.getItemCount())
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }

    const checkAdminStatus = () => {
      setIsAdmin(isAdminLoggedIn())
    }

    getUser()
    checkAdminStatus()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_: any, session: any) => {
      setUser(session?.user || null)
    })

    // Verificar estado de admin periódicamente
    const adminCheckInterval = setInterval(checkAdminStatus, 5000)

    return () => {
      subscription.unsubscribe()
      clearInterval(adminCheckInterval)
    }
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setShowUserMenu(false)
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="mystic-card border-b border-white/10 sticky top-0 z-50 shadow-lg shadow-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Místico */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Moon className="w-8 h-8 text-purple-400 animate-pulse-mystic" />
              <Star className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-twinkle" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-2xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-blue-200 transition-all duration-300">
                Luna Mística
              </span>
              <span className="text-xs text-purple-300/70 tracking-wider font-light">
                ✨ Portal Esotérico ✨
              </span>
            </div>
          </Link>

          {/* Menu principal - oculto en móvil */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/productos" className="relative group text-white/80 hover:text-white transition-all duration-300">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4" />
                <span>Productos</span>
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link href="/servicios" className="relative group text-white/80 hover:text-white transition-all duration-300">
              <span className="flex items-center space-x-1">
                <Moon className="w-4 h-4" />
                <span>Servicios</span>
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link href="/blog" className="relative group text-white/80 hover:text-white transition-all duration-300">
              <span className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>Blog</span>
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link href="/contacto" className="relative group text-white/80 hover:text-white transition-all duration-300">
              <span>Contacto</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
            </Link>
            {isAdmin && (
              <Link href="/admin/catalogo" className="relative group text-orange-300 hover:text-orange-200 transition-all duration-300">
                <span className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            )}
          </div>

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Link href="/carrito">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 cosmic-glow"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse-mystic shadow-lg shadow-purple-500/50">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Botón de Admin (solo visible si está logueado como admin) */}
            {isAdmin && (
              <Link href="/admin/catalogo">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 rounded-full transition-all duration-300 hover:scale-110 hidden md:flex"
                  title="Panel de Administración"
                >
                  <Shield className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Usuario autenticado o botón de login */}
            {user ? (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="relative text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt="Avatar" 
                      className="h-5 w-5 rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>

                {/* Dropdown menu */}
                {showUserMenu && (
                  <>
                    {/* Overlay para cerrar el menú */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    
                    <div className="absolute right-0 mt-2 w-48 mystic-card border border-purple-500/30 shadow-lg py-1 z-50">
                      <div className="px-3 py-2 border-b border-purple-500/30">
                        <p className="text-sm font-medium text-white">{user.user_metadata?.name || 'Usuario'}</p>
                        <p className="text-xs text-purple-200/70">{user.email}</p>
                      </div>
                      <Link 
                        href="/cuenta" 
                        className="flex items-center px-3 py-2 text-sm text-white hover:bg-purple-500/20"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Mi Cuenta
                      </Link>
                      <Link 
                        href="/cuenta" 
                        className="flex items-center px-3 py-2 text-sm text-white hover:bg-purple-500/20"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Mis Pedidos
                      </Link>
                      {isAdmin && (
                        <Link 
                          href="/admin/catalogo" 
                          className="flex items-center px-3 py-2 text-sm text-orange-300 hover:bg-orange-500/20"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Panel
                        </Link>
                      )}
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center px-3 py-2 text-sm hover:bg-red-500/20 text-red-300"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="hidden md:block">
                  <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register" className="hidden md:block">
                  <Button className="mystic-button">
                    Registrarse
                  </Button>
                </Link>
                <Link href="/admin/login">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 rounded-full transition-all duration-300"
                    title="Acceso de Administrador"
                  >
                    <Shield className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}

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