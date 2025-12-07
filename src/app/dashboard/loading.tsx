import { DashboardSkeleton } from "@/components/organisms/feedback/dashboard-skeleton";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/atoms/ui/sidebar";
import { AppSidebar } from "@/components/organisms/layout/app-sidebar";
import { SiteHeader } from "@/components/organisms/layout/site-header";

/**
 * Loading state for dashboard route
 * Shows skeleton screens while dashboard data is loading
 */
export default function DashboardLoading() {
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
        <DashboardSkeleton />
      </SidebarInset>
    </SidebarProvider>
  );
}

