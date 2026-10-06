"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"
import { revalidatePath } from "next/cache"

// بررسی ادمین بودن
async function checkAdmin() {
  const session = await auth()
  if (!session?.user) return null
  if (session.user.role !== "ADMIN") return null
  return session.user
}

// ==================== تغییر نقش کاربر ====================
export async function updateUserRole(userId: string, formData: FormData) {
  try {
    const admin = await checkAdmin()
    if (!admin) {
      return { success: false, error: "دسترسی ندارید" }
    }

    const role = formData.get("role") as string

    if (!["ADMIN", "RECRUITER", "CANDIDATE"].includes(role)) {
      return { success: false, error: "نقش نامعتبر" }
    }

    // جلوگیری از تغییر نقش خودش
    if (userId === admin.id) {
      return { success: false, error: "نمی‌توانید نقش خودتان را تغییر دهید" }
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role },
    })

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Update user role error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}

// ==================== حذف کاربر ====================
export async function deleteUser(userId: string) {
  try {
    const admin = await checkAdmin()
    if (!admin) {
      return { success: false, error: "دسترسی ندارید" }
    }

    if (userId === admin.id) {
      return { success: false, error: "نمی‌توانید خودتان را حذف کنید" }
    }

    await prisma.user.delete({
      where: { id: userId },
    })

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Delete user error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}

// ==================== تغییر وضعیت آگهی ====================
export async function updateJobStatus(jobId: string, formData: FormData) {
  try {
    const admin = await checkAdmin()
    if (!admin) {
      return { success: false, error: "دسترسی ندارید" }
    }

    const status = formData.get("status") as string

    if (!["OPEN", "DRAFT", "CLOSED"].includes(status)) {
      return { success: false, error: "وضعیت نامعتبر" }
    }

    await prisma.job.update({
      where: { id: jobId },
      data: { status },
    })

    revalidatePath("/admin")
    revalidatePath("/jobs")
    return { success: true }
  } catch (error) {
    console.error("Update job status error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}

// ==================== حذف آگهی ====================
export async function deleteJobAdmin(jobId: string) {
  try {
    const admin = await checkAdmin()
    if (!admin) {
      return { success: false, error: "دسترسی ندارید" }
    }

    await prisma.job.delete({
      where: { id: jobId },
    })

    revalidatePath("/admin")
    revalidatePath("/jobs")
    return { success: true }
  } catch (error) {
    console.error("Delete job error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}