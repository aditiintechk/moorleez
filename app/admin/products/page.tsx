import { prismaConnection } from '@/lib/connection/prisma'
import ProductsClient from '../components/ProductsClient'

export default async function ProductsPage() {
	// Server component - fetch data
	const products = await prismaConnection.product.findMany({
		orderBy: { createdAt: 'desc' },
	})

	// Pass data to client component
	return <ProductsClient products={products} />
}
