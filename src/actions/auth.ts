"use server"

import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"
import { prisma } from "@/lib/prisma"
import { registerSchema, loginSchema } from "@/lib/validations/auth"
import { signIn } from "@/../auth"
import { sendWelcomeEmail } from "@/lib/email"

export async function registerUser(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: (formData.get("role") as string) || "CANDIDATE",
    }

    const parsed = registerSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      }
    }

    const { name, email, password, role } = parsed.data

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        success: false,
        error: "این ایمیل قبلاً ثبت شده است",
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    // ✅ ایمیل خوش‌آمد (جدا از try اصلی)
    try {
      console.log("📧 Attempting to send welcome email to:", email)
      const emailResult = await sendWelcomeEmail(email, name)
      console.log("📧 Email result:", emailResult)
    } catch (emailError) {
      console.error("❌ Send welcome email error:", emailError)
      // ایمیل خطا نباید ثبت‌نام رو متوقف کنه
    }

    return {
      success: true,
      message: "ثبت‌نام با موفقیت انجام شد",
      userId: user.id,
    }
  } catch (error) {
    console.error("Register error:", error)
    return {
      success: false,
      error: "خطایی رخ داد. لطفاً دوباره تلاش کنید",
    }
  }
}

export async function loginUser(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    const parsed = loginSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      }
    }

    await signIn("credentials", {
      email: rawData.email,
      password: rawData.password,
      redirect: false,
    })

    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            error: "ایمیل یا رمز عبور اشتباه است",
          }
        default:
          return {
            success: false,
            error: "خطایی رخ داد. دوباره تلاش کنید",
          }
      }
    }
    return {
      success: false,
      error: "خطای ناشناخته",
    }
  }
}