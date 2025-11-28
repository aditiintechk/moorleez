/* How to build a validation function for checkout process?
    1. validate email
    2. validate name
    3. validate phone number
    4. validate pincode
    then send the whole result to the checkout form    
    
Approach: 27/11 - apply custom validations & add Zod next week. */

import { ValidationResult } from '@/types'

export function validateName(name: string): ValidationResult {
	if (!name || name.trim() === '') {
		return {
			isValid: false,
			error: 'Name is required',
		}
	}

	const trimmedName = name.trim()

	if (trimmedName.length < 2) {
		return {
			isValid: false,
			error: 'Name must be at least 2 characters long',
		}
	}

	if (trimmedName.length > 50) {
		return {
			isValid: false,
			error: 'Name must not exceed 50 characters',
		}
	}

	const hashNumbers = /\d/.test(trimmedName)
	if (hashNumbers) {
		return {
			isValid: false,
			error: 'Name must not contain numbers',
		}
	}

	const validNamePattern = /^[\p{L}\s'-]+$/u
	if (!validNamePattern.test(trimmedName)) {
		return {
			isValid: false,
			error: 'Name can only contain letters, spaces, hyphens and apostrophes',
		}
	}

	return {
		isValid: true,
	}
}

export function validateEmail(email: string): ValidationResult {
	// check if email exists
	if (!email || email.trim() === '') {
		return {
			isValid: false,
			error: 'Email is required',
		}
	}

	const trimmedEmail = email.trim().toLowerCase()

	// check for valid email
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailPattern.test(trimmedEmail)) {
		return {
			isValid: false,
			error: 'Please enter a valid email address',
		}
	}

	// check for disposable emails
	const disposableDomains = [
		'tempmail.com',
		'throwaway.email',
		'guerrillamail.com',
		'10minutemail.com',
		'mailinator.com',
	]

	const domain = trimmedEmail.split('@')[1]
	if (disposableDomains.includes(domain)) {
		return {
			isValid: false,
			error: 'Disposable email addresses are not allowed',
		}
	}

	return {
		isValid: true,
	}
}

export function validatePhone(phone: string): ValidationResult {
	if (!phone || phone.trim() === '') {
		return {
			isValid: false,
			error: 'Phone number is required',
		}
	}

	const trimmedPhone = phone.replace(/[\s-]/g, '')

	const phonePattern = /^(\+91|91)?[6-9]\d{9}$/

	if (!phonePattern.test(trimmedPhone)) {
		return {
			isValid: false,
			error: 'Please enter a valid Phone Number',
		}
	}
	return {
		isValid: true,
	}
}

export function validatePincode(pincode: string): ValidationResult {
	// check if pincode exists
	if (!pincode || pincode.trim() === '') {
		return {
			isValid: false,
			error: 'Pincode is required',
		}
	}
	// trim pincode
	const trimmedPincode = pincode.trim()

	// check the pattern for pincode - 6 numbers from 1-8 (India)
	const pincodePattern = /^[1-8]\d{5}$/

	if (!pincodePattern.test(trimmedPincode)) {
		return {
			isValid: false,
			error: 'Please enter a valid Pincode',
		}
	}
	return {
		isValid: true,
	}
}
