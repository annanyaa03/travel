import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log('--- Supabase Config ---');
console.log('URL Loaded:', !!supabaseUrl);
console.log('Service Key Loaded:', !!supabaseKey);
console.log('Anon Key Loaded:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseKey || !supabaseAnonKey) {
  throw new Error('MISSING SUPABASE CREDENTIALS: Check your .env file for SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

// Test connection on startup
const testConnection = async () => {
  try {
    const { error } = await supabase.from('destinations').select('id').limit(1);
    if (error) throw error;
    console.log('✅ Supabase connected successfully');
  } catch (err) {
    console.error('❌ Supabase connection failed:', err.message);
  }
};

testConnection();

export default supabase;
