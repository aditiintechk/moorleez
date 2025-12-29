'use server'

import { prismaConnection } from '@/lib/connection/prisma'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatus(orderId: string, newStatus: string) {
	try {
		const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
		
		if (!validStatuses.includes(newStatus)) {
			return {
				success: false,
				error: 'Invalid status',
			}
		}

		await prismaConnection.order.update({
			where: { orderId },
			data: { status: newStatus },
		})

		revalidatePath('/admin/orders')
		revalidatePath('/admin')

		return {
			success: true,
			message: `Order status updated to ${newStatus}`,
		}
	} catch (error) {
		console.error('Error updating order status:', error)
		return {
			success: false,
			error: 'Failed to update order status',
		}
	}
}

