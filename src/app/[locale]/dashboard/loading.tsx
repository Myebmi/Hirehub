import { Skeleton } from "@/components/ui/Skeleton"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
            >
              <Skeleton className="h-5 w-24" />
              <Skeleton className="mt-3 h-9 w-16" />
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
            >
              <Skeleton className="h-6 w-32" />
              <Skeleton className="mt-3 h-4 w-40" />
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
            >
              <Skeleton className="h-6 w-48" />
              <Skeleton className="mt-6 h-64 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}