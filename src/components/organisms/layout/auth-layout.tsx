"use client";

import * as React from "react";
import { LoadingOverlay } from "@/components/molecules/feedback/loading-overlay";

interface AuthLayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingMessage?: string;
  leftContent: {
    badge?: string;
    title: string;
    description: string;
  };
}

/**
 * Reusable auth layout component with split-screen design (Organism)
 * Used for both login and register pages
 */
export function AuthLayout({
  children,
  isLoading = false,
  loadingMessage,
  leftContent,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-brand-900)] text-foreground">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* Left welcome side with background image */}
        <section className="relative bg-[url('/background.jpeg')] bg-cover bg-center flex flex-col justify-between px-8 py-10 text-white md:px-16 lg:px-20 overflow-hidden">
          {/* Dark overlay to dim the background image */}
          <div className="absolute inset-0 bg-[var(--color-brand-900)]/60 backdrop-blur-[1px]"></div>
          
          {/* Optional: Additional brightness filter on background */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Content with proper z-index */}
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand-900)] text-sm font-semibold text-[var(--text-on-dark-warm)] shadow-lg drop-shadow-lg">
                PA
              </div>
              <div className="text-sm font-semibold text-[var(--text-on-dark-warm)] drop-shadow-md">Pulseboard Analytics</div>
            </div>

            <div className="space-y-4">
              {leftContent.badge && (
                <p className="inline-flex rounded-full bg-[var(--color-brand-900)]/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--text-on-dark-warm)] border border-[var(--color-brand-900)]/30 backdrop-blur-sm drop-shadow-md">
                  {leftContent.badge}
                </p>
              )}
              <h1 className="text-3xl font-semibold leading-tight text-[var(--text-on-dark-warm)] md:text-4xl drop-shadow-lg">
                {leftContent.title}
              </h1>
              <p className="max-w-md text-sm font-semibold text-[var(--text-on-dark-warm)] md:text-base drop-shadow-md">
                {leftContent.description}
              </p>
            </div>
          </div>
        </section>

        {/* Right auth panel - dark */}
        <section className="relative flex items-center justify-center bg-[var(--color-brand-900)] px-6 py-10 md:px-12">
          {isLoading && loadingMessage && (
            <LoadingOverlay isLoading={isLoading} message={loadingMessage} />
          )}
          {children}
        </section>
      </div>
    </div>
  );
}

