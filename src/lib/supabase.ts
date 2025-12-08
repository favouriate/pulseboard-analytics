import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import { getEnv } from "./env";

/**
 * Creates a new Supabase client for browser-side usage
 * Use this in client components to ensure fresh client instances
 * Uses @supabase/ssr for proper cookie handling
 */
export function createBrowserClient() {
  // Validate env vars at call time to avoid module-level execution during build/fast refresh
  const { supabaseUrl, supabaseAnonKey } = getEnv();
  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Legacy export removed - all code now uses createBrowserClient() directly
// This prevents module-level execution during build time
