import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

// Provide fallback values to prevent build errors
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://aesaleeivxogbwspurwl.supabase.co'
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
export const STORAGE_BUCKET = "images"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
})

// Create a separate client for server components
export const createServerClient = () => {
  // Use the public vars as fallbacks to prevent build errors
  const url = process.env.SUPABASE_URL ?? supabaseUrl
  const key = process.env.SUPABASE_ANON_KEY ?? supabaseAnonKey
  
  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
    },
  })
}

