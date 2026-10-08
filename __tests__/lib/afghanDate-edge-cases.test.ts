import { toAfghanDate } from "@/lib/afghanDate"

describe("toAfghanDate - edge cases", () => {
  it("must handle year boundary (Dec 31 → Jan 1)", () => {
    const dec31 = new Date("2024-12-31")
    const jan1 = new Date("2025-01-01")
    expect(toAfghanDate(dec31)).not.toBe(toAfghanDate(jan1))
  })

  it("must handle month boundaries", () => {
    const dates = [
      new Date("2024-01-01"),
      new Date("2024-02-01"),
      new Date("2024-03-01"),
      new Date("2024-06-15"),
      new Date("2024-12-25"),
    ]
    dates.forEach((date) => {
      const result = toAfghanDate(date)
      expect(typeof result).toBe("string")
      expect(result.length).toBeGreaterThan(0)
    })
  })

  it("must handle leap year (Feb 29)", () => {
    const leapDay = new Date("2024-02-29")
    const result = toAfghanDate(leapDay)
    expect(typeof result).toBe("string")
  })

  it("must return different for consecutive days", () => {
    const day1 = new Date("2024-06-15")
    const day2 = new Date("2024-06-16")
    expect(toAfghanDate(day1)).not.toBe(toAfghanDate(day2))
  })

  it("must handle same date with different times", () => {
    const morning = new Date("2024-06-15T08:00:00")
    const evening = new Date("2024-06-15T20:00:00")
    expect(toAfghanDate(morning)).toBe(toAfghanDate(evening))
  })
})