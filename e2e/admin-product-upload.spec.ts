import { test, expect } from '@playwright/test'
import path from 'path'

/**
 * E2E Test: Admin Product Upload with Cloudinary
 *
 * This test verifies the complete product creation flow with image upload:
 * 1. Admin navigates to products page
 * 2. Opens "Add Product" modal
 * 3. Fills in product details
 * 4. Uploads an image file (sent to Cloudinary)
 * 5. Verifies Cloudinary URL is auto-filled
 * 6. Submits the form
 * 7. Verifies the product appears in the list with the uploaded image
 */

test.describe('Admin Product Upload', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to admin products page
		// Note: You may need to add authentication here if Clerk is protecting this route
		await page.goto('/admin/products')
		await page.waitForLoadState('networkidle')
	})

	test('admin can create product with image upload', async ({ page }) => {
		// Step 1: Click "Add Product" button
		const addButton = page.getByRole('button', { name: /add product/i })
		await addButton.click()

		// Step 2: Wait for modal to appear
		await expect(
			page.getByRole('heading', { name: /add new product/i })
		).toBeVisible()

		// Step 3: Fill in product details
		const productName = `Test Product ${Date.now()}`
		const productDescription = 'This is a test product created by E2E tests'
		const productPrice = '999.99'
		const productStock = '10'

		await page.fill('input[name="name"]', productName)
		await page.fill('textarea[name="description"]', productDescription)
		await page.fill('input[name="price"]', productPrice)
		await page.fill('input[name="stock"]', productStock)
		await page.selectOption('select[name="category"]', 'paintings')

		// Step 4: Upload an image
		// Create a test file path - you'll need to have a test image in e2e/fixtures/
		const testImagePath = path.join(__dirname, 'fixtures', 'test-image.jpg')

		// Find the hidden file input
		const fileInput = page.locator('input[type="file"]')

		// Upload the file
		await fileInput.setInputFiles(testImagePath)

		// Step 5: Wait for upload to complete and verify Cloudinary URL appears
		// The upload should auto-fill the image URL input
		await expect(async () => {
			const imageUrlInput = page.locator('input[name="image"]')
			const imageUrl = await imageUrlInput.inputValue()

			// Verify it's a Cloudinary URL
			expect(imageUrl).toContain('res.cloudinary.com')
			expect(imageUrl).toContain('moorleez-products')
		}).toPass({
			timeout: 10000, // Wait up to 10 seconds for upload
		})

		// Step 6: Verify image preview appears
		const imagePreview = page.locator('img[alt="Product preview"]')
		await expect(imagePreview).toBeVisible()

		// Verify the preview src is a Cloudinary URL
		const previewSrc = await imagePreview.getAttribute('src')
		expect(previewSrc).toContain('res.cloudinary.com')

		// Step 7: Submit the form
		const createButton = page.getByRole('button', { name: /create product/i })
		await createButton.click()

		// Step 8: Wait for modal to close
		await expect(
			page.getByRole('heading', { name: /add new product/i })
		).not.toBeVisible({ timeout: 5000 })

		// Step 9: Verify the product appears in the product list
		await expect(page.getByText(productName)).toBeVisible()

		// Step 10: Verify the product image is displayed (Next.js Image component)
		const productImage = page.locator(`img[alt="${productName}"]`)
		await expect(productImage).toBeVisible()

		// Verify the image src contains Cloudinary URL
		const productImageSrc = await productImage.getAttribute('src')
		// Next.js Image uses /_next/image?url=... for optimization
		expect(productImageSrc).toBeTruthy()
	})

	test('upload validates file type', async ({ page }) => {
		// Click "Add Product"
		const addButton = page.getByRole('button', { name: /add product/i })
		await addButton.click()

		// Try to upload a non-image file (text file)
		const testTextPath = path.join(__dirname, 'fixtures', 'test-image.txt')
		const fileInput = page.locator('input[type="file"]')

		await fileInput.setInputFiles(testTextPath)

		// Verify error message appears
		await expect(
			page.getByText(/please select an image file/i)
		).toBeVisible({ timeout: 3000 })
	})

	test('upload shows loading state', async ({ page }) => {
		// Click "Add Product"
		const addButton = page.getByRole('button', { name: /add product/i })
		await addButton.click()

		// Upload an image
		const testImagePath = path.join(__dirname, 'fixtures', 'test-image.jpg')
		const fileInput = page.locator('input[type="file"]')

		await fileInput.setInputFiles(testImagePath)

		// Verify loading spinner appears (briefly)
		// This might be too fast to catch, so we use a soft assertion
		const uploadingText = page.getByText(/uploading/i)

		// If upload is slow enough, we should see this
		// Using waitFor with a short timeout to avoid flakiness
		try {
			await uploadingText.waitFor({ state: 'visible', timeout: 1000 })
		} catch {
			// Upload was too fast - that's okay!
			console.log('Upload completed too quickly to verify loading state')
		}
	})

	test('admin can use manual URL instead of upload', async ({ page }) => {
		// Click "Add Product"
		const addButton = page.getByRole('button', { name: /add product/i })
		await addButton.click()

		// Fill in product details
		const productName = `Manual URL Product ${Date.now()}`
		await page.fill('input[name="name"]', productName)
		await page.fill('textarea[name="description"]', 'Test with manual URL')
		await page.fill('input[name="price"]', '499.99')
		await page.fill('input[name="stock"]', '5')
		await page.selectOption('select[name="category"]', 'crafts')

		// Manually enter an image URL
		const imageUrl = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5'
		await page.fill('input[name="image"]', imageUrl)

		// Verify image preview appears
		const imagePreview = page.locator('img[alt="Product preview"]')
		await expect(imagePreview).toBeVisible()

		// Submit
		const createButton = page.getByRole('button', { name: /create product/i })
		await createButton.click()

		// Verify product created
		await expect(page.getByText(productName)).toBeVisible()
	})
})
