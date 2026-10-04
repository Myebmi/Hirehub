import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"
import EditJobForm from "./EditJobForm"

export default async function EditJobPage({
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
  })

  if (!job) {
    notFound()
  }

  if (job.recruiterId !== session.user.id) {
    redirect(`/jobs/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href={`/jobs/${id}`}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ← بازگشت به جزئیات
          </Link>
          <h1 className="mt-2 text-3xl font-bold dark:text-white">
            ویرایش آگهی
          </h1>
        </div>

        <EditJobForm job={job} />
      </div>
    </div>
  )
}