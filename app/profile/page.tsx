'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'

// Mock orders data - replace with actual data fetching
const mockOrders = [
	{
		id: 'ORD-2024-001',
		date: '2024-11-20',
		status: 'delivered',
		total: 5499,
		items: [
			{
				id: '1',
				name: 'Sunset Over Mountains',
				price: 4999,
				quantity: 1,
				image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
			},
		],
		shippingAddress: '123 Art Lane, Mumbai, Maharashtra - 400001',
		deliveredDate: '2024-11-25',
	},
	{
		id: 'ORD-2024-002',
		date: '2024-11-28',
		status: 'shipped',
		total: 3298,
		items: [
			{
				id: '2',
				name: 'Handmade Crochet Cushion',
				price: 1299,
				quantity: 2,
				image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=400',
			},
			{
				id: '3',
				name: 'Abstract Canvas Art',
				price: 699,
				quantity: 1,
				image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=400',
			},
		],
		shippingAddress: '123 Art Lane, Mumbai, Maharashtra - 400001',
		trackingNumber: 'IND123456789',
		expectedDelivery: '2024-12-03',
	},
	{
		id: 'ORD-2024-003',
		date: '2024-12-05',
		status: 'processing',
		total: 7999,
		items: [
			{
				id: '4',
				name: 'Custom Portrait Commission',
				price: 7999,
				quantity: 1,
				image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400',
			},
		],
		shippingAddress: '123 Art Lane, Mumbai, Maharashtra - 400001',
	},
]

const statusConfig = {
	pending: { label: 'Pending Payment', color: 'bg-yellow-100 text-yellow-700', icon: '⏳' },
	processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700', icon: '📦' },
	shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-700', icon: '🚚' },
	delivered: { label: 'Delivered', color: 'bg-sage/20 text-sage', icon: '✓' },
	cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: '✕' },
}

