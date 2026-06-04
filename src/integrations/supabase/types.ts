export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      access_requests: {
        Row: {
          access_code: string | null
          approved_at: string | null
          created_at: string
          full_name: string
          id: string
          status: string
          whatsapp: string
        }
        Insert: {
          access_code?: string | null
          approved_at?: string | null
          created_at?: string
          full_name: string
          id?: string
          status?: string
          whatsapp: string
        }
        Update: {
          access_code?: string | null
          approved_at?: string | null
          created_at?: string
          full_name?: string
          id?: string
          status?: string
          whatsapp?: string
        }
        Relationships: []
      }
      agent_settings: {
        Row: {
          contact: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          contact?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Update: {
          contact?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      app_users: {
        Row: {
          access_code: string
          banned: boolean
          created_at: string
          full_name: string
          id: string
          last_login: string | null
          session_expires_at: string | null
          session_token: string | null
          whatsapp: string
        }
        Insert: {
          access_code: string
          banned?: boolean
          created_at?: string
          full_name: string
          id?: string
          last_login?: string | null
          session_expires_at?: string | null
          session_token?: string | null
          whatsapp: string
        }
        Update: {
          access_code?: string
          banned?: boolean
          created_at?: string
          full_name?: string
          id?: string
          last_login?: string | null
          session_expires_at?: string | null
          session_token?: string | null
          whatsapp?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_users_access_code_fkey"
            columns: ["access_code"]
            isOneToOne: true
            referencedRelation: "access_requests"
            referencedColumns: ["access_code"]
          },
        ]
      }
      cards: {
        Row: {
          answer: string
          created_at: string
          difficulty: string
          id: string
          order_index: number
          question: string
          topic_id: string
        }
        Insert: {
          answer: string
          created_at?: string
          difficulty?: string
          id?: string
          order_index?: number
          question: string
          topic_id: string
        }
        Update: {
          answer?: string
          created_at?: string
          difficulty?: string
          id?: string
          order_index?: number
          question?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_settings: {
        Row: {
          group_price: number
          id: number
          individual_price: number
          updated_at: string
        }
        Insert: {
          group_price?: number
          id?: number
          individual_price?: number
          updated_at?: string
        }
        Update: {
          group_price?: number
          id?: number
          individual_price?: number
          updated_at?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          admin_response: string | null
          app_user_id: string | null
          created_at: string
          id: string
          message: string
          responded_at: string | null
          status: string
          subject: string
          user_full_name: string
          user_whatsapp: string | null
        }
        Insert: {
          admin_response?: string | null
          app_user_id?: string | null
          created_at?: string
          id?: string
          message: string
          responded_at?: string | null
          status?: string
          subject: string
          user_full_name: string
          user_whatsapp?: string | null
        }
        Update: {
          admin_response?: string | null
          app_user_id?: string | null
          created_at?: string
          id?: string
          message?: string
          responded_at?: string | null
          status?: string
          subject?: string
          user_full_name?: string
          user_whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_app_user_id_fkey"
            columns: ["app_user_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          app_name: string
          callmebot_url: string | null
          id: number
          screenshot_protection: boolean
          support_email: string
          updated_at: string
        }
        Insert: {
          app_name?: string
          callmebot_url?: string | null
          id?: number
          screenshot_protection?: boolean
          support_email?: string
          updated_at?: string
        }
        Update: {
          app_name?: string
          callmebot_url?: string | null
          id?: number
          screenshot_protection?: boolean
          support_email?: string
          updated_at?: string
        }
        Relationships: []
      }
      topics: {
        Row: {
          created_at: string
          description: string | null
          free_preview_limit: number
          id: string
          name: string
          order_index: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          free_preview_limit?: number
          id?: string
          name: string
          order_index?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          free_preview_limit?: number
          id?: string
          name?: string
          order_index?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
