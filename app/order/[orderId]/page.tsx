import { prismaConnection } from '@/lib/connection/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function OrderConfirmation({
	params,
}: {
	params: { orderId: string }
}) {
	// Get orderId from URL
	const { orderId } = await params

	// Fetch order from database
	const order = await prismaConnection.order.findUnique({
		where: { orderId: orderId },
		include: { items: true }, // Include order items
	})

	// If order not found
	if (!order) {
		notFound()
	}

	return (
		<div className='min-h-screen bg-gray-50 py-12'>
			<div className='max-w-3xl mx-auto px-4'>
				{/* Success Message */}
				<div className='bg-white rounded-lg shadow-md p-8 mb-6'>
					<div className='text-center'>
						<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
							<svg
								className='w-8 h-8 text-green-600'
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
						</div>
						<h2 className='text-3xl font-bold text-gray-900 mb-2'>
							Order Placed Successfully!
						</h2>
						<p className='text-gray-600 mb-4'>
							Thank you for your order. We will send you a
							confirmation email shortly.
						</p>
						<div className='bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block'>
							<p className='text-sm text-gray-600 mb-1'>
								Order Number
							</p>
							<p className='text-2xl font-bold text-blue-600'>
								{order.orderId}
							</p>
						</div>
					</div>
				</div>

				{/* Order Details */}
				<div className='bg-white rounded-lg shadow-md p-8 mb-6'>
					<h3 className='text-xl font-semibold mb-4'>
						Order Details
					</h3>

					{/* Customer Info */}
					<div className='mb-6 pb-6 border-b'>
						<h4 className='font-semibold text-gray-700 mb-3'>
							Shipping Information
						</h4>
						<p className='text-gray-900'>{order.customerName}</p>
						<p className='text-gray-600'>{order.customerEmail}</p>
						<p className='text-gray-600'>{order.customerPhone}</p>
						<p className='text-gray-600 mt-2'>
							{order.shippingAddress}
							{order.apartment && `, ${order.apartment}`}
						</p>
						<p className='text-gray-600'>
							{order.city}, {order.state} - {order.pincode}
						</p>
					</div>

					{/* Order Items */}
					<div className='mb-6'>
						<h3 className='font-semibold text-gray-700 mb-3'>
							Items Ordered
						</h3>
						<div className='space-y-4'>
							{order.items.map((item) => (
								<div key={item.id} className='flex gap-4'>
									<div className='relative w-20 h-20 shrink-0'>
										<Image
											src={item.productImage}
											alt={item.productName}
											fill
											className='object-cover rounded-lg'
										/>
									</div>
									<div className='flex-1'>
										<p className='font-medium text-gray-900'>
											{item.productName}
										</p>
										<p className='text-sm text-gray-600'>
											Quantity: {item.quantity}
										</p>
										<p className='text-sm text-gray-600'>
											₹{item.productPrice.toFixed(2)} each
										</p>
									</div>
									<div className='text-right'>
										<p className='font-semibold text-gray-900'>
											₹{item.subtotal.toFixed(2)}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Order Summary */}
					<div className='border-t pt-4'>
						<div className='flex justify-between mb-2'>
							<span className='text-gray-600'>
								Subtotal ({order.totalItems} items)
							</span>
							<span className='text-gray-900'>
								₹{order.totalPrice.toFixed(2)}
							</span>
						</div>
						<div className='flex justify-between mb-2'>
							<span className='text-gray-600'>Shipping</span>
							<span className='text-gray-900'>₹100.00</span>
						</div>
						<div className='flex justify-between text-lg font-bold pt-2 border-t'>
							<span>Total</span>
							<span>₹{(order.totalPrice + 100).toFixed(2)}</span>
						</div>
					</div>
				</div>

				{/* Next Steps */}
				<div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6'>
					<h3 className='font-semibold text-blue-900 mb-2'>
						What is Next?
					</h3>
					<p className='text-blue-800 mb-4'>
						Your order is pending payment. You will receive payment
						instructions via email shortly.
					</p>
					<p className='text-sm text-blue-700'>
						Status:{' '}
						<span className='font-semibold'>{order.status}</span>
					</p>
				</div>

				{/* Actions */}
				<div className='text-center'>
					<Link
						href='/'
						className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block'
					>
						Continue Shopping
					</Link>
				</div>
			</div>
		</div>
	)
}
