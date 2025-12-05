import { describe, test, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

// Mock the real database module set up - set this up before calling the route because it will call real database route if post is imported before creating the mock database.
const mockTx = {
	order: {
		create: vi.fn(),
	},
	orderItem: {
		create: vi.fn(),
	},
	product: {
		findUnique: vi.fn(),
		update: vi.fn(),
	},
}

vi.mock('@/lib/connection/prisma', () => ({
	prismaConnection: {
		$transaction: vi.fn(async (callback) => {
			return await callback(mockTx)
		}),
	},
}))

import { POST } from './route'

// AAA pattern - arrange, act and assert
describe('POST /api/orders', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	test('created order successfully with valid data', async () => {
		// step 1: configure mocktx - arrange
		mockTx.order.create.mockResolvedValue({
			id: 'mock-id',
			orderId: 'ORD-MOCK-123',
		})

		mockTx.orderItem.create.mockResolvedValue({
			id: 'item-id',
		})

		mockTx.product.findUnique.mockResolvedValue({
			id: '1',
			stock: 10,
		})

		mockTx.product.update.mockResolvedValue({
			id: '1',
			stock: 9,
		})

		// step 2: create mock request - arrange
		const mockRequest = {
			json: async () => ({
				items: [
					{
						id: '1',
						name: 'Test',
						price: 100,
						image: '/test.jpg',
						quantity: 1,
					},
				],
				customerName: 'Test',
				customerEmail: 'test@test.com',
				customerPhone: '9876543210',
				shippingAddress: '123 Test',
				apartment: '',
				city: 'Test',
				state: 'Test',
				pincode: '123456',
				totalPrice: 100,
				totalItems: 1,
			}),
		}

		// step 3: call the api - act
		const response = await POST(mockRequest as NextRequest)
		const data = await response.json()

		// step 4: check the result - assert
		expect(response.status).toBe(200)
		expect(data.success).toBe(true)
		expect(data.orderId).toBeTruthy()

		// step 5: verify mocks were called - verify?
		expect(mockTx.order.create).toHaveBeenCalled()
		expect(mockTx.orderItem.create).toHaveBeenCalled()
		expect(mockTx.product.findUnique).toHaveBeenCalled()
		expect(mockTx.product.update).toHaveBeenCalled()
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
