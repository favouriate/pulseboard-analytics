/**
 * Error handling utilities for consistent error management across the application
 */

import type { AuthError } from '@/types';

// Re-export for backward compatibility
export type { AuthError as AppError };

/**
 * Type guard to check if error is a Supabase AuthError
 */
export function isSupabaseAuthError(
  error: unknown
): error is { message: string; status?: number } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  );
}

/**
 * Extracts a user-friendly error message from various error types
 */
export function getErrorMessage(error: unknown): string {
  if (isSupabaseAuthError(error)) {
    const message = error.message.toLowerCase();

    // Map common Supabase auth errors to user-friendly messages
    if (message.includes("already registered") || message.includes("already exists") || message.includes("email already")) {
      return "This email is already registered. Please sign in instead.";
    }
    if (message.includes("invalid email")) {
      return "Invalid email address. Please check and try again.";
    }
    if (message.includes("invalid password") || message.includes("invalid credentials")) {
      return "Invalid email or password. Please try again.";
    }
    if (message.includes("email not confirmed")) {
      return "Please verify your email address before signing in.";
    }
    if (message.includes("too many requests")) {
      return "Too many attempts. Please wait a moment and try again.";
    }

    // Return the original message if no mapping found
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}

/**
 * Logs errors in development, can be extended for production logging
 */
export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === "development") {
    const prefix = context ? `[${context}]` : "[Error]";
    // eslint-disable-next-line no-console
    console.error(prefix, error);
  }
  // In production, you would send to a logging service (e.g., Sentry, LogRocket)
}

