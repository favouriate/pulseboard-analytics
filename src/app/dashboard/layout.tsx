import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Pulseboard Analytics",
  description: "Your SaaS subscription analytics dashboard. Monitor MRR, analyze churn patterns, and optimize customer health.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

