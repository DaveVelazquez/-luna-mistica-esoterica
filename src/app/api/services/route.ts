import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-server'

export async function GET() {
  try {
    const supabase = createServerComponentClient()

    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('price_mxn', { ascending: true })

    if (error) {
      console.error('Error fetching services:', error)
      return NextResponse.json(
        { error: 'Error al obtener servicios' },
        { status: 500 }
      )
    }

    return NextResponse.json({ services: services || [] })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}