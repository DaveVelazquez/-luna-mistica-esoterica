import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database.types'

// Configuración con valores por defecto para evitar errores
const DEMO_URL = 'https://demo-project.supabase.co'
const DEMO_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

// Obtener variables de entorno con fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEMO_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEMO_KEY

// Cliente básico para uso general
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== 'undefined', // Solo persistir en el cliente
    autoRefreshToken: false, // Desactivar para demo
  }
})

// Cliente para el navegador (SSR compatible)
export function createClientComponentClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Función para verificar si Supabase está configurado correctamente
export function isSupabaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== DEMO_URL
  )
}

// Función para mostrar advertencia si no está configurado
export function checkSupabaseConfig() {
  if (!isSupabaseConfigured()) {
    if (typeof window !== 'undefined') {
      console.warn('🌙 Tienda Esotérica - Modo Demo Activado')
      console.warn('📝 Para usar Supabase real, configura las variables en .env.local')
    }
    return false
  }
  return true
}

// Función auxiliar para manejar errores de auth
export function handleAuthError(error: any) {
  if (!isSupabaseConfigured()) {
    console.log('🔮 Simulando autenticación en modo demo')
    return null
  }
  console.error('Error de autenticación:', error)
  return error
}