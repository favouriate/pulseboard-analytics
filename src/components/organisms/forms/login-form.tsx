"use client";

import * as React from "react";
import Link from "next/link";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema } from "@/lib/validations";
import type { LoginFormData } from "@/types";

import { Button } from "@/components/atoms/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/ui/card";
import { Input } from "@/components/atoms/ui/input";
import { Label } from "@/components/atoms/ui/label";

interface LoginFormProps {
  onSubmit?: () => void;
}

/**
 * Login form component (Organism)
 * Complete authentication form with validation
 */
export function LoginForm({ onSubmit }: LoginFormProps) {
  const { isSubmitting, error, signIn } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationErrors({});

    const formData = new FormData(event.currentTarget);
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = loginSchema.safeParse(rawData);

    if (!result.success) {
      const errors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0] as keyof LoginFormData] = issue.message;
        }
      });
      setValidationErrors(errors);
      return;
    }

    const success = await signIn(result.data);
    if (success) {
      onSubmit?.();
    }
  }

  return (
    <Card className="w-full max-w-sm border border-white/10 bg-[#102539] text-white shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">
          Sign in to your account
        </CardTitle>
        <p className="text-xs text-slate-300">
          Use your email and password to access the dashboard.
        </p>
      </CardHeader>
      <CardContent>
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
                autoComplete="current-password"
                placeholder="••••••••"
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

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-border bg-background text-primary"
                aria-label="Remember me"
              />
              <span>Remember me</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-[#4f46e5] text-white shadow-md hover:bg-[#4338ca]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in…" : "Login"}
            </Button>
            <Button type="button" variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10" asChild>
              <Link href="/auth/register">Sign up</Link>
            </Button>
          </div>
        </form>

        {(error || Object.keys(validationErrors).length > 0) && (
          <div className="mt-3" role="alert" aria-live="polite">
            {error && (
              <p className="text-xs font-medium text-destructive">{error}</p>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to the{" "}
          <span className="font-medium text-foreground">
            Terms &amp; Privacy Policy
          </span>
          .
        </p>
      </CardContent>
    </Card>
  );
}

