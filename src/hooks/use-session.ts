"use client";

import { useSessionQuery } from "./queries/use-session-query";
import type { User } from "@supabase/supabase-js";

interface UseSessionReturn {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
}

/**
 * Hook for managing user session
 * Now uses React Query for caching and state management
 * @deprecated Use useSessionQuery directly for better type safety and more features
 */
export function useSession(): UseSessionReturn {
  const { user, loading, error, signOut, isSigningOut } = useSessionQuery();

  return {
    user,
    loading: loading || isSigningOut,
    error,
    signOut,
  };
}
