// توابع ساده‌ای که تست می‌شن
describe("Basic Math", () => {
  it("should add two numbers", () => {
    expect(2 + 2).toBe(4)
  })

  it("should check if string contains text", () => {
    expect("Hello World").toContain("World")
  })

  it("should work with arrays", () => {
    const arr = [1, 2, 3]
    expect(arr).toHaveLength(3)
    expect(arr).toContain(2)
  })
})