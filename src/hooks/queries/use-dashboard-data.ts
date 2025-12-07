"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import type { DataTableRow } from "@/components/organisms/data-display/data-table/data-table-schema";

const DASHBOARD_DATA_QUERY_KEY = ["dashboard", "table-data"];

/**
 * Hook for fetching dashboard table data with React Query
 */
export function useDashboardData() {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: DASHBOARD_DATA_QUERY_KEY,
    queryFn: dashboardService.getTableData,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const updateRowMutation = useMutation({
    mutationFn: ({ rowId, updates }: { rowId: number; updates: Partial<DataTableRow> }) =>
      dashboardService.updateTableRow(rowId, updates),
    onSuccess: () => {
      // Invalidate and refetch data
      queryClient.invalidateQueries({ queryKey: DASHBOARD_DATA_QUERY_KEY });
    },
  });

  return {
    data: data ?? [],
    isLoading,
    error: error as Error | null,
    refetch,
    updateRow: updateRowMutation.mutateAsync,
    isUpdating: updateRowMutation.isPending,
  };
}

