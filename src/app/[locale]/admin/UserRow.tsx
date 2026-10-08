"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updateUserRole, deleteUser } from "@/actions/admin"

type User = {
  id: string
  name: string | null
  email: string
  role: string
  createdAt: Date
  _count: {
    jobs: number
    applications: number
  }
}

const roleColors: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  RECRUITER: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  CANDIDATE: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
}

const roleLabels: Record<string, string> = {
  ADMIN: "مدیر",
  RECRUITER: "استخدام‌کننده",
  CANDIDATE: "کارجو",
}

export default function UserRow({ user }: { user: User }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = e.target.value
    setLoading(true)

    const formData = new FormData()
    formData.append("role", newRole)

    const result = await updateUserRole(user.id, formData)

    if (result.success) {
      toast.success("نقش کاربر با موفقیت تغییر کرد")
      router.refresh()
    } else {
      toast.error("خطا", { description: result.error })
    }
    setLoading(false)
  }

  async function handleDelete() {
    if (!confirm(`آیا از حذف "${user.name || user.email}" مطمئن هستید؟`)) {
      return
    }

    setLoading(true)
    const result = await deleteUser(user.id)

    if (result.success) {
      toast.success("کاربر با موفقیت حذف شد")
      router.refresh()
    } else {
      toast.error("خطا", { description: result.error })
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-lg font-bold text-white">
          {user.name?.charAt(0) || "U"}
        </div>
        <div>
          <div className="font-semibold dark:text-white">
            {user.name || "بدون نام"}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </div>
        </div>
      </div>

      <div className="flex gap-4 text-sm">
        <div>
          <span className="text-gray-500 dark:text-gray-400">آگهی: </span>
          <span className="font-bold dark:text-white">{user._count.jobs}</span>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">درخواست: </span>
          <span className="font-bold dark:text-white">
            {user._count.applications}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${roleColors[user.role]}`}
        >
          {roleLabels[user.role]}
        </span>

        <select
          value={user.role}
          onChange={handleRoleChange}
          disabled={loading}
          className="rounded-md border border-gray-300 p-1 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="CANDIDATE">کارجو</option>
          <option value="RECRUITER">استخدام‌کننده</option>
          <option value="ADMIN">مدیر</option>
        </select>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="rounded-md bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          🗑️ حذف
        </button>
      </div>
    </div>
  )
}