"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updateApplicationStatus } from "@/actions/application"

const statusOptions = [
  { value: "PENDING", label: "در انتظار" },
  { value: "REVIEWING", label: "در حال بررسی" },
  { value: "INTERVIEW", label: "مصاحبه" },
  { value: "REJECTED", label: "رد شده" },
  { value: "HIRED", label: "استخدام شده" },
]

export default function ApplicationStatusForm({
  applicationId,
  currentStatus,
}: {
  applicationId: string
  currentStatus: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setError("")
    setLoading(true)

    const formData = new FormData()
    formData.append("status", e.target.value)

    const result = await updateApplicationStatus(applicationId, formData)

    if (result.success) {
      toast.success("وضعیت با موفقیت تغییر کرد! ✅")
      router.refresh()
    } else {
      setError(result.error || "خطایی رخ داد")
      toast.error("خطا در تغییر وضعیت", {
        description: result.error || "لطفاً دوباره تلاش کنید",
      })
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <select
        defaultValue={currentStatus}
        onChange={handleChange}
        disabled={loading}
        className="rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      {loading && <p className="text-xs text-gray-500 dark:text-gray-400">در حال ذخیره...</p>}
    </div>
  )
}