import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }
  if (_client) return _client;
  let baseUrl = SUPABASE_URL.trim().replace(/\/+$/, "");
  try {
    const parsed = new URL(baseUrl);
    const path = parsed.pathname.replace(/\/+$/, "");
    if (!path || path === "/" || path.startsWith("/auth/v1") || path.startsWith("/rest/v1")) {
      baseUrl = parsed.origin;
    } else {
      baseUrl = `${parsed.origin}${path}`;
    }
  } catch {
    throw new Error("SUPABASE_URL_INVALID");
  }

  _client = createClient(baseUrl, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return _client;
}
