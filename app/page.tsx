import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import Image from 'next/image'

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

export default async function Home() {
	const products = await prisma.product.findMany({
		orderBy: { createdAt: 'desc' },
	})

	return (
		<main className='min-h-screen bg-gray-50'>
			{/* Header */}
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

			{/* Products Grid */}
			<div className='max-w-7xl mx-auto p-24 py-16'>
				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{products.map((product) => (
						<div
							key={product.id}
							className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'
						>
							<div className='relative h-48 w-full'>
								<Image
									src={product.image}
									alt={product.name}
									fill
									className='object-cover'
								/>
							</div>

							<div className='p-4'>
								<div className='text-sm text-gray-500 mb-2'>
									{product.category}
								</div>
								<h3 className='text-lg font-semibold mb-2 text-gray-900'>
									{product.name}
								</h3>
								<p className='text-gray-600 mb-4 line-clamp-2'>
									{product.description}
								</p>

								<div className='flex items-center justify-between'>
									<span className='text-lg font-bold text-gray-900'>
										${product.price.toFixed(2)}
									</span>
									<button className='bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition-colors'>
										Add to Cart
									</button>
								</div>

								<div className='mt-3 text-sm text-gray-500'>
									{product.stock > 0 ? (
										<span className='text-green-600'>
											In Stock ({product.stock})
										</span>
									) : (
										<span className='text-red-600'>
											Out of Stock
										</span>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	)
}
