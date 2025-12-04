import { describe, test, expect } from 'vitest'
import generateOrderId from './generateId'

describe('generateOrderId', () => {
	test('generates order Id with correct format', () => {
		const result = generateOrderId()

		// check format
		expect(result).toBeTypeOf('string')
		expect(result.startsWith('ORD-')).toBe(true)
		expect(result.length).toBeGreaterThan(20)

		const parts = result.split('-')
		expect(parts).toHaveLength(3)
	})

	test('generates unique IDs', () => {
		const id1 = generateOrderId()
		const id2 = generateOrderId()

		expect(id1).not.toBe(id2)
	})

	test('timestamp part is a valid number', () => {
		const result = generateOrderId().split('-')
		expect(Number(result[1])).not.toBeNaN()
		expect(Number(result[1])).toBeGreaterThan(0)
	})

	test('random string has correct length', () => {
		const result = generateOrderId().split('-')
		expect(result[2]).toHaveLength(6)
	})
})
