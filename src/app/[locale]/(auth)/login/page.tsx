"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { loginUser } from "@/actions/auth"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations("auth")
  const registered = searchParams.get("registered")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await loginUser(formData)

    if (result.success) {
      router.push("/dashboard")
      router.refresh()
    } else {
      setError(result.error || t("errorGeneric"))
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold dark:text-white">HireHub</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{t("loginTitle")}</p>
      </div>

      {registered && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
          {t("registerSuccess")}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300">
            {t("email")}
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

        <div>
          <label htmlFor="password" className="block text-sm font-medium dark:text-gray-300">
            {t("password")}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder={t("passwordPlaceholder")}
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
          className="w-full rounded-md bg-blue-600 p-2 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/50 active:scale-95 disabled:opacity-50"
        >
          {loading ? t("loggingIn") : t("login")}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {t("noAccount")}{" "}
        <Link href="/register" className="text-blue-600 hover:underline dark:text-blue-400">
          {t("register")}
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <Suspense fallback={<div className="dark:text-white">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}