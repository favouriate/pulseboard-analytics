import { Skeleton } from "@/components/atoms/ui/skeleton";

/**
 * Root loading state
 */
export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-900)]">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* Left side skeleton */}
        <section className="flex flex-col justify-between bg-[var(--color-surface-light)] px-8 py-10 md:px-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-6 w-80" />
            </div>
          </div>
        </section>

        {/* Right side skeleton */}
        <section className="flex items-center justify-center bg-[var(--color-brand-900)] px-6 py-10 md:px-12">
          <div className="w-full max-w-sm space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </section>
      </div>
    </div>
  );
}

