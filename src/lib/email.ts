import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.EMAIL_FROM || "onboarding@resend.dev"

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    console.log("🔑 RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)
    console.log("📧 FROM_EMAIL:", FROM_EMAIL)
    console.log("📧 To:", to)

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "خوش آمدید به HireHub! 🎉",
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; direction: rtl;">
          <h1>سلام ${name} 👋</h1>
          <p>به HireHub خوش آمدید! 🎉</p>
          <p>حساب کاربری شما با موفقیت ساخته شد.</p>
          <a href="${process.env.AUTH_URL || "http://localhost:3000"}/jobs" 
             style="background:#3b82f6;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;">
            مشاهده آگهی‌ها
          </a>
        </body>
        </html>
      `,
    })

    console.log("✅ Welcome email sent successfully:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("❌ Send welcome email error:", error)
    return { success: false, error }
  }
}

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
      subject: `به‌روزرسانی وضعیت درخواست: ${jobTitle}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <body style="font-family: Arial, sans-serif; direction: rtl;">
          <h1>سلام ${applicantName} 👋</h1>
          <p>وضعیت درخواست شما برای <strong>${jobTitle}</strong>:</p>
          <p><strong>${statusLabels[status] || status}</strong></p>
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
        <body style="font-family: Arial, sans-serif; direction: rtl;">
          <h1>سلام ${recruiterName} 👋</h1>
          <p>درخواست جدید برای <strong>${jobTitle}</strong> از ${applicantName}</p>
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