"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"
import { revalidatePath } from "next/cache"

export async function getNotifications() {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "دسترسی ندارید" }
    }

    const notifications = await prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    })

    const unreadCount = await prisma.notification.count({
      where: { userId: session.user.id, read: false },
    })

    return { success: true, notifications, unreadCount }
  } catch (error) {
    console.error("Get notifications error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}

export async function markAsRead(notificationId: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "دسترسی ندارید" }
    }

    await prisma.notification.update({
      where: { id: notificationId, userId: session.user.id },
      data: { read: true },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Mark as read error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}

export async function markAllAsRead() {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "دسترسی ندارید" }
    }

    await prisma.notification.updateMany({
      where: { userId: session.user.id, read: false },
      data: { read: true },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Mark all as read error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}

export async function clearAllNotifications() {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "دسترسی ندارید" }
    }

    await prisma.notification.deleteMany({
      where: { userId: session.user.id },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Clear notifications error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}