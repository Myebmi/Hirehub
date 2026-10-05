"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { createJob } from "@/actions/job"

export default function NewJobPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await createJob(formData)

    if (result.success) {
      toast.success("آگهی با موفقیت ثبت شد! ✅", {
        description: "آگهی شما در لیست نمایش داده می‌شود",
      })
      router.push("/jobs")
      router.refresh()
    } else {
      setError(result.error || "خطایی رخ داد")
      toast.error("خطا در ثبت آگهی", {
        description: result.error || "لطفاً دوباره تلاش کنید",
      })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href="/jobs"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ← بازگشت به لیست
          </Link>
          <h1 className="mt-2 text-3xl font-bold dark:text-white">
            آگهی شغلی جدید
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg bg-white p-8 shadow dark:bg-gray-800"
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium dark:text-gray-300"
            >
              عنوان شغل *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="مثلاً: برنامه‌نویس فرانت‌اند"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium dark:text-gray-300"
            >
              توضیحات *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="شرح کامل موقعیت شغلی، مسئولیت‌ها و نیازمندی‌ها..."
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium dark:text-gray-300"
            >
              محل کار *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="مثلاً: کابل، افغانستان"
            />
          </div>

          {/* Salary */}
          <div>
            <label
              htmlFor="salary"
              className="block text-sm font-medium dark:text-gray-300"
            >
              حقوق (اختیاری)
            </label>
            <input
              id="salary"
              name="salary"
              type="number"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="مثلاً: 50000"
            />
          </div>

          {/* Type */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium dark:text-gray-300"
            >
              نوع همکاری *
            </label>
            <select
              id="type"
              name="type"
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="FULL_TIME">تمام‌وقت</option>
              <option value="PART_TIME">پاره‌وقت</option>
              <option value="REMOTE">دورکاری</option>
              <option value="CONTRACT">قراردادی</option>
              <option value="INTERNSHIP">کارآموزی</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium dark:text-gray-300"
            >
              وضعیت
            </label>
            <select
              id="status"
              name="status"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="OPEN">باز</option>
              <option value="DRAFT">پیش‌نویس</option>
              <option value="CLOSED">بسته</option>
            </select>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-blue-600 p-2 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/50 active:scale-95 disabled:opacity-50"
            >
              {loading ? "در حال ذخیره..." : "ثبت آگهی"}
            </button>
            <Link
              href="/jobs"
              className="rounded-md border border-gray-300 px-6 py-2 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              انصراف
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}