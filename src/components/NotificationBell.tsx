"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  clearAllNotifications,
} from "@/actions/notification"
import { supabase } from "@/lib/supabase"

type Notification = {
  id: string
  type: string
  title: string
  message: string
  link: string | null
  read: boolean
  createdAt: Date
}

export default function NotificationBell() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ✅ بارگذاری اعلان‌ها
  async function loadNotifications() {
    const result = await getNotifications()
    if (result.success && result.notifications) {
      setNotifications(result.notifications as any)
      setUnreadCount(result.unreadCount || 0)
    }
  }

  // ✅ بارگذاری اولیه + Realtime
  useEffect(() => {
    loadNotifications()

    // اگه Supabase نبود، fallback به polling
    if (!supabase) {
      console.warn("⚠️ Supabase Realtime disabled - using polling")
      const interval = setInterval(loadNotifications, 60000)
      return () => clearInterval(interval)
    }

    // ✅ Supabase Realtime
    const channel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          console.log("🔔 Realtime notification:", payload)

          if (payload.eventType === "INSERT") {
            const newNotification = payload.new as any

            toast.success(newNotification.title, {
              description: newNotification.message,
              action: newNotification.link
                ? {
                    label: "مشاهده",
                    onClick: () => router.push(newNotification.link),
                  }
                : undefined,
              duration: 5000,
            })

            setNotifications((prev) => [newNotification as any, ...prev])
            setUnreadCount((prev) => prev + 1)
          }

          if (payload.eventType === "UPDATE") {
            const updated = payload.new as any
            setNotifications((prev) =>
              prev.map((n) => (n.id === updated.id ? { ...n, ...updated } : n))
            )
            if (updated.read) {
              setUnreadCount((prev) => Math.max(0, prev - 1))
            }
          }

          if (payload.eventType === "DELETE") {
            const deleted = payload.old as any
            setNotifications((prev) => prev.filter((n) => n.id !== deleted.id))
          }
        }
      )
      .subscribe((status) => {
        console.log("🔌 Supabase Realtime status:", status)
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // ✅ بستن dropdown با کلیک بیرون
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ✅ وقتی dropdown باز می‌شه، refresh کن
  useEffect(() => {
    if (isOpen) {
      loadNotifications()
    }
  }, [isOpen])

  async function handleMarkAsRead(id: string, link: string | null) {
    setLoading(true)
    const result = await markAsRead(id)
    if (result.success) {
      await loadNotifications()
      if (link) {
        setIsOpen(false)
        router.push(link)
      }
    }
    setLoading(false)
  }

  async function handleMarkAllAsRead() {
    setLoading(true)
    const result = await markAllAsRead()
    if (result.success) {
      toast.success("همه اعلان‌ها خوانده شدند ✅")
      await loadNotifications()
    }
    setLoading(false)
  }

  async function handleClearAll() {
    if (!confirm("آیا از پاک کردن همه اعلان‌ها مطمئن هستید؟")) return
    setLoading(true)
    const result = await clearAllNotifications()
    if (result.success) {
      toast.success("همه اعلان‌ها پاک شدند 🗑️")
      await loadNotifications()
    }
    setLoading(false)
  }

  const typeIcons: Record<string, string> = {
    APPLICATION_STATUS: "📋",
    NEW_APPLICATION: "📨",
    JOB_APPROVED: "✅",
    WELCOME: "🎉",
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-md bg-gray-100 p-2 transition hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Notifications"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
            <h3 className="font-semibold dark:text-white">اعلان‌ها</h3>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleMarkAllAsRead}
                  disabled={loading || unreadCount === 0}
                  className="text-xs text-blue-600 hover:underline disabled:opacity-50 dark:text-blue-400"
                >
                  خوانده شد
                </button>
                <button
                  onClick={handleClearAll}
                  disabled={loading}
                  className="text-xs text-red-600 hover:underline disabled:opacity-50 dark:text-red-400"
                >
                  پاک کردن
                </button>
              </div>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mb-2 text-4xl">📭</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  هیچ اعلانی وجود ندارد
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() =>
                    handleMarkAsRead(notification.id, notification.link)
                  }
                  className={`cursor-pointer border-b border-gray-100 p-4 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50 ${
                    !notification.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">
                      {typeIcons[notification.type] || "📌"}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold dark:text-white">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                        )}
                      </div>
                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(notification.createdAt).toLocaleDateString(
                          "en-US"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ✅ Footer: نشانگر Realtime */}
          <div className="border-t border-gray-200 p-2 text-center dark:border-gray-700">
            <span
              className={`inline-flex items-center gap-1 text-xs ${
                supabase ? "text-green-600 dark:text-green-400" : "text-gray-400"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  supabase ? "bg-green-500 animate-pulse" : "bg-gray-400"
                }`}
              />
              {supabase ? "Realtime فعال" : "Polling mode"}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}