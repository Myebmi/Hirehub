import { jobSchema } from "@/lib/validations/job"

describe("jobSchema", () => {
  const validJob = {
    title: "Senior Developer",
    description: "We are looking for a senior developer with 5+ years experience in React and Node.js",
    location: "Kabul",
    salary: "50000",
    type: "FULL_TIME",
    status: "OPEN",
  }

  it("must accept valid job data", () => {
    const result = jobSchema.safeParse(validJob)
    expect(result.success).toBe(true)
  })

  it("must reject empty title", () => {
    const result = jobSchema.safeParse({ ...validJob, title: "" })
    expect(result.success).toBe(false)
  })

  it("must reject short description", () => {
    const result = jobSchema.safeParse({ ...validJob, description: "Short" })
    expect(result.success).toBe(false)
  })

  it("must reject empty location", () => {
    const result = jobSchema.safeParse({ ...validJob, location: "" })
    expect(result.success).toBe(false)
  })

  it("must reject invalid type", () => {
    const result = jobSchema.safeParse({ ...validJob, type: "INVALID" })
    expect(result.success).toBe(false)
  })

  it("must reject invalid status", () => {
    const result = jobSchema.safeParse({ ...validJob, status: "INVALID" })
    expect(result.success).toBe(false)
  })

  it("must accept all valid types", () => {
    const types = ["FULL_TIME", "PART_TIME", "REMOTE", "CONTRACT", "INTERNSHIP"]
    types.forEach((type) => {
      const result = jobSchema.safeParse({ ...validJob, type })
      expect(result.success).toBe(true)
    })
  })
})