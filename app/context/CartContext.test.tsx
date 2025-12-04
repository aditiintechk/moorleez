import { describe, test, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'

describe('CartContext', () => {
	beforeEach(() => {
		// remember why the remove cart items test didnt pass at first.
		localStorage.clear()
	})

	test('calculates totalPrice & totalItems correctly when adding items', () => {
		const { result } = renderHook(() => useCart(), {
			wrapper: CartProvider,
		})
		const mockData = (overrides = {}) => ({
			id: '1',
			name: 'Test Art',
			description: 'Test description',
			price: 100,
			image: '/test.jpg',
			stock: 10,
			category: 'Test Category',
			createdAt: new Date(),
			...overrides,
		})

		act(() => {
			result.current.addToCart(mockData({ price: 50 }))
		})

		act(() => {
			result.current.addToCart(mockData({ id: '2', price: 150 }))
		})

		expect(result.current.totalItems).toBe(2)
		expect(result.current.totalPrice).toBe(200)
	})

	test('calculates totalPrice & totalItems correctly when removing items', () => {
		const { result } = renderHook(() => useCart(), {
			wrapper: CartProvider,
		})
		const mockData = (overrides = {}) => ({
			id: '1',
			name: 'Test Art',
			description: 'Test description',
			price: 100,
			image: '/test.jpg',
			stock: 10,
			category: 'Test Category',
			createdAt: new Date(),
			...overrides,
		})

		act(() => {
			result.current.addToCart(mockData({ price: 50 }))
		})

		act(() => {
			result.current.addToCart(mockData({ id: '2', price: 150 }))
		})

		act(() => {
			result.current.removeFromCart('2')
		})

		expect(result.current.totalItems).toBe(1)
		expect(result.current.totalPrice).toBe(50)
	})

	test('resets totalPrice & totalItems to 0 when cart is cleared', () => {
		const { result } = renderHook(() => useCart(), {
			wrapper: CartProvider,
		})
		const mockData = (overrides = {}) => ({
			id: '1',
			name: 'Test Art',
			description: 'Test description',
			price: 100,
			image: '/test.jpg',
			stock: 10,
			category: 'Test Category',
			createdAt: new Date(),
			...overrides,
		})

		act(() => {
			result.current.addToCart(mockData({ price: 50 }))
		})

		act(() => {
			result.current.addToCart(mockData({ id: '2', price: 150 }))
		})

		act(() => {
			result.current.clearCart()
		})

		expect(result.current.totalItems).toBe(0)
		expect(result.current.totalPrice).toBe(0)
	})
})
