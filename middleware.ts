import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
        },
      },
    }
  )

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes
  const protectedRoutes = ['/perfil', '/pedidos', '/carrito/checkout']
  const adminRoutes = ['/admin']
  const adminLoginRoute = '/admin/login'

  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  const isAdminRoute = adminRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route) && request.nextUrl.pathname !== adminLoginRoute
  )

  // Redirect to login if not authenticated (for user routes)
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Check admin access for admin routes (except login)
  if (isAdminRoute) {
    // Verificar si hay sesión de administrador en las cookies
    const adminSessionCookie = request.cookies.get('luna_mistica_admin_session')
    
    if (!adminSessionCookie) {
      // No hay sesión de admin, redirigir al login de admin
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      const adminSession = JSON.parse(adminSessionCookie.value)
      const now = Date.now()
      
      // Verificar si la sesión ha expirado
      if (now > adminSession.expiresAt) {
        // Sesión expirada, limpiar cookie y redirigir
        const response = NextResponse.redirect(new URL('/admin/login', request.url))
        response.cookies.delete('luna_mistica_admin_session')
        return response
      }
      
      // Verificar credenciales
      if (adminSession.username !== 'EsortericUserAdm') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    } catch (error) {
      // Error al parsear la sesión, redirigir al login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}