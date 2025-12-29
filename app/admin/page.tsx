import { prismaConnection } from '@/lib/connection/prisma'
import Link from 'next/link'

export const revalidate = 60

export default async function AdminDashboard() {
	// Fetch all data in parallel
	const [totalOrders, totalRevenue, totalProducts, recentOrders, lowStockProducts] = await Promise.all([
		prismaConnection.order.count(),
		prismaConnection.order.aggregate({ _sum: { totalPrice: true } }),
		prismaConnection.product.count({ where: { isDeleted: false } }),
		prismaConnection.order.findMany({
			take: 5,
			orderBy: { createdAt: 'desc' },
			include: { items: true }
		}),
		prismaConnection.product.findMany({
			where: { 
				stock: { lte: 5 },
				isDeleted: false 
			},
			take: 5,
			orderBy: { stock: 'asc' }
		})
	])

	const avgOrderValue = totalRevenue._sum.totalPrice && totalOrders > 0
		? totalRevenue._sum.totalPrice / totalOrders
		: 0

	const stats = [
		{
			label: 'Total Revenue',
			value: `₹${totalRevenue._sum.totalPrice?.toLocaleString('en-IN') || '0'}`,
			change: '+12%',
			changeType: 'positive',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
				</svg>
			),
			bgColor: 'bg-sage/10',
			iconColor: 'text-sage'
		},
		{
			label: 'Total Orders',
			value: totalOrders.toString(),
			change: 'All time',
			changeType: 'neutral',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
				</svg>
			),
			bgColor: 'bg-terracotta/10',
			iconColor: 'text-terracotta'
		},
		{
			label: 'Active Products',
			value: totalProducts.toString(),
			change: 'In catalog',
			changeType: 'neutral',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
				</svg>
			),
			bgColor: 'bg-clay/10',
			iconColor: 'text-clay'
		},
		{
			label: 'Avg Order Value',
			value: `₹${avgOrderValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
			change: 'Per order',
			changeType: 'neutral',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
				</svg>
			),
			bgColor: 'bg-dusty-rose/10',
			iconColor: 'text-dusty-rose'
		},
	]

	return (
		<div className='space-y-6'>
			{/* Page Header */}
			<div>
				<h1 className='text-xl font-bold text-deep-brown font-[family-name:var(--font-heading)]'>
					Dashboard
				</h1>
				<p className='text-sm text-warm-gray'>
					Overview of your store performance
				</p>
			</div>

			{/* Stats Grid */}
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
				{stats.map((stat, index) => (
					<div 
						key={stat.label}
						className='bg-white rounded-xl p-4 shadow-soft hover:shadow-medium transition-shadow'
						style={{ animationDelay: `${index * 50}ms` }}
					>
						<div className='flex items-start justify-between mb-3'>
							<div className={`${stat.bgColor} p-2 rounded-lg`}>
								<span className={stat.iconColor}>{stat.icon}</span>
							</div>
							{stat.changeType === 'positive' && (
								<span className='text-[10px] font-medium text-sage bg-sage/10 px-1.5 py-0.5 rounded-full'>
									{stat.change}
								</span>
							)}
						</div>
						<p className='text-xs text-warm-gray font-medium mb-0.5'>
							{stat.label}
						</p>
						<p className='text-lg font-bold text-deep-brown'>
							{stat.value}
						</p>
						{stat.changeType === 'neutral' && (
							<p className='text-[10px] text-warm-gray'>
								{stat.change}
							</p>
						)}
					</div>
				))}
			</div>

			{/* Two Column Section */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
				{/* Recent Orders */}
				<div className='bg-white rounded-xl shadow-soft p-4'>
					<div className='flex items-center justify-between mb-4'>
						<h2 className='text-sm font-semibold text-deep-brown'>
							Recent Orders
						</h2>
						<Link 
							href='/admin/orders' 
							className='text-xs text-terracotta hover:text-terracotta/80 font-medium'
						>
							View all →
						</Link>
					</div>
					
					{recentOrders.length > 0 ? (
						<div className='space-y-2'>
							{recentOrders.map((order) => (
								<div 
									key={order.id} 
									className='flex items-center justify-between py-2 border-b border-light-gray last:border-0'
								>
									<div className='flex items-center gap-2'>
										<div className='w-8 h-8 rounded-full bg-beige flex items-center justify-center'>
											<span className='text-xs font-semibold text-warm-brown'>
												{order.customerName.charAt(0).toUpperCase()}
											</span>
										</div>
										<div>
											<p className='text-xs font-medium text-deep-brown'>
												{order.customerName}
											</p>
											<p className='text-[10px] text-warm-gray'>
												{order.items.length} item{order.items.length !== 1 ? 's' : ''} · {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
											</p>
										</div>
									</div>
									<div className='text-right'>
										<p className='text-xs font-semibold text-deep-brown'>
											₹{order.totalPrice.toLocaleString('en-IN')}
										</p>
										<span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
											order.status === 'DELIVERED' 
												? 'bg-sage/20 text-sage' 
												: order.status === 'SHIPPED'
													? 'bg-terracotta/20 text-terracotta'
													: 'bg-clay/20 text-clay'
										}`}>
											{order.status.toLowerCase()}
										</span>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className='text-center py-6'>
							<div className='w-12 h-12 mx-auto mb-3 rounded-full bg-beige flex items-center justify-center'>
								<svg className='w-6 h-6 text-clay' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
								</svg>
							</div>
							<p className='text-xs text-warm-gray'>No orders yet</p>
						</div>
					)}
				</div>

				{/* Low Stock Alert */}
				<div className='bg-white rounded-xl shadow-soft p-4'>
					<div className='flex items-center justify-between mb-4'>
						<h2 className='text-sm font-semibold text-deep-brown'>
							Low Stock Alert
						</h2>
						<Link 
							href='/admin/products' 
							className='text-xs text-terracotta hover:text-terracotta/80 font-medium'
						>
							Manage →
						</Link>
					</div>
					
					{lowStockProducts.length > 0 ? (
						<div className='space-y-2'>
							{lowStockProducts.map((product) => (
								<div 
									key={product.id} 
									className='flex items-center justify-between p-2 bg-beige/50 rounded-lg'
								>
									<div className='flex items-center gap-2'>
										<div className={`w-2 h-2 rounded-full ${
											product.stock === 0 
												? 'bg-red-500' 
												: product.stock <= 2 
													? 'bg-terracotta' 
													: 'bg-yellow-500'
										}`} />
										<p className='text-xs font-medium text-deep-brown'>
											{product.name}
										</p>
									</div>
									<span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
										product.stock === 0 
											? 'bg-red-100 text-red-700' 
											: 'bg-terracotta/20 text-terracotta'
									}`}>
										{product.stock === 0 ? 'Out of stock' : `${product.stock} left`}
									</span>
								</div>
							))}
						</div>
					) : (
						<div className='text-center py-6'>
							<div className='w-12 h-12 mx-auto mb-3 rounded-full bg-sage/10 flex items-center justify-center'>
								<svg className='w-6 h-6 text-sage' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
								</svg>
							</div>
							<p className='text-xs text-sage font-medium'>All stocked!</p>
						</div>
					)}
				</div>
			</div>

			{/* Quick Actions */}
			<div className='bg-deep-brown rounded-xl p-4'>
				<h3 className='text-sm font-semibold mb-3 text-cream'>Quick Actions</h3>
				<div className='flex flex-wrap gap-2'>
					<Link 
						href='/admin/products' 
						className='inline-flex items-center gap-1.5 bg-terracotta hover:bg-terracotta/90 text-cream px-3 py-1.5 rounded-lg transition-colors text-xs font-medium'
					>
						<svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
						</svg>
						Add Product
					</Link>
					<Link 
						href='/admin/orders' 
						className='inline-flex items-center gap-1.5 bg-clay hover:bg-clay/90 text-deep-brown px-3 py-1.5 rounded-lg transition-colors text-xs font-medium'
					>
						<svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
						</svg>
						View Orders
					</Link>
					<Link 
						href='/' 
						className='inline-flex items-center gap-1.5 bg-cream/20 hover:bg-cream/30 text-cream px-3 py-1.5 rounded-lg transition-colors text-xs font-medium'
					>
						<svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
						</svg>
						Preview Store
					</Link>
				</div>
			</div>
		</div>
	)
}
