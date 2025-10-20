// Tipos generados automáticamente desde Supabase
// Ejecuta: npx supabase gen types typescript --local > src/types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          content_md: string | null
          cover_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content_md?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content_md?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      coupons: {
        Row: {
          active: boolean
          code: string
          created_at: string
          ends_at: string | null
          id: string
          kind: string | null
          max_uses: number | null
          min_total: number
          starts_at: string | null
          used: number
          value: number
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          ends_at?: string | null
          id?: string
          kind?: string | null
          max_uses?: number | null
          min_total?: number
          starts_at?: string | null
          used?: number
          value: number
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          ends_at?: string | null
          id?: string
          kind?: string | null
          max_uses?: number | null
          min_total?: number
          starts_at?: string | null
          used?: number
          value?: number
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string | null
          qty: number
          unit_price_mxn: number
          variant_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id?: string | null
          qty: number
          unit_price_mxn: number
          variant_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string | null
          qty?: number
          unit_price_mxn?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string
          discount_mxn: number
          id: string
          notes: string | null
          payment_method: string | null
          payment_ref: string | null
          shipping_address: Json | null
          status: string
          tax_mxn: number
          total_mxn: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          discount_mxn?: number
          id?: string
          notes?: string | null
          payment_method?: string | null
          payment_ref?: string | null
          shipping_address?: Json | null
          status?: string
          tax_mxn?: number
          total_mxn: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          discount_mxn?: number
          id?: string
          notes?: string | null
          payment_method?: string | null
          payment_ref?: string | null
          shipping_address?: Json | null
          status?: string
          tax_mxn?: number
          total_mxn?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      product_media: {
        Row: {
          alt: string | null
          created_at: string
          id: string
          product_id: string
          sort: number
          url: string
        }
        Insert: {
          alt?: string | null
          created_at?: string
          id?: string
          product_id: string
          sort?: number
          url: string
        }
        Update: {
          alt?: string | null
          created_at?: string
          id?: string
          product_id?: string
          sort?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_media_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      product_variants: {
        Row: {
          attrs: Json
          created_at: string
          id: string
          product_id: string | null
          sku: string
          stock: number
          weight_g: number
        }
        Insert: {
          attrs?: Json
          created_at?: string
          id?: string
          product_id?: string | null
          sku: string
          stock?: number
          weight_g?: number
        }
        Update: {
          attrs?: Json
          created_at?: string
          id?: string
          product_id?: string | null
          sku?: string
          stock?: number
          weight_g?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          active: boolean
          created_at: string
          description_md: string | null
          featured: boolean
          id: string
          name: string
          price_mxn: number
          slug: string
          tax_included: boolean
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description_md?: string | null
          featured?: boolean
          id?: string
          name: string
          price_mxn: number
          slug: string
          tax_included?: boolean
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description_md?: string | null
          featured?: boolean
          id?: string
          name?: string
          price_mxn?: number
          slug?: string
          tax_included?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      service_bookings: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          service_id: string | null
          slot_id: string | null
          status: string
          updated_at: string
          user_id: string | null
          video_link: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          service_id?: string | null
          slot_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
          video_link?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          service_id?: string | null
          slot_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
          video_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bookings_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "service_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      service_slots: {
        Row: {
          created_at: string
          ends_at: string
          id: string
          service_id: string | null
          starts_at: string
          status: string
        }
        Insert: {
          created_at?: string
          ends_at: string
          id?: string
          service_id?: string | null
          starts_at: string
          status?: string
        }
        Update: {
          created_at?: string
          ends_at?: string
          id?: string
          service_id?: string | null
          starts_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_slots_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          }
        ]
      }
      services: {
        Row: {
          active: boolean
          created_at: string
          description_md: string | null
          duration_min: number
          id: string
          mode: string
          name: string
          price_mxn: number
          slug: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description_md?: string | null
          duration_min: number
          id?: string
          mode?: string
          name: string
          price_mxn: number
          slug: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description_md?: string | null
          duration_min?: number
          id?: string
          mode?: string
          name?: string
          price_mxn?: number
          slug?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          phone: string | null
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          phone?: string | null
          role?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          phone?: string | null
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}