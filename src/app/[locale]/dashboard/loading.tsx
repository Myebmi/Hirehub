import { Skeleton, SkeletonList } from "@/components/ui/Skeleton"

export default function JobsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-48" />
            <Skeleton className="mt-2 h-5 w-32" />
          </div>
          <Skeleton className="h-10 w-28" />
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="grid gap-3 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="h-3 w-16" />
                <Skeleton className="mt-2 h-10 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <SkeletonList count={5} />
      </div>
    </div>
  )
}