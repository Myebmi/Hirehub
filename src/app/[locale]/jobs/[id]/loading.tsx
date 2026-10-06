import { Skeleton } from "@/components/ui/Skeleton"

export default function JobDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl">
        <Skeleton className="h-5 w-32" />

        <div className="mt-4 rounded-lg bg-white p-8 shadow dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-9 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
            </div>
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>

          {/* Tags */}
          <div className="mt-4 flex gap-2">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-16 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
          </div>

          {/* Description */}
          <div className="mt-6 space-y-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Meta */}
          <div className="mt-6 space-y-2 border-t pt-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      </div>
    </div>
  )
}