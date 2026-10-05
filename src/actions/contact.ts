"use server"

import { Resend } from "resend"
import { contactSchema } from "@/lib/validations/contact"
import { headers } from "next/headers"
import { apiRatelimit } from "@/lib/ratelimit"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.EMAIL_FROM || "onboarding@resend.dev"
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "myebmi@outlook.com"

export async function sendContactMessage(formData: FormData) {
  try {
    // ✅ Rate Limiting
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || "unknown"

    if (apiRatelimit) {
      const { success } = await apiRatelimit.limit(`contact:${ip}`)
      if (!success) {
        return {
          success: false,
          error: "تعداد پیام‌های شما بیش از حد مجاز است. لطفاً بعداً تلاش کنید.",
        }
      }
    }

    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    // Validation
    const parsed = contactSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      }
    }

    const { name, email, subject, message } = parsed.data

    // ✅ ارسال ایمیل به ادمین
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `📬 پیام جدید: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; direction: rtl; background: #f9fafb; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; }
            h1 { color: #1f2937; }
            .field { margin: 16px 0; padding: 12px; background: #f3f4f6; border-radius: 8px; }
            .label { font-weight: bold; color: #6b7280; font-size: 12px; }
            .value { color: #1f2937; margin-top: 4px; }
            .message { white-space: pre-wrap; line-height: 1.6; }
            .footer { margin-top: 40px; color: #6b7280; font-size: 14px; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>📬 پیام جدید از HireHub</h1>
            
            <div class="field">
              <div class="label">نام فرستنده</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">ایمیل</div>
              <div class="value">${email}</div>
            </div>
            
            <div class="field">
              <div class="label">موضوع</div>
              <div class="value">${subject}</div>
            </div>
            
            <div class="field">
              <div class="label">پیام</div>
              <div class="value message">${message}</div>
            </div>
            
            <a href="mailto:${email}" class="button">
              پاسخ به ${name}
            </a>
            
            <div class="footer">
              <p>این پیام از طریق فرم تماس HireHub ارسال شده است.</p>
              <p>© ${new Date().getFullYear()} HireHub</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (result.error) {
      console.error("Contact email error:", result.error)
      return {
        success: false,
        error: "خطا در ارسال پیام. لطفاً دوباره تلاش کنید.",
      }
    }

    console.log("✅ Contact email sent:", result.data?.id)
    return {
      success: true,
      message: "پیام شما با موفقیت ارسال شد",
    }
  } catch (error) {
    console.error("Contact error:", error)
    return {
      success: false,
      error: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
    }
  }
}