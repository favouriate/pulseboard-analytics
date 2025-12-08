"use client";

import { useRouter } from "next/navigation";
import { useAuthMutations } from "./mutations/use-auth-mutations";
import type { LoginFormData, RegisterFormData } from "@/types";

interface UseAuthReturn {
  isSubmitting: boolean;
  error: string | null;
  signIn: (data: LoginFormData) => Promise<boolean>;
  signUp: (data: RegisterFormData) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  clearError: () => void;
}

/**
 * Custom hook for authentication operations
 * Now uses React Query for state management via service layer
 */
export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const {
    signIn: signInMutation,
    signUp: signUpMutation,
    resetPassword: resetPasswordMutation,
  } = useAuthMutations();

  const signIn = async (data: LoginFormData): Promise<boolean> => {
    const result = await signInMutation.mutateAsync(data);
    return result.success;
  };

  const signUp = async (data: RegisterFormData): Promise<boolean> => {
    const result = await signUpMutation.mutateAsync(data);
    return result.success;
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    const result = await resetPasswordMutation.mutateAsync(email);
    return result.success;
  };

  const clearError = () => {
    // Errors are managed by React Query
    // This is kept for backward compatibility with existing components
  };

  const isSubmitting =
    signInMutation.isPending ||
    signUpMutation.isPending ||
    resetPasswordMutation.isPending;

  const error =
    signInMutation.error?.message ||
    signUpMutation.error?.message ||
    resetPasswordMutation.error?.message ||
    signInMutation.data?.error ||
    signUpMutation.data?.error ||
    resetPasswordMutation.data?.error ||
    null;

  return {
    isSubmitting,
    error,
    signIn,
    signUp,
    resetPassword,
    clearError,
  };
}
