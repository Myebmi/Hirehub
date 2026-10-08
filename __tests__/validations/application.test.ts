import {
  applicationSchema,
  updateApplicationStatusSchema,
} from "@/lib/validations/application"

describe("applicationSchema", () => {
  it("must accept valid application data", () => {
    const result = applicationSchema.safeParse({
      jobId: "job-123",
      coverLetter: "I am very interested in this position and have the required skills.",
      resumeUrl: "https://example.com/resume.pdf",
    })
    expect(result.success).toBe(true)
  })

  it("must reject empty jobId", () => {
    const result = applicationSchema.safeParse({
      jobId: "",
      coverLetter: "I am interested",
    })
    expect(result.success).toBe(false)
  })

  it("must reject short cover letter", () => {
    const result = applicationSchema.safeParse({
      jobId: "job-123",
      coverLetter: "Hi",
    })
    expect(result.success).toBe(false)
  })
})

describe("updateApplicationStatusSchema", () => {
  it("must accept valid statuses", () => {
    const statuses = ["PENDING", "REVIEWING", "INTERVIEW", "REJECTED", "HIRED"]
    statuses.forEach((status) => {
      const result = updateApplicationStatusSchema.safeParse({ status })
      expect(result.success).toBe(true)
    })
  })

  it("must reject invalid status", () => {
    const result = updateApplicationStatusSchema.safeParse({
      status: "INVALID",
    })
    expect(result.success).toBe(false)
  })
})