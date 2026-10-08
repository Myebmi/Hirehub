import { toAfghanDate } from "@/lib/afghanDate"

describe("toAfghanDate", () => {
  it("must convert Gregorian date to Afghan date string", () => {
    const date = new Date("2024-01-15")
    const result = toAfghanDate(date)
    expect(typeof result).toBe("string")
    expect(result.length).toBeGreaterThan(0)
  })

  it("must return same format for same date", () => {
    const date1 = new Date("2024-06-15")
    const date2 = new Date("2024-06-15")
    expect(toAfghanDate(date1)).toBe(toAfghanDate(date2))
  })

  it("must return different for different dates", () => {
    const date1 = new Date("2024-01-15")
    const date2 = new Date("2024-02-15")
    expect(toAfghanDate(date1)).not.toBe(toAfghanDate(date2))
  })
})