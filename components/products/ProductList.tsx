import { prismaConnection } from '@/lib/connection/prisma'
import ProductCard from './ProductCard'

interface ProductListProps {
	category?: string
}

export default async function ProductList({ category }: ProductListProps) {
	const products = await prismaConnection.product.findMany({
		where: { 
			isDeleted: false,
			...(category ? { category } : {})
		},
		orderBy: { createdAt: 'desc' },
	})

	if (products.length === 0) {
		return null
	}

	return products.map((product) => (
		<ProductCard key={product.id} product={product} />
	))
}
