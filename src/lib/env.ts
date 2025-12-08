/**
 * Environment variable validation
 * Validates required environment variables at build time
 */

const requiredEnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const;

/**
 * Validates that all required environment variables are present
 * Skips validation during build time to allow static page generation
 */
export function validateEnv(): void {
  // Skip validation during build time - only validate at runtime
  // This allows Next.js to statically generate pages without env vars
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return;
  }

  const missing: string[] = [];

  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
        "Please check your .env.local file."
    );
  }
}

/**
 * Get validated environment variables
 */
export function getEnv() {
  validateEnv();
  return {
    supabaseUrl: requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseAnonKey: requiredEnvVars.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  };
}

