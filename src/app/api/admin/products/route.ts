import { NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-server'

// GET - Obtener todos los productos (para admin)
export async function GET() {
  try {
    const supabase = createServerComponentClient()
    
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false }) as any
    
    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ products })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// POST - Crear nuevo producto
export async function POST(request: Request) {
  try {
    const supabase = createServerComponentClient()
    const body = await request.json()
    
    const { data: product, error } = await supabase
      .from('products')
      .insert([body] as any)
      .select()
      .single() as any
    
    if (error) {
      console.error('Error creating product:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// PUT - Actualizar producto
export async function PUT(request: Request) {
  try {
    const supabase = createServerComponentClient()
    const body = await request.json()
    const { id, ...updateData } = body
    
    const { data: product, error } = await supabase
      .from('products')
      .update(updateData as any)
      .eq('id', id)
      .select()
      .single() as any
    
    if (error) {
      console.error('Error updating product:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ product })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// DELETE - Eliminar producto
export async function DELETE(request: Request) {
  try {
    const supabase = createServerComponentClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID de producto requerido' }, { status: 400 })
    }
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting product:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
