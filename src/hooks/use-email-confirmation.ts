"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase";
import { getAuthTokensFromUrl, clearUrlHash } from "@/lib/auth-utils";

interface UseEmailConfirmationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

interface UseEmailConfirmationReturn {
  isVerifying: boolean;
  verifyEmail: () => Promise<boolean>;
}

/**
 * Hook for handling email confirmation from Supabase auth links
 * Automatically verifies tokens from URL hash and sets session
 */
export function useEmailConfirmation(
  options: UseEmailConfirmationOptions = {}
): UseEmailConfirmationReturn {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [isVerifying, setIsVerifying] = React.useState(false);
  
  // Store options in ref to avoid dependency issues and infinite loops
  const optionsRef = React.useRef(options);
  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const verifyEmail = React.useCallback(async (): Promise<boolean> => {
    const tokens = getAuthTokensFromUrl();

    // Only verify if we have signup tokens in the URL
    if (!tokens || tokens.type !== "signup") {
      return false;
    }

    setIsVerifying(true);

    try {
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      });

      if (sessionError) {
        const error = new Error(sessionError.message);
        optionsRef.current.onError?.(error);
        return false;
      }

      clearUrlHash();

      if (optionsRef.current.redirectTo) {
        router.push(optionsRef.current.redirectTo);
      } else {
        optionsRef.current.onSuccess?.();
      }

      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      optionsRef.current.onError?.(error);
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, [router, supabase]); // Removed 'options' from dependencies to prevent infinite loops

  return {
    isVerifying,
    verifyEmail,
  };
}

