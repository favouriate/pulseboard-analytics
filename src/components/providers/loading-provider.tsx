"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { LoadingOverlay } from "@/components/molecules/feedback/loading-overlay";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean, message?: string) => void;
  withLoading: <T>(
    asyncFn: () => Promise<T>,
    message?: string
  ) => Promise<T>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

/**
 * Global loading provider for app-wide loading states
 */
export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("Loading...");

  const setLoading = useCallback((loading: boolean, message = "Loading...") => {
    setIsLoading(loading);
    setLoadingMessage(message);
  }, []);

  const withLoading = useCallback(
    async <T,>(asyncFn: () => Promise<T>, message = "Loading..."): Promise<T> => {
      setIsLoading(true);
      setLoadingMessage(message);
      try {
        return await asyncFn();
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, withLoading }}>
      {children}
      <LoadingOverlay isLoading={isLoading} message={loadingMessage} fullScreen />
    </LoadingContext.Provider>
  );
}

/**
 * Hook to access loading context
 */
export function useGlobalLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useGlobalLoading must be used within a LoadingProvider");
  }
  return context;
}

