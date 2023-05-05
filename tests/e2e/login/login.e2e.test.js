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
    await page.type('data-testid=email', data.email)
    await page.type('data-testid=senha', password)
    await page.click('data-testid=entrar')

    const error = page.locator('role=alert')
    await expect(error).toBeVisible()
  })

  test('login with invalid password', async ({ page }) => {
    await page.type('data-testid=email', user)
    await page.type('data-testid=senha', data.password)
    await page.click('data-testid=entrar')

    const error = page.locator('role=alert')
    await expect(error).toHaveCount(1)
  })

  test('login with blank data', async ({ page }) => {
    await page.type('data-testid=email', '')
    await page.type('data-testid=senha', '')
    await page.click('data-testid=entrar')

    const error = page.locator('role=alert')
    await expect(error).toHaveCount(2)
  })
})
