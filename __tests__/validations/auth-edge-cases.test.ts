import { registerSchema, loginSchema } from "@/lib/validations/auth"

describe("registerSchema - edge cases", () => {
  it("must accept name exactly 2 chars", () => {
    const result = registerSchema.safeParse({
      name: "Al",
      email: "al@example.com",
      password: "123456",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(true)
  })

  it("must reject name over 50 chars", () => {
    const result = registerSchema.safeParse({
      name: "a".repeat(51),
      email: "al@example.com",
      password: "123456",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(false)
  })

  it("must accept name exactly 50 chars", () => {
    const result = registerSchema.safeParse({
      name: "a".repeat(50),
      email: "al@example.com",
      password: "123456",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(true)
  })

  it("must accept password exactly 6 chars", () => {
    const result = registerSchema.safeParse({
      name: "Ali",
      email: "al@example.com",
      password: "123456",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(true)
  })

  it("must reject password over 100 chars", () => {
    const result = registerSchema.safeParse({
      name: "Ali",
      email: "al@example.com",
      password: "a".repeat(101),
      role: "CANDIDATE",
    })
    expect(result.success).toBe(false)
  })

  it("must accept email with subdomain", () => {
    const result = registerSchema.safeParse({
      name: "Ali",
      email: "ali@mail.example.com",
      password: "123456",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(true)
  })

  // ✅ فقط CANDIDATE و RECRUITER
  it("must reject ADMIN role (not allowed in registration)", () => {
    const result = registerSchema.safeParse({
      name: "Ali",
      email: "ali@example.com",
      password: "123456",
      role: "ADMIN",
    })
    expect(result.success).toBe(false)
  })

  it("must accept RECRUITER role", () => {
    const result = registerSchema.safeParse({
      name: "Ali",
      email: "ali@example.com",
      password: "123456",
      role: "RECRUITER",
    })
    expect(result.success).toBe(true)
  })

  it("must use CANDIDATE as default role", () => {
    const result = registerSchema.safeParse({
      name: "Ali",
      email: "ali@example.com",
      password: "123456",
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.role).toBe("CANDIDATE")
    }
  })
})

describe("loginSchema - edge cases", () => {
  it("must reject password shorter than 6 chars", () => {
    const result = loginSchema.safeParse({
      email: "ali@example.com",
      password: "12345",
    })
    expect(result.success).toBe(false)
  })

  it("must reject email without @", () => {
    const result = loginSchema.safeParse({
      email: "ali.example.com",
      password: "123456",
    })
    expect(result.success).toBe(false)
  })

  it("must reject empty email", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "123456",
    })
    expect(result.success).toBe(false)
  })
})