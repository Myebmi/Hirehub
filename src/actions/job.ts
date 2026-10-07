"use server"

import { prisma } from "@/lib/prisma"
import { jobSchema } from "@/lib/validations/job"
import { auth } from "@/../auth"
import { revalidatePath, revalidateTag } from "next/cache"

export async function createJob(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "ابتدا وارد شوید" }
    }

    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      salary: formData.get("salary") as string,
      type: formData.get("type") as string,
      status: formData.get("status") as string,
    }

    const parsed = jobSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      }
    }

    const job = await prisma.job.create({
      data: {
        ...parsed.data,
        recruiterId: session.user.id,
      },
    })

    revalidatePath("/jobs")
    revalidateTag("dashboard")  // ✅ Cache Dashboard رو پاک کن
    return { success: true, jobId: job.id }
  } catch (error) {
    console.error("Create job error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}

export async function updateJob(jobId: string, formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "ابتدا وارد شوید" }
    }

    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      salary: formData.get("salary") as string,
      type: formData.get("type") as string,
      status: formData.get("status") as string,
    }

    const parsed = jobSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      }
    }

    // چک کن کاربر صاحب آگهی هست
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!existingJob || existingJob.recruiterId !== session.user.id) {
      return { success: false, error: "دسترسی ندارید" }
    }

    await prisma.job.update({
      where: { id: jobId },
      data: parsed.data,
    })

    revalidatePath("/jobs")
    revalidatePath(`/jobs/${jobId}`)
    revalidateTag("dashboard")  // ✅ Cache Dashboard رو پاک کن
    return { success: true }
  } catch (error) {
    console.error("Update job error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}

export async function deleteJob(jobId: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "ابتدا وارد شوید" }
    }

    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!existingJob || existingJob.recruiterId !== session.user.id) {
      return { success: false, error: "دسترسی ندارید" }
    }

    await prisma.job.delete({
      where: { id: jobId },
    })

    revalidatePath("/jobs")
    revalidateTag("dashboard")  // ✅ Cache Dashboard رو پاک کن
    return { success: true }
  } catch (error) {
    console.error("Delete job error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}