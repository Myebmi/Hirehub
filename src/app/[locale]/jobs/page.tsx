import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"
import { getTranslations } from "next-intl/server"
import JobFilters from "./JobFilters"
import Pagination from "@/components/ui/Pagination"

const PAGE_SIZE = 10

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string
    type?: string
    location?: string
    page?: string
  }>
}) {
  const params = await searchParams
  const session = await auth()
  const t = await getTranslations("jobs")
  const tCommon = await getTranslations("common")

  const query = params.q || ""
  const type = params.type || ""
  const location = params.location || ""
  const currentPage = Math.max(1, parseInt(params.page || "1"))

  const where: any = { status: "OPEN" }

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

  // ✅ Parallel: count + fetch
  const [totalCount, jobs] = await Promise.all([
    prisma.job.count({ where }),
    prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        recruiter: {
          select: { name: true, email: true },
        },
        _count: {
          select: { applications: true },
        },
      },
    }),
  ])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">{t("title")}</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {totalCount} {t("found")}
            </p>
          </div>
          {session?.user && (
            <Link
              href="/jobs/new"
              className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl active:scale-95"
            >
              + {t("new")}
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
              {query || type || location ? t("notFound") : t("empty")}
            </p>
          </div>
        ) : (
          <>
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
                      <span>💰 {job.salary.toLocaleString()}</span>
                    )}
                    <span>
                      👥 {job._count.applications} {t("applicants")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* ✅ Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/jobs"
              searchParams={{
                ...(query && { q: query }),
                ...(type && { type }),
                ...(location && { location }),
              }}
            />

            {/* Info */}
            <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              {tCommon("showing")} {(currentPage - 1) * PAGE_SIZE + 1}-
              {Math.min(currentPage * PAGE_SIZE, totalCount)} {tCommon("of")}{" "}
              {totalCount}
            </p>
          </>
        )}
      </div>
    </div>
  )
}