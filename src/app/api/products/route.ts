import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category')
    const minPrice = searchParams.get('min') ? parseFloat(searchParams.get('min')!) : null
    const maxPrice = searchParams.get('max') ? parseFloat(searchParams.get('max')!) : null
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const featured = searchParams.get('featured') === 'true'

    const supabase = createServerComponentClient()

    let query = supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*),
        media:product_media(*)
      `)
      .eq('active', true)

    // Filtros
    if (search) {
      query = query.or(`name.ilike.%${search}%,description_md.ilike.%${search}%`)
    }

    if (minPrice !== null) {
      query = query.gte('price_mxn', minPrice)
    }

    if (maxPrice !== null) {
      query = query.lte('price_mxn', maxPrice)
    }

    if (featured) {
      query = query.eq('featured', true)
    }

    // Paginación
    const offset = (page - 1) * limit
    query = query.range(offset, offset + limit - 1)

    // Ordenamiento
    query = query.order('featured', { ascending: false })
    query = query.order('created_at', { ascending: false })

    const { data: products, error, count } = await query

    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json(
        { error: 'Error al obtener productos' },
        { status: 500 }
      )
    }

    // Contar total para paginación
    const { count: totalCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('active', true)

    return NextResponse.json({
      products: products || [],
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        pages: Math.ceil((totalCount || 0) / limit)
      }
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}