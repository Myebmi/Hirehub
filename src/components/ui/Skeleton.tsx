export function Skeleton({
  className = "",
}: {
  className?: string
}) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="mt-3 h-4 w-2/3" />
      <Skeleton className="mt-2 h-4 w-1/2" />
    </div>
  )
}

export function SkeletonStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
        >
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="mt-4 h-8 w-1/3" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
        >
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="mt-3 h-4 w-1/4" />
          <div className="mt-4 flex gap-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}