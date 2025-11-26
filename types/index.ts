import { Product as PrismaProduct } from '@prisma/client'

export type Product = PrismaProduct

export type ProductData = Omit<Product, 'createdAt'>

export type CartItem = {
	id: string
	name: string
	price: number
	image: string
	quantity: number
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
