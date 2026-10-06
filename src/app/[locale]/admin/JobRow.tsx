"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { updateJobStatus, deleteJobAdmin } from "@/actions/admin"

type Job = {
  id: string
  title: string
  location: string
  status: string
  createdAt: Date
  recruiter: {
    name: string | null
    email: string
  }
  _count: {
    applications: number
  }
}

const statusColors: Record<string, string> = {
  OPEN: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  DRAFT: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  CLOSED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const statusLabels: Record<string, string> = {
  OPEN: "باز",
  DRAFT: "پیش‌نویس",
  CLOSED: "بسته",
}

export default function JobRow({ job }: { job: Job }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLoading(true)

    const formData = new FormData()
    formData.append("status", e.target.value)

    const result = await updateJobStatus(job.id, formData)

    if (result.success) {
      toast.success("وضعیت آگهی تغییر کرد ✅")
      router.refresh()
    } else {
      toast.error("خطا", { description: result.error })
    }
    setLoading(false)
  }

  async function handleDelete() {
    if (!confirm(`آیا از حذف "${job.title}" مطمئن هستید؟`)) {
      return
    }

    setLoading(true)
    const result = await deleteJobAdmin(job.id)

    if (result.success) {
      toast.success("آگهی حذف شد 🗑️")
      router.refresh()
    } else {
      toast.error("خطا", { description: result.error })
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 md:flex-row md:items-center md:justify-between">
      {/* Job Info */}
      <div className="flex-1">
        <Link
          href={`/jobs/${job.id}`}
          className="font-semibold hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
        >
          {job.title}
        </Link>
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          📍 {job.location} — 👤 {job.recruiter.name}
        </div>
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          📨 {job._count.applications} متقاضی
        </div>
      </div>

      {/* Status + Actions */}
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[job.status]}`}
        >
          {statusLabels[job.status]}
        </span>

        <select
          value={job.status}
          onChange={handleStatusChange}
          disabled={loading}
          className="rounded-md border border-gray-300 p-1 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="OPEN">باز</option>
          <option value="DRAFT">پیش‌نویس</option>
          <option value="CLOSED">بسته</option>
        </select>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="rounded-md bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}