"use client"

import { signOut } from "next-auth/react"
import { useState } from "react"

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
    >
      {loading ? "در حال خروج..." : "خروج"}
    </button>
  )
}