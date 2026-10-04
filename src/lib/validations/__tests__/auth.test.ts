import { registerSchema, loginSchema } from "@/lib/validations/auth"

describe("registerSchema", () => {
  it("should validate correct data", () => {
    const result = registerSchema.safeParse({
      name: "x x",
      email: "yasin@test.com",
      password: "123456",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(true)
  })

  it("should reject invalid email", () => {
    const result = registerSchema.safeParse({
      name: "x",
      email: "invalid-email",
      password: "123456",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(false)
  })

  it("should reject short password", () => {
    const result = registerSchema.safeParse({
      name: "x",
      email: "x@test.com",
      password: "123",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(false)
  })

  it("should reject short name", () => {
    const result = registerSchema.safeParse({
      name: "x",
      email: "x@test.com",
      password: "123456",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(false)
  })
})

describe("loginSchema", () => {
  it("should validate correct login data", () => {
    const result = loginSchema.safeParse({
      email: "x@test.com",
      password: "123456",
    })
    expect(result.success).toBe(true)
  })

  it("should reject invalid email", () => {
    const result = loginSchema.safeParse({
      email: "invalid",
      password: "123456",
    })
    expect(result.success).toBe(false)
  })
})