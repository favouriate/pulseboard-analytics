"use client";

import Link from "next/link";
import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { emailSchema } from "@/lib/validations";
import { AuthLayout } from "@/components/auth/auth-layout";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const { isSubmitting, error, resetPassword, clearError } = useAuth();
  const [email, setEmail] = React.useState("");
  const [validationError, setValidationError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    clearError();
  }, [clearError]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError(null);
    setIsSuccess(false);

    const result = emailSchema.safeParse(email);

    if (!result.success) {
      setValidationError(result.error.issues[0]?.message || "Invalid email address");
      return;
    }

    const success = await resetPassword(result.data);

    if (success) {
      setIsSuccess(true);
      setEmail("");
    }
  }

  return (
    <AuthLayout
      isLoading={isSubmitting}
      loadingMessage="Sending reset email..."
      leftContent={{
        badge: "Password Reset",
        title: "Forgot your password?",
        description: "No worries! Enter your email address and we'll send you a link to reset your password.",
      }}
    >
      <Card className="w-full max-w-sm border border-white/10 bg-[#102539] text-white shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold">
            Reset your password
          </CardTitle>
          <p className="text-xs text-slate-300">
            Enter your email address and we'll send you a reset link.
          </p>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="space-y-4">
              <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                <p className="text-sm text-green-400">
                  Check your email! We've sent you a password reset link.
                </p>
              </div>
              <Button
                type="button"
                className="w-full bg-[#4f46e5] text-white hover:bg-[#4338ca]"
                asChild
              >
                <Link href="/auth/login">Back to Sign In</Link>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  aria-invalid={validationError ? "true" : "false"}
                  aria-describedby={validationError ? "email-error" : undefined}
                />
                {(validationError || error) && (
                  <p id="email-error" className="text-xs text-red-400" role="alert">
                    {validationError || error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#4f46e5] text-white hover:bg-[#4338ca]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-slate-300">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-white hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

