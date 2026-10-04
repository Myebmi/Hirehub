import { test, expect } from "@playwright/test"

test.describe("احراز هویت", () => {
  const testEmail = `test${Date.now()}@example.com`
  const testPassword = "123456"

  test("باید صفحه ثبت‌نام باز بشه", async ({ page }) => {
    await page.goto("/register")
    await expect(page.locator("h1")).toContainText("HireHub")
    await expect(page.locator("text=ساخت حساب جدید")).toBeVisible()
  })

  test("باید ثبت‌نام کار کنه", async ({ page }) => {
    await page.goto("/register")

    await page.fill('input[name="name"]', "تست کاربر")
    await page.fill('input[name="email"]', testEmail)
    await page.fill('input[name="password"]', testPassword)
    await page.selectOption('select[name="role"]', "CANDIDATE")

    await page.click('button[type="submit"]')

    // باید به login بره
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 })
  })

  test("باید صفحه ورود باز بشه", async ({ page }) => {
    await page.goto("/login")
    await expect(page.locator("text=ورود به حساب کاربری")).toBeVisible()
  })

  test("باید ورود با اطلاعات اشتباه خطا بده", async ({ page }) => {
    await page.goto("/login")

    await page.fill('input[name="email"]', "wrong@example.com")
    await page.fill('input[name="password"]', "wrongpass")

    await page.click('button[type="submit"]')

    // باید پیام خطا بیاد
    await expect(
        page.locator("form").getByText("ایمیل یا رمز عبور اشتباه است")
    ).toBeVisible({ timeout: 10000 })
  })
})