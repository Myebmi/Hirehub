"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button 
        className="rounded-md bg-gray-100 p-2 dark:bg-gray-800"
        aria-label="Toggle theme"
      >
        <span className="text-xl">🌙</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-md bg-gray-100 p-2 transition hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      <span className="text-xl">
        {resolvedTheme === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  )
}