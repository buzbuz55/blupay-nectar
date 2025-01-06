export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_keys: {
        Row: {
          conversation_id: string
          created_at: string
          encrypted_key: string
          participant_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          encrypted_key: string
          participant_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          encrypted_key?: string
          participant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_keys_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          supplier_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          supplier_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          supplier_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      imported_products: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          original_url: string
          price: number | null
          status: string | null
          supplier_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          original_url: string
          price?: number | null
          status?: string | null
          supplier_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          original_url?: string
          price?: number | null
          status?: string | null
          supplier_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "imported_products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          read: boolean | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          read?: boolean | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          read?: boolean | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      print_orders: {
        Row: {
          created_at: string
          id: string
          logo_path: string
          notes: string | null
          product_type: string
          quantity: number
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_path: string
          notes?: string | null
          product_type: string
          quantity: number
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_path?: string
          notes?: string | null
          product_type?: string
          quantity?: number
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          batch_import_id: string | null
          category_id: string | null
          cost_per_item: number | null
          created_at: string
          description: string | null
          handle: string | null
          id: string
          image_url: string | null
          moq: number | null
          name: string
          price: number | null
          product_type: string | null
          production_days: number | null
          published: boolean | null
          seo_description: string | null
          seo_title: string | null
          sku: string | null
          status: string | null
          stock: number | null
          supplier_contact: string | null
          supplier_id: string | null
          tags: string[] | null
          user_id: string | null
          variant_fulfillment_service: string | null
          variant_inventory_policy: string | null
          variant_requires_shipping: boolean | null
          variant_taxable: boolean | null
          vendor: string | null
          video_url: string | null
        }
        Insert: {
          batch_import_id?: string | null
          category_id?: string | null
          cost_per_item?: number | null
          created_at?: string
          description?: string | null
          handle?: string | null
          id?: string
          image_url?: string | null
          moq?: number | null
          name: string
          price?: number | null
          product_type?: string | null
          production_days?: number | null
          published?: boolean | null
          seo_description?: string | null
          seo_title?: string | null
          sku?: string | null
          status?: string | null
          stock?: number | null
          supplier_contact?: string | null
          supplier_id?: string | null
          tags?: string[] | null
          user_id?: string | null
          variant_fulfillment_service?: string | null
          variant_inventory_policy?: string | null
          variant_requires_shipping?: boolean | null
          variant_taxable?: boolean | null
          vendor?: string | null
          video_url?: string | null
        }
        Update: {
          batch_import_id?: string | null
          category_id?: string | null
          cost_per_item?: number | null
          created_at?: string
          description?: string | null
          handle?: string | null
          id?: string
          image_url?: string | null
          moq?: number | null
          name?: string
          price?: number | null
          product_type?: string | null
          production_days?: number | null
          published?: boolean | null
          seo_description?: string | null
          seo_title?: string | null
          sku?: string | null
          status?: string | null
          stock?: number | null
          supplier_contact?: string | null
          supplier_id?: string | null
          tags?: string[] | null
          user_id?: string | null
          variant_fulfillment_service?: string | null
          variant_inventory_policy?: string | null
          variant_requires_shipping?: boolean | null
          variant_taxable?: boolean | null
          vendor?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          business_type: string | null
          company_name: string | null
          created_at: string
          full_name: string | null
          id: string
        }
        Insert: {
          business_type?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id: string
        }
        Update: {
          business_type?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      rfq_requests: {
        Row: {
          attachment_path: string | null
          created_at: string
          detailed_requirements: string
          email: string
          id: string
          product_category: string
          product_name: string
          quantity: number
          status: string | null
          user_id: string | null
        }
        Insert: {
          attachment_path?: string | null
          created_at?: string
          detailed_requirements: string
          email: string
          id?: string
          product_category: string
          product_name: string
          quantity: number
          status?: string | null
          user_id?: string | null
        }
        Update: {
          attachment_path?: string | null
          created_at?: string
          detailed_requirements?: string
          email?: string
          id?: string
          product_category?: string
          product_name?: string
          quantity?: number
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      supplier_notifications: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          customer_id: string | null
          id: string
          message: string | null
          product_id: string | null
          read: boolean | null
          supplier_id: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          message?: string | null
          product_id?: string | null
          read?: boolean | null
          supplier_id?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          message?: string | null
          product_id?: string | null
          read?: boolean | null
          supplier_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_notifications_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          business_type: string | null
          company_name: string
          contact_person: string | null
          created_at: string
          id: string
          phone: string | null
          verified: boolean | null
        }
        Insert: {
          address?: string | null
          business_type?: string | null
          company_name: string
          contact_person?: string | null
          created_at?: string
          id: string
          phone?: string | null
          verified?: boolean | null
        }
        Update: {
          address?: string | null
          business_type?: string | null
          company_name?: string
          contact_person?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          verified?: boolean | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never