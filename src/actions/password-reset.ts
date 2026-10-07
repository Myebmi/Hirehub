"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { headers } from "next/headers"
import { z } from "zod"
import { sendPasswordResetEmail } from "@/lib/email"
import { passwordResetRatelimit } from "@/lib/ratelimit"

const requestSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
})

const resetSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
})

export async function requestPasswordReset(formData: FormData) {
  try {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || "unknown"

    if (passwordResetRatelimit) {
      const { success } = await passwordResetRatelimit.limit(ip)
      if (!success) {
        return {
          success: false,
          error: "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً بعداً تلاش کنید.",
        }
      }
    }

    const rawData = { email: formData.get("email") as string }
    const parsed = requestSchema.safeParse(rawData)
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message }
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    })

    if (!user) {
      return {
        success: true,
        message: "اگر ایمیل شما در سیستم باشد، لینک بازیابی ارسال می‌شود",
      }
    }

    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    })

    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 60 * 60 * 1000)

    await prisma.passwordResetToken.create({
      data: { userId: user.id, token, expires },
    })

    await sendPasswordResetEmail(user.email, user.name || "کاربر", token)

    return {
      success: true,
      message: "اگر ایمیل شما در سیستم باشد، لینک بازیابی ارسال می‌شود",
    }
  } catch (error) {
    console.error("Request password reset error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}

export async function resetPassword(formData: FormData) {
  try {
    const rawData = {
      token: formData.get("token") as string,
      password: formData.get("password") as string,
    }

    const parsed = resetSchema.safeParse(rawData)
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message }
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: parsed.data.token },
      include: { user: true },
    })

    if (!resetToken) {
      return { success: false, error: "توکن نامعتبر است" }
    }

    if (resetToken.expires < new Date()) {
      return { success: false, error: "توکن منقضی شده است" }
    }

    if (resetToken.used) {
      return { success: false, error: "این توکن قبلاً استفاده شده است" }
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10)

    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    })

    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true },
    })

    return { success: true }
  } catch (error) {
    console.error("Reset password error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}