import { Skeleton } from "@/components/ui/Skeleton"

export default function MyApplicationsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-48" />
        </div>

        {/* Applications */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}