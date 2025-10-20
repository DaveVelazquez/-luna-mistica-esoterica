'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAdminLoggedIn } from '@/lib/admin-auth'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    if (isAdminLoggedIn()) {
      router.replace('/admin/catalogo')
    } else {
      router.replace('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-white/70">Redirigiendo al panel de administración...</p>
      </div>
    </div>
  )
}