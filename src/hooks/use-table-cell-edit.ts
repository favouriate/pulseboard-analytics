"use client";

import { useCallback } from "react";
import { toast } from "sonner";

interface UseTableCellEditOptions {
  onSave?: (rowId: number, field: string, value: string) => Promise<void>;
  rowHeader?: string;
}

interface UseTableCellEditReturn {
  handleSave: (rowId: number, field: string, value: string) => Promise<void>;
}

/**
 * Hook for handling table cell edit operations
 * Extracts business logic from UI components
 */
export function useTableCellEdit(
  options: UseTableCellEditOptions = {}
): UseTableCellEditReturn {
  const handleSave = useCallback(
    async (rowId: number, field: string, value: string) => {
      if (options.onSave) {
        await options.onSave(rowId, field, value);
        return;
      }

      // Default behavior: show toast notification
      const loadingMessage = options.rowHeader
        ? `Saving ${options.rowHeader}`
        : `Saving ${field}...`;

      toast.promise(
        new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        }),
        {
          loading: loadingMessage,
          success: "Done",
          error: "Error",
        }
      );
    },
    [options.onSave, options.rowHeader]
  );

  return { handleSave };
}
