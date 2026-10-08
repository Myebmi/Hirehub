"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminNav() {
  const pathname = usePathname()

  const links = [
    { href: "/admin", label: "داشبورد", icon: "📊" },
    { href: "/admin/users", label: "کاربران", icon: "👥" },
    { href: "/admin/jobs", label: "آگهی‌ها", icon: "💼" },
  ]

  return (
    <div className="mb-6 flex gap-2 border-b border-gray-200 dark:border-gray-700">
      {links.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        )
      })}
    </div>
  )
}