import { Product } from '@/types'
import Image from 'next/image'

const ProductCard = ({ product }: { product: Product }) => {
	return (
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
						<span className='text-red-600'>Out of Stock</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductCard
