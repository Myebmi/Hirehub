import { toAfghanDate } from "@/lib/afghanDate"

describe("toAfghanDate", () => {
  it("should convert Gregorian to Afghan date", () => {
    // 2024-10-03 → 12 میزان
    const date = new Date("2024-10-03")
    const result = toAfghanDate(date)
    expect(result).toContain("میزان")
  })

  it("should return day and month in Persian", () => {
    const date = new Date("2024-01-01")
    const result = toAfghanDate(date)
    // January 1, 2024 → 11 جدی
    expect(result).toMatch(/^\d+ \S+$/)
  })

  it("should handle different months", () => {
    const springDate = new Date("2024-04-01") // حمل
    expect(toAfghanDate(springDate)).toContain("حمل")
  })
})