function OrderCard({ order }: { order: typeof mockOrders[0] }) {
	const [isExpanded, setIsExpanded] = useState(false)
	const status = statusConfig[order.status as keyof typeof statusConfig]

	return (
		<div className='bg-white rounded-2xl shadow-soft overflow-hidden'>
			{/* Order Header */}
			<div 
				className='p-4 sm:p-6 cursor-pointer hover:bg-beige/30 transition-colors'
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
					<div className='flex items-start gap-4'>
						{/* First item image */}
						<div className='relative w-16 h-16 rounded-xl overflow-hidden bg-beige shrink-0'>
							<Image
								src={order.items[0].image}
								alt={order.items[0].name}
								fill
								className='object-cover'
							/>
							{order.items.length > 1 && (
								<div className='absolute inset-0 bg-deep-brown/60 flex items-center justify-center'>
									<span className='text-white text-sm font-medium'>+{order.items.length - 1}</span>
								</div>
							)}
						</div>
						
						<div>
							<p className='font-semibold text-deep-brown'>{order.id}</p>
							<p className='text-sm text-warm-gray'>
								{new Date(order.date).toLocaleDateString('en-IN', { 
									year: 'numeric', 
									month: 'short', 
									day: 'numeric' 
								})}
							</p>
							<p className='text-sm text-warm-gray mt-1'>
								{order.items.length} {order.items.length === 1 ? 'item' : 'items'}
							</p>
						</div>
					</div>
					
					<div className='flex items-center justify-between sm:justify-end gap-4'>
						<div className='text-right'>
							<p className='text-lg font-bold text-deep-brown'>
								₹{order.total.toLocaleString('en-IN')}
							</p>
							<span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
								{status.icon} {status.label}
							</span>
						</div>
						<svg 
							className={`w-5 h-5 text-warm-gray transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
							fill='none' 
							stroke='currentColor' 
							viewBox='0 0 24 24'
						>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
						</svg>
					</div>
				</div>
			</div>

			{/* Expanded Details */}
			{isExpanded && (
				<div className='border-t border-light-gray animate-fade-in'>
					{/* Order Items */}
					<div className='p-4 sm:p-6 space-y-4'>
						<h4 className='text-sm font-semibold text-deep-brown'>Order Items</h4>
						{order.items.map((item) => (
							<div key={item.id} className='flex gap-4'>
								<div className='relative w-16 h-16 rounded-lg overflow-hidden bg-beige shrink-0'>
									<Image src={item.image} alt={item.name} fill className='object-cover' />
								</div>
								<div className='flex-1'>
									<p className='font-medium text-deep-brown'>{item.name}</p>
									<p className='text-sm text-warm-gray'>Qty: {item.quantity}</p>
								</div>
								<p className='font-medium text-deep-brown'>
									₹{(item.price * item.quantity).toLocaleString('en-IN')}
								</p>
							</div>
						))}
					</div>

					{/* Shipping Info */}
					<div className='px-4 sm:px-6 pb-4 sm:pb-6'>
						<div className='bg-beige rounded-xl p-4'>
							<h4 className='text-sm font-semibold text-deep-brown mb-2'>Shipping Address</h4>
							<p className='text-sm text-warm-gray'>{order.shippingAddress}</p>
							
							{order.trackingNumber && (
								<div className='mt-3 pt-3 border-t border-clay/20'>
									<p className='text-xs text-warm-gray'>Tracking Number</p>
									<p className='text-sm font-medium text-deep-brown'>{order.trackingNumber}</p>
								</div>
							)}
							
							{order.expectedDelivery && (
								<div className='mt-2'>
									<p className='text-xs text-warm-gray'>Expected Delivery</p>
									<p className='text-sm font-medium text-deep-brown'>
										{new Date(order.expectedDelivery).toLocaleDateString('en-IN', { 
											weekday: 'short',
											year: 'numeric', 
											month: 'short', 
											day: 'numeric' 
										})}
									</p>
								</div>
							)}

							{order.deliveredDate && (
								<div className='mt-2'>
									<p className='text-xs text-warm-gray'>Delivered On</p>
									<p className='text-sm font-medium text-sage'>
										{new Date(order.deliveredDate).toLocaleDateString('en-IN', { 
											weekday: 'short',
											year: 'numeric', 
											month: 'short', 
											day: 'numeric' 
										})}
									</p>
								</div>
							)}
						</div>
					</div>

					{/* Actions */}
					<div className='px-4 sm:px-6 pb-4 sm:pb-6 flex flex-wrap gap-3'>
						<Link 
							href={`/order/${order.id}`}
							className='btn-secondary text-sm py-2'
						>
							View Details
						</Link>
						{order.status === 'shipped' && (
							<button className='btn-primary text-sm py-2'>
								Track Order
							</button>
						)}
						{order.status === 'delivered' && (
							<button className='text-sm text-terracotta hover:underline'>
								Write a Review
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState<'orders' | 'settings'>('orders')
	const orders = mockOrders

	return (
		<div className='min-h-screen bg-cream'>
			<SignedOut>
				<div className='min-h-[70vh] flex items-center justify-center px-4'>
					<div className='text-center max-w-md'>
						<div className='w-20 h-20 mx-auto mb-6 rounded-full bg-beige flex items-center justify-center'>
							<svg className='w-10 h-10 text-clay' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
							</svg>
						</div>
						<h2 className='text-2xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-3'>
							Sign in to view your profile
						</h2>
						<p className='text-warm-gray mb-6'>
							Access your orders, track shipments, and manage your account.
						</p>
						<SignInButton mode='modal'>
							<button className='btn-primary'>Sign In</button>
						</SignInButton>
					</div>
				</div>
			</SignedOut>

			<SignedIn>
				<div className='max-w-4xl mx-auto px-4 py-8'>
					{/* Profile Header */}
					<div className='bg-white rounded-2xl shadow-soft p-6 mb-6'>
						<div className='flex items-center gap-4'>
							<UserButton 
								appearance={{
									elements: {
										avatarBox: 'w-16 h-16',
									},
								}}
							/>
							<div>
								<h1 className='text-2xl font-bold text-deep-brown font-[family-name:var(--font-heading)]'>
									My Account
								</h1>
								<p className='text-warm-gray'>Manage your orders and preferences</p>
							</div>
						</div>
					</div>

					{/* Tabs */}
					<div className='flex gap-4 mb-6'>
						<button
							onClick={() => setActiveTab('orders')}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
								activeTab === 'orders'
									? 'bg-deep-brown text-cream'
									: 'text-warm-gray hover:bg-beige'
							}`}
						>
							My Orders
						</button>
						<button
							onClick={() => setActiveTab('settings')}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
								activeTab === 'settings'
									? 'bg-deep-brown text-cream'
									: 'text-warm-gray hover:bg-beige'
							}`}
						>
							Settings
						</button>
					</div>

					{/* Tab Content */}
					{activeTab === 'orders' ? (
						<div className='space-y-4'>
							{orders.length > 0 ? (
								orders.map((order) => (
									<OrderCard key={order.id} order={order} />
								))
							) : (
								<div className='bg-white rounded-2xl shadow-soft p-12 text-center'>
									<div className='w-16 h-16 mx-auto mb-4 rounded-full bg-beige flex items-center justify-center'>
										<svg className='w-8 h-8 text-clay' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
										</svg>
									</div>
									<h3 className='text-xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-2'>
										No orders yet
									</h3>
									<p className='text-warm-gray mb-6'>
										Start shopping to see your orders here!
									</p>
									<Link href='/' className='btn-primary'>
										Browse Collection
									</Link>
								</div>
							)}
						</div>
					) : (
						<div className='space-y-6'>
							{/* Saved Addresses */}
							<div className='bg-white rounded-2xl shadow-soft p-6'>
								<h3 className='text-lg font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-4'>
									Saved Addresses
								</h3>
								<div className='bg-beige rounded-xl p-4'>
									<div className='flex items-start justify-between'>
										<div>
											<p className='font-medium text-deep-brown'>Home</p>
											<p className='text-sm text-warm-gray mt-1'>
												123 Art Lane, Mumbai, Maharashtra - 400001
											</p>
											<p className='text-sm text-warm-gray'>+91 98765 43210</p>
										</div>
										<span className='text-xs bg-sage/20 text-sage px-2 py-1 rounded-full'>
											Default
										</span>
									</div>
								</div>
								<button className='mt-4 text-sm text-terracotta hover:underline flex items-center gap-1'>
									<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
									</svg>
									Add New Address
								</button>
							</div>

							{/* Notifications */}
							<div className='bg-white rounded-2xl shadow-soft p-6'>
								<h3 className='text-lg font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-4'>
									Notifications
								</h3>
								<div className='space-y-4'>
									<label className='flex items-center justify-between'>
										<div>
											<p className='font-medium text-deep-brown'>Order Updates</p>
											<p className='text-sm text-warm-gray'>Get notified about your order status</p>
										</div>
										<input type='checkbox' defaultChecked className='w-5 h-5 accent-terracotta' />
									</label>
									<label className='flex items-center justify-between'>
										<div>
											<p className='font-medium text-deep-brown'>New Arrivals</p>
											<p className='text-sm text-warm-gray'>Be the first to know about new products</p>
										</div>
										<input type='checkbox' defaultChecked className='w-5 h-5 accent-terracotta' />
									</label>
									<label className='flex items-center justify-between'>
										<div>
											<p className='font-medium text-deep-brown'>Promotions</p>
											<p className='text-sm text-warm-gray'>Receive special offers and discounts</p>
										</div>
										<input type='checkbox' className='w-5 h-5 accent-terracotta' />
									</label>
								</div>
							</div>

							{/* Account Actions */}
							<div className='bg-white rounded-2xl shadow-soft p-6'>
								<h3 className='text-lg font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-4'>
									Account
								</h3>
								<div className='space-y-3'>
									<button className='w-full text-left px-4 py-3 rounded-xl hover:bg-beige transition-colors flex items-center justify-between'>
										<span className='text-deep-brown'>Edit Profile</span>
										<svg className='w-5 h-5 text-warm-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
										</svg>
									</button>
									<button className='w-full text-left px-4 py-3 rounded-xl hover:bg-beige transition-colors flex items-center justify-between'>
										<span className='text-deep-brown'>Change Password</span>
										<svg className='w-5 h-5 text-warm-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
										</svg>
									</button>
									<button className='w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-red-600'>
										Delete Account
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</SignedIn>
		</div>
	)
}

