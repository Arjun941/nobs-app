export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          content: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          content?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          content?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          post_id: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          created_at?: string
        }
      }
      shares: {
        Row: {
          id: string
          post_id: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      posts_with_metrics: {
        Row: {
          id: string
          content: string | null
          image_url: string | null
          created_at: string
          likes_count: number
          shares_count: number
        }
      }
    }
    Functions: {}
  }
}

export type PostWithMetrics = Database["public"]["Views"]["posts_with_metrics"]["Row"]
export type Post = Database["public"]["Tables"]["posts"]["Row"]
export type Like = Database["public"]["Tables"]["likes"]["Row"]
export type Share = Database["public"]["Tables"]["shares"]["Row"]

