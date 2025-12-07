import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Pulseboard Analytics",
  description: "Set a new password for your Pulseboard Analytics account. Make sure it's strong and secure.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

