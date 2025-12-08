"use client";

import * as React from "react";
import { useTableCellEdit } from "@/hooks/use-table-cell-edit";
import { Input } from "@/components/atoms/ui/input";
import { Label } from "@/components/atoms/ui/label";

interface EditableTableCellProps {
  rowId: number;
  field: string;
  defaultValue: string;
  rowHeader: string;
}

/**
 * Editable table cell component (Molecule)
 * Combines input with form submission logic
 */
export function EditableTableCell({
  rowId,
  field,
  defaultValue,
  rowHeader,
}: EditableTableCellProps) {
  const { handleSave } = useTableCellEdit({
    rowHeader,
  });

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const value = formData.get(field) as string;
      await handleSave(rowId, field, value);
    },
    [rowId, field, handleSave]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor={`${rowId}-${field}`} className="sr-only">
        {field}
      </Label>
      <Input
        className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
        defaultValue={defaultValue}
        id={`${rowId}-${field}`}
        name={field}
      />
    </form>
  );
}

