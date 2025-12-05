"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-900)] text-foreground">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* Left welcome / marketing side - light */}
        <section className="relative bg-[url('/background.jpeg')] bg-cover bg-center flex flex-col justify-between px-8 py-12 text-white md:px-16 lg:px-20 overflow-hidden">
          {/* Dark overlay to dim the background image */}
          <div className="absolute inset-0 bg-[var(--color-brand-900)]/60 backdrop-blur-[1px]"></div>
          
          {/* Optional: Additional brightness filter on background */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Content with proper z-index */}
          <div className="relative z-10 space-y-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand-900)] text-base font-bold text-[var(--text-on-dark-warm)] shadow-lg drop-shadow-lg">
                PA
              </div>
              <div className="text-base font-bold tracking-tight text-[var(--text-on-dark-warm)] drop-shadow-md">Pulseboard Analytics</div>
            </div>

            <div className="space-y-6">
              <p className="inline-flex rounded-full bg-[var(--color-brand-900)]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text-on-dark-warm)] border border-[var(--color-brand-900)]/30 backdrop-blur-sm drop-shadow-md">
                New · Subscription Analytics Platform
              </p>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-[var(--text-on-dark-warm)] md:text-5xl lg:text-6xl drop-shadow-lg">
                Welcome back,
                <br />
                <span className="text-[var(--text-on-dark-warm)]">track your growth.</span>
              </h1>
              <p className="max-w-lg text-base leading-relaxed font-semibold text-[var(--text-on-dark-warm)] md:text-lg drop-shadow-md">
                Transform your SaaS metrics into actionable insights. Monitor MRR, analyze churn patterns, and optimize customer health—all in one unified dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Right CTA panel - dark */}
        <section className="flex items-center justify-center bg-[var(--color-brand-900)] px-6 py-10 md:px-12">
          <div className="w-full max-w-sm space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-on-dark-warm)]">
                Get Started with Pulseboard
              </h2>
              <p className="text-sm text-[var(--text-on-dark-warm)]">
                Sign in to your account or create a new one to start tracking your SaaS metrics.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                asChild
                className="w-full bg-[#4f46e5] text-white shadow-md hover:bg-[#4338ca]"
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                <Link href="/auth/register">Create Account</Link>
              </Button>
            </div>

            <p className="mt-6 text-center text-xs text-[var(--text-on-dark-warm)]">
              By continuing, you agree to the{" "}
              <span className="font-medium text-[var(--text-on-dark-warm)]">
                Terms &amp; Privacy Policy
              </span>
              .
            </p>
          </div>
        </section>
        </div>
    </div>
  );
}
