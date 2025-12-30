import { prismaConnection } from '@/lib/connection/prisma'
import ProductCard from './ProductCard'

interface ProductListProps {
	category?: string
	sort?: string
	search?: string
}

type SortOption = { createdAt?: 'asc' | 'desc' } | { price?: 'asc' | 'desc' }

export default async function ProductList({
	category,
	sort,
	search,
}: ProductListProps) {
	const sortOptions: Record<string, SortOption> = {
		newest: { createdAt: 'desc' },
		oldest: { createdAt: 'asc' },
		'price-high': { price: 'desc' },
		'price-low': { price: 'asc' },
	}

	const products = await prismaConnection.product.findMany({
		where: {
			isDeleted: false,
			...(category ? { category } : {}),
			...(search
				? {
						OR: [
							{ name: { contains: search, mode: 'insensitive' } },
							{
								description: {
									contains: search,
									mode: 'insensitive',
								},
							},
						],
				  }
				: {}),
		},
		orderBy: (sort && sortOptions[sort]) || { createdAt: 'desc' },
	})

	if (products.length === 0) {
		return null
	}

	return products.map((product) => (
		<ProductCard key={product.id} product={product} />
	))
}
