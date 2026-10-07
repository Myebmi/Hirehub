import { Skeleton, SkeletonList } from "@/components/ui/Skeleton"

export default function MyApplicationsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="mt-2 h-5 w-32" />
        </div>
        <SkeletonList count={4} />
      </div>
    </div>
  )
}