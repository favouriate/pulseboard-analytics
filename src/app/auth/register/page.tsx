"use client";

import * as React from "react";
import Link from "next/link";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useAuth } from "@/hooks/use-auth";
import { registerSchema } from "@/lib/validations";
import type { RegisterFormData } from "@/types";
import { AuthLayout } from "@/components/auth/auth-layout";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const { isSubmitting, error, signUp, clearError } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState<string>("");
  const [validationErrors, setValidationErrors] = React.useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});

  React.useEffect(() => {
    clearError();
  }, [clearError]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationErrors({});
    setIsSuccess(false);

    const formData = new FormData(event.currentTarget);
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const result = registerSchema.safeParse(rawData);

    if (!result.success) {
      const errors: Partial<Record<keyof RegisterFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0] as keyof RegisterFormData] = issue.message;
        }
      });
      setValidationErrors(errors);
      return;
    }

    const success = await signUp(result.data);
    
    if (success && !error) {
      setIsSuccess(true);
      setUserEmail(result.data.email);
    }
  }

  return (
    <AuthLayout
      isLoading={isSubmitting}
      loadingMessage="Creating your account..."
      leftContent={{
        badge: "New · Subscription analytics",
        title: "Create your account,\nstart tracking today.",
        description: "Join Pulseboard Analytics to track your SaaS metrics, understand your revenue, and grow your business with data-driven insights.",
      }}
    >
      <Card className="w-full max-w-sm border border-white/10 bg-[#102539] text-white shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold text-[var(--text-on-dark-warm)]">
            Create your account
          </CardTitle>
          <p className="text-xs text-[var(--text-on-dark-warm)]">
            Sign up to start tracking your SaaS metrics.
          </p>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="space-y-4">
              <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                <h3 className="text-sm font-semibold text-green-400 mb-2">
                  Account created successfully!
                </h3>
                <p className="text-xs text-green-300">
                  We&apos;ve sent a confirmation email to <strong>{userEmail}</strong>. 
                  Please check your inbox and click the confirmation link to activate your account.
                </p>
              </div>
              <Button
                type="button"
                className="w-full bg-[#4f46e5] text-white hover:bg-[#4338ca]"
                asChild
              >
                <Link href="/auth/login">Go to Sign In</Link>
              </Button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  aria-invalid={validationErrors.email ? "true" : "false"}
                  aria-describedby={validationErrors.email ? "email-error" : undefined}
                />
                {validationErrors.email && (
                  <p id="email-error" className="text-xs text-red-400" role="alert">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    autoComplete="new-password"
                    placeholder="••••••••"
                    minLength={6}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 pr-10"
                    aria-invalid={validationErrors.password ? "true" : "false"}
                    aria-describedby={validationErrors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <IconEyeOff className="h-4 w-4" />
                    ) : (
                      <IconEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p id="password-error" className="text-xs text-red-400" role="alert">
                    {validationErrors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    placeholder="••••••••"
                    minLength={6}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 pr-10"
                    aria-invalid={validationErrors.confirmPassword ? "true" : "false"}
                    aria-describedby={validationErrors.confirmPassword ? "confirm-password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <IconEyeOff className="h-4 w-4" />
                    ) : (
                      <IconEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p id="confirm-password-error" className="text-xs text-red-400" role="alert">
                    {validationErrors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#4f46e5] text-white hover:bg-[#4338ca]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account…" : "Sign up"}
              </Button>
            </form>
          )}

          {(error || Object.keys(validationErrors).length > 0) && !isSuccess && (
            <div className="mt-3" role="alert" aria-live="polite">
              {error && (
                <p className="text-xs font-medium text-red-400">{error}</p>
              )}
            </div>
          )}

          <p className="mt-6 text-center text-xs text-[var(--text-on-dark-warm)]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-[var(--text-on-dark-warm)] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
