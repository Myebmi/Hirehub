import { test, expect } from "@playwright/test"

test.describe("صفحه اصلی", () => {
  test("باید صفحه اصلی باز بشه", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/HireHub/)
    await expect(page.locator("h1")).toContainText("استخدام هوشمند")
  })

  test("باید دکمه ثبت‌نام کار کنه", async ({ page }) => {
    await page.goto("/")
    await page.click("text=شروع کنید")
    await expect(page).toHaveURL(/\/register/)
  })

  test("باید دکمه مشاهده آگهی‌ها کار کنه", async ({ page }) => {
    await page.goto("/")
    await page.click("text=مشاهده آگهی‌ها")
    await expect(page).toHaveURL(/\/jobs/)
  })
})