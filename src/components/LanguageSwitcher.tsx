"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useTransition } from "react"

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchLocale(newLocale: "fa" | "en") {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
    })
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