"use client";

import { useState, useCallback } from "react";

interface UseLoadingReturn {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  withLoading: <T>(asyncFn: () => Promise<T>) => Promise<T>;
}

/**
 * Hook for managing loading state
 * Useful for async operations that need loading indicators
 */
export function useLoading(initialState = false): UseLoadingReturn {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const withLoading = useCallback(
    async <T,>(asyncFn: () => Promise<T>): Promise<T> => {
      setIsLoading(true);
      try {
        return await asyncFn();
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  };
}

