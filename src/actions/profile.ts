"use server"

import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"
import { profileSchema, passwordSchema } from "@/lib/validations/profile"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "ابتدا وارد شوید" }
    }

    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    }

    const parsed = profileSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      }
    }

    // چک کن ایمیل جدید توسط کاربر دیگه‌ای استفاده نشده باشه
    if (parsed.data.email !== session.user.email) {
      const existing = await prisma.user.findUnique({
        where: { email: parsed.data.email },
      })
      if (existing) {
        return { success: false, error: "این ایمیل قبلاً استفاده شده است" }
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: parsed.data,
    })

    revalidatePath("/profile")
    return { success: true }
  } catch (error) {
    console.error("Update profile error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}

export async function changePassword(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "ابتدا وارد شوید" }
    }

    const rawData = {
      currentPassword: formData.get("currentPassword") as string,
      newPassword: formData.get("newPassword") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    }

    const parsed = passwordSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      }
    }

    // کاربر رو بگیر
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user || !user.password) {
      return { success: false, error: "کاربر پیدا نشد" }
    }

    // رمز فعلی رو چک کن
    const isValid = await bcrypt.compare(
      parsed.data.currentPassword,
      user.password
    )

    if (!isValid) {
      return { success: false, error: "رمز فعلی اشتباه است" }
    }

    // رمز جدید رو هش کن
    const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 10)

    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    })

    return { success: true }
  } catch (error) {
    console.error("Change password error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}