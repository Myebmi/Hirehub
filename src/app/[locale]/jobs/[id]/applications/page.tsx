import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"
import ApplicationStatusForm from "./ApplicationStatusForm"

export default async function JobApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      applications: {
        orderBy: { createdAt: "desc" },
        include: {
          applicant: {
            select: { id: true, name: true, email: true },
          },
        },
      },
    },
  })

  if (!job) {
    notFound()
  }

  if (job.recruiterId !== session.user.id) {
    redirect(`/jobs/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href={`/jobs/${id}`}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ← بازگشت به آگهی
          </Link>
          <h1 className="mt-2 text-3xl font-bold dark:text-white">
            متقاضیان: {job.title}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {job.applications.length} متقاضی
          </p>
        </div>

        {job.applications.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400">
              هنوز کسی برای این آگهی درخواست نداده است
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {job.applications.map((app) => (
              <div
                key={app.id}
                className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold dark:text-white">
                      {app.applicant.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {app.applicant.email}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      تاریخ: {new Date(app.createdAt).toLocaleDateString("en-US")}
                    </p>
                  </div>
                  <ApplicationStatusForm
                    applicationId={app.id}
                    currentStatus={app.status}
                  />
                </div>

                <div className="mt-4 border-t pt-4 dark:border-gray-700">
                  <h3 className="text-sm font-medium dark:text-gray-300">
                    نامه پوششی:
                  </h3>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                    {app.coverLetter}
                  </p>
                </div>

                {app.resumeUrl && (
                  <div className="mt-3">
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                      📄 مشاهده رزومه
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}