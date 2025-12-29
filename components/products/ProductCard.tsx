'use client'

import { Product } from '@/types'
import Image from 'next/image'
import { useCart } from '@/app/context/CartContext'
import { useState } from 'react'

const ProductCard = ({ product }: { product: Product }) => {
	const { addToCart, updateQuantity, items } = useCart()
	const [isHovered, setIsHovered] = useState(false)

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

	// Stock status
	const stockStatus =
		product.stock === 0 ? 'out' : product.stock <= 3 ? 'low' : 'in'

	return (
		<div
			className='group bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Image Container */}
			<div className='relative aspect-square overflow-hidden bg-beige'>
				<Image
					src={product.image}
					alt={product.name}
					fill
					className={`object-cover transition-transform duration-500 ${
						isHovered ? 'scale-105' : 'scale-100'
					}`}
				/>

				{/* Badges Container */}
				<div className='absolute top-2 left-2 z-10'>
					<span className='bg-deep-brown/80 text-cream text-[9px] font-medium px-1.5 py-0.5 rounded capitalize'>
						{product.category.length > 8
							? product.category.slice(0, 8) + '..'
							: product.category}
					</span>
				</div>

				{/* Stock Badge */}
				{stockStatus !== 'in' && (
					<div className='absolute top-2 right-2 z-10'>
						<span
							className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
								stockStatus === 'out'
									? 'bg-red-600 text-white'
									: 'bg-terracotta text-white'
							}`}
						>
							{stockStatus === 'out'
								? 'Sold Out'
								: `${product.stock} left`}
						</span>
					</div>
				)}

				{/* Quick Add Overlay */}
				<div
					className={`absolute inset-x-0 bottom-0 p-2 bg-linear-to-t from-black/60 via-black/30 to-transparent transition-all duration-300 ${
						isHovered ? 'opacity-100' : 'opacity-0'
					}`}
				>
					{!isInCart && product.stock > 0 && (
						<button
							onClick={(e) => {
								e.stopPropagation()
								handleAddToCart()
							}}
							className='w-full bg-white text-deep-brown py-1.5 rounded font-medium text-xs hover:bg-cream transition-colors cursor-pointer'
						>
							Add to Cart
						</button>
					)}
					{isInCart && (
						<div className='flex items-center justify-center gap-0.5 bg-white rounded overflow-hidden'>
							<button
								onClick={(e) => {
									e.stopPropagation()
									handleDecrease()
								}}
								className='px-3 py-1.5 text-deep-brown hover:bg-beige transition-colors cursor-pointer font-medium text-sm'
							>
								−
							</button>
							<span className='px-2 py-1.5 font-semibold text-deep-brown text-xs min-w-7 text-center'>
								{quantityInCart}
							</span>
							<button
								onClick={(e) => {
									e.stopPropagation()
									handleIncrease()
								}}
								disabled={quantityInCart >= product.stock}
								className={`px-3 py-1.5 transition-colors font-medium text-sm ${
									quantityInCart >= product.stock
										? 'text-warm-gray cursor-not-allowed'
										: 'text-deep-brown hover:bg-beige cursor-pointer'
								}`}
							>
								+
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Content */}
			<div className='p-2.5'>
				{/* Product Name */}
				<h3 className='font-medium text-deep-brown text-xs mb-0.5 line-clamp-1 group-hover:text-terracotta transition-colors'>
					{product.name}
				</h3>

				{/* Description */}
				<p className='text-warm-gray text-[10px] mb-2 line-clamp-1'>
					{product.description}
				</p>

				{/* Price & Cart Status */}
				<div className='flex items-center justify-between'>
					<span className='text-sm font-bold text-deep-brown'>
						₹{product.price.toLocaleString('en-IN')}
					</span>

					{/* In Cart Indicator */}
					{isInCart && (
						<div className='flex items-center gap-1 text-[9px]'>
							<span className='w-1.5 h-1.5 rounded-full bg-sage' />
							<span className='text-sage font-medium'>
								{quantityInCart} in cart
							</span>
						</div>
					)}
				</div>

				{/* Out of Stock State */}
				{product.stock === 0 && (
					<button
						disabled
						className='mt-2 w-full py-1.5 rounded bg-gray-100 text-warm-gray text-[10px] font-medium cursor-not-allowed'
					>
						Out of Stock
					</button>
				)}
			</div>
		</div>
	)
}

export default ProductCard
