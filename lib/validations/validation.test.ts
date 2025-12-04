import { describe, test, expect } from 'vitest'
import {
	validatePhone,
	validateEmail,
	validatePincode,
	validateName,
} from './validation'

describe('validatePhone', () => {
	test('accepts valid 10-digit phone starting with 9', () => {
		const result = validatePhone('9012345678')
		expect(result.isValid).toBe(true)
	})

	test('accepts valid 10-digit phone starting with 6', () => {
		const result = validatePhone('6123456789')
		expect(result.isValid).toBe(true)
	})

	// Negative Test Cases
	test('rejects phone starting with invalid digit (5)', () => {
		const result = validatePhone('5012345678')
		expect(result.isValid).toBe(false)
	})

	test('rejects invalid 11-digit phone', () => {
		const result = validatePhone('90123456789')
		expect(result.isValid).toBe(false)
	})

	test('rejects invalid 9-digit phone', () => {
		const result = validatePhone('901234567')
		expect(result.isValid).toBe(false)
	})

	test('rejects invalid phone containing letters or special characters', () => {
		const result = validatePhone('90123ed67&')
		expect(result.isValid).toBe(false)
	})

	test('rejects empty string as phone number', () => {
		const result = validatePhone('')
		expect(result.isValid).toBe(false)
	})
})

describe('validateEmail', () => {
	test('accepts valid email', () => {
		const result = validateEmail('abc@yahoo.com')
		expect(result.isValid).toBe(true)
	})

	test('rejects empty string', () => {
		const result = validateEmail('')
		expect(result.isValid).toBe(false)
	})

	test('rejects email without @', () => {
		const result = validateEmail('xyz.com')
		expect(result.isValid).toBe(false)
	})

	test('rejects disposable domains', () => {
		const result = validateEmail('disposable@tempmail.com')
		expect(result.isValid).toBe(false)
	})

	test('rejects emails with no domain name', () => {
		const result = validateEmail('user@.com')
		expect(result.isValid).toBe(false)
	})

	test('rejects email with no . extension', () => {
		const result = validateEmail('user@domain')
		expect(result.isValid).toBe(false)
	})

	test('accepts email with uppercase letters', () => {
		const result = validateEmail('ABC@YAHOO.COM')
		expect(result.isValid).toBe(true)
	})
})

describe('validateName', () => {
	test('accepts name of more than two characters', () => {
		const result = validateName('Sarah')
		expect(result.isValid).toBe(true)
	})

	test('rejects name of less than two characters', () => {
		const result = validateName('s')
		expect(result.isValid).toBe(false)
	})

	test('rejects empty string as name', () => {
		const result = validateName('')
		expect(result.isValid).toBe(false)
	})

	test('rejects numbers or special characters in name', () => {
		const result = validateName('ar4#ds00')
		expect(result.isValid).toBe(false)
	})
})

describe('validatePincode', () => {
	test('accepts pincode of exactly six numbers', () => {
		const result = validatePincode('560001')
		expect(result.isValid).toBe(true)
	})

	test('rejects empty string as pincode', () => {
		const result = validatePincode('')
		expect(result.isValid).toBe(false)
	})

	test('rejects pincode of incorrect length', () => {
		const resultOne = validatePincode('123')
		expect(resultOne.isValid).toBe(false)
		const resultTwo = validatePincode('12345678')
		expect(resultTwo.isValid).toBe(false)
	})
})
