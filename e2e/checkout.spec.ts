import { test, expect } from '@playwright/test'

test('user can complete full checkout flow', async ({ page }) => {
	await page.goto('/')
	await expect(page.locator('main')).toBeVisible()

	const addToCartButton = page
		.locator('button')
		.filter({ hasText: /add to cart/i })
		.first()
	await addToCartButton.click()

	await page.goto('/cart')
	await expect(page).toHaveURL('/cart')

	const checkoutLink = page.getByRole('link', {
		name: /proceed to checkout/i,
	})
	await checkoutLink.click()
	await expect(page).toHaveURL('/checkout')

	await page.fill('input[name="email"]', 'test@example.com')
	await page.fill('input[name="name"]', 'Test User')
	await page.fill('input[name="address"]', '123 Test Street')
	await page.fill('input[name="apartment"]', '10')
	await page.fill('input[name="city"]', 'Test City')
	await page.selectOption('select[name="state"]', 'Karnataka')
	await page.fill('input[name="pincode"]', '123456')
	await page.fill('input[name="phone"]', '9876543210')

	await page.click('button[type="submit"]')

	await expect(page).toHaveURL(/\/order\/\w+/)
	await expect(page.locator('h2')).toContainText(
		/Order Placed Successfully!/i
	)
})
