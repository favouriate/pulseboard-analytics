/**
 * Common utility types used across the application
 */

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Extract the type of array elements
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * Utility type for form state
 */
export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}

/**
 * Status types for async operations
 */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  status: AsyncStatus;
  data?: T;
  error?: string;
}

/**
 * Theme color types
 */
export type ThemeColor =
  | "default"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "rose"
  | "violet"
  | "yellow";

