'use client'

import { useCart } from '../context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
	const { items, removeFromCart, updateQuantity, totalPrice, totalItems } =
		useCart()

	if (items.length === 0) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						Your cart is empty
					</h2>
					<p className='text-gray-600 mb-8'>
						Add some beautiful art pieces to get started!
					</p>
					<Link
						href='/'
						className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block'
					>
						Browse Products
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gray-50 py-12'>
			<div className='max-w-7xl mx-auto px-4'>
				<h1 className='text-3xl font-bold mb-8'>Shopping Cart</h1>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Cart Items - 2/3 width on desktop */}
					<div className='lg:col-span-2 space-y-4'>
						{items.map((item) => (
							<div
								key={item.id}
								className='bg-white rounded-lg shadow-md p-6'
							>
								<div className='flex gap-6'>
									{/* Product Image */}
									<div className='relative w-32 h-32 shrink-0'>
										<Image
											src={item.image}
											alt={item.name}
											fill
											className='object-cover rounded-lg'
										/>
									</div>

									{/* Product Info */}
									<div className='grow'>
									<h3 className='text-xl font-semibold mb-2'>
										{item.name}
									</h3>
									<p className='text-gray-600 mb-4'>
										₹{item.price.toFixed(2)} each
									</p>

										{/* Quantity Controls */}
										<div className='flex items-center gap-4'>
											<div className='flex items-center border border-gray-300 rounded-lg'>
												<button
													onClick={() =>
														updateQuantity(
															item.id,
															item.quantity - 1
														)
													}
													className='px-4 py-2 hover:bg-gray-100 transition-colors'
												>
													−
												</button>
												<span className='px-6 py-2 border-x border-gray-300 font-semibold'>
													{item.quantity}
												</span>
												<button
													onClick={() =>
														updateQuantity(
															item.id,
															item.quantity + 1
														)
													}
													className='px-4 py-2 hover:bg-gray-100 transition-colors'
												>
													+
												</button>
											</div>

											<button
												onClick={() =>
													removeFromCart(item.id)
												}
												className='text-red-600 hover:text-red-700 font-medium'
											>
												Remove
											</button>
										</div>
									</div>

								{/* Item Total */}
								<div className='text-right'>
									<p className='text-2xl font-bold text-gray-900'>
										₹
										{(
											item.price * item.quantity
										).toFixed(2)}
									</p>
								</div>
								</div>
							</div>
						))}
					</div>

					{/* Order Summary - 1/3 width on desktop, sticky */}
					<div className='lg:col-span-1'>
						<div className='bg-white rounded-lg shadow-md p-6 sticky top-24'>
							<h2 className='text-2xl font-bold mb-6'>
								Order Summary
							</h2>

						<div className='space-y-4 mb-6'>
							<div className='flex justify-between text-gray-600'>
								<span>Items ({totalItems})</span>
								<span>₹{totalPrice.toFixed(2)}</span>
							</div>
							<div className='flex justify-between text-gray-600'>
								<span>Shipping</span>
								<span>Calculated at checkout</span>
							</div>
							<div className='border-t pt-4 flex justify-between text-xl font-bold'>
								<span>Total</span>
								<span>₹{totalPrice.toFixed(2)}</span>
							</div>
						</div>

							<Link
								href='/checkout'
								className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center block'
							>
								Proceed to Checkout
							</Link>

							<Link
								href='/'
								className='w-full text-center text-blue-600 hover:text-blue-700 mt-4 block'
							>
								Continue Shopping
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
