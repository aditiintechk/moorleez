import { prismaConnection } from '../connection/prisma'
import { DailyRevenue, TopProduct } from '@/types'

export async function getRevenueByDate(days: number = 30) {
	const today = Date.now()
	const thirtyDaysInMs = days * 24 * 60 * 60 * 1000
	const thirtyDaysAgo = new Date(today - thirtyDaysInMs)

	const orders = await prismaConnection.order.findMany({
		where: {
			createdAt: {
				gte: thirtyDaysAgo,
			},
		},
		select: {
			createdAt: true,
			totalPrice: true,
		},
	})

	const groupedByDate = orders.reduce((acc, order) => {
		const date = order.createdAt.toISOString().split('T')[0]
		if (!acc[date]) {
			acc[date] = {
				date: date,
				revenue: 0,
				orderCount: 0,
			}
		}

		acc[date].revenue += order.totalPrice
		acc[date].orderCount += 1

		return acc
	}, {} as Record<string, DailyRevenue>)

	return Object.values(groupedByDate).sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	)
}

export async function getTopProducts(
	limit: number = 10
): Promise<TopProduct[]> {
	const result = await prismaConnection.orderItem.groupBy({
		by: ['productName'],
		_sum: {
			quantity: true,
			subtotal: true,
		},
	})

	const transformedItems = result.map((item) => ({
		productName: item.productName,
		unitsSold: item._sum.quantity || 0,
		revenue: item._sum.subtotal || 0,
	}))

	return transformedItems
		.sort((a, b) => b.revenue - a.revenue)
		.slice(0, limit)
}
