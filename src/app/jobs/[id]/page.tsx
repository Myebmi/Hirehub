import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"
import ApplyButton from "@/components/ApplyButton"

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/jobs" className="text-blue-600 hover:underline">
          ← بازگشت به لیست
        </Link>

        <div className="mt-4 rounded-lg bg-white p-8 shadow">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <p className="mt-2 text-gray-600">📍 {job.location}</p>
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
                className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
            >
              ✏️ ویرایش
            </Link>
          </div>
          )}

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              {job.type}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-sm ${
                job.status === "OPEN"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {job.status === "OPEN" ? "باز" : job.status === "DRAFT" ? "پیش‌نویس" : "بسته"}
            </span>
            {job.salary && (
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                💰 {job.salary.toLocaleString()} تومان
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">توضیحات</h2>
            <p className="mt-2 whitespace-pre-wrap text-gray-700">
              {job.description}
            </p>
          </div>

          {/* Meta */}
          <div className="mt-6 border-t pt-4 text-sm text-gray-500">
            <p>ثبت‌کننده: {job.recruiter.name}</p>
            <p>تاریخ ثبت: {new Date(job.createdAt).toLocaleDateString("fa-IR")}</p>
            <p>تعداد متقاضیان: {job._count.applications}</p>
          </div>

          {/* Apply Button */}
          {session?.user && !isOwner && (
            <div className="mt-6 border-t pt-4">
              <ApplyButton jobId={job.id} />
            </div>
          )}

          {!session?.user && (
            <div className="mt-6 border-t pt-4">
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