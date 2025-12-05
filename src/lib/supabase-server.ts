import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getEnv } from "./env";

/**
 * Creates a Supabase client for server-side usage
 * Uses @supabase/ssr for proper cookie handling and session management
 */
export async function createServerClient() {
  const { supabaseUrl, supabaseAnonKey } = getEnv();
  const cookieStore = await cookies();

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          // Cookies can only be set in Server Components, Server Actions, or Route Handlers
          // This is expected behavior in some contexts
        }
      },
    },
  });
}

/**
 * Gets the current user session on the server
 */
export async function getServerSession() {
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

/**
 * Gets the current user on the server
 */
export async function getServerUser() {
  const session = await getServerSession();
  return session?.user ?? null;
}
