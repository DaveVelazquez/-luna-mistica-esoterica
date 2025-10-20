/**
 * Sistema de autenticación para administrador
 * Credenciales hardcodeadas para acceso al panel de administración
 */

const ADMIN_CREDENTIALS = {
  username: 'EsortericUserAdm',
  password: 'Pa$$.word666'
}

const ADMIN_SESSION_KEY = 'luna_mistica_admin_session'

export interface AdminSession {
  username: string
  loginTime: number
  expiresAt: number
}

/**
 * Verifica las credenciales del administrador
 */
export function verifyAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

/**
 * Crea una sesión de administrador
 */
export function createAdminSession(username: string): AdminSession {
  const now = Date.now()
  const session: AdminSession = {
    username,
    loginTime: now,
    expiresAt: now + (24 * 60 * 60 * 1000) // 24 horas
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
    
    // También crear cookie para el middleware
    const expirationDate = new Date(session.expiresAt)
    document.cookie = `luna_mistica_admin_session=${JSON.stringify(session)}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`
  }
  
  return session
}

/**
 * Obtiene la sesión actual del administrador
 */
export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null
  
  try {
    const sessionData = localStorage.getItem(ADMIN_SESSION_KEY)
    if (!sessionData) return null
    
    const session: AdminSession = JSON.parse(sessionData)
    
    // Verificar si la sesión ha expirado
    if (Date.now() > session.expiresAt) {
      clearAdminSession()
      return null
    }
    
    return session
  } catch (error) {
    console.error('Error al obtener sesión de admin:', error)
    return null
  }
}

/**
 * Verifica si hay una sesión de administrador activa
 */
export function isAdminLoggedIn(): boolean {
  return getAdminSession() !== null
}

/**
 * Cierra la sesión del administrador
 */
export function clearAdminSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_SESSION_KEY)
    
    // También limpiar la cookie
    document.cookie = 'luna_mistica_admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }
}

/**
 * Renueva la sesión del administrador
 */
export function renewAdminSession(): boolean {
  const session = getAdminSession()
  if (!session) return false
  
  const renewedSession = createAdminSession(session.username)
  return true
}

/**
 * Middleware para verificar autenticación de admin en el cliente
 */
export function requireAdminAuth(): AdminSession | null {
  const session = getAdminSession()
  
  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login'
    }
    return null
  }
  
  return session
}