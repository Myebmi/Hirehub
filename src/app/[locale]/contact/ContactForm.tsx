"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { sendContactMessage } from "@/actions/contact"

export default function ContactForm() {
  const t = useTranslations("contact")
  const tCommon = useTranslations("common")
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
      toast.success(t("successTitle"), {
        description: t("successMessage"),
      })
      setSuccess(true)
      ;(e.target as HTMLFormElement).reset()
    } else {
      setError(result.error || t("errorGeneric"))
      toast.error(t("errorGeneric"), {
        description: result.error,
      })
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="animate-scale-in rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
        <div className="mb-4 text-6xl">✅</div>
        <h2 className="mb-2 text-2xl font-bold dark:text-white">
          {t("successTitle")}
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          {t("successMessage")}
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="rounded-md bg-blue-600 px-6 py-2 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl active:scale-95"
        >
          {t("newMessage")}
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
            {t("name")} *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder={t("namePlaceholder")}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium dark:text-gray-300"
          >
            {t("email")} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder={t("emailPlaceholder")}
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium dark:text-gray-300"
        >
          {t("subject")} *
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder={t("subjectPlaceholder")}
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium dark:text-gray-300"
        >
          {t("message")} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder={t("messagePlaceholder")}
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
        {loading ? t("sending") : `📧 ${t("send")}`}
      </button>

      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        ✓
      </p>
    </form>
  )
}