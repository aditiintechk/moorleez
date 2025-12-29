import { prismaConnection } from '@/lib/connection/prisma'
import OrdersClient from '../components/OrdersClient'

export const revalidate = 30 // Revalidate every 30 seconds

async function getOrders() {
	const orders = await prismaConnection.order.findMany({
		include: {
			items: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})
	return orders
}

async function getOrderStats() {
	const [totalOrders, pendingOrders, processingOrders, shippedOrders, deliveredOrders, totalRevenue] = await Promise.all([
		prismaConnection.order.count(),
		prismaConnection.order.count({ where: { status: 'pending' } }),
		prismaConnection.order.count({ where: { status: 'processing' } }),
		prismaConnection.order.count({ where: { status: 'shipped' } }),
		prismaConnection.order.count({ where: { status: 'delivered' } }),
		prismaConnection.order.aggregate({
			_sum: { totalPrice: true },
			where: { status: { not: 'cancelled' } },
		}),
	])

	return {
		total: totalOrders,
		pending: pendingOrders,
		processing: processingOrders,
		shipped: shippedOrders,
		delivered: deliveredOrders,
		revenue: totalRevenue._sum.totalPrice || 0,
	}
}

export default async function AdminOrdersPage() {
	const [orders, stats] = await Promise.all([
		getOrders(),
		getOrderStats(),
	])

	return <OrdersClient orders={orders} stats={stats} />
}

