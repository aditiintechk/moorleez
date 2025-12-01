import { NextRequest, NextResponse } from 'next/server'
import { prismaConnection } from '@/lib/connection/prisma'

function generateOrderId(): string {
	const currentDate = Date.now()
	const randomNumber = Math.random().toString(36).substring(2, 8)
	const orderId = `ORD-${currentDate}-${randomNumber}`

	return orderId
}

export async function POST(request: NextRequest) {
	try {
		const data = await request.json()

		if (!data.items || data.items.length === 0) {
			return NextResponse.json(
				{ error: 'Cart is empty' },
				{ status: 400 }
			)
		}

		const orderId = generateOrderId()

		const order = await prismaConnection.$transaction(async (tx) => {
			// step 1: create order
			const newOrder = await tx.order.create({
				data: {
					orderId: orderId,
					customerName: data.customerName,
					customerEmail: data.customerEmail,
					customerPhone: data.customerPhone,
					shippingAddress: data.shippingAddress,
					apartment: data.apartment,
					city: data.city,
					state: data.state,
					pincode: data.pincode,
					totalPrice: data.totalPrice,
					totalItems: data.totalItems,
				},
			})
			// step 2: create orderItem
			for (const item of data.items) {
				await tx.orderItem.create({
					data: {
						orderId: newOrder.id, // new order id as foreign key
						productId: item.id,
						productName: item.name,
						productPrice: item.price,
						productImage: item.image,
						quantity: item.quantity,
						subtotal: item.quantity * item.price,
					},
				})
			}

			// step 3: reduce stock
			// fetch the items from database
			// get the stocks
			// reduce them by subtracting them with quantity of that item

			for (const item of data.items) {
				const product = await tx.product.findUnique({
					where: { id: item.id },
				})

				if (!product) {
					throw new Error(`Product ${item.id} not found`)
				}

				if (product.stock < item.quantity) {
					throw new Error(`Insufficient stock for ${product.name}`)
				}

				await tx.product.update({
					where: { id: item.id },
					data: { stock: product.stock - item.quantity },
				})
			}

			// step 4: return the order at the end
			return newOrder
		})

		return NextResponse.json({ success: true, orderId: order.orderId })
	} catch (error) {
		console.error('Something went wrong', error)
		return NextResponse.json(
			{
				error: 'Something went wrong, Please try again!',
			},
			{ status: 400 }
		)
	}
}
