'use client'

import { useState } from 'react'
import Image from 'next/image'
import { updateOrderStatus } from '../orders/actions'

interface OrderItem {
	id: string
	productId: string
	productName: string
	productImage: string
	productPrice: number
	quantity: number
	subtotal: number
}

interface Order {
	id: string
	orderId: string
	customerName: string
	customerEmail: string
	customerPhone: string
	shippingAddress: string
	apartment: string | null
	city: string
	state: string
	pincode: string
	totalPrice: number
	totalItems: number
	status: string
	createdAt: Date
	items: OrderItem[]
}

interface OrderStats {
	total: number
	pending: number
	processing: number
	shipped: number
	delivered: number
	revenue: number
}

interface OrdersClientProps {
	orders: Order[]
	stats: OrderStats
}

const statusConfig = {
	pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
	processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
	shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
	delivered: { label: 'Delivered', color: 'bg-sage/20 text-sage', dot: 'bg-sage' },
	cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
}

export default function OrdersClient({ orders, stats }: OrdersClientProps) {
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
	const [filterStatus, setFilterStatus] = useState<string>('all')
	const [toastMessage, setToastMessage] = useState('')
	const [showToast, setShowToast] = useState(false)
	const [isUpdating, setIsUpdating] = useState(false)

	const filteredOrders = filterStatus === 'all' 
		? orders 
		: orders.filter(o => o.status === filterStatus)

	const showToastMsg = (message: string) => {
		setToastMessage(message)
		setShowToast(true)
		setTimeout(() => setShowToast(false), 3000)
	}

	const handleStatusUpdate = async (orderId: string, newStatus: string) => {
		setIsUpdating(true)
		try {
			const result = await updateOrderStatus(orderId, newStatus)
			if (result.success) {
				showToastMsg(`Order ${newStatus} successfully!`)
				setSelectedOrder(null)
			} else {
				showToastMsg(result.error || 'Failed to update order')
			}
		} catch {
			showToastMsg('Something went wrong')
		} finally {
			setIsUpdating(false)
		}
	}

	return (
		<div className='space-y-4'>
			{/* Page Header */}
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-xl font-bold text-deep-brown font-[family-name:var(--font-heading)]'>
						Orders
					</h1>
					<p className='text-xs text-warm-gray'>
						Manage customer orders
					</p>
				</div>
			</div>

			{/* Stats Cards */}
			<div className='grid grid-cols-2 lg:grid-cols-5 gap-3'>
				<div className='bg-white rounded-lg p-3 shadow-soft'>
					<div className='flex items-center gap-3'>
						<div className='w-8 h-8 rounded-lg bg-deep-brown/10 flex items-center justify-center'>
							<svg className='w-4 h-4 text-deep-brown' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
							</svg>
						</div>
						<div>
							<p className='text-lg font-bold text-deep-brown'>{stats.total}</p>
							<p className='text-[10px] text-warm-gray'>Total</p>
						</div>
					</div>
				</div>
				<div className='bg-white rounded-lg p-3 shadow-soft'>
					<div className='flex items-center gap-3'>
						<div className='w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center'>
							<span className='text-sm'>⏳</span>
						</div>
						<div>
							<p className='text-lg font-bold text-deep-brown'>{stats.pending}</p>
							<p className='text-[10px] text-warm-gray'>Pending</p>
						</div>
					</div>
				</div>
				<div className='bg-white rounded-lg p-3 shadow-soft'>
					<div className='flex items-center gap-3'>
						<div className='w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center'>
							<span className='text-sm'>📦</span>
						</div>
						<div>
							<p className='text-lg font-bold text-deep-brown'>{stats.processing}</p>
							<p className='text-[10px] text-warm-gray'>Processing</p>
						</div>
					</div>
				</div>
				<div className='bg-white rounded-lg p-3 shadow-soft'>
					<div className='flex items-center gap-3'>
						<div className='w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center'>
							<span className='text-sm'>🚚</span>
						</div>
						<div>
							<p className='text-lg font-bold text-deep-brown'>{stats.shipped}</p>
							<p className='text-[10px] text-warm-gray'>Shipped</p>
						</div>
					</div>
				</div>
				<div className='bg-white rounded-lg p-3 shadow-soft col-span-2 lg:col-span-1'>
					<div className='flex items-center gap-3'>
						<div className='w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center'>
							<svg className='w-4 h-4 text-sage' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
							</svg>
						</div>
						<div>
							<p className='text-lg font-bold text-deep-brown'>
								₹{stats.revenue.toLocaleString('en-IN')}
							</p>
							<p className='text-[10px] text-warm-gray'>Revenue</p>
						</div>
					</div>
				</div>
			</div>

			{/* Filter Tabs */}
			<div className='flex gap-2 overflow-x-auto no-scrollbar'>
				{['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
					<button
						key={status}
						onClick={() => setFilterStatus(status)}
						className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
							filterStatus === status
								? 'bg-deep-brown text-cream'
								: 'bg-white text-warm-gray hover:bg-beige'
						}`}
					>
						{status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
					</button>
				))}
			</div>

			{/* Orders Table */}
			<div className='bg-white rounded-lg shadow-soft overflow-hidden'>
				{filteredOrders.length > 0 ? (
					<div className='overflow-x-auto'>
						<table className='w-full text-sm'>
							<thead>
								<tr className='bg-beige/50 text-left'>
									<th className='px-4 py-3 font-semibold text-deep-brown'>Order</th>
									<th className='px-4 py-3 font-semibold text-deep-brown'>Customer</th>
									<th className='px-4 py-3 font-semibold text-deep-brown'>Items</th>
									<th className='px-4 py-3 font-semibold text-deep-brown'>Total</th>
									<th className='px-4 py-3 font-semibold text-deep-brown'>Status</th>
									<th className='px-4 py-3 font-semibold text-deep-brown'>Date</th>
									<th className='px-4 py-3 font-semibold text-deep-brown'>Actions</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-light-gray'>
								{filteredOrders.map((order) => {
									const status = statusConfig[order.status as keyof typeof statusConfig]
									return (
										<tr key={order.id} className='hover:bg-beige/30 transition-colors'>
											<td className='px-4 py-3'>
												<p className='font-medium text-deep-brown'>{order.orderId}</p>
											</td>
											<td className='px-4 py-3'>
												<p className='font-medium text-deep-brown'>{order.customerName}</p>
												<p className='text-xs text-warm-gray'>{order.customerEmail}</p>
											</td>
											<td className='px-4 py-3'>
												<div className='flex items-center gap-1'>
													<div className='flex -space-x-2'>
														{order.items.slice(0, 3).map((item, idx) => (
															<div 
																key={item.id} 
																className='relative w-8 h-8 rounded-lg overflow-hidden border-2 border-white'
																style={{ zIndex: 3 - idx }}
															>
																<Image src={item.productImage} alt={item.productName} fill className='object-cover' />
															</div>
														))}
													</div>
													<span className='text-xs text-warm-gray ml-1'>
														{order.totalItems} items
													</span>
												</div>
											</td>
											<td className='px-4 py-3'>
												<p className='font-semibold text-deep-brown'>
													₹{order.totalPrice.toLocaleString('en-IN')}
												</p>
											</td>
											<td className='px-4 py-3'>
												<span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${status?.color || 'bg-gray-100 text-gray-700'}`}>
													<span className={`w-1.5 h-1.5 rounded-full ${status?.dot || 'bg-gray-500'}`} />
													{status?.label || order.status}
												</span>
											</td>
											<td className='px-4 py-3 text-xs text-warm-gray'>
												{new Date(order.createdAt).toLocaleDateString('en-IN', {
													day: 'numeric',
													month: 'short',
													year: 'numeric',
												})}
											</td>
											<td className='px-4 py-3'>
												<button
													onClick={() => setSelectedOrder(order)}
													className='text-xs text-terracotta hover:underline font-medium'
												>
													View Details
												</button>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				) : (
					<div className='p-8 text-center'>
						<div className='w-14 h-14 mx-auto mb-4 rounded-full bg-beige flex items-center justify-center'>
							<svg className='w-7 h-7 text-clay' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
							</svg>
						</div>
						<h3 className='text-sm font-semibold text-deep-brown mb-1'>No orders found</h3>
						<p className='text-xs text-warm-gray'>
							{filterStatus === 'all' ? 'Orders will appear here once customers place them.' : `No ${filterStatus} orders at the moment.`}
						</p>
					</div>
				)}
			</div>

			{/* Order Details Modal */}
			{selectedOrder && (
				<div className='fixed inset-0 backdrop-blur-sm bg-deep-brown/20 flex items-center justify-center z-50 p-4'>
					<div className='bg-white rounded-2xl shadow-dramatic max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar animate-scale-in'>
						{/* Modal Header */}
						<div className='flex justify-between items-center p-6 border-b border-light-gray sticky top-0 bg-white rounded-t-2xl z-10'>
							<div>
								<h2 className='text-lg font-bold text-deep-brown font-[family-name:var(--font-heading)]'>
									Order {selectedOrder.orderId}
								</h2>
								<p className='text-xs text-warm-gray'>
									{new Date(selectedOrder.createdAt).toLocaleDateString('en-IN', {
										weekday: 'short',
										day: 'numeric',
										month: 'short',
										year: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</p>
							</div>
							<button
								onClick={() => setSelectedOrder(null)}
								className='w-8 h-8 rounded-full bg-beige hover:bg-clay/20 flex items-center justify-center transition-colors'
							>
								<svg className='w-4 h-4 text-warm-brown' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
								</svg>
							</button>
						</div>

						{/* Modal Content */}
						<div className='p-6 space-y-6'>
							{/* Customer Info */}
							<div>
								<h3 className='text-sm font-semibold text-deep-brown mb-3'>Customer Information</h3>
								<div className='bg-beige/50 rounded-xl p-4'>
									<p className='font-medium text-deep-brown'>{selectedOrder.customerName}</p>
									<p className='text-sm text-warm-gray'>{selectedOrder.customerEmail}</p>
									<p className='text-sm text-warm-gray'>{selectedOrder.customerPhone}</p>
								</div>
							</div>

							{/* Shipping Address */}
							<div>
								<h3 className='text-sm font-semibold text-deep-brown mb-3'>Shipping Address</h3>
								<div className='bg-beige/50 rounded-xl p-4'>
									<p className='text-sm text-warm-gray'>
										{selectedOrder.shippingAddress}
										{selectedOrder.apartment && `, ${selectedOrder.apartment}`}
									</p>
									<p className='text-sm text-warm-gray'>
										{selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}
									</p>
								</div>
							</div>

							{/* Order Items */}
							<div>
								<h3 className='text-sm font-semibold text-deep-brown mb-3'>Order Items</h3>
								<div className='space-y-3'>
									{selectedOrder.items.map((item) => (
										<div key={item.id} className='flex gap-3 bg-beige/50 rounded-xl p-3'>
											<div className='relative w-14 h-14 rounded-lg overflow-hidden bg-white shrink-0'>
												<Image src={item.productImage} alt={item.productName} fill className='object-cover' />
											</div>
											<div className='flex-1 min-w-0'>
												<p className='font-medium text-deep-brown text-sm truncate'>{item.productName}</p>
												<p className='text-xs text-warm-gray'>
													{item.quantity} × ₹{item.productPrice.toLocaleString('en-IN')}
												</p>
											</div>
											<p className='font-semibold text-deep-brown text-sm'>
												₹{item.subtotal.toLocaleString('en-IN')}
											</p>
										</div>
									))}
								</div>
								<div className='mt-4 pt-4 border-t border-light-gray flex justify-between'>
									<span className='font-semibold text-deep-brown'>Total</span>
									<span className='font-bold text-lg text-deep-brown'>
										₹{selectedOrder.totalPrice.toLocaleString('en-IN')}
									</span>
								</div>
							</div>

							{/* Status Update */}
							<div>
								<h3 className='text-sm font-semibold text-deep-brown mb-3'>Update Status</h3>
								<div className='flex flex-wrap gap-2'>
									{['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => {
										const config = statusConfig[status as keyof typeof statusConfig]
										const isCurrent = selectedOrder.status === status
										return (
											<button
												key={status}
												onClick={() => !isCurrent && handleStatusUpdate(selectedOrder.orderId, status)}
												disabled={isCurrent || isUpdating}
												className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
													isCurrent
														? `${config.color} ring-2 ring-offset-1 ring-current`
														: 'bg-beige text-warm-gray hover:bg-clay/20'
												} disabled:opacity-50 disabled:cursor-not-allowed`}
											>
												{isCurrent && '✓ '}{config.label}
											</button>
										)
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Toast */}
			{showToast && (
				<div className='fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in'>
					<div className='bg-deep-brown text-cream px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm'>
						<svg className='w-4 h-4 text-sage' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
						</svg>
						<span className='font-medium text-xs'>{toastMessage}</span>
					</div>
				</div>
			)}
		</div>
	)
}

