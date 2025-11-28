'use client'

import { Product } from '@/types'
import Image from 'next/image'
import { useCart } from '@/app/context/CartContext'
import { useState } from 'react'

const ProductCard = ({ product }: { product: Product }) => {
	const { addToCart } = useCart()
	const [added, setAdded] = useState(false)

	const handleAddToCart = () => {
		addToCart(product)
		setAdded(true)

		setTimeout(() => {
			setAdded(false)
		}, 2000)
	}
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
				<div className='text-xs text-gray-500 mb-2'>
					{product.category}
				</div>
				<h3 className='text-md font-semibold mb-2 text-gray-900'>
					{product.name}
				</h3>
				<p className='text-gray-600 mb-4 line-clamp-2 text-sm'>
					{product.description}
				</p>

				<div className='flex items-center justify-between'>
					<span className='text-lg font-bold text-gray-900'>
						₹{product.price.toFixed(2)}
					</span>
					<button
						onClick={handleAddToCart}
						disabled={product.stock === 0}
						className={`px-6 py-2 rounded-lg transition-colors ${
							added
								? 'bg-green-600 text-white'
								: product.stock === 0
								? 'bg-gray-300 text-gray-500 cursor-not-allowed'
								: 'bg-blue-600 text-white hover:bg-blue-700'
						}`}
					>
						{added
							? 'Added'
							: product.stock === 0
							? 'Out of Stock'
							: 'Add to Cart'}
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
