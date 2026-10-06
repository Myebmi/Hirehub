"use client"

import { useState } from "react"
import { toast } from "sonner"
import { changePassword } from "@/actions/profile"

export default function ChangePasswordForm() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await changePassword(formData)

    if (result.success) {
      toast.success("رمز عبور با موفقیت تغییر کرد! 🔐")
      ;(e.target as HTMLFormElement).reset()
    } else {
      setError(result.error || "خطایی رخ داد")
      toast.error("خطا در تغییر رمز", {
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
      <h2 className="text-lg font-semibold dark:text-white">تغییر رمز عبور</h2>

      <div>
        <label
          htmlFor="currentPassword"
          className="block text-sm font-medium dark:text-gray-300"
        >
          رمز فعلی
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium dark:text-gray-300"
        >
          رمز جدید
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          minLength={6}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium dark:text-gray-300"
        >
          تکرار رمز جدید
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={6}
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
        {loading ? "در حال تغییر..." : "تغییر رمز عبور"}
      </button>
    </form>
  )
}