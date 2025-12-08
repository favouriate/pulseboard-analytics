import type { DataTableRow } from "@/components/organisms/data-display/data-table/data-table-schema";

import { createServerClient } from "@/lib/supabase-server";

/**
 * Dashboard service
 * Handles all dashboard-related data fetching
 * 
 * Note: Currently uses static data from server components.
 * When Supabase tables are created, uncomment the implementation below.
 */
export const dashboardService = {
  /**
   * Fetch dashboard table data
   * 
   * Implementation for Supabase (uncomment when tables are ready):
   * ```typescript
   * const supabase = await createServerClient();
   * const { data, error } = await supabase
   *   .from('dashboard_sections')
   *   .select('*')
   *   .order('id');
   * if (error) throw error;
   * return data;
   * ```
   * 
   * Current implementation: Returns empty array as data is passed via props
   * from server components. This is intentional for the current architecture.
   */
  async getTableData(): Promise<DataTableRow[]> {
    // Data is currently passed as props from server components
    // This method is kept for future Supabase integration
    return [];
  },

  /**
   * Update table row
   * 
   * Implementation for Supabase (uncomment when tables are ready):
   * ```typescript
   * const supabase = await createServerClient();
   * const { data, error } = await supabase
   *   .from('dashboard_sections')
   *   .update(updates)
   *   .eq('id', rowId)
   *   .select()
   *   .single();
   * if (error) throw error;
   * return data;
   * ```
   * 
   * Current implementation: Throws error as this feature requires
   * Supabase table setup. This is intentional for the current architecture.
   */
  async updateTableRow(
    rowId: number,
    updates: Partial<DataTableRow>
  ): Promise<DataTableRow> {
    // This method requires Supabase table setup
    // Currently not implemented as data is static
    throw new Error(
      "Table updates require Supabase integration. " +
      "See service file comments for implementation guide."
    );
  },
};

