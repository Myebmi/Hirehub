import Link from "next/link"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"
import { getTranslations } from "next-intl/server"
import Pagination from "@/components/ui/Pagination"

const PAGE_SIZE = 10

export default async function MyApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || "1"))

  const t = await getTranslations("applications")
  const tCommon = await getTranslations("common")

  // ✅ ترجمه وضعیت‌ها
  const statusLabels: Record<string, { label: string; color: string }> = {
    PENDING: {
      label: t("status.PENDING"),
      color:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    REVIEWING: {
      label: t("status.REVIEWING"),
      color:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    INTERVIEW: {
      label: t("status.INTERVIEW"),
      color:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
    REJECTED: {
      label: t("status.REJECTED"),
      color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
    HIRED: {
      label: t("status.HIRED"),
      color:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
  }

  // ✅ Parallel: count + fetch with pagination
  const [totalCount, applications] = await Promise.all([
    prisma.application.count({
      where: { applicantId: session.user.id },
    }),
    prisma.application.findMany({
      where: { applicantId: session.user.id },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            type: true,
            status: true,
          },
        },
      },
    }),
  ])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ← {tCommon("back")}
          </Link>
          <h1 className="mt-2 text-3xl font-bold dark:text-white">
            {t("title")}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {totalCount} {t("found")}
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400">
              {t("empty")}
            </p>
            <Link
              href="/jobs"
              className="mt-4 inline-block rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              {t("viewJobs")}
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {applications.map((app) => {
                const statusInfo =
                  statusLabels[app.status] || statusLabels.PENDING
                return (
                  <Link
                    key={app.id}
                    href={`/jobs/${app.job.id}`}
                    className="block rounded-lg bg-white p-6 shadow transition hover:shadow-md dark:bg-gray-800"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-semibold dark:text-white">
                          {app.job.title}
                        </h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          📍 {app.job.location}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {t("applicationDate")}:{" "}
                          {new Date(app.createdAt).toLocaleDateString("en-US")}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* ✅ Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/my-applications"
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