"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function JobFilters({
  initialQuery,
  initialType,
  initialLocation,
}: {
  initialQuery: string
  initialType: string
  initialLocation: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(initialQuery)
  const [type, setType] = useState(initialType)
  const [location, setLocation] = useState(initialLocation)

  // Debounce برای جستجو
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (query) params.set("q", query)
      else params.delete("q")

      if (type) params.set("type", type)
      else params.delete("type")

      if (location) params.set("location", location)
      else params.delete("location")

      router.push(`/jobs?${params.toString()}`)
    }, 500)

    return () => clearTimeout(timer)
  }, [query, type, location, router, searchParams])

  function clearFilters() {
    setQuery("")
    setType("")
    setLocation("")
    router.push("/jobs")
  }

  const hasFilters = query || type || location

  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
      <div className="grid gap-3 md:grid-cols-3">
        {/* Search */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
            جستجو
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="عنوان یا توضیحات..."
            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
            نوع همکاری
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">همه</option>
            <option value="FULL_TIME">تمام‌وقت</option>
            <option value="PART_TIME">پاره‌وقت</option>
            <option value="REMOTE">دورکاری</option>
            <option value="CONTRACT">قراردادی</option>
            <option value="INTERNSHIP">کارآموزی</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
            محل کار
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="مثلاً: کابل"
            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>
      </div>

      {hasFilters && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            فیلترها فعال هستن
          </span>
          <button
            onClick={clearFilters}
            className="text-xs text-red-600 hover:underline dark:text-red-400"
          >
            پاک کردن فیلترها ✕
          </button>
        </div>
      )}
    </div>
  )
}