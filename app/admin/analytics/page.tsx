import { getRevenueByDate, getTopProducts } from '@/lib/services/analytics'
import RevenueChart from './RevenueChart'
import TopProductsChart from './TopProductsChart'

export default async function AnalyticsPage() {
	const revenueData = await getRevenueByDate(30)
	const topProducts = await getTopProducts(5)

	const totalRevenue = revenueData.reduce((sum, day) => {
		return sum + day.revenue
	}, 0)

	const totalOrders = revenueData.reduce((sum, day) => {
		return sum + day.orderCount
	}, 0)

	const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-2xl font-bold text-deep-brown'>
					Analytics
				</h1>
				<p className='text-sm text-warm-gray'>
					Revenue insights for the last 30 days
				</p>
			</div>

			{/* Metric Cards */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{/* Total Revenue Card */}
				<div className='bg-white rounded-xl shadow-soft p-4'>
					<p className='text-xs text-warm-gray font-medium mb-1'>
						Total Revenue (30 days)
					</p>
					<p className='text-2xl font-bold text-deep-brown'>
						₹{totalRevenue.toLocaleString('en-IN')}
					</p>
				</div>

				{/* Total Orders Card */}
				<div className='bg-white rounded-xl shadow-soft p-4'>
					<p className='text-xs text-warm-gray font-medium mb-1'>
						Total Orders (30 days)
					</p>
					<p className='text-2xl font-bold text-deep-brown'>
						{totalOrders}
					</p>
				</div>

				{/* Average Order Value Card */}
				<div className='bg-white rounded-xl shadow-soft p-4'>
					<p className='text-xs text-warm-gray font-medium mb-1'>
						Average Order Value
					</p>
					<p className='text-2xl font-bold text-deep-brown'>
						₹
						{avgOrderValue.toLocaleString('en-IN', {
							maximumFractionDigits: 0,
						})}
					</p>
				</div>
			</div>

			<div className='bg-white rounded-xl shadow-soft p-6'>
				<h2 className='text-lg font-semibold text-deep-brown mb-4'>
					Revenue Over Time
				</h2>
				<RevenueChart data={revenueData} />
			</div>

			{/* Top Products Section */}
			<div className='bg-white rounded-xl shadow-soft p-6'>
				<h2 className='text-lg font-semibold text-deep-brown mb-4'>
					Top Selling Products
				</h2>
				<TopProductsChart data={topProducts} />
			</div>
		</div>
	)
}
