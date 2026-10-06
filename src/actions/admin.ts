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

// ==================== حذف کاربر (با تمام وابستگی‌ها) ====================
export async function deleteUser(userId: string) {
  try {
    const admin = await checkAdmin()
    if (!admin) {
      return { success: false, error: "دسترسی ندارید" }
    }

    if (userId === admin.id) {
      return { success: false, error: "نمی‌توانید خودتان را حذف کنید" }
    }

    // ✅ چک کن کاربر وجود داره
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    })

    if (!user) {
      return { success: false, error: "کاربر پیدا نشد" }
    }

    console.log("🗑️ Deleting user:", user.email)

    // ==================== حذف وابستگی‌ها به ترتیب ====================

    // ۱. حذف درخواست‌هایی که این کاربر (به عنوان applicant) فرستاده
    const deletedApplications = await prisma.application.deleteMany({
      where: { applicantId: userId },
    })
    console.log(`  - Deleted ${deletedApplications.count} applications (as applicant)`)

    // ۲. حذف درخواست‌هایی که به آگهی‌های این کاربر (به عنوان recruiter) مربوط می‌شن
    const deletedJobApplications = await prisma.application.deleteMany({
      where: {
        job: {
          recruiterId: userId,
        },
      },
    })
    console.log(`  - Deleted ${deletedJobApplications.count} applications (on user's jobs)`)

    // ۳. حذف آگهی‌های این کاربر
    const deletedJobs = await prisma.job.deleteMany({
      where: { recruiterId: userId },
    })
    console.log(`  - Deleted ${deletedJobs.count} jobs`)

    // ۴. حذف Accountها (NextAuth)
    const deletedAccounts = await prisma.account.deleteMany({
      where: { userId },
    })
    console.log(`  - Deleted ${deletedAccounts.count} accounts`)

    // ۵. حذف Sessionها (NextAuth)
    const deletedSessions = await prisma.session.deleteMany({
      where: { userId },
    })
    console.log(`  - Deleted ${deletedSessions.count} sessions`)

    // ۶. حالا خود کاربر رو حذف کن
    await prisma.user.delete({
      where: { id: userId },
    })
    console.log(`  ✅ User ${user.email} deleted successfully`)

    revalidatePath("/admin")
    revalidatePath("/jobs")
    return { success: true }
  } catch (error) {
    console.error("❌ Delete user error:", error)
    return {
      success: false,
      error: "خطا در حذف کاربر. لطفاً دوباره تلاش کنید.",
    }
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

// ==================== حذف آگهی (با درخواست‌های مرتبط) ====================
export async function deleteJobAdmin(jobId: string) {
  try {
    const admin = await checkAdmin()
    if (!admin) {
      return { success: false, error: "دسترسی ندارید" }
    }

    // ✅ چک کن آگهی وجود داره
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { id: true, title: true },
    })

    if (!job) {
      return { success: false, error: "آگهی پیدا نشد" }
    }

    console.log("🗑️ Deleting job:", job.title)

    // ✅ اول درخواست‌های مرتبط رو حذف کن
    const deletedApps = await prisma.application.deleteMany({
      where: { jobId },
    })
    console.log(`  - Deleted ${deletedApps.count} related applications`)

    // ✅ حالا آگهی رو حذف کن
    await prisma.job.delete({
      where: { id: jobId },
    })
    console.log(`  ✅ Job "${job.title}" deleted successfully`)

    revalidatePath("/admin")
    revalidatePath("/jobs")
    return { success: true }
  } catch (error) {
    console.error("❌ Delete job error:", error)
    return {
      success: false,
      error: "خطا در حذف آگهی. لطفاً دوباره تلاش کنید.",
    }
  }
}