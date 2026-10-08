import { jobSchema } from "@/lib/validations/job"

describe("jobSchema - edge cases", () => {
  const baseJob = {
    title: "Developer",
    description: "We need a developer with 5 years of experience in React.",
    location: "Kabul",
    type: "FULL_TIME",
    status: "OPEN",
  }

  it("must accept empty salary and convert to undefined", () => {
    const result = jobSchema.safeParse({ ...baseJob, salary: "" })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.salary).toBeUndefined()
    }
  })

  it("must convert salary string to number", () => {
    const result = jobSchema.safeParse({ ...baseJob, salary: "50000" })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.salary).toBe(50000)
    }
  })

  it("must accept salary as undefined when not provided", () => {
    const result = jobSchema.safeParse(baseJob)
    expect(result.success).toBe(true)
  })

  it("must reject title over 100 chars", () => {
    const result = jobSchema.safeParse({
      ...baseJob,
      title: "a".repeat(101),
    })
    expect(result.success).toBe(false)
  })

  it("must accept title exactly 100 chars", () => {
    const result = jobSchema.safeParse({
      ...baseJob,
      title: "a".repeat(100),
    })
    expect(result.success).toBe(true)
  })

  it("must reject title shorter than 3 chars", () => {
    const result = jobSchema.safeParse({
      ...baseJob,
      title: "ab",
    })
    expect(result.success).toBe(false)
  })

  it("must reject description shorter than 20 chars", () => {
    const result = jobSchema.safeParse({
      ...baseJob,
      description: "Short",
    })
    expect(result.success).toBe(false)
  })

  it("must reject location shorter than 2 chars", () => {
    const result = jobSchema.safeParse({
      ...baseJob,
      location: "K",
    })
    expect(result.success).toBe(false)
  })

  it("must accept all valid types", () => {
    const types = ["FULL_TIME", "PART_TIME", "REMOTE", "CONTRACT", "INTERNSHIP"]
    types.forEach((type) => {
      const result = jobSchema.safeParse({ ...baseJob, type })
      expect(result.success).toBe(true)
    })
  })

  it("must accept all valid statuses", () => {
    const statuses = ["OPEN", "CLOSED", "DRAFT"]
    statuses.forEach((status) => {
      const result = jobSchema.safeParse({ ...baseJob, status })
      expect(result.success).toBe(true)
    })
  })

  it("must use OPEN as default status", () => {
    const { status, ...jobWithoutStatus } = baseJob
    const result = jobSchema.safeParse(jobWithoutStatus)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.status).toBe("OPEN")
    }
  })
})