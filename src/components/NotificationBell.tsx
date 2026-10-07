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

  async function loadNotifications() {
    const result = await getNotifications()
    if (result.success && result.notifications) {
      setNotifications(result.notifications as any)
      setUnreadCount(result.unreadCount || 0)
    }
  }

  useEffect(() => {
    loadNotifications()
    const interval = setInterval(loadNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

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
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
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
                          <span className="h-2 w-2 rounded-full bg-blue-600" />
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
        </div>
      )}
    </div>
  )
}