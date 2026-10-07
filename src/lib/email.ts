import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.EMAIL_FROM || "onboarding@resend.dev"
const APP_URL = process.env.AUTH_URL || "http://localhost:3000"

// ============================================
// 1. ایمیل خوش‌آمد
// ============================================
export async function sendWelcomeEmail(to: string, name: string) {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "خوش آمدید به HireHub! 🎉",
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; direction: rtl; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">HireHub</h1>
          <h2>سلام ${name} 👋</h2>
          <p>به HireHub خوش آمدید! 🎉</p>
          <p>امیدواریم تجربه خوبی داشته باشید.</p>
          <a href="${APP_URL}/jobs"
             style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 20px;">
            مشاهده آگهی‌ها
          </a>
        </body>
        </html>
      `,
    })

    console.log("✅ Welcome email sent:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("❌ Send welcome email error:", error)
    return { success: false, error }
  }
}

// ============================================
// 2. ایمیل تغییر وضعیت درخواست
// ============================================
export async function sendApplicationStatusEmail(
  to: string,
  applicantName: string,
  jobTitle: string,
  status: string
) {
  const statusLabels: Record<string, string> = {
    PENDING: "در انتظار",
    REVIEWING: "در حال بررسی",
    INTERVIEW: "مصاحبه",
    REJECTED: "رد شده",
    HIRED: "استخدام شده",
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `وضعیت درخواست شما تغییر کرد: ${jobTitle}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; direction: rtl; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">HireHub</h1>
          <h2>سلام ${applicantName} 👋</h2>
          <p>وضعیت درخواست شما برای <strong>${jobTitle}</strong> تغییر کرد:</p>
          <p style="font-size: 18px; color: #2563eb;"><strong>${statusLabels[status] || status}</strong></p>
          <a href="${APP_URL}/my-applications"
             style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 20px;">
            مشاهده درخواست‌های من
          </a>
        </body>
        </html>
      `,
    })
    console.log("✅ Status email sent:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("❌ Send status email error:", error)
    return { success: false, error }
  }
}

// ============================================
// 3. ایمیل درخواست جدید به Recruiter
// ============================================
export async function sendNewApplicationEmail(
  to: string,
  recruiterName: string,
  applicantName: string,
  jobTitle: string
) {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `درخواست جدید برای: ${jobTitle} 📨`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; direction: rtl; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">HireHub</h1>
          <h2>سلام ${recruiterName} 👋</h2>
          <p>درخواست جدیدی برای <strong>${jobTitle}</strong> از طرف <strong>${applicantName}</strong> دریافت کردید.</p>
          <a href="${APP_URL}/jobs"
             style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 20px;">
            مشاهده درخواست‌ها
          </a>
        </body>
        </html>
      `,
    })
    console.log("✅ New application email sent:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("❌ Send new application email error:", error)
    return { success: false, error }
  }
}

// ============================================
// 4. ایمیل تأیید ایمیل (جدید)
// ============================================
export async function sendVerificationEmail(
  to: string,
  name: string,
  token: string
) {
  const verifyUrl = `${APP_URL}/fa/verify-email?token=${token}`

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "تأیید ایمیل - HireHub",
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; direction: rtl; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">HireHub</h1>
          <h2>سلام ${name} 👋</h2>
          <p>برای تأیید ایمیل خود، روی دکمه زیر کلیک کنید:</p>
          <a href="${verifyUrl}"
             style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 20px 0;">
            ✅ تأیید ایمیل
          </a>
          <p style="color: #6b7280; font-size: 14px;">این لینک تا ۲۴ ساعت اعتبار دارد.</p>
          <p style="color: #6b7280; font-size: 14px;">اگر شما این درخواست را نداده‌اید، این ایمیل را نادیده بگیرید.</p>
        </body>
        </html>
      `,
    })
    console.log("✅ Verification email sent:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("❌ Send verification email error:", error)
    return { success: false, error }
  }
}

// ============================================
// 5. ایمیل بازیابی رمز عبور (جدید)
// ============================================
export async function sendPasswordResetEmail(
  to: string,
  name: string,
  token: string
) {
  const resetUrl = `${APP_URL}/fa/reset-password?token=${token}`

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "بازیابی رمز عبور - HireHub",
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; direction: rtl; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">HireHub</h1>
          <h2>سلام ${name} 👋</h2>
          <p>برای تغییر رمز عبور خود، روی دکمه زیر کلیک کنید:</p>
          <a href="${resetUrl}"
             style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 20px 0;">
            🔑 تغییر رمز عبور
          </a>
          <p style="color: #6b7280; font-size: 14px;">این لینک تا ۱ ساعت اعتبار دارد.</p>
          <p style="color: #6b7280; font-size: 14px;">اگر شما این درخواست را نداده‌اید، این ایمیل را نادیده بگیرید.</p>
        </body>
        </html>
      `,
    })
    console.log("✅ Password reset email sent:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("❌ Send password reset email error:", error)
    return { success: false, error }
  }
}