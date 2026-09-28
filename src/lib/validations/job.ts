import { z } from "zod"

export const jobSchema = z.object({
  title: z
    .string()
    .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
    .max(100, "عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),
  description: z
    .string()
    .min(20, "توضیحات باید حداقل ۲۰ کاراکتر باشد"),
  location: z
    .string()
    .min(2, "محل باید حداقل ۲ کاراکتر باشد"),
  salary: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : undefined)),
  type: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "CONTRACT", "INTERNSHIP"]),
  status: z.enum(["OPEN", "CLOSED", "DRAFT"]).default("OPEN"),
})

export type JobInput = z.infer<typeof jobSchema>