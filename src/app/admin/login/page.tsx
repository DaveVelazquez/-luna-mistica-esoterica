'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, EyeOff, Lock, User } from 'lucide-react'
import { verifyAdminCredentials, createAdminSession } from '@/lib/admin-auth'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Verificar credenciales
      if (verifyAdminCredentials(username, password)) {
        // Crear sesión
        createAdminSession(username)
        
        // Redirigir al panel de administración
        router.push('/admin/catalogo')
        router.refresh()
      } else {
        setError('Credenciales incorrectas. Acceso denegado.')
      }
    } catch (err) {
      setError('Error al iniciar sesión de administrador')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Fondo místico */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900">
        {/* Efectos sutiles de fondo */}
        <div className="absolute inset-0 hidden lg:block">
          <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-yellow-300/30 rounded-full animate-twinkle"></div>
          <div className="absolute top-2/5 right-1/5 w-1 h-1 bg-purple-300/20 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 left-2/5 w-1 h-1 bg-pink-300/20 rounded-full animate-twinkle" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm border-2 border-purple-600 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Shield className="w-16 h-16 text-purple-300" />
              <div className="absolute -top-1 -right-1">
                <Lock className="w-6 h-6 text-yellow-300" />
              </div>
            </div>
          </div>
          
          <div>
            <CardTitle className="text-3xl font-cinzel text-gray-900 drop-shadow-lg">
              🔮 Panel de Administración
            </CardTitle>
            <CardDescription className="text-gray-700 text-base mt-2 font-medium">
              Acceso restringido - Solo administradores autorizados
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-300 bg-red-900/30 border border-red-500/30 rounded-lg backdrop-blur-sm">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <label className="text-base font-bold text-gray-900 drop-shadow-sm">Usuario</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                <Input
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-12 h-12 text-base bg-white/90 border-purple-600 text-gray-900 placeholder-gray-500 focus:border-purple-800 focus:bg-white font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-base font-bold text-gray-900 drop-shadow-sm">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña de administrador"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 text-base bg-white/90 border-purple-600 text-gray-900 placeholder-gray-500 focus:border-purple-800 focus:bg-white font-medium"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 text-gray-600 hover:text-gray-900 hover:bg-purple-200/50"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4">
              <p className="text-sm text-gray-800 font-bold">
                ⚠️ Panel de administración con acceso restringido para gestión del catálogo de productos
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit"
              className="w-full h-12 text-base bg-purple-700 hover:bg-purple-800 text-white font-bold border-0"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verificando acceso...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Acceder al Panel
                </>
              )}
            </Button>

            <Button 
              type="button"
              variant="outline" 
              className="w-full h-12 text-base border-2 border-gray-600 text-gray-800 hover:bg-gray-100 hover:text-gray-900 font-bold bg-white/80"
              onClick={() => router.push('/')}
            >
              Volver a la tienda
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}