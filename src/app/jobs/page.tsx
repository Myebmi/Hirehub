import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"
import JobFilters from "./JobFilters"

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; location?: string }>
}) {
  const params = await searchParams
  const session = await auth()

  const query = params.q || ""
  const type = params.type || ""
  const location = params.location || ""

  // ساخت Where clause
  const where: any = {
    status: "OPEN",
  }

  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ]
  }

  if (type) {
    where.type = type
  }

  if (location) {
    where.location = { contains: location, mode: "insensitive" }
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      recruiter: {
        select: { name: true, email: true },
      },
      _count: {
        select: { applications: true },
      },
    },
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">
              آگهی‌های شغلی
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {jobs.length} آگهی پیدا شد
            </p>
          </div>
          {session?.user && (
            <Link
              href="/jobs/new"
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              + آگهی جدید
            </Link>
          )}
        </div>

        {/* Filters */}
        <JobFilters
          initialQuery={query}
          initialType={type}
          initialLocation={location}
        />

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400">
              {query || type || location
                ? "هیچ آگهی‌ای با این فیلترها پیدا نشد"
                : "هنوز آگهی‌ای ثبت نشده است"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block rounded-lg bg-white p-6 shadow transition hover:shadow-md dark:bg-gray-800"
              >
                <h2 className="text-xl font-semibold dark:text-white">
                  {job.title}
                </h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  📍 {job.location}
                </p>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>🏷️ {job.type}</span>
                  {job.salary && (
                    <span>💰 {job.salary.toLocaleString()} تومان</span>
                  )}
                  <span>👥 {job._count.applications} متقاضی</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}