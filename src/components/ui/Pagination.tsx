"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: {
  currentPage: number
  totalPages: number
  basePath: string
  searchParams?: Record<string, string>
}) {
  const t = useTranslations("common")

  if (totalPages <= 1) return null

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    return `${basePath}?${params.toString()}`
  }

  // صفحات اطراف صفحه فعلی
  const pages: (number | "...")[] = []
  const showPages = 5
  const start = Math.max(1, currentPage - Math.floor(showPages / 2))
  const end = Math.min(totalPages, start + showPages - 1)

  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push("...")
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("...")
    pages.push(totalPages)
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="rounded-md bg-white px-3 py-2 text-sm font-medium shadow transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          ← {t("previous")}
        </Link>
      ) : (
        <span className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-400 dark:bg-gray-800 dark:text-gray-600">
          ← {t("previous")}
        </span>
      )}

      {/* Page Numbers */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : page === currentPage ? (
          <span
            key={page}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-600/30"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(page)}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium shadow transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="rounded-md bg-white px-3 py-2 text-sm font-medium shadow transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          {t("next")} →
        </Link>
      ) : (
        <span className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-400 dark:bg-gray-800 dark:text-gray-600">
          {t("next")} →
        </span>
      )}
    </div>
  )
}