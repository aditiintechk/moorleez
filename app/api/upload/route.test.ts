/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest } from 'next/server'

/**
 * Unit Test: Cloudinary Upload API Route
 *
 * These tests verify the /api/upload endpoint behavior:
 * - Successful image upload
 * - Error handling for missing files
 * - Error handling for Cloudinary failures
 */

// Mock Cloudinary
vi.mock('cloudinary', () => ({
	v2: {
		config: vi.fn(),
		uploader: {
			upload_stream: vi.fn(),
		},
	},
}))

describe('POST /api/upload', () => {
	beforeEach(() => {
		// Clear all mocks before each test
		vi.clearAllMocks()
	})

	it('should return 400 if no file is provided', async () => {
		// Create a request with empty FormData
		const formData = new FormData()

		const request = new NextRequest('http://localhost:3000/api/upload', {
			method: 'POST',
			body: formData,
		})

		const response = await POST(request)
		const data = await response.json()

		expect(response.status).toBe(400)
		expect(data).toEqual({ error: 'No file uploaded' })
	})

	it('should upload image to Cloudinary and return URL', async () => {
		// Mock successful Cloudinary upload
		const mockSecureUrl =
			'https://res.cloudinary.com/test/image/upload/v123/moorleez-products/test.jpg'

		// Mock upload_stream to call the callback with success
		vi.mocked(cloudinary.uploader.upload_stream).mockImplementation(
			(options: any, callback?: any) => {
				// Simulate successful upload by calling callback
				setTimeout(() => {
					callback?.(null, {
						secure_url: mockSecureUrl,
						public_id: 'moorleez-products/test',
						format: 'jpg',
						width: 800,
						height: 600,
						bytes: 12345,
						created_at: new Date().toISOString(),
						resource_type: 'image',
						type: 'upload',
						url: 'http://res.cloudinary.com/test/image/upload/v123/test.jpg',
						version: 123,
						asset_id: 'test-asset-id',
						version_id: 'test-version-id',
						signature: 'test-signature',
						etag: 'test-etag',
					} as any)
				}, 0)

				// Return a mock stream with end method
				return {
					end: vi.fn(),
				} as any
			}
		)

		// Create a FormData with a test file
		const formData = new FormData()
		const testFile = new File(['test image content'], 'test.jpg', {
			type: 'image/jpeg',
		})
		formData.append('file', testFile)

		const request = new NextRequest('http://localhost:3000/api/upload', {
			method: 'POST',
			body: formData,
		})

		const response = await POST(request)
		const data = await response.json()

		expect(response.status).toBe(200)
		expect(data).toEqual({
			success: true,
			url: mockSecureUrl,
		})

		// Verify Cloudinary was called with correct options
		expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
			{
				folder: 'moorleez-products',
				resource_type: 'auto',
			},
			expect.any(Function)
		)
	})

	it('should handle Cloudinary upload errors', async () => {
		// Mock Cloudinary upload failure
		vi.mocked(cloudinary.uploader.upload_stream).mockImplementation(
			(options: any, callback?: any) => {
				// Simulate upload error
				setTimeout(() => {
					callback?.(new Error('Cloudinary upload failed'), undefined)
				}, 0)

				return {
					end: vi.fn(),
				} as any
			}
		)

		const formData = new FormData()
		const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
		formData.append('file', testFile)

		const request = new NextRequest('http://localhost:3000/api/upload', {
			method: 'POST',
			body: formData,
		})

		const response = await POST(request)
		const data = await response.json()

		expect(response.status).toBe(500)
		expect(data).toEqual({ error: 'Upload failed' })
	})

	it('should handle missing result from Cloudinary', async () => {
		// Mock Cloudinary returning neither error nor result
		vi.mocked(cloudinary.uploader.upload_stream).mockImplementation(
			(options: any, callback?: any) => {
				// Simulate no error but also no result (edge case)
				setTimeout(() => {
					callback?.(null, undefined)
				}, 0)

				return {
					end: vi.fn(),
				} as any
			}
		)

		const formData = new FormData()
		const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
		formData.append('file', testFile)

		const request = new NextRequest('http://localhost:3000/api/upload', {
			method: 'POST',
			body: formData,
		})

		const response = await POST(request)
		const data = await response.json()

		expect(response.status).toBe(500)
		expect(data).toEqual({ error: 'Upload failed' })
	})

	it('should verify file is converted to buffer correctly', async () => {
		const mockEnd = vi.fn()

		vi.mocked(cloudinary.uploader.upload_stream).mockImplementation((options: any, callback?: any) => {
			// Call callback immediately to prevent timeout
			setTimeout(() => {
				callback?.(null, {
					secure_url: 'https://test.com/image.jpg',
				} as any)
			}, 0)

			return {
				end: mockEnd,
			} as any
		})

		const formData = new FormData()
		const testFileContent = 'test image binary content'
		const testFile = new File([testFileContent], 'test.jpg', {
			type: 'image/jpeg',
		})
		formData.append('file', testFile)

		const request = new NextRequest('http://localhost:3000/api/upload', {
			method: 'POST',
			body: formData,
		})

		await POST(request)

		// Verify end was called with a Buffer
		expect(mockEnd).toHaveBeenCalledWith(expect.any(Buffer))
	})
})
