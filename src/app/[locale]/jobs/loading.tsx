import { Skeleton } from "@/components/ui/Skeleton"

export default function JobsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
            >
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="mt-3 h-5 w-1/2" />
              <div className="mt-4 flex gap-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}