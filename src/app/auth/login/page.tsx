"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useEmailConfirmation } from "@/hooks/use-email-confirmation";
import { AuthLayout } from "@/components/organisms/layout/auth-layout";
import { LoginForm } from "@/components/organisms/forms/login-form";
import { getAuthTokensFromUrl } from "@/lib/auth-utils";

export default function LoginPage() {
  const { isSubmitting, clearError } = useAuth();
  const router = useRouter();
  const { isVerifying, verifyEmail } = useEmailConfirmation({
    redirectTo: "/dashboard",
  });

  React.useEffect(() => {
    clearError();
    
    // Only verify email if we have tokens in the URL hash
    // This prevents unnecessary async calls on every page load
    const tokens = getAuthTokensFromUrl();
    if (tokens && tokens.type === "signup") {
      verifyEmail();
    }
  }, [clearError, verifyEmail]);

  return (
    <AuthLayout
      isLoading={isSubmitting || isVerifying}
      loadingMessage={isVerifying ? "Verifying your email..." : "Signing you in..."}
      leftContent={{
        badge: "New · Subscription Analytics Platform",
        title: "Welcome back,\ntrack your growth.",
        description: "Transform your SaaS metrics into actionable insights. Monitor MRR, analyze churn patterns, and optimize customer health—all in one unified dashboard.",
      }}
    >
      <LoginForm />
    </AuthLayout>
  );
}
