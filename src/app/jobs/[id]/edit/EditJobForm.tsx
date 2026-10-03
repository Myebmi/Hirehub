"use client"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { updateJob, deleteJob } from "@/actions/job"

type Job = {
  id: string
  title: string
  description: string
  location: string
  salary: number | null
  type: string
  status: string
}

export default function EditJobForm({ job }: { job: Job }) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await updateJob(job.id, formData)

    if (result.success) {
  toast.success("آگهی حذف شد! 🗑️")
  router.push("/jobs")
  router.refresh()
} else {
  setError(result.error || "خطا در حذف")
  toast.error("خطا در حذف", {
    description: result.error || "لطفاً دوباره تلاش کنید",
  })
  setDeleting(false)
}
  }

  async function handleDelete() {
    if (!confirm("آیا مطمئن هستید که می‌خواهید این آگهی را حذف کنید؟")) {
      return
    }

    setDeleting(true)
    const result = await deleteJob(job.id)

    if (result.success) {
      router.push("/jobs")
      router.refresh()
    } else {
      setError(result.error || "خطا در حذف")
      setDeleting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg bg-white p-8 shadow"
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          عنوان شغل *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={job.title}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          توضیحات *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          defaultValue={job.description}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium">
          محل کار *
        </label>
        <input
          id="location"
          name="location"
          type="text"
          required
          defaultValue={job.location}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="salary" className="block text-sm font-medium">
          حقوق (اختیاری)
        </label>
        <input
          id="salary"
          name="salary"
          type="number"
          defaultValue={job.salary || ""}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium">
          نوع همکاری *
        </label>
        <select
          id="type"
          name="type"
          required
          defaultValue={job.type}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        >
          <option value="FULL_TIME">تمام‌وقت</option>
          <option value="PART_TIME">پاره‌وقت</option>
          <option value="REMOTE">دورکاری</option>
          <option value="CONTRACT">قراردادی</option>
          <option value="INTERNSHIP">کارآموزی</option>
        </select>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          وضعیت
        </label>
        <select
          id="status"
          name="status"
          defaultValue={job.status}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        >
          <option value="OPEN">باز</option>
          <option value="DRAFT">پیش‌نویس</option>
          <option value="CLOSED">بسته</option>
        </select>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || deleting}
          className="flex-1 rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
        <Link
          href={`/jobs/${job.id}`}
          className="rounded-md border border-gray-300 px-6 py-2 hover:bg-gray-50"
        >
          انصراف
        </Link>
      </div>

      {/* Delete Section */}
      <div className="border-t pt-6">
        <h3 className="text-sm font-medium text-red-600">منطقه خطر</h3>
        <p className="mt-1 text-sm text-gray-500">
          با حذف آگهی، تمام درخواست‌های مرتبط هم حذف می‌شوند.
        </p>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading || deleting}
          className="mt-3 rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "در حال حذف..." : "حذف آگهی"}
        </button>
      </div>
    </form>
  )
}