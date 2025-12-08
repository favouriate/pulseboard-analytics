"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { createBrowserClient } from "@/lib/supabase";
import { passwordSchema } from "@/lib/validations";
import { getErrorMessage, logError } from "@/lib/errors";
import { getAuthTokensFromUrl } from "@/lib/auth-utils";

import { Button } from "@/components/atoms/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/ui/card";
import { Input } from "@/components/atoms/ui/input";
import { Label } from "@/components/atoms/ui/label";

interface ResetPasswordFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Reset password form component (Organism)
 * Complete password reset form with validation
 */
export function ResetPasswordForm({ onSuccess, onError }: ResetPasswordFormProps) {
  const router = useRouter();
  const supabase = createBrowserClient();
  
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    const tokens = getAuthTokensFromUrl();
    if (!tokens) {
      const errorMessage = "Invalid or expired reset link. Please request a new password reset.";
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [onError]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setValidationErrors({});

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      setValidationErrors({
        password: passwordResult.error.issues[0]?.message || "Invalid password",
      });
      return;
    }

    if (password !== confirmPassword) {
      setValidationErrors({
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const tokens = getAuthTokensFromUrl();
      if (!tokens) {
        const errorMessage = "Invalid or expired reset link. Please request a new password reset.";
        setError(errorMessage);
        onError?.(errorMessage);
        return;
      }

      const { error: sessionError } = await supabase.auth.setSession({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      });

      if (sessionError) {
        const errorMessage = getErrorMessage(sessionError);
        setError(errorMessage);
        onError?.(errorMessage);
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        const errorMessage = getErrorMessage(updateError);
        setError(errorMessage);
        onError?.(errorMessage);
        return;
      }

      setIsSuccess(true);
      onSuccess?.();
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      logError(err, "resetPassword");
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-sm border border-white/10 bg-[#102539] text-white shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold text-[var(--text-on-dark-warm)]">
            Reset your password
          </CardTitle>
          <p className="text-xs text-[var(--text-on-dark-warm)]">
            Enter your new password below.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
              <p className="text-sm text-green-400">
                Password reset successfully! Redirecting to sign in...
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-[var(--text-on-dark-warm)]">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-[var(--text-on-dark-warm)] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm border border-white/10 bg-[#102539] text-white shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold text-[var(--text-on-dark-warm)]">
          Reset your password
        </CardTitle>
        <p className="text-xs text-[var(--text-on-dark-warm)]">
          Enter your new password below.
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
              <p className="text-xs text-red-400" role="alert">
                {error}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                autoComplete="new-password"
                placeholder="••••••••"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-[var(--text-on-dark-warm)]">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-[var(--text-on-dark-warm)] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

