"use client"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerUser } from "@/actions/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  setError("")
  setLoading(true)

  const formData = new FormData(e.currentTarget)
  const result = await registerUser(formData)

  if (result.success) {
    toast.success("ثبت‌نام با موفقیت انجام شد! 🎉", {
      description: "در حال انتقال به صفحه ورود...",
    })
    router.push("/login?registered=true")
  } else {
    setError(result.error || "خطایی رخ داد")
    toast.error("خطا در ثبت‌نام", {
      description: result.error || "لطفاً دوباره تلاش کنید",
    })
    setLoading(false)
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold dark:text-white">HireHub</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">ساخت حساب جدید</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300">
              نام کامل
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="مثلاً: گیریت بیل"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300">
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium dark:text-gray-300">
              رمز عبور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="حداقل ۶ کاراکتر"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium dark:text-gray-300">
              نقش
            </label>
            <select
              id="role"
              name="role"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="CANDIDATE">کارجو</option>
              <option value="RECRUITER">استخدام‌کننده</option>
            </select>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 p-2 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/50 active:scale-95 disabled:opacity-50"
          >
            {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
            ورود
          </Link>
        </p>
      </div>
    </div>
  )
}