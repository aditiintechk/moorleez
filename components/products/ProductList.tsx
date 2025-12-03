import { prismaConnection } from '@/lib/connection/prisma'
import ProductCard from './ProductCard'

export default async function ProductList() {
	const products = await prismaConnection.product.findMany({
		orderBy: { createdAt: 'desc' },
	})

	await new Promise((resolve) => setTimeout(resolve, 1000))
	return products.map((product) => (
		<ProductCard key={product.id} product={product} />
	))
}
