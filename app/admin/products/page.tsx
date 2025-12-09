import { prismaConnection } from '@/lib/connection/prisma'
import Image from 'next/image'

export default async function Products() {
	const products = await prismaConnection.product.findMany({
		orderBy: { createdAt: 'desc' },
	})

	return (
		<div>
			<div className='flex justify-between items-center mb-8'>
				<h1 className='text-3xl font-bold text-gray-800'>Products</h1>
				<button className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold cursor-pointer'>
					+ Add Product
				</button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{products.map((product) => (
					<div
						key={product.id}
						className={`bg-white rounded-lg shadow-md overflow-hidden ${
							product.isDeleted
								? 'opacity-50 border-2 border-red-300'
								: ''
						}`}
					>
						{/* Product Image */}
						<div className='relative h-48 bg-gray-100'>
							<Image
								src={product.image}
								alt={product.name}
								fill
								className='object-cover'
							/>
							{product.isDeleted && (
								<div className='absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>
									Deleted
								</div>
							)}
						</div>

						{/* Product Info */}
						<div className='p-4'>
							<h3 className='font-bold text-lg text-gray-800 mb-2'>
								{product.name}
							</h3>
							<p className='text-gray-600 text-sm mb-4 line-clamp-2'>
								{product.description}
							</p>

							<div className='flex justify-between items-center mb-4'>
								<div>
									<p className='text-2xl font-bold text-gray-900'>
										₹{product.price.toLocaleString('en-IN')}
									</p>
									<p className='text-sm text-gray-500'>
										Stock: {product.stock}
									</p>
								</div>
								<span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
									{product.category}
								</span>
							</div>

							{/* Action Buttons */}
							<div className='flex gap-2'>
								<button className='flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium cursor-pointer'>
									Edit
								</button>
								<button className='flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition font-medium cursor-pointer'>
									{product.isDeleted ? 'Restore' : 'Delete'}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{products.length === 0 && (
				<div className='text-center py-12'>
					<p className='text-gray-500 text-lg'>
						No products yet. Add your first product!
					</p>
				</div>
			)}
		</div>
	)
}
