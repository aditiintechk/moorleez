'use client'

import { Product } from '@/types'
import Image from 'next/image'
import { useCart } from '@/app/context/CartContext'

const ProductCard = ({ product }: { product: Product }) => {
	const { addToCart, updateQuantity, items } = useCart()

	// Check if product is in cart and get quantity
	const cartItem = items.find((item) => item.id === product.id)
	const quantityInCart = cartItem ? cartItem.quantity : 0
	const isInCart = quantityInCart > 0

	const handleAddToCart = () => {
		addToCart(product)
	}

	const handleIncrease = () => {
		if (quantityInCart < product.stock) {
			updateQuantity(product.id, quantityInCart + 1)
		}
	}

	const handleDecrease = () => {
		updateQuantity(product.id, quantityInCart - 1)
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

					{/* Show +/- controls if in cart, otherwise show Add button */}
					{isInCart ? (
						<div className='flex items-center border border-gray-300 rounded-lg'>
							<button
								onClick={handleDecrease}
								className='px-3 py-1.5 hover:bg-gray-100 transition-colors'
							>
								−
							</button>
							<span className='px-4 py-1.5 border-x border-gray-300 font-semibold min-w-[40px] text-center'>
								{quantityInCart}
							</span>
							<button
								onClick={handleIncrease}
								disabled={quantityInCart >= product.stock}
								className={`px-3 py-1.5 transition-colors ${
									quantityInCart >= product.stock
										? 'text-gray-400 cursor-not-allowed'
										: 'hover:bg-gray-100'
								}`}
							>
								+
							</button>
						</div>
					) : (
						<button
							onClick={handleAddToCart}
							disabled={product.stock === 0}
							className={`px-6 py-2 rounded-lg transition-colors ${
								product.stock === 0
									? 'bg-gray-300 text-gray-500 cursor-not-allowed'
									: 'bg-blue-600 text-white hover:bg-blue-700'
							}`}
						>
							{product.stock === 0
								? 'Out of Stock'
								: 'Add to Cart'}
						</button>
					)}
				</div>

				{/* Stock Display */}
				<div className='mt-3 text-sm'>
					{product.stock === 0 ? (
						<span className='text-red-600'>Out of Stock</span>
					) : isInCart ? (
						<span className='text-blue-600'>
							{quantityInCart} in cart ·{' '}
							{product.stock - quantityInCart} available
						</span>
					) : (
						<span className='text-green-600'>
							In Stock ({product.stock})
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductCard
