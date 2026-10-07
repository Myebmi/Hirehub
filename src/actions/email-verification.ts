"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"
import { revalidatePath } from "next/cache"
import crypto from "crypto"
import { sendVerificationEmail } from "@/lib/email"

export async function sendVerificationEmailAction() {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "ابتدا وارد شوید" }
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return { success: false, error: "کاربر پیدا نشد" }
    }

    if (user.emailVerified) {
      return { success: false, error: "ایمیل شما قبلاً تأیید شده است" }
    }

    await prisma.verificationToken.deleteMany({
      where: { userId: user.id },
    })

    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await prisma.verificationToken.create({
      data: { userId: user.id, token, expires },
    })

    await sendVerificationEmail(user.email, user.name || "کاربر", token)

    return { success: true, message: "ایمیل تأیید ارسال شد" }
  } catch (error) {
    console.error("Send verification email error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}

export async function verifyEmail(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!verificationToken) {
      return { success: false, error: "توکن نامعتبر است" }
    }

    if (verificationToken.expires < new Date()) {
      return { success: false, error: "توکن منقضی شده است" }
    }

    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: new Date() },
    })

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    })

    revalidatePath("/profile")
    return { success: true }
  } catch (error) {
    console.error("Verify email error:", error)
    return { success: false, error: "خطایی رخ داد" }
  }
}