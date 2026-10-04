import { test, expect } from "@playwright/test"

test.describe("آگهی‌ها", () => {
  test("باید صفحه آگهی‌ها باز بشه", async ({ page }) => {
    await page.goto("/jobs")
    await expect(page.locator("h1")).toContainText("آگهی‌های شغلی")
  })

  test("باید جستجو کار کنه", async ({ page }) => {
    await page.goto("/jobs")

    const searchInput = page.locator('input[placeholder*="عنوان"]')
    await searchInput.fill("developer")

    // منتظر بمون تا URL تغییر کنه
    await page.waitForURL(/q=developer/, { timeout: 5000 })
  })

  test("باید فیلتر نوع کار کنه", async ({ page }) => {
    await page.goto("/jobs")

    await page.selectOption("select", "FULL_TIME")

    await page.waitForURL(/type=FULL_TIME/, { timeout: 5000 })
  })
})