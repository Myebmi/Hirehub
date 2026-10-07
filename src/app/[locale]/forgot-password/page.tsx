"use client"

import { useState } from "react"
import { Link } from "@/i18n/navigation"
import { requestPasswordReset } from "@/actions/password-reset"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await requestPasswordReset(formData)

    if (result.success) {
      setSent(true)
      setMessage(result.message || "ایمیل ارسال شد")
      toast.success(result.message)
    } else {
      toast.error(result.error)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800">
          <div className="mb-4 text-6xl">📧</div>
          <h2 className="mb-2 text-2xl font-bold dark:text-white">
            ایمیل ارسال شد!
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">{message}</p>
          <Link
            href="/login"
            className="inline-block rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            بازگشت به ورود
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <div className="mb-2 text-5xl">🔑</div>
          <h1 className="text-2xl font-bold dark:text-white">
            فراموشی رمز عبور
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ایمیل خود را وارد کنید تا لینک بازیابی دریافت کنید
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 p-2 text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50"
          >
            {loading ? "در حال ارسال..." : "ارسال لینک بازیابی"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          رمزت رو یادت اومد؟{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ورود
          </Link>
        </p>
      </div>
    </div>
  )
}