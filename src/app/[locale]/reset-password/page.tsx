"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Link } from "@/i18n/navigation"
import { resetPassword } from "@/actions/password-reset"
import { toast } from "sonner"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    const formData = new FormData(e.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("رمزهای عبور یکسان نیستند")
      return
    }

    setLoading(true)
    formData.set("token", token || "")

    const result = await resetPassword(formData)

    if (result.success) {
      toast.success("رمز عبور با موفقیت تغییر کرد")
      router.push("/login")
    } else {
      setError(result.error || "خطایی رخ داد")
    }
    setLoading(false)
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800">
          <div className="mb-4 text-6xl">❌</div>
          <h2 className="mb-4 text-2xl font-bold dark:text-white">
            توکن یافت نشد
          </h2>
          <Link
            href="/forgot-password"
            className="inline-block rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            درخواست لینک جدید
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <div className="mb-2 text-5xl">🔐</div>
          <h1 className="text-2xl font-bold dark:text-white">
            تغییر رمز عبور
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">
              رمز جدید
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-300">
              تکرار رمز جدید
            </label>
            <input
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
            className="w-full rounded-md bg-blue-600 p-2 text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50"
          >
            {loading ? "در حال تغییر..." : "تغییر رمز عبور"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="dark:text-white">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}