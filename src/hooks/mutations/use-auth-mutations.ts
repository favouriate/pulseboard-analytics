"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import type { LoginFormData, RegisterFormData } from "@/types";

const SESSION_QUERY_KEY = ["session"];

/**
 * Hook for authentication mutations with React Query
 */
export function useAuthMutations() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const signInMutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (result) => {
      if (result.success) {
        // Invalidate and refetch session
        queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
        router.push("/dashboard");
      }
    },
  });

  const signUpMutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: (result) => {
      if (result.success && !result.requiresConfirmation) {
        // Auto sign-in successful
        queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
        router.push("/dashboard");
      }
      // If requires confirmation, stay on page to show success message
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: authService.resetPassword,
  });

  return {
    signIn: {
      mutate: signInMutation.mutate,
      mutateAsync: signInMutation.mutateAsync,
      isPending: signInMutation.isPending,
      error: signInMutation.error,
      data: signInMutation.data,
    },
    signUp: {
      mutate: signUpMutation.mutate,
      mutateAsync: signUpMutation.mutateAsync,
      isPending: signUpMutation.isPending,
      error: signUpMutation.error,
      data: signUpMutation.data,
    },
    resetPassword: {
      mutate: resetPasswordMutation.mutate,
      mutateAsync: resetPasswordMutation.mutateAsync,
      isPending: resetPasswordMutation.isPending,
      error: resetPasswordMutation.error,
      data: resetPasswordMutation.data,
    },
  };
}

