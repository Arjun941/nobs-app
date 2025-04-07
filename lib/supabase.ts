import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

// Make sure we have default values that are actual strings, not undefined
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aesaleeivxogbwspurwl.supabase.co'
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlc2FsZWVpdnhvZ2J3c3B1cndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NTg5OTgsImV4cCI6MjA1ODMzNDk5OH0.5kxk3WDuwrCcVU_O_jlNoAjgxIWBnVqq3lluApJYx4s'
export const STORAGE_BUCKET = "images"

// Create client with explicit string values to avoid undefined issues
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  }
)

// Create a separate client for server components
export const createServerClient = () => {
  // Use the public vars as guaranteed values
  const url = process.env.SUPABASE_URL || supabaseUrl
  const key = process.env.SUPABASE_ANON_KEY || supabaseAnonKey
  
  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
    },
  })
}

