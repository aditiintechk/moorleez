'use client'

import { useCart } from '../context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
	const { items, removeFromCart, updateQuantity, totalPrice, totalItems } =
		useCart()

	if (items.length === 0) {
		return (
			<div className='min-h-[70vh] bg-cream flex items-center justify-center px-4'>
				<div className='text-center max-w-md'>
					{/* Empty cart illustration */}
					<div className='w-32 h-32 mx-auto mb-8 rounded-full bg-beige flex items-center justify-center'>
						<svg className='w-16 h-16 text-clay' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
						</svg>
					</div>
					
					<h2 className='text-3xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-4'>
						Your cart is empty
					</h2>
					<p className='text-warm-gray mb-8 leading-relaxed'>
						Looks like you haven&apos;t added any beautiful art pieces yet. 
						Let&apos;s find something special for you!
					</p>
					<Link
						href='/'
						className='btn-primary inline-flex items-center gap-2'
					>
						<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
						</svg>
						Browse Collection
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-cream py-8 md:py-12'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6'>
				{/* Page Header */}
				<div className='mb-8'>
					<Link 
						href='/' 
						className='inline-flex items-center gap-2 text-warm-brown hover:text-deep-brown transition-colors mb-4'
					>
						<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
						</svg>
						Continue Shopping
					</Link>
					<h1 className='text-3xl md:text-4xl font-bold text-deep-brown font-[family-name:var(--font-heading)]'>
						Shopping Cart
					</h1>
					<p className='text-warm-gray mt-2'>
						{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Cart Items */}
					<div className='lg:col-span-2 space-y-4'>
						{items.map((item, index) => (
							<div
								key={item.id}
								className='bg-white rounded-2xl shadow-soft p-4 sm:p-6 animate-fade-in'
								style={{ animationDelay: `${index * 100}ms` }}
							>
								<div className='flex gap-4 sm:gap-6'>
									{/* Product Image */}
									<div className='relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-beige'>
										<Image
											src={item.image}
											alt={item.name}
											fill
											className='object-cover'
										/>
									</div>

									{/* Product Info */}
									<div className='flex-1 min-w-0'>
										<div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2'>
											<div>
												<span className='text-xs text-warm-gray uppercase tracking-wide'>
													{item.category}
												</span>
												<h3 className='text-lg font-semibold text-deep-brown font-[family-name:var(--font-heading)] line-clamp-1'>
													{item.name}
												</h3>
												<p className='text-warm-gray text-sm mt-1'>
													₹{item.price.toLocaleString('en-IN')} each
												</p>
											</div>
											
											{/* Item Total - Desktop */}
											<div className='hidden sm:block text-right'>
												<p className='text-xl font-bold text-deep-brown'>
													₹{(item.price * item.quantity).toLocaleString('en-IN')}
												</p>
											</div>
										</div>

										{/* Quantity & Remove */}
										<div className='flex items-center justify-between mt-4'>
											<div className='flex items-center gap-3'>
												{/* Quantity Controls */}
												<div className='flex items-center bg-beige rounded-xl overflow-hidden'>
													<button
														onClick={() => updateQuantity(item.id, item.quantity - 1)}
														className='px-3 py-2 text-deep-brown hover:bg-clay/20 transition-colors font-medium'
														aria-label='Decrease quantity'
													>
														−
													</button>
													<span className='px-4 py-2 font-semibold text-deep-brown min-w-[48px] text-center'>
														{item.quantity}
													</span>
													<button
														onClick={() => updateQuantity(item.id, item.quantity + 1)}
														className='px-3 py-2 text-deep-brown hover:bg-clay/20 transition-colors font-medium'
														aria-label='Increase quantity'
													>
														+
													</button>
												</div>

												{/* Remove Button */}
												<button
													onClick={() => removeFromCart(item.id)}
													className='text-warm-gray hover:text-terracotta transition-colors p-2'
													aria-label='Remove item'
												>
													<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
														<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
													</svg>
												</button>
											</div>

											{/* Item Total - Mobile */}
											<p className='sm:hidden text-lg font-bold text-deep-brown'>
												₹{(item.price * item.quantity).toLocaleString('en-IN')}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Order Summary */}
					<div className='lg:col-span-1'>
						<div className='bg-white rounded-2xl shadow-soft p-6 sticky top-24'>
							<h2 className='text-xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-6'>
								Order Summary
							</h2>

							<div className='space-y-4 mb-6'>
								<div className='flex justify-between text-warm-gray'>
									<span>Subtotal ({totalItems} items)</span>
									<span className='text-charcoal font-medium'>
										₹{totalPrice.toLocaleString('en-IN')}
									</span>
								</div>
								<div className='flex justify-between text-warm-gray'>
									<span>Shipping</span>
									<span className='text-sage font-medium'>
										{totalPrice >= 2000 ? 'Free' : 'Calculated at checkout'}
									</span>
								</div>
								{totalPrice >= 2000 && (
									<div className='flex items-center gap-2 text-sm text-sage bg-sage/10 px-3 py-2 rounded-lg'>
										<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
										</svg>
										You qualify for free shipping!
									</div>
								)}
								<div className='border-t border-light-gray pt-4 flex justify-between'>
									<span className='text-lg font-bold text-deep-brown'>Total</span>
									<span className='text-2xl font-bold text-deep-brown'>
										₹{totalPrice.toLocaleString('en-IN')}
									</span>
								</div>
							</div>

							<Link
								href='/checkout'
								className='btn-primary w-full text-center block mb-4'
							>
								Proceed to Checkout
							</Link>

							{/* Trust Badges */}
							<div className='flex items-center justify-center gap-4 text-xs text-warm-gray pt-4 border-t border-light-gray'>
								<div className='flex items-center gap-1'>
									<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
									</svg>
									Secure
								</div>
								<div className='flex items-center gap-1'>
									<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
									</svg>
									Safe Checkout
								</div>
							</div>
						</div>

						{/* Promo Code - Optional future feature */}
						<div className='bg-beige rounded-2xl p-4 mt-4'>
							<p className='text-sm text-warm-brown text-center'>
								🎁 Have a promo code? Enter it at checkout!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
