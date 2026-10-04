import { z } from "zod"

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
})

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "رمز فعلی را وارد کنید"),
    newPassword: z
      .string()
      .min(6, "رمز جدید باید حداقل ۶ کاراکتر باشد")
      .max(100),
    confirmPassword: z.string().min(6, "تکرار رمز را وارد کنید"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "رمزهای جدید یکسان نیستند",
    path: ["confirmPassword"],
  })

export type ProfileInput = z.infer<typeof profileSchema>
export type PasswordInput = z.infer<typeof passwordSchema>