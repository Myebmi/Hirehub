"use client"

import { useState } from "react"
import { toast } from "sonner"
import { sendContactMessage } from "@/actions/contact"

export default function ContactForm() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await sendContactMessage(formData)

    if (result.success) {
      toast.success("پیام شما با موفقیت ارسال شد! 🎉", {
        description: "به‌زودی با شما تماس می‌گیریم.",
      })
      setSuccess(true)
      ;(e.target as HTMLFormElement).reset()
    } else {
      setError(result.error || "خطایی رخ داد")
      toast.error("خطا در ارسال پیام", {
        description: result.error || "لطفاً دوباره تلاش کنید",
      })
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="animate-scale-in rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
        <div className="mb-4 text-6xl">✅</div>
        <h2 className="mb-2 text-2xl font-bold dark:text-white">
          پیام شما ارسال شد!
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          ممنون از پیام شما. به‌زودی با شما تماس می‌گیریم.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="rounded-md bg-blue-600 px-6 py-2 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl active:scale-95"
        >
          ارسال پیام جدید
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in delay-100 space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium dark:text-gray-300"
          >
            نام کامل *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="نام شما"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium dark:text-gray-300"
          >
            ایمیل *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium dark:text-gray-300"
        >
          موضوع *
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="موضوع پیام"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium dark:text-gray-300"
        >
          پیام *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="پیام خود را بنویسید..."
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
        className="w-full rounded-md bg-blue-600 p-3 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/50 active:scale-95 disabled:opacity-50"
      >
        {loading ? "در حال ارسال..." : "📧 ارسال پیام"}
      </button>

      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        با ارسال پیام، با قوانین HireHub موافقت می‌کنید.
      </p>
    </form>
  )
}