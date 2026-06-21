import { createClient } from '@supabase/supabase-js'

// 替換為您的 Supabase Project URL
const supabaseUrl = 'https://sobddjzuzjmvsusnhtno.supabase.co'

// 替換為您的 Supabase anon public key
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvYmRkanp1emptdnN1c25odG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNDAwNzQsImV4cCI6MjA5NzYxNjA3NH0.lDsinGYGsLXjWjHkNBUKZSQ3sn6qSxNQLKyU6W_MRBI'

// 建立並匯出 Supabase 客戶端實體
export const supabase = createClient(supabaseUrl, supabaseAnonKey)