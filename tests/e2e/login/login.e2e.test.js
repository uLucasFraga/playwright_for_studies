const { test, expect } = require('@playwright/test')
const { getUserBody, loginUser } = require('../../../lib/helper')

const user = process.env.USER
const password = process.env.PASSWORD

test.describe.parallel('[LOGIN] :: SERVEREST - E2E', () => {
  let data

  test.beforeEach(async ({ page }) => {
    data = await getUserBody()
    await page.goto('/login')
    await expect(page).toHaveURL('/login')
  })

  test('login successfully', async ({ page }) => {
    await loginUser(page)
    await expect(page).toHaveURL('/admin/home')
  })

  test('login with invalid email', async ({ page }) => {
    await page.type('id=email', data.email)
    await page.type('id=password', password)
    await page.click('button[type="submit"]')

    const error = page.locator('role=alert')
    await expect(error).toBeVisible()
  })

  test('login with invalid password', async ({ page }) => {
    await page.type('id=email', user)
    await page.type('id=senha', data.password)
    await page.click('button[type="submit"]')

    const error = page.locator('role=alert')
    await expect(error).toHaveCount(1)
  })

  test('login with blank data', async ({ page }) => {
    await page.type('id=email', '')
    await page.type('id=senha', '')
    await page.click('button[type="submit"]')

    const error = page.locator('role=alert')
    await expect(error).toHaveCount(2)
  })
})
