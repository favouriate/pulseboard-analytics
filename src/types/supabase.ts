/**
 * Supabase-related types
 * These types can be generated from your Supabase schema
 * or manually defined based on your database structure
 * 
 * To generate types from your Supabase schema, run:
 * npx supabase gen types typescript --project-id <your-project-id> > src/types/database.types.ts
 */

import type { Database } from './database.types';

/**
 * Extract table row types from Database
 * Usage: type Customer = Tables<'customers'>
 */
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

/**
 * Extract enum types from Database
 * Usage: type Status = Enums<'subscription_status'>
 */
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

/**
 * Re-export Database type for convenience
 */
export type { Database };
