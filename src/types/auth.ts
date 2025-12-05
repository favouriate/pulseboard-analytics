/**
 * Authentication-related types
 */

import type { RegisterFormData, LoginFormData } from '@/lib/validations';

export interface AuthError {
  message: string;
  code?: string;
  statusCode?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthSession {
  user: AuthUser;
  accessToken?: string;
  expiresAt?: number;
}

/**
 * Re-export form data types for convenience
 */
export type { RegisterFormData, LoginFormData };
