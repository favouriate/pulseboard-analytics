import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { LoadingProvider } from "@/components/providers/loading-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pulseboard Analytics",
    template: "%s | Pulseboard Analytics",
  },
  description:
    "A SaaS subscription analytics dashboard for tracking MRR, churn, and customer health.",
  keywords: [
    "SaaS analytics",
    "subscription metrics",
    "MRR tracking",
    "churn analysis",
    "customer health",
    "revenue analytics",
  ],
  authors: [{ name: "Pulseboard Analytics" }],
  creator: "Pulseboard Analytics",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Pulseboard Analytics",
    description:
      "A SaaS subscription analytics dashboard for tracking MRR, churn, and customer health.",
    siteName: "Pulseboard Analytics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulseboard Analytics",
    description:
      "A SaaS subscription analytics dashboard for tracking MRR, churn, and customer health.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme-color="default">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <QueryProvider>
            <ErrorBoundary>
              <LoadingProvider>
                {children}
              </LoadingProvider>
            </ErrorBoundary>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
