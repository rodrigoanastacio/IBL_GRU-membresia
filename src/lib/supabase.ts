import { createClient } from '@supabase/supabase-js';

const supabaseUrl = __VITE_SUPABASE_URL__;
const supabaseAnonKey = __VITE_SUPABASE_ANON_KEY__;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
