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
      posts: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string | null
          author_id: string | null
          published: boolean
          image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title?: string
          content?: string | null
          author_id?: string | null
          published?: boolean
          image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          content?: string | null
          author_id?: string | null
          published?: boolean
          image_url?: string | null
        }
      }
      shares: {
        Row: {
          id: string
          created_at: string
          post_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          post_id: string
        }
        Update: {
          id?: string
          created_at?: string
          post_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
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
  }
}
