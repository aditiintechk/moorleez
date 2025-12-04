import { describe, test, expect, beforeEach, vi } from 'vitest'
import { POST } from './route'
import { NextRequest } from 'next/server'

/* vi.mock('@/lib/connection/prisma', () => {
    prismaConnection: {

    }
}) */

// AAA pattern - arrange, act and assert
describe('POST /api/orders', () => {
	beforeEach(() => {
		// reset mocks before each test
	})

	test('created order successfully with valid data', async () => {
		// let's do this next
	})

	test('returns error for empty cart', async () => {
		// 🟢 Arrange - set up the data
		const mockRequest = {
			json: async () => ({ items: [] }),
		}

		// 🟢 Act - call the function
		const response = await POST(mockRequest as NextRequest)
		const data = await response.json()

		// 🟢 Assert - Check the results
		expect(response.status).toBe(400)
		expect(data.error).toBe('Cart is empty')
	})
})
