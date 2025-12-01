'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {
	validateEmail,
	validateName,
	validatePhone,
	validatePincode,
} from '@/lib/validations/validation'
import { CheckoutFormData } from '@/types'
import { useCart } from '../context/CartContext'
import Image from 'next/image'

export default function Checkout() {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<CheckoutFormData>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
	})
	const { items, totalPrice, clearCart } = useCart() //items --> id, name, price, image, quantity

	const onSubmit = async (data: CheckoutFormData) => {
		try {
			// Calculate total items
			const totalItems = items.reduce(
				(sum, item) => sum + item.quantity,
				0
			)

			const orderData = {
				customerName: data.name,
				customerEmail: data.email,
				customerPhone: data.phone,
				shippingAddress: data.address,
				apartment: data.apartment || '',
				city: data.city,
				state: data.state,
				pincode: data.pincode,
				items: items,
				totalPrice: totalPrice,
				totalItems: totalItems,
			}

			const response = await fetch('/api/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderData),
			})

			const result = await response.json()

			if (response.ok) {
				clearCart()
				router.push(`/order/${result.orderId}`)
			} else {
				alert(
					result.error || 'Failed to create order. Please try again.'
				)
			}
		} catch (error) {
			console.error('Order submission error:', error)
			alert('Something went wrong. Please try again.')
		}
	}

	return (
		<div className='min-h-screen bg-white'>
			<div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 p-6 lg:p-12'>
				{/* Left Column - Checkout Form */}
				<div className='max-w-xl'>
					<h1 className='text-2xl font-semibold text-gray-900 mb-8'>
						Checkout
					</h1>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-6'
					>
						{/* Contact Section */}
						<div>
							<h2 className='text-lg font-semibold text-gray-900 mb-4'>
								Contact
							</h2>
							<div>
								<input
									{...register('email', {
										validate: (value) => {
											const result = validateEmail(value)
											return (
												result.isValid || result.error
											)
										},
									})}
									type='email'
									id='email'
									className={`w-full px-3 py-2.5 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 ${
										errors.email
											? 'border-red-600 focus:ring-red-600'
											: 'border-gray-300 focus:ring-gray-900'
									}`}
									placeholder='Email'
								/>
								{errors.email?.message && (
									<p className='mt-2 text-sm text-red-600'>
										{String(errors.email.message)}
									</p>
								)}
							</div>
						</div>

						{/* Delivery Section */}
						<div>
							<h2 className='text-lg font-semibold text-gray-900 mb-4'>
								Delivery
							</h2>

							{/* Country/Region Dropdown */}
							<div className='mb-4'>
								<select className='w-full px-3 py-2.5 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900'>
									<option>India</option>
								</select>
							</div>

							{/* Full Name */}
							<div className='mb-4'>
								<input
									{...register('name', {
										validate: (value) => {
											const result = validateName(value)
											return (
												result.isValid || result.error
											)
										},
									})}
									type='text'
									className={`w-full px-3 py-2.5 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 ${
										errors.name
											? 'border-red-600 focus:ring-red-600'
											: 'border-gray-300 focus:ring-gray-900'
									}`}
									placeholder='Full name'
								/>
								{errors.name?.message && (
									<p className='mt-2 text-sm text-red-600'>
										{String(errors.name.message)}
									</p>
								)}
							</div>

							{/* Address */}
							<div className='mb-4'>
								<input
									{...register('address', {
										required: 'Address is required',
										minLength: {
											value: 5,
											message: 'Enter an address',
										},
									})}
									type='text'
									className={`w-full px-3 py-2.5 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 ${
										errors.address
											? 'border-red-600 focus:ring-red-600'
											: 'border-gray-300 focus:ring-gray-900'
									}`}
									placeholder='Address'
								/>
								{errors.address?.message && (
									<p className='mt-2 text-sm text-red-600'>
										{errors.address.message}
									</p>
								)}
							</div>

							{/* Apartment (optional) */}
							<div className='mb-4'>
								<input
									{...register('apartment')}
									type='text'
									className='w-full px-3 py-2.5 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900'
									placeholder='Apartment, suite, etc. (optional)'
								/>
							</div>

							{/* City, State, PIN */}
							<div className='grid grid-cols-3 gap-4'>
								<div>
									<input
										{...register('city', {
											required: 'City is required',
											minLength: {
												value: 2,
												message: 'Enter a city',
											},
										})}
										type='text'
										className={`w-full px-3 py-2.5 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 ${
											errors.city
												? 'border-red-600 focus:ring-red-600'
												: 'border-gray-300 focus:ring-gray-900'
										}`}
										placeholder='City'
									/>
									{errors.city?.message && (
										<p className='mt-2 text-sm text-red-600'>
											{errors.city.message}
										</p>
									)}
								</div>
								<div>
									<select
										{...register('state', {
											required: 'State is required',
										})}
										className={`w-full px-3 py-2.5 border rounded-md text-gray-900 focus:outline-none focus:ring-1 ${
											errors.state
												? 'border-red-600 focus:ring-red-600'
												: 'border-gray-300 focus:ring-gray-900'
										}`}
									>
										<option value=''>State</option>
										<option value='Karnataka'>
											Karnataka
										</option>
										<option value='Maharashtra'>
											Maharashtra
										</option>
										<option value='Tamil Nadu'>
											Tamil Nadu
										</option>
										<option value='Delhi'>Delhi</option>
									</select>
									{errors.state?.message && (
										<p className='mt-2 text-sm text-red-600'>
											{errors.state.message}
										</p>
									)}
								</div>
								<div>
									<input
										{...register('pincode', {
											validate: (value) => {
												const result =
													validatePincode(value)
												return (
													result.isValid ||
													result.error
												)
											},
										})}
										type='text'
										className={`w-full px-3 py-2.5 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 ${
											errors.pincode
												? 'border-red-600 focus:ring-red-600'
												: 'border-gray-300 focus:ring-gray-900'
										}`}
										placeholder='PIN code'
										maxLength={6}
									/>
									{errors.pincode?.message && (
										<p className='mt-2 text-sm text-red-600'>
											{String(errors.pincode.message)}
										</p>
									)}
								</div>
							</div>

							{/* Phone */}
							<div className='mt-4'>
								<div className='flex'>
									<span className='inline-flex items-center px-3 py-2.5 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-700 text-sm font-medium'>
										+91
									</span>
									<input
										{...register('phone', {
											validate: (value) => {
												const result =
													validatePhone(value)
												return (
													result.isValid ||
													result.error
												)
											},
										})}
										type='tel'
										maxLength={10}
										className={`flex-1 px-3 py-2.5 border rounded-r-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 ${
											errors.phone
												? 'border-red-600 focus:ring-red-600'
												: 'border-gray-300 focus:ring-gray-900'
										}`}
										placeholder='10-digit phone number'
									/>
								</div>
								{errors.phone?.message && (
									<p className='mt-2 text-sm text-red-600'>
										{String(errors.phone.message)}
									</p>
								)}
							</div>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							disabled={isSubmitting}
							className='w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium'
						>
							{isSubmitting ? 'Processing...' : 'Place Order'}
						</button>
					</form>
				</div>

				{/* Right Column - Order Summary */}
				<div className='lg:border-l lg:border-gray-200 lg:pl-16'>
					<div className='sticky top-8'>
						<div className='space-y-6'>
							{/* Cart Items */}
							{items.map((item) => (
								<div key={item.id} className='flex gap-4'>
									<div className='relative shrink-0'>
										<Image
											src={
												item.image || '/placeholder.png'
											}
											alt={item.name}
											width={64}
											height={64}
											className='rounded-lg border border-gray-200'
										/>
										<span className='absolute -top-2 -right-2 bg-gray-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
											{item.quantity}
										</span>
									</div>
									<div className='flex-1 flex justify-between'>
										<div>
											<p className='text-sm text-gray-900'>
												{item.name}
											</p>
										</div>
										<p className='text-sm font-medium text-gray-900'>
											₹
											{(
												item.price * item.quantity
											).toFixed(2)}
										</p>
									</div>
								</div>
							))}

							{/* Divider */}
							<div className='border-t border-gray-200 pt-6 space-y-2'>
								{/* Subtotal */}
								<div className='flex justify-between text-sm'>
									<span className='text-gray-600'>
										Subtotal
									</span>
									<span className='text-gray-900'>
										₹{totalPrice.toFixed(2)}
									</span>
								</div>

								{/* Shipping */}
								<div className='flex justify-between text-sm'>
									<span className='text-gray-600'>
										Shipping
									</span>
									<span className='text-gray-900'>
										₹100.00
									</span>
								</div>
							</div>

							{/* Total */}
							<div className='border-t border-gray-200 pt-6'>
								<div className='flex justify-between'>
									<span className='text-lg font-semibold text-gray-900'>
										Total
									</span>
									<div className='text-right'>
										<p className='text-lg font-semibold text-gray-900'>
											<span className='text-sm text-gray-600 font-normal'>
												INR
											</span>{' '}
											₹{(totalPrice + 100).toFixed(2)}
										</p>
										<p className='text-xs text-gray-500 mt-1'>
											Including ₹
											{(
												(totalPrice + 100) *
												0.18
											).toFixed(2)}{' '}
											in taxes
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
