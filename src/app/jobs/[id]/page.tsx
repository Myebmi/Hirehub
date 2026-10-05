import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"
import ApplyButton from "@/components/ApplyButton"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const job = await prisma.job.findUnique({
    where: { id },
    select: { title: true, description: true, location: true },
  })

  if (!job) {
    return { title: "آگهی پیدا نشد" }
  }

  return {
    title: job.title,
    description: `${job.title} در ${job.location} - ${job.description.substring(0, 150)}...`,
    openGraph: {
      title: `${job.title} | HireHub`,
      description: `${job.title} در ${job.location}`,
    },
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      recruiter: {
        select: { id: true, name: true, email: true },
      },
      _count: {
        select: { applications: true },
      },
    },
  })

  if (!job) {
    notFound()
  }

  const isOwner = session?.user?.id === job.recruiterId

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/jobs"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          ← بازگشت به لیست
        </Link>

        <div className="mt-4 rounded-lg bg-white p-8 shadow dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold dark:text-white">{job.title}</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                📍 {job.location}
              </p>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <Link
                  href={`/jobs/${job.id}/applications`}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                  👥 متقاضیان ({job._count.applications})
                </Link>
                <Link
                  href={`/jobs/${job.id}/edit`}
                  className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  ✏️ ویرایش
                </Link>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {job.type}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-sm ${
                job.status === "OPEN"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {job.status === "OPEN"
                ? "باز"
                : job.status === "DRAFT"
                ? "پیش‌نویس"
                : "بسته"}
            </span>
            {job.salary && (
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                💰 {job.salary.toLocaleString()} افغانی
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold dark:text-white">توضیحات</h2>
            <p className="mt-2 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {job.description}
            </p>
          </div>

          {/* Meta */}
          <div className="mt-6 border-t pt-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <p>ثبت‌کننده: {job.recruiter.name}</p>
            <p>
              تاریخ ثبت: {new Date(job.createdAt).toLocaleDateString("fa-IR")}
            </p>
            <p>تعداد متقاضیان: {job._count.applications}</p>
          </div>

          {/* Apply Button */}
          {session?.user && !isOwner && (
            <div className="mt-6 border-t pt-4 dark:border-gray-700">
              <ApplyButton jobId={job.id} />
            </div>
          )}

          {/* Login Link */}
          {!session?.user && (
            <div className="mt-6 border-t pt-4 dark:border-gray-700">
              <Link
                href="/login"
                className="block w-full rounded-md bg-blue-600 p-3 text-center text-white hover:bg-blue-700"
              >
                برای ارسال درخواست وارد شوید
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}