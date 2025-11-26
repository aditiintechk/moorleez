import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import ProductCard from '@/components/products/ProductCard'

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

export default async function Home() {
	const products = await prisma.product.findMany({
		orderBy: { createdAt: 'desc' },
	})

	return (
		<div>
			<header className='bg-white shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 py-6'>
					<h1 className='text-3xl font-bold text-gray-900 ml-4'>
						Moorleez Art Studio
					</h1>
					<p className='text-gray-600 mt-1 ml-4'>
						Original artwork and prints
					</p>
				</div>
			</header>
			<main className='min-h-screen bg-gray-50 px-20'>
				<div className='max-w-7xl mx-auto px-4 py-12'>
					{products.length === 0 ? (
						<div className='text-center py-16'>
							<svg
								className='mx-auto h-24 w-24 text-gray-400'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1}
									d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
								/>
							</svg>
							<h3 className='mt-6 text-xl font-semibold text-gray-900'>
								No products yet
							</h3>
							<p className='mt-2 text-gray-600'>
								Check back soon for new artwork!
							</p>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{products.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
								/>
							))}
						</div>
					)}
				</div>
			</main>
		</div>
	)
}
