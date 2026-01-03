import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fail-fast if Supabase environment variables are not set.
// This prevents the application from running with a misconfigured or insecure state.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('CRITICAL: Missing Supabase environment variables. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
