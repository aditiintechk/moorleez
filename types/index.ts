import { Product as PrismaProduct } from '@prisma/client'
import { Order, OrderItem } from '@prisma/client'

export type Product = PrismaProduct

export type ProductData = Omit<Product, 'createdAt'>

export type CartItem = {
	id: string
	name: string
	price: number
	image: string
	quantity: number
	category: string
}

export type CartContextType = {
	items: CartItem[]
	addToCart: (product: Product) => void
	removeFromCart: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
	clearCart: () => void
	totalItems: number
	totalPrice: number
}

export type ValidationResult = {
	isValid: boolean
	error?: string
}

export type CheckoutFormData = {
	email: string
	name: string
	phone: string
	pincode: string
	address: string
	apartment?: string
	city: string
	state: string
}

export type DailyRevenue = {
	date: string
	revenue: number
	orderCount: number
}

export type TopProduct = {
	productName: string
	unitsSold: number
	revenue: number
}

export type OrderWithItems = Order & {
	items: OrderItem[]
}
