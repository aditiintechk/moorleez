export default function generateOrderId(): string {
	const currentDate = Date.now()
	const randomNumber = Math.random().toString(36).substring(2, 8)
	const orderId = `ORD-${currentDate}-${randomNumber}`

	return orderId
}
