"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

/**
 * Full-screen or container loading overlay
 */
export function LoadingOverlay({
  isLoading,
  message = "Loading...",
  fullScreen = false,
  className,
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background/80 backdrop-blur-sm z-50",
        fullScreen
          ? "fixed inset-0"
          : "absolute inset-0 rounded-lg",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        {message && (
          <p className="text-sm font-medium text-muted-foreground">{message}</p>
        )}
      </div>
    </div>
  );
}

