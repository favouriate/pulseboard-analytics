import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import { getEnv } from "./env";

// Validate environment variables at module load time
const { supabaseUrl, supabaseAnonKey } = getEnv();

/**
 * Creates a new Supabase client for browser-side usage
 * Use this in client components to ensure fresh client instances
 * Uses @supabase/ssr for proper cookie handling
 */
export function createBrowserClient() {
  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Legacy export for backward compatibility (deprecated, use createBrowserClient)
export const supabase = createBrowserClient();
