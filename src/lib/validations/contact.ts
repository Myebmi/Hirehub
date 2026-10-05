import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  subject: z
    .string()
    .min(3, "موضوع باید حداقل ۳ کاراکتر باشد")
    .max(100, "موضوع نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),
  message: z
    .string()
    .min(10, "پیام باید حداقل ۱۰ کاراکتر باشد")
    .max(1000, "پیام نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد"),
})

export type ContactInput = z.infer<typeof contactSchema>