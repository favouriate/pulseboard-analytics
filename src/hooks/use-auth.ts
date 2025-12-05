"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { createBrowserClient } from "@/lib/supabase";
import { getErrorMessage, logError } from "@/lib/errors";
import type { LoginFormData, RegisterFormData } from "@/types";

function getAppUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

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
 * Provides consistent error handling and state management
 */
export function useAuth(): UseAuthReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createBrowserClient();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const signIn = useCallback(
    async (data: LoginFormData): Promise<boolean> => {
      setError(null);
      setIsSubmitting(true);

      try {
        const { data: authData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

        if (signInError) {
          setError(getErrorMessage(signInError));
          return false;
        }

        if (authData.user && authData.session) {
          router.push("/dashboard");
          return true;
        }

        setError("Sign in failed. Please try again.");
        return false;
      } catch (err) {
        logError(err, "signIn");
        setError(getErrorMessage(err));
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [router, supabase]
  );

  const signUp = useCallback(
    async (data: RegisterFormData): Promise<boolean> => {
      setError(null);
      setIsSubmitting(true);

      try {
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email: data.email,
            password: data.password,
          });

        if (signUpError) {
          setError(getErrorMessage(signUpError));
          return false;
        }

        if (!signUpData.user) {
          setError("Registration failed. Please try again.");
          return false;
        }

        if (signUpData.session) {
          router.push("/dashboard");
          return true;
        }

        return true;
      } catch (err) {
        logError(err, "signUp");
        setError(getErrorMessage(err));
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [router, supabase]
  );

  const resetPassword = useCallback(
    async (email: string): Promise<boolean> => {
      setError(null);
      setIsSubmitting(true);

      try {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${getAppUrl()}/auth/reset-password`,
        });

        if (resetError) {
          setError(getErrorMessage(resetError));
          return false;
        }

        return true;
      } catch (err) {
        logError(err, "resetPassword");
        setError(getErrorMessage(err));
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [supabase]
  );

  return {
    isSubmitting,
    error,
    signIn,
    signUp,
    resetPassword,
    clearError,
  };
}

