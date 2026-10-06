"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updateProfile } from "@/actions/profile"

export default function ProfileForm({
  user,
}: {
  user: { name: string; email: string }
}) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await updateProfile(formData)

    if (result.success) {
      toast.success("پروفایل با موفقیت به‌روزرسانی شد! ✅")
      router.refresh()
    } else {
      setError(result.error || "خطایی رخ داد")
      toast.error("خطا در به‌روزرسانی", {
        description: result.error || "لطفاً دوباره تلاش کنید",
      })
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg bg-white p-6 shadow dark:bg-gray-800"
    >
      <h2 className="text-lg font-semibold dark:text-white">
        اطلاعات شخصی
      </h2>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium dark:text-gray-300"
        >
          نام کامل
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={user.name}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium dark:text-gray-300"
        >
          ایمیل
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={user.email}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </form>
  )
}