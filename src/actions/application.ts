"use server"

import { prisma } from "@/lib/prisma"
import { applicationSchema, updateApplicationStatusSchema } from "@/lib/validations/application"
import { auth } from "@/../auth"
import { revalidatePath } from "next/cache"

export async function applyToJob(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "ابتدا وارد شوید" }
    }

    const rawData = {
      jobId: formData.get("jobId") as string,
      coverLetter: formData.get("coverLetter") as string,
      resumeUrl: (formData.get("resumeUrl") as string) || "",
    }

    const parsed = applicationSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      }
    }

    const { jobId, coverLetter, resumeUrl } = parsed.data

    // چک کن آگهی وجود داره
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!job) {
      return { success: false, error: "آگهی پیدا نشد" }
    }

    // چک کن کاربر قبلاً درخواست نداده
    const existing = await prisma.application.findUnique({
      where: {
        jobId_applicantId: {
          jobId,
          applicantId: session.user.id,
        },
      },
    })

    if (existing) {
      return { success: false, error: "شما قبلاً برای این آگهی درخواست داده‌اید" }
    }

    await prisma.application.create({
      data: {
        jobId,
        applicantId: session.user.id,
        coverLetter,
        resumeUrl: resumeUrl || null,
      },
    })

    revalidatePath(`/jobs/${jobId}`)
    revalidatePath("/my-applications")
    return { success: true }
  } catch (error) {
    console.error("Apply error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}

export async function updateApplicationStatus(
  applicationId: string,
  formData: FormData
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "ابتدا وارد شوید" }
    }

    const rawData = {
      status: formData.get("status") as string,
    }

    const parsed = updateApplicationStatusSchema.safeParse(rawData)
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message }
    }

    // چک کن کاربر صاحب آگهی هست
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { job: true },
    })

    if (!application || application.job.recruiterId !== session.user.id) {
      return { success: false, error: "دسترسی ندارید" }
    }

    await prisma.application.update({
      where: { id: applicationId },
      data: { status: parsed.data.status },
    })

    revalidatePath(`/jobs/${application.jobId}/applications`)
    return { success: true }
  } catch (error) {
    console.error("Update application status error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}