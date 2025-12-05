import { z } from "zod";

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address")
  .toLowerCase()
  .trim();

/**
 * Password validation schema
 * Minimum 6 characters, at least one letter and one number
 */
export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(100, "Password is too long")
  .regex(/[a-zA-Z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one number");

/**
 * Registration form validation schema
 */
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

/**
 * Type inference for form schemas
 */
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
