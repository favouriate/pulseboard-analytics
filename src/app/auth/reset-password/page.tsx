"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/organisms/layout/auth-layout";
import { ResetPasswordForm } from "@/components/organisms/forms/reset-password-form";

export default function ResetPasswordPage() {
  const router = useRouter();

  const handleSuccess = React.useCallback(() => {
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  }, [router]);

  return (
    <AuthLayout
      isLoading={false}
      loadingMessage="Resetting password..."
      leftContent={{
        badge: "Password Reset",
        title: "Set new password",
        description: "Enter your new password below. Make sure it's strong and secure.",
      }}
    >
      <ResetPasswordForm onSuccess={handleSuccess} />
    </AuthLayout>
  );
}

