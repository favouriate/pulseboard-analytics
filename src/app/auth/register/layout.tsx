import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Pulseboard Analytics",
  description: "Create your Pulseboard Analytics account to start tracking your SaaS subscription metrics, MRR, churn, and customer health.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

