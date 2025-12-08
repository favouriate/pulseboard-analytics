import { createBrowserClient } from "@/lib/supabase";
import { getErrorMessage } from "@/lib/errors";
import type { LoginFormData, RegisterFormData } from "@/types";

function getAppUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export interface SignInResult {
  success: boolean;
  user?: { id: string; email?: string };
  error?: string;
}

export interface SignUpResult {
  success: boolean;
  user?: { id: string; email?: string };
  requiresConfirmation?: boolean;
  error?: string;
}

export interface ResetPasswordResult {
  success: boolean;
  error?: string;
}

import type { Session } from "@supabase/supabase-js";

export interface SessionResult {
  session: Session | null;
  error: string | null;
}

export interface SignOutResult {
  success: boolean;
  error: string | null;
}

/**
 * Authentication service
 * Handles all authentication-related API calls
 */
export const authService = {
  /**
   * Sign in with email and password
   */
  async signIn(data: LoginFormData): Promise<SignInResult> {
    try {
      const supabase = createBrowserClient();
      const { data: authData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (signInError) {
        return {
          success: false,
          error: getErrorMessage(signInError),
        };
      }

      if (authData.user && authData.session) {
        return {
          success: true,
          user: {
            id: authData.user.id,
            email: authData.user.email,
          },
        };
      }

      return {
        success: false,
        error: "Sign in failed. Please try again.",
      };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error),
      };
    }
  },

  /**
   * Sign up with email and password
   */
  async signUp(data: RegisterFormData): Promise<SignUpResult> {
    try {
      const supabase = createBrowserClient();
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${getAppUrl()}/auth/login`,
          },
        });

      if (signUpError) {
        return {
          success: false,
          error: getErrorMessage(signUpError),
        };
      }

      if (!signUpData.user) {
        return {
          success: false,
          error: "Registration failed. Please try again.",
        };
      }

      return {
        success: true,
        user: {
          id: signUpData.user.id,
          email: signUpData.user.email,
        },
        requiresConfirmation: !signUpData.session,
      };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error),
      };
    }
  },

  /**
   * Reset password via email
   */
  async resetPassword(email: string): Promise<ResetPasswordResult> {
    try {
      const supabase = createBrowserClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${getAppUrl()}/auth/reset-password`,
        }
      );

      if (resetError) {
        return {
          success: false,
          error: getErrorMessage(resetError),
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error),
      };
    }
  },

  /**
   * Get current session
   */
  async getSession(): Promise<SessionResult> {
    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase.auth.getSession();
      return {
        session: data.session,
        error: error ? getErrorMessage(error) : null,
      };
    } catch (error) {
      return {
        session: null,
        error: getErrorMessage(error),
      };
    }
  },

  /**
   * Sign out
   */
  async signOut(): Promise<SignOutResult> {
    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signOut();
      return {
        success: !error,
        error: error ? getErrorMessage(error) : null,
      };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error),
      };
    }
  },
};

