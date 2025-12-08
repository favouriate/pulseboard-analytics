"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { createBrowserClient } from "@/lib/supabase";
import { useEffect } from "react";
import type { User } from "@supabase/supabase-js";

const SESSION_QUERY_KEY = ["session"];

/**
 * Hook for fetching and managing user session with React Query
 */
export function useSessionQuery() {
  const supabase = createBrowserClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const result = await authService.getSession();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.session;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Listen for auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      refetch();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, refetch]);

  const queryClient = useQueryClient();
  const router = useRouter();

  const signOutMutation = useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.setQueryData(SESSION_QUERY_KEY, null);
      router.push("/");
    },
  });

  return {
    session: data,
    user: data?.user ?? null,
    loading: isLoading,
    error: error as Error | null,
    signOut: signOutMutation.mutateAsync,
    isSigningOut: signOutMutation.isPending,
  };
}

