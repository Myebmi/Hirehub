import type { Metadata } from "next"
import Link from "next/link"
import ContactForm from "./ContactForm"
import ThemeToggle from "@/components/ThemeToggle"

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "با تیم HireHub در تماس باشید. سوالات، پیشنهادات و انتقادات خود را با ما در میان بگذارید.",
  openGraph: {
    title: "تماس با ما | HireHub",
    description: "با تیم HireHub در تماس باشید",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6 lg:p-8 dark:from-blue-950/20 dark:via-gray-950 dark:to-purple-950/20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ← بازگشت به صفحه اصلی
          </Link>
          <ThemeToggle />
        </div>

        {/* Title */}
        <div className="animate-fade-in mb-8 text-center">
          <div className="mb-4 text-6xl">📬</div>
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            تماس با ما
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            سوال، پیشنهاد یا انتقادی داری؟ خوشحال می‌شیم بشنویم.
          </p>
        </div>

        {/* Form */}
        <ContactForm />

        {/* Contact Info */}
        <div className="animate-fade-in delay-300 mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
            <div className="text-3xl">📧</div>
            <div className="mt-2 text-sm font-medium dark:text-gray-300">
              ایمیل
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Myebmi@outlook.com
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
            <div className="text-3xl">📍</div>
            <div className="mt-2 text-sm font-medium dark:text-gray-300">
              آدرس
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              کابل، افغانستان
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
            <div className="text-3xl">💬</div>
            <div className="mt-2 text-sm font-medium dark:text-gray-300">
              پاسخ‌دهی
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              ۲۴ ساعت
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}