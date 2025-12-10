'use server'

import { prismaConnection } from '@/lib/connection/prisma'
import { revalidatePath } from 'next/cache'

export async function createProduct(data: {
	name: string
	description: string
	price: number
	image: string
	stock: number
	category: string
}) {
	try {
		// create product in database
		const product = await prismaConnection.product.create({
			data: {
				...data,
			},
		})

		// refresh the products page
		revalidatePath('/admin/products')

		// return success message
		return {
			success: true,
			product,
			message: 'Product created successfully',
		}
	} catch (error) {
		// return error on failure
		console.error('Error creating product:', error)
		return {
			success: false,
			message: 'Failed to create Product',
		}
	}
}

export async function deleteProduct(productId: string, actionLabel: string) {
	try {
		let response

		if (actionLabel === 'Delete') {
			response = await prismaConnection.product.update({
				where: { id: productId },
				data: { isDeleted: true },
			})
		} else if (actionLabel === 'Restore') {
			response = await prismaConnection.product.update({
				where: { id: productId },
				data: { isDeleted: false },
			})
		} else {
			throw new Error('Invalid action label')
		}

		revalidatePath('/admin/products')

		return {
			success: true,
			product: response,
			message:
				actionLabel === 'Delete'
					? 'Product deleted successfully'
					: 'Product restored successfully',
		}
	} catch (error) {
		console.error('Error deleting product:', error)
		return {
			success: false,
			error: 'Failed to delete product',
		}
	}
}

export async function editProduct(
	productId: string,
	data: {
		name: string
		description: string
		price: number
		image: string
		stock: number
		category: string
	}
) {
	try {
		const product = await prismaConnection.product.update({
			where: {
				id: productId,
			},
			data: {
				...data,
			},
		})

		revalidatePath('/admin/products')

		return {
			success: true,
			product,
			message: 'Product updated successfully',
		}
	} catch {
		return {
			success: false,
			error: 'Failed to update product',
		}
	}
}
