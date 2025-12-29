import { prismaConnection } from '@/lib/connection/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

// Order status tracker component
function OrderTracker({ status }: { status: string }) {
	const steps = [
		{ key: 'pending', label: 'Order Placed', icon: '📝' },
		{ key: 'processing', label: 'Processing', icon: '📦' },
		{ key: 'shipped', label: 'Shipped', icon: '🚚' },
		{ key: 'delivered', label: 'Delivered', icon: '✓' },
	]

	const currentIndex = steps.findIndex(s => s.key === status)
	const isCancelled = status === 'cancelled'

	if (isCancelled) {
		return (
			<div className='bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3'>
				<div className='w-10 h-10 rounded-full bg-red-100 flex items-center justify-center'>
					<span className='text-lg'>✕</span>
				</div>
				<div>
					<p className='font-medium text-red-700'>Order Cancelled</p>
					<p className='text-sm text-red-600'>This order has been cancelled</p>
				</div>
			</div>
		)
	}

	return (
		<div className='relative'>
			<div className='flex justify-between'>
				{steps.map((step, idx) => {
					const isCompleted = idx <= currentIndex
					const isCurrent = idx === currentIndex
					
					return (
						<div key={step.key} className='flex flex-col items-center flex-1'>
							{/* Connector Line */}
							{idx > 0 && (
								<div 
									className={`absolute h-0.5 top-5 ${
										idx <= currentIndex ? 'bg-sage' : 'bg-light-gray'
									}`}
									style={{
										left: `${((idx - 1) / (steps.length - 1)) * 100 + 12.5}%`,
										width: `${75 / (steps.length - 1)}%`,
									}}
								/>
							)}
							
							{/* Step Circle */}
							<div 
								className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
									isCompleted 
										? 'bg-sage text-white' 
										: 'bg-beige text-warm-gray'
								} ${isCurrent ? 'ring-4 ring-sage/20' : ''}`}
							>
								{isCompleted ? step.icon : idx + 1}
							</div>
							
							{/* Label */}
							<p className={`mt-2 text-xs sm:text-sm text-center ${
								isCompleted ? 'text-deep-brown font-medium' : 'text-warm-gray'
							}`}>
								{step.label}
							</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default async function OrderConfirmation({
	params,
}: {
	params: Promise<{ orderId: string }>
}) {
	const { orderId } = await params

	const order = await prismaConnection.order.findUnique({
		where: { orderId: orderId },
		include: { items: true },
	})

	if (!order) {
		notFound()
	}

	const shippingCost = order.totalPrice >= 2000 ? 0 : 100
	const totalWithShipping = order.totalPrice + shippingCost

	return (
		<div className='min-h-screen bg-cream py-8 md:py-12'>
			<div className='max-w-3xl mx-auto px-4'>
				{/* Success Header */}
				<div className='bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-6 text-center'>
					<div className='w-20 h-20 mx-auto mb-6 rounded-full bg-sage/20 flex items-center justify-center animate-scale-in'>
						<svg className='w-10 h-10 text-sage' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
						</svg>
					</div>
					<h1 className='text-3xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-2'>
						Order Placed Successfully!
					</h1>
					<p className='text-warm-gray mb-6'>
						Thank you for your order. We&apos;ll send you a confirmation email shortly.
					</p>
					<div className='inline-block bg-beige rounded-xl px-6 py-4'>
						<p className='text-xs text-warm-gray uppercase tracking-wide mb-1'>Order Number</p>
						<p className='text-2xl font-bold text-deep-brown font-[family-name:var(--font-heading)]'>
							{order.orderId}
						</p>
					</div>
				</div>

				{/* Order Status Tracker */}
				<div className='bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-6'>
					<h2 className='text-lg font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-6'>
						Order Status
					</h2>
					<OrderTracker status={order.status} />
				</div>

				{/* Order Details */}
				<div className='bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-6'>
					<h2 className='text-lg font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-6'>
						Order Details
					</h2>

					{/* Shipping Info */}
					<div className='mb-6 pb-6 border-b border-light-gray'>
						<h3 className='text-sm font-semibold text-warm-gray uppercase tracking-wide mb-3'>
							Shipping Information
						</h3>
						<div className='bg-beige rounded-xl p-4'>
							<p className='font-medium text-deep-brown'>{order.customerName}</p>
							<p className='text-sm text-warm-gray mt-1'>{order.customerEmail}</p>
							<p className='text-sm text-warm-gray'>{order.customerPhone}</p>
							<div className='mt-3 pt-3 border-t border-clay/20'>
								<p className='text-sm text-warm-gray'>
									{order.shippingAddress}
									{order.apartment && `, ${order.apartment}`}
								</p>
								<p className='text-sm text-warm-gray'>
									{order.city}, {order.state} - {order.pincode}
								</p>
							</div>
						</div>
					</div>

					{/* Order Items */}
					<div className='mb-6'>
						<h3 className='text-sm font-semibold text-warm-gray uppercase tracking-wide mb-3'>
							Items Ordered
						</h3>
						<div className='space-y-4'>
							{order.items.map((item) => (
								<div key={item.id} className='flex gap-4'>
									<div className='relative w-20 h-20 rounded-xl overflow-hidden bg-beige shrink-0'>
										<Image
											src={item.productImage}
											alt={item.productName}
											fill
											className='object-cover'
										/>
									</div>
									<div className='flex-1'>
										<p className='font-medium text-deep-brown'>
											{item.productName}
										</p>
										<p className='text-sm text-warm-gray'>
											Qty: {item.quantity} × ₹{item.productPrice.toLocaleString('en-IN')}
										</p>
									</div>
									<div className='text-right'>
										<p className='font-semibold text-deep-brown'>
											₹{item.subtotal.toLocaleString('en-IN')}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Price Summary */}
					<div className='border-t border-light-gray pt-4 space-y-2'>
						<div className='flex justify-between text-warm-gray'>
							<span>Subtotal ({order.totalItems} items)</span>
							<span className='text-charcoal'>
								₹{order.totalPrice.toLocaleString('en-IN')}
							</span>
						</div>
						<div className='flex justify-between text-warm-gray'>
							<span>Shipping</span>
							<span className={shippingCost === 0 ? 'text-sage font-medium' : 'text-charcoal'}>
								{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
							</span>
						</div>
						<div className='flex justify-between text-lg font-bold pt-2 border-t border-light-gray'>
							<span className='text-deep-brown'>Total</span>
							<span className='text-deep-brown'>
								₹{totalWithShipping.toLocaleString('en-IN')}
							</span>
						</div>
					</div>
				</div>

				{/* What's Next */}
				<div className='bg-terracotta/10 rounded-2xl p-6 mb-6'>
					<div className='flex items-start gap-4'>
						<div className='w-12 h-12 rounded-xl bg-terracotta/20 flex items-center justify-center shrink-0'>
							<svg className='w-6 h-6 text-terracotta' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
							</svg>
						</div>
						<div>
							<h3 className='font-semibold text-deep-brown mb-1'>What&apos;s Next?</h3>
							<p className='text-sm text-warm-gray'>
								Your order is being processed. You&apos;ll receive an email with tracking 
								information once your order ships. Typical delivery time is 5-7 business days.
							</p>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className='flex flex-col sm:flex-row gap-4 justify-center'>
					<Link href='/profile' className='btn-secondary text-center'>
						View All Orders
					</Link>
					<Link href='/' className='btn-primary text-center'>
						Continue Shopping
					</Link>
				</div>
			</div>
		</div>
	)
}
