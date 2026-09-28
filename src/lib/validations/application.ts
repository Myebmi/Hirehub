import { z } from "zod"

export const applicationSchema = z.object({
  jobId: z.string().min(1, "شناسه آگهی الزامی است"),
  coverLetter: z
    .string()
    .min(20, "نامه پوششی باید حداقل ۲۰ کاراکتر باشد")
    .max(2000, "نامه پوششی نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد"),
  resumeUrl: z.string().url("لینک رزومه معتبر وارد کنید").optional().or(z.literal("")),
})

export const updateApplicationStatusSchema = z.object({
  status: z.enum(["PENDING", "REVIEWING", "INTERVIEW", "REJECTED", "HIRED"]),
})

export type ApplicationInput = z.infer<typeof applicationSchema>