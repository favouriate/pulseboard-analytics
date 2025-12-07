import type { Metadata } from "next";
import { AppSidebar } from "@/components/organisms/layout/app-sidebar"
import { ChartAreaInteractive } from "@/components/organisms/data-display/chart-area-interactive"
import { DataTable } from "@/components/organisms/data-display/data-table"
import { SectionCards } from "@/components/organisms/data-display/section-cards"
import { SiteHeader } from "@/components/organisms/layout/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/atoms/ui/sidebar"
import { getServerUser } from "@/lib/supabase-server"
import { redirect } from "next/navigation"

import data from "./data.json"

export const metadata: Metadata = {
  title: "Dashboard | Pulseboard Analytics",
  description: "View your SaaS subscription analytics, track MRR, analyze churn patterns, and monitor customer health metrics.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Dashboard page - protected route
 * Requires authentication (handled by middleware)
 */
export default async function Page() {
  const user = await getServerUser();
  
  if (!user) {
    redirect("/auth/login?redirect=/dashboard");
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
