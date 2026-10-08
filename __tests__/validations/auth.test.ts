import { registerSchema, loginSchema } from "@/lib/validations/auth"

describe("registerSchema", () => {
  it("must accept valid registration data", () => {
    const result = registerSchema.safeParse({
      name: "Ali Ahmadi",
      email: "ali@example.com",
      password: "123456",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(true)
  })

  it("must reject invalid email", () => {
    const result = registerSchema.safeParse({
      name: "Ali",
      email: "invalid-email",
      password: "123456",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(false)
  })

  it("must reject password shorter than 6 chars", () => {
    const result = registerSchema.safeParse({
      name: "Ali",
      email: "ali@example.com",
      password: "123",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(false)
  })

  it("must reject invalid role", () => {
    const result = registerSchema.safeParse({
      name: "Ali",
      email: "ali@example.com",
      password: "123456",
      role: "INVALID_ROLE",
    })
    expect(result.success).toBe(false)
  })

  it("must reject name shorter than 2 chars", () => {
    const result = registerSchema.safeParse({
      name: "A",
      email: "ali@example.com",
      password: "123456",
      role: "CANDIDATE",
    })
    expect(result.success).toBe(false)
  })
})

describe("loginSchema", () => {
  it("must accept valid login data", () => {
    const result = loginSchema.safeParse({
      email: "ali@example.com",
      password: "123456",
    })
    expect(result.success).toBe(true)
  })

  it("must reject invalid email", () => {
    const result = loginSchema.safeParse({
      email: "invalid",
      password: "123456",
    })
    expect(result.success).toBe(false)
  })

  it("must reject empty password", () => {
    const result = loginSchema.safeParse({
      email: "ali@example.com",
      password: "",
    })
    expect(result.success).toBe(false)
  })
})