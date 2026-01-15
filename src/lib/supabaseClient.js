import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/* 🔵 MAIN CLIENT (Admin / App usage) */
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

/* 🟢 SECOND CLIENT (NO SESSION SIDE EFFECTS) */
export const supabaseNoSession = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);
