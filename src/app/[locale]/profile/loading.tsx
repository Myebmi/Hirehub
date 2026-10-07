import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton"

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="mt-2 h-9 w-48" />
        </div>

        {/* Info Card */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="mt-2 h-4 w-1/2" />
              <Skeleton className="mt-2 h-5 w-20 rounded-full" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 dark:border-gray-700">
            <div>
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-2 h-6 w-12" />
            </div>
            <div>
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-2 h-6 w-12" />
            </div>
          </div>
        </div>

        {/* Forms */}
        <SkeletonCard />
        <div className="mt-6">
          <SkeletonCard />
        </div>
      </div>
    </div>
  )
}