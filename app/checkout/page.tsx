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
import Link from 'next/link'

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
	const { items, totalPrice, clearCart } = useCart()

	// Calculate shipping
	const shippingCost = totalPrice >= 2000 ? 0 : 100
	const totalWithShipping = totalPrice + shippingCost

	const onSubmit = async (data: CheckoutFormData) => {
		try {
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

	// Empty cart redirect
	if (items.length === 0) {
		return (
			<div className='min-h-[70vh] bg-cream flex items-center justify-center px-4'>
				<div className='text-center max-w-md'>
					<div className='w-20 h-20 mx-auto mb-6 rounded-full bg-beige flex items-center justify-center'>
						<svg
							className='w-10 h-10 text-clay'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={1.5}
								d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
							/>
						</svg>
					</div>
					<h2 className='text-2xl font-bold text-deep-brown font-(family-name:--font-heading) mb-3'>
						Nothing to checkout
					</h2>
					<p className='text-warm-gray mb-6'>
						Add some items to your cart first!
					</p>
					<Link href='/' className='btn-primary inline-block'>
						Browse Products
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-cream'>
			<div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0'>
				{/* Left Column - Checkout Form */}
				<div className='px-6 py-8 lg:pr-12 lg:py-12'>
					{/* Back Link */}
					<Link
						href='/cart'
						className='inline-flex items-center gap-2 text-warm-brown hover:text-deep-brown transition-colors mb-6'
					>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 19l-7-7 7-7'
							/>
						</svg>
						Back to Cart
					</Link>

					<h1 className='text-3xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-2'>
						Checkout
					</h1>
					<p className='text-warm-gray mb-8'>
						Complete your order details below
					</p>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-8'
					>
						{/* Contact Section */}
						<div className='bg-white rounded-2xl p-6 shadow-soft'>
							<h2 className='text-lg font-semibold text-deep-brown font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2'>
								<span className='w-8 h-8 rounded-full bg-terracotta text-white text-sm flex items-center justify-center'>
									1
								</span>
								Contact Information
							</h2>
							<div>
								<label className='block text-sm font-medium text-charcoal mb-2'>
									Email Address *
								</label>
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
									className={`input ${
										errors.email
											? 'border-terracotta focus:border-terracotta'
											: ''
									}`}
									placeholder='your@email.com'
								/>
								{errors.email?.message && (
									<p className='mt-2 text-sm text-terracotta'>
										{String(errors.email.message)}
									</p>
								)}
							</div>
						</div>

						{/* Delivery Section */}
						<div className='bg-white rounded-2xl p-6 shadow-soft'>
							<h2 className='text-lg font-semibold text-deep-brown font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2'>
								<span className='w-8 h-8 rounded-full bg-terracotta text-white text-sm flex items-center justify-center'>
									2
								</span>
								Delivery Address
							</h2>

							<div className='space-y-4'>
								{/* Country */}
								<div>
									<label className='block text-sm font-medium text-charcoal mb-2'>
										Country/Region
									</label>
									<select
										className='input bg-beige cursor-not-allowed'
										disabled
									>
										<option>India 🇮🇳</option>
									</select>
								</div>

								{/* Full Name */}
								<div>
									<label className='block text-sm font-medium text-charcoal mb-2'>
										Full Name *
									</label>
									<input
										{...register('name', {
											validate: (value) => {
												const result =
													validateName(value)
												return (
													result.isValid ||
													result.error
												)
											},
										})}
										type='text'
										className={`input ${
											errors.name
												? 'border-terracotta focus:border-terracotta'
												: ''
										}`}
										placeholder='Your full name'
									/>
									{errors.name?.message && (
										<p className='mt-2 text-sm text-terracotta'>
											{String(errors.name.message)}
										</p>
									)}
								</div>

								{/* Address */}
								<div>
									<label className='block text-sm font-medium text-charcoal mb-2'>
										Street Address *
									</label>
									<input
										{...register('address', {
											required: 'Address is required',
											minLength: {
												value: 5,
												message:
													'Please enter a valid address',
											},
										})}
										type='text'
										className={`input ${
											errors.address
												? 'border-terracotta focus:border-terracotta'
												: ''
										}`}
										placeholder='House no., Building, Street'
									/>
									{errors.address?.message && (
										<p className='mt-2 text-sm text-terracotta'>
											{errors.address.message}
										</p>
									)}
								</div>

								{/* Apartment */}
								<div>
									<label className='block text-sm font-medium text-charcoal mb-2'>
										Apartment, Suite, etc.{' '}
										<span className='text-warm-gray'>
											(optional)
										</span>
									</label>
									<input
										{...register('apartment')}
										type='text'
										className='input'
										placeholder='Apartment, suite, floor, etc.'
									/>
								</div>

								{/* City, State, PIN */}
								<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
									<div>
										<label className='block text-sm font-medium text-charcoal mb-2'>
											City *
										</label>
										<input
											{...register('city', {
												required: 'City is required',
												minLength: {
													value: 2,
													message: 'Enter a city',
												},
											})}
											type='text'
											className={`input ${
												errors.city
													? 'border-terracotta focus:border-terracotta'
													: ''
											}`}
											placeholder='City'
										/>
										{errors.city?.message && (
											<p className='mt-2 text-sm text-terracotta'>
												{errors.city.message}
											</p>
										)}
									</div>
									<div>
										<label className='block text-sm font-medium text-charcoal mb-2'>
											State *
										</label>
										<select
											{...register('state', {
												required: 'State is required',
											})}
											className={`input ${
												errors.state
													? 'border-terracotta focus:border-terracotta'
													: ''
											}`}
										>
											<option value=''>Select</option>
											<option value='Andhra Pradesh'>
												Andhra Pradesh
											</option>
											<option value='Delhi'>Delhi</option>
											<option value='Gujarat'>
												Gujarat
											</option>
											<option value='Karnataka'>
												Karnataka
											</option>
											<option value='Maharashtra'>
												Maharashtra
											</option>
											<option value='Tamil Nadu'>
												Tamil Nadu
											</option>
											<option value='Telangana'>
												Telangana
											</option>
											<option value='West Bengal'>
												West Bengal
											</option>
										</select>
										{errors.state?.message && (
											<p className='mt-2 text-sm text-terracotta'>
												{errors.state.message}
											</p>
										)}
									</div>
									<div>
										<label className='block text-sm font-medium text-charcoal mb-2'>
											PIN Code *
										</label>
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
											className={`input ${
												errors.pincode
													? 'border-terracotta focus:border-terracotta'
													: ''
											}`}
											placeholder='6 digits'
											maxLength={6}
										/>
										{errors.pincode?.message && (
											<p className='mt-2 text-sm text-terracotta'>
												{String(errors.pincode.message)}
											</p>
										)}
									</div>
								</div>

								{/* Phone */}
								<div>
									<label className='block text-sm font-medium text-charcoal mb-2'>
										Phone Number *
									</label>
									<div className='flex'>
										<span className='inline-flex items-center px-4 py-3 rounded-l-xl border border-r-0 border-light-gray bg-beige text-warm-brown text-sm font-medium'>
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
											className={`flex-1 input rounded-l-none ${
												errors.phone
													? 'border-terracotta focus:border-terracotta'
													: ''
											}`}
											placeholder='10-digit mobile number'
										/>
									</div>
									{errors.phone?.message && (
										<p className='mt-2 text-sm text-terracotta'>
											{String(errors.phone.message)}
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							disabled={isSubmitting}
							className='btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
						>
							{isSubmitting ? (
								<>
									<svg
										className='animate-spin h-5 w-5'
										viewBox='0 0 24 24'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
											fill='none'
										/>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
										/>
									</svg>
									Processing Order...
								</>
							) : (
								<>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
										/>
									</svg>
									Place Order · ₹
									{totalWithShipping.toLocaleString('en-IN')}
								</>
							)}
						</button>

						{/* Trust Indicators */}
						<div className='flex items-center justify-center gap-6 text-xs text-warm-gray'>
							<div className='flex items-center gap-1'>
								<svg
									className='w-4 h-4'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
									/>
								</svg>
								Secure Payment
							</div>
							<div className='flex items-center gap-1'>
								<svg
									className='w-4 h-4'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
									/>
								</svg>
								SSL Protected
							</div>
						</div>
					</form>
				</div>

				{/* Right Column - Order Summary */}
				<div className='bg-beige px-6 py-8 lg:pl-12 lg:py-12 lg:min-h-screen'>
					<div className='sticky top-8'>
						<h2 className='text-xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-6'>
							Order Summary
						</h2>

						{/* Cart Items */}
						<div className='space-y-4 mb-6'>
							{items.map((item) => (
								<div
									key={item.id}
									className='flex gap-4 bg-white rounded-xl p-3'
								>
									<div className='relative shrink-0'>
										<Image
											src={
												item.image || '/placeholder.png'
											}
											alt={item.name}
											width={64}
											height={64}
											className='rounded-lg object-cover'
										/>
										<span className='absolute -top-2 -right-2 bg-deep-brown text-cream text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium'>
											{item.quantity}
										</span>
									</div>
									<div className='flex-1 flex justify-between items-center'>
										<div>
											<p className='text-sm font-medium text-deep-brown line-clamp-1'>
												{item.name}
											</p>
											<p className='text-xs text-warm-gray'>
												₹
												{item.price.toLocaleString(
													'en-IN'
												)}{' '}
												each
											</p>
										</div>
										<p className='text-sm font-semibold text-deep-brown'>
											₹
											{(
												item.price * item.quantity
											).toLocaleString('en-IN')}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Promo Code */}
						<div className='flex gap-2 mb-6'>
							<input
								type='text'
								className='input flex-1 text-sm'
								placeholder='Promo code'
							/>
							<button className='btn-secondary px-4 text-sm'>
								Apply
							</button>
						</div>

						{/* Price Breakdown */}
						<div className='space-y-3 mb-6'>
							<div className='flex justify-between text-warm-gray'>
								<span>Subtotal</span>
								<span className='text-charcoal'>
									₹{totalPrice.toLocaleString('en-IN')}
								</span>
							</div>
							<div className='flex justify-between text-warm-gray'>
								<span>Shipping</span>
								<span
									className={
										shippingCost === 0
											? 'text-sage font-medium'
											: 'text-charcoal'
									}
								>
									{shippingCost === 0
										? 'Free'
										: `₹${shippingCost}`}
								</span>
							</div>
							{shippingCost === 0 && (
								<div className='flex items-center gap-2 text-sm text-sage bg-sage/10 px-3 py-2 rounded-lg'>
									<svg
										className='w-4 h-4'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M5 13l4 4L19 7'
										/>
									</svg>
									You saved ₹100 on shipping!
								</div>
							)}
						</div>

						{/* Total */}
						<div className='border-t-2 border-clay/20 pt-4'>
							<div className='flex justify-between items-center'>
								<span className='text-lg font-bold text-deep-brown'>
									Total
								</span>
								<div className='text-right'>
									<p className='text-2xl font-bold text-deep-brown'>
										₹
										{totalWithShipping.toLocaleString(
											'en-IN'
										)}
									</p>
									<p className='text-xs text-warm-gray'>
										Including taxes
									</p>
								</div>
							</div>
						</div>

						{/* Secure Badge */}
						<div className='mt-8 p-4 bg-white rounded-xl border border-light-gray'>
							<div className='flex items-center gap-3'>
								<div className='w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center'>
									<svg
										className='w-5 h-5 text-sage'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
										/>
									</svg>
								</div>
								<div>
									<p className='text-sm font-medium text-deep-brown'>
										Secure Checkout
									</p>
									<p className='text-xs text-warm-gray'>
										Your data is protected with SSL
										encryption
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
