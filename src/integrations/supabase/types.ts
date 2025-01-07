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
      business_profiles: {
        Row: {
          address: string | null
          business_name: string
          business_type: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          logo_url: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          business_name: string
          business_type: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          business_name?: string
          business_type?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          contact_id: string | null
          created_at: string | null
          email: string | null
          id: string
          is_synced: boolean | null
          name: string
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_synced?: boolean | null
          name: string
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_synced?: boolean | null
          name?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      digital_receipts: {
        Row: {
          business_id: string | null
          created_at: string | null
          id: string
          items: Json | null
          receipt_number: string
          receipt_url: string | null
          total_amount: number
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          items?: Json | null
          receipt_number: string
          receipt_url?: string | null
          total_amount: number
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          id?: string
          items?: Json | null
          receipt_number?: string
          receipt_url?: string | null
          total_amount?: number
          transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "digital_receipts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "digital_receipts_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          business_id: string | null
          created_at: string | null
          due_date: string | null
          id: string
          invoice_number: string
          items: Json | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          business_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          invoice_number: string
          items?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          business_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          items?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_programs: {
        Row: {
          business_id: string
          created_at: string | null
          id: string
          points_per_dollar: number | null
          program_name: string
          updated_at: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          id?: string
          points_per_dollar?: number | null
          program_name: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          id?: string
          points_per_dollar?: number | null
          program_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_programs_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      points_activities: {
        Row: {
          activity_type: string
          created_at: string | null
          id: string
          points_earned: number
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          id?: string
          points_earned: number
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          id?: string
          points_earned?: number
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          note: string | null
          recipient_bank_info: Json | null
          recipient_id: string | null
          recipient_identifier: string
          sender_id: string
          status: string
          transfer_method: string | null
          type: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          note?: string | null
          recipient_bank_info?: Json | null
          recipient_id?: string | null
          recipient_identifier: string
          sender_id: string
          status?: string
          transfer_method?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          note?: string | null
          recipient_bank_info?: Json | null
          recipient_id?: string | null
          recipient_identifier?: string
          sender_id?: string
          status?: string
          transfer_method?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_points: {
        Row: {
          created_at: string | null
          id: string
          next_reward_threshold: number | null
          total_points: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          next_reward_threshold?: number | null
          total_points?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          next_reward_threshold?: number | null
          total_points?: number | null
          updated_at?: string | null
          user_id?: string
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
