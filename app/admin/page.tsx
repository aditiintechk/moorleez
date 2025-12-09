import React from 'react'
import { prismaConnection } from '@/lib/connection/prisma'

export const revalidate = 60

const AdminDashboard = async () => {
	const [totalOrders, totalRevenue, totalProducts] = await Promise.all([
		prismaConnection.order.count(),
		prismaConnection.order.aggregate({ _sum: { totalPrice: true } }),
		prismaConnection.product.count(),
	])

	return (
		<div>
			<h1 className='text-3xl font-bold text-gray-800 mb-8'>
				Dashboard Overview
			</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{/* Revenue Card */}
				<div className='bg-white p-6 rounded-lg shadow-md'>
					<p className='text-gray-500 text-sm font-medium'>
						Total Revenue
					</p>
					<p className='text-3xl font-bold text-gray-800 mt-2'>
						₹
						{totalRevenue._sum.totalPrice?.toLocaleString(
							'en-IN'
						) || 0}
					</p>
					<p className='text-green-600 text-sm mt-2'>↑ All time</p>
				</div>

				<div className='bg-white p-6 rounded-lg shadow-md'>
					<p className='text-gray-500 text-sm font-medium'>
						Total Orders
					</p>
					<p className='text-3xl font-bold text-gray-800 mt-2'>
						{totalOrders}
					</p>
					<p className='text-blue-600 text-sm mt-2'>All time</p>
				</div>

				<div className='bg-white p-6 rounded-lg shadow-md'>
					<p className='text-gray-500 text-sm font-medium'>
						Total Products
					</p>
					<p className='text-3xl font-bold text-gray-800 mt-2'>
						{totalProducts}
					</p>
					<p className='text-purple-600 text-sm mt-2'>In catalog</p>
				</div>

				<div className='bg-white p-6 rounded-lg shadow-md'>
					<p className='text-gray-500 text-sm font-medium'>
						Avg Order Value
					</p>
					<p className='text-3xl font-bold text-gray-800 mt-2'>
						₹
						{totalRevenue._sum.totalPrice && totalOrders > 0
							? (
									totalRevenue._sum.totalPrice / totalOrders
							  ).toFixed(2)
							: '0.00'}
					</p>
					<p className='text-orange-600 text-sm mt-2'>Per order</p>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
