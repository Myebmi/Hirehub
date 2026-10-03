import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"

export default async function JobsPage() {
  const session = await auth()
  const jobs = await prisma.job.findMany({
    where: { status: "OPEN" },
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
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold dark:text-white">آگهی‌های شغلی</h1>
          {session?.user && (
            <Link
              href="/jobs/new"
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              + آگهی جدید
            </Link>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400">
              هنوز آگهی‌ای ثبت نشده است
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
                    <span>💰 {job.salary.toLocaleString()} افغانی</span>
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