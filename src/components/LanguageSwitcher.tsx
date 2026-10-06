"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useTransition, useEffect, useState } from "react"

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function switchLocale(newLocale: "fa" | "en") {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
    })
  }

  // ✅ جلوگیری از Hydration Mismatch
  if (!mounted) {
    return (
      <button
        className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium dark:bg-gray-800 dark:text-gray-200"
        aria-label="Switch language"
      >
        🌐
      </button>
    )
  }

  return (
    <button
      onClick={() => switchLocale(locale === "fa" ? "en" : "fa")}
      disabled={isPending}
      className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium transition hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      aria-label="Switch language"
    >
      {locale === "fa" ? "🇬🇧 EN" : "🇦🇫 FA"}
    </button>
  )
}