/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect, vi, beforeEach } from 'vitest'

// Mock Prisma BEFORE importing analytics
vi.mock('@/lib/connection/prisma', () => ({
	prismaConnection: {
		orderItem: {
			groupBy: vi.fn(),
		},
	},
}))

import { getTopProducts } from './analytics'
import { prismaConnection } from '@/lib/connection/prisma'

describe('Analytics Service', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('getTopProducts', () => {
		test('should return products sorted by revenue (highest first)', async () => {
			// Arrange - Mock unsorted data from database
			vi.mocked(prismaConnection.orderItem.groupBy).mockResolvedValue([
				{
					productName: 'Crochet',
					_sum: { quantity: 10, subtotal: 3000 },
				},
				{
					productName: 'Craft',
					_sum: { quantity: 20, subtotal: 8000 },
				},
				{ productName: 'Art', _sum: { quantity: 15, subtotal: 5000 } },
			] as any)

			// Act
			const result = await getTopProducts(10)

			// Assert - Check each item is >= next item
			for (let i = 0; i < result.length - 1; i++) {
				expect(result[i].revenue).toBeGreaterThanOrEqual(
					result[i + 1].revenue
				)
			}

			// Also verify actual order
			expect(result[0].productName).toBe('Craft') // 8000
			expect(result[1].productName).toBe('Art') // 5000
			expect(result[2].productName).toBe('Crochet') // 3000
		})

		test('should limit results to specified number', async () => {
			// Arrange - Mock 5 products
			vi.mocked(prismaConnection.orderItem.groupBy).mockResolvedValue([
				{
					productName: 'Product1',
					_sum: { quantity: 10, subtotal: 1000 },
				},
				{
					productName: 'Product2',
					_sum: { quantity: 20, subtotal: 2000 },
				},
				{
					productName: 'Product3',
					_sum: { quantity: 30, subtotal: 3000 },
				},
				{
					productName: 'Product4',
					_sum: { quantity: 40, subtotal: 4000 },
				},
				{
					productName: 'Product5',
					_sum: { quantity: 50, subtotal: 5000 },
				},
			] as any)

			// Act - Request only 3 products
			const result = await getTopProducts(3)

			// Assert
			expect(result.length).toBe(3)
			expect(result[0].productName).toBe('Product5') // Highest revenue
		})

		test('should handle empty results gracefully', async () => {
			// Arrange - Mock empty array
			vi.mocked(prismaConnection.orderItem.groupBy).mockResolvedValue(
				[] as any
			)

			// Act
			const result = await getTopProducts(10)

			// Assert
			expect(Array.isArray(result)).toBe(true)
			expect(result.length).toBe(0)
		})

		test('should handle null values from database', async () => {
			// Arrange - Mock data with null values (edge case)
			vi.mocked(prismaConnection.orderItem.groupBy).mockResolvedValue([
				{
					productName: 'Product1',
					_sum: { quantity: null, subtotal: null },
				},
				{
					productName: 'Product2',
					_sum: { quantity: 10, subtotal: 1000 },
				},
			] as any)

			// Act
			const result = await getTopProducts(10)

			// Assert - Check null coalescing works
			expect(result[0].unitsSold).toBe(10)
			expect(result[0].revenue).toBe(1000)
			expect(result[1].unitsSold).toBe(0) // null -> 0
			expect(result[1].revenue).toBe(0) // null -> 0
		})
	})
})
