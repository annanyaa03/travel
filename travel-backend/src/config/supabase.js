import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

/**
 * Supabase client instance using Service Role Key for administrative tasks.
 * Use this for backend operations that bypass RLS.
 */
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Supabase client instance using Anon Key for client-side like operations.
 */
export const supabaseAnon = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
