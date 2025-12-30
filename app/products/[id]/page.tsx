'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'

// Mock product data - replace with actual data fetching
const mockProduct = {
	id: '1',
	name: 'Sunset Over Mountains',
	description:
		"A stunning acrylic painting capturing the serene beauty of mountains bathed in golden sunset light. Each brushstroke tells a story of nature's magnificence. This piece brings warmth and tranquility to any space, making it perfect for living rooms, bedrooms, or offices.",
	longDescription: `This original acrylic painting is a celebration of nature's breathtaking beauty. The warm orange and golden hues of the setting sun create a peaceful atmosphere that transforms any room into a sanctuary of calm.

Created with premium artist-grade acrylic paints on gallery-quality canvas, this piece features rich textures and depth that photographs simply cannot capture. The painting arrives ready to hang with a sturdy wire backing.

Each piece from Moorleez Art Studio is hand-painted with love and care, making it truly one-of-a-kind. Small variations in texture and color are part of what makes handmade art special.`,
	price: 4999,
	category: 'paintings',
	stock: 5,
	image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
	images: [
		'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
		'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800',
		'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=800',
	],
	dimensions: '24" x 36"',
	materials: 'Acrylic on Canvas',
	isDeleted: false,
	createdAt: new Date(),
}

// Mock reviews - replace with actual data
const mockReviews = [
	{
		id: '1',
		userName: 'Priya Sharma',
		rating: 5,
		comment:
			'Absolutely stunning! The colors are even more vibrant in person. Shipped quickly and was packaged with care.',
		date: '2024-11-15',
		verified: true,
	},
	{
		id: '2',
		userName: 'Rahul M.',
		rating: 4,
		comment:
			'Beautiful artwork that really brightens up my living room. Would have loved slightly faster shipping but overall very happy!',
		date: '2024-11-10',
		verified: true,
	},
	{
		id: '3',
		userName: 'Ananya K.',
		rating: 5,
		comment:
			'This piece exceeded my expectations! The artist clearly puts so much love into their work. Will definitely be ordering more.',
		date: '2024-10-28',
		verified: false,
	},
]

function StarRating({
	rating,
	size = 'md',
	interactive = false,
	onChange,
}: {
	rating: number
	size?: 'sm' | 'md' | 'lg'
	interactive?: boolean
	onChange?: (rating: number) => void
}) {
	const sizeClasses = {
		sm: 'w-3.5 h-3.5',
		md: 'w-5 h-5',
		lg: 'w-6 h-6',
	}

	return (
		<div className='flex items-center gap-0.5'>
			{[1, 2, 3, 4, 5].map((star) => (
				<button
					key={star}
					type='button'
					disabled={!interactive}
					onClick={() => onChange?.(star)}
					className={
						interactive
							? 'cursor-pointer hover:scale-110 transition-transform'
							: 'cursor-default'
					}
				>
					<svg
						className={`${sizeClasses[size]} ${
							star <= rating
								? 'text-terracotta fill-terracotta'
								: 'text-warm-gray/30 fill-warm-gray/30'
						}`}
						viewBox='0 0 20 20'
					>
						<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
					</svg>
				</button>
			))}
		</div>
	)
}

export default function ProductDetailPage() {
	const [selectedImage, setSelectedImage] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const [activeTab, setActiveTab] = useState<'description' | 'reviews'>(
		'description'
	)
	const [showReviewForm, setShowReviewForm] = useState(false)
	const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
	const { addToCart, items } = useCart()

	const product = mockProduct
	const reviews = mockReviews

	const cartItem = items.find((item) => item.id === product.id)
	const quantityInCart = cartItem?.quantity || 0
	const isInCart = quantityInCart > 0

	const averageRating =
		reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

	const handleAddToCart = () => {
		for (let i = 0; i < quantity; i++) {
			addToCart(product)
		}
	}

	const handleSubmitReview = (e: React.FormEvent) => {
		e.preventDefault()
		// TODO: Connect to backend
		console.log('Review submitted:', newReview)
		setShowReviewForm(false)
		setNewReview({ rating: 5, comment: '' })
	}

	return (
		<div className='min-h-screen bg-cream'>
			{/* Breadcrumb */}
			<div className='max-w-7xl mx-auto px-4 py-4'>
				<nav className='flex items-center gap-2 text-sm text-warm-gray'>
					<Link
						href='/'
						className='hover:text-deep-brown transition-colors'
					>
						Home
					</Link>
					<span>/</span>
					<Link
						href={`/?category=${product.category}`}
						className='hover:text-deep-brown transition-colors capitalize'
					>
						{product.category}
					</Link>
					<span>/</span>
					<span className='text-deep-brown'>{product.name}</span>
				</nav>
			</div>

			{/* Main Product Section */}
			<div className='max-w-7xl mx-auto px-4 pb-12'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
					{/* Image Gallery */}
					<div className='space-y-4'>
						{/* Main Image */}
						<div className='relative aspect-square rounded-2xl overflow-hidden bg-beige'>
							<Image
								src={product.images[selectedImage]}
								alt={product.name}
								fill
								className='object-cover'
								priority
							/>
							{product.stock <= 3 && product.stock > 0 && (
								<span className='absolute top-4 left-4 bg-terracotta text-white text-xs font-medium px-3 py-1 rounded-full'>
									Only {product.stock} left!
								</span>
							)}
							{product.stock === 0 && (
								<span className='absolute top-4 left-4 bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full'>
									Sold Out
								</span>
							)}
						</div>

						{/* Thumbnail Gallery */}
						<div className='flex gap-3 overflow-x-auto no-scrollbar'>
							{product.images.map((img, idx) => (
								<button
									key={idx}
									onClick={() => setSelectedImage(idx)}
									className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 transition-all ${
										selectedImage === idx
											? 'ring-2 ring-terracotta ring-offset-2'
											: 'opacity-70 hover:opacity-100'
									}`}
								>
									<Image
										src={img}
										alt={`${product.name} ${idx + 1}`}
										fill
										className='object-cover'
									/>
								</button>
							))}
						</div>
					</div>

					{/* Product Info */}
					<div className='space-y-6'>
						{/* Category & Title */}
						<div>
							<span className='text-xs text-terracotta font-medium uppercase tracking-wider'>
								{product.category}
							</span>
							<h1 className='text-3xl lg:text-4xl font-bold text-deep-brown font-(family-name:--font-heading) mt-2'>
								{product.name}
							</h1>
						</div>

						{/* Rating Summary */}
						<div className='flex items-center gap-3'>
							<StarRating rating={Math.round(averageRating)} />
							<span className='text-sm text-warm-gray'>
								{averageRating.toFixed(1)} ({reviews.length}{' '}
								reviews)
							</span>
						</div>

						{/* Price */}
						<div className='flex items-baseline gap-3'>
							<span className='text-3xl font-bold text-deep-brown'>
								₹{product.price.toLocaleString('en-IN')}
							</span>
							<span className='text-sm text-warm-gray'>
								Inclusive of all taxes
							</span>
						</div>

						{/* Short Description */}
						<p className='text-warm-gray leading-relaxed'>
							{product.description}
						</p>

						{/* Product Details */}
						<div className='grid grid-cols-2 gap-4 py-4 border-y border-light-gray'>
							<div>
								<span className='text-xs text-warm-gray uppercase tracking-wide'>
									Dimensions
								</span>
								<p className='text-deep-brown font-medium mt-1'>
									{product.dimensions}
								</p>
							</div>
							<div>
								<span className='text-xs text-warm-gray uppercase tracking-wide'>
									Materials
								</span>
								<p className='text-deep-brown font-medium mt-1'>
									{product.materials}
								</p>
							</div>
						</div>

						{/* Quantity & Add to Cart */}
						{product.stock > 0 ? (
							<div className='space-y-4'>
								{/* Quantity Selector */}
								<div className='flex items-center gap-4'>
									<span className='text-sm text-charcoal font-medium'>
										Quantity:
									</span>
									<div className='flex items-center bg-beige rounded-xl overflow-hidden'>
										<button
											onClick={() =>
												setQuantity(
													Math.max(1, quantity - 1)
												)
											}
											className='px-4 py-2.5 text-deep-brown hover:bg-clay/20 transition-colors font-medium'
										>
											−
										</button>
										<span className='px-6 py-2.5 font-semibold text-deep-brown min-w-[60px] text-center'>
											{quantity}
										</span>
										<button
											onClick={() =>
												setQuantity(
													Math.min(
														product.stock -
															quantityInCart,
														quantity + 1
													)
												)
											}
											disabled={
												quantity >=
												product.stock - quantityInCart
											}
											className='px-4 py-2.5 text-deep-brown hover:bg-clay/20 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
										>
											+
										</button>
									</div>
									<span className='text-sm text-warm-gray'>
										{product.stock} available
									</span>
								</div>

								{/* Add to Cart Button */}
								<button
									onClick={handleAddToCart}
									disabled={
										quantity >
										product.stock - quantityInCart
									}
									className='btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed'
								>
									<svg
										className='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
										/>
									</svg>
									Add to Cart
								</button>

								{isInCart && (
									<p className='text-center text-sm text-sage flex items-center justify-center gap-2'>
										<span className='w-2 h-2 rounded-full bg-sage' />
										{quantityInCart} already in your cart
									</p>
								)}
							</div>
						) : (
							<div className='bg-beige rounded-xl p-4 text-center'>
								<p className='text-warm-gray font-medium'>
									This item is currently sold out
								</p>
								<button className='mt-3 text-sm text-terracotta hover:underline'>
									Notify me when available
								</button>
							</div>
						)}

						{/* Trust Badges */}
						<div className='grid grid-cols-3 gap-4 pt-4'>
							<div className='text-center'>
								<div className='w-10 h-10 mx-auto mb-2 rounded-full bg-sage/10 flex items-center justify-center'>
									<svg
										className='w-5 h-5 text-sage'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M5 13l4 4L19 7'
										/>
									</svg>
								</div>
								<p className='text-xs text-warm-gray'>
									Handmade with Love
								</p>
							</div>
							<div className='text-center'>
								<div className='w-10 h-10 mx-auto mb-2 rounded-full bg-sage/10 flex items-center justify-center'>
									<svg
										className='w-5 h-5 text-sage'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
								</div>
								<p className='text-xs text-warm-gray'>
									Ships in 3-5 Days
								</p>
							</div>
							<div className='text-center'>
								<div className='w-10 h-10 mx-auto mb-2 rounded-full bg-sage/10 flex items-center justify-center'>
									<svg
										className='w-5 h-5 text-sage'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
										/>
									</svg>
								</div>
								<p className='text-xs text-warm-gray'>
									Secure Checkout
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Tabs: Description & Reviews */}
				<div className='mt-16'>
					{/* Tab Headers */}
					<div className='flex gap-8 border-b border-light-gray'>
						<button
							onClick={() => setActiveTab('description')}
							className={`pb-4 text-sm font-medium transition-colors relative ${
								activeTab === 'description'
									? 'text-deep-brown'
									: 'text-warm-gray hover:text-deep-brown'
							}`}
						>
							Description
							{activeTab === 'description' && (
								<span className='absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta' />
							)}
						</button>
						<button
							onClick={() => setActiveTab('reviews')}
							className={`pb-4 text-sm font-medium transition-colors relative ${
								activeTab === 'reviews'
									? 'text-deep-brown'
									: 'text-warm-gray hover:text-deep-brown'
							}`}
						>
							Reviews ({reviews.length})
							{activeTab === 'reviews' && (
								<span className='absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta' />
							)}
						</button>
					</div>

					{/* Tab Content */}
					<div className='py-8'>
						{activeTab === 'description' ? (
							<div className='prose prose-warm-gray max-w-none'>
								<div className='whitespace-pre-line text-warm-gray leading-relaxed'>
									{product.longDescription}
								</div>
							</div>
						) : (
							<div className='space-y-8'>
								{/* Review Summary */}
								<div className='bg-white rounded-2xl p-6 shadow-soft'>
									<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
										<div className='flex items-center gap-4'>
											<div className='text-center'>
												<p className='text-4xl font-bold text-deep-brown'>
													{averageRating.toFixed(1)}
												</p>
												<StarRating
													rating={Math.round(
														averageRating
													)}
													size='sm'
												/>
												<p className='text-xs text-warm-gray mt-1'>
													{reviews.length} reviews
												</p>
											</div>
										</div>
										<button
											onClick={() =>
												setShowReviewForm(
													!showReviewForm
												)
											}
											className='btn-secondary'
										>
											Write a Review
										</button>
									</div>
								</div>

								{/* Review Form */}
								{showReviewForm && (
									<form
										onSubmit={handleSubmitReview}
										className='bg-white rounded-2xl p-6 shadow-soft space-y-4 animate-fade-in'
									>
										<h3 className='font-semibold text-deep-brown'>
											Write Your Review
										</h3>
										<div>
											<label className='block text-sm text-warm-gray mb-2'>
												Your Rating
											</label>
											<StarRating
												rating={newReview.rating}
												size='lg'
												interactive
												onChange={(r) =>
													setNewReview({
														...newReview,
														rating: r,
													})
												}
											/>
										</div>
										<div>
											<label className='block text-sm text-warm-gray mb-2'>
												Your Review
											</label>
											<textarea
												value={newReview.comment}
												onChange={(e) =>
													setNewReview({
														...newReview,
														comment: e.target.value,
													})
												}
												rows={4}
												className='input resize-none'
												placeholder='Share your experience with this product...'
												required
											/>
										</div>
										<div className='flex gap-3'>
											<button
												type='submit'
												className='btn-primary'
											>
												Submit Review
											</button>
											<button
												type='button'
												onClick={() =>
													setShowReviewForm(false)
												}
												className='btn-secondary'
											>
												Cancel
											</button>
										</div>
									</form>
								)}

								{/* Reviews List */}
								<div className='space-y-4'>
									{reviews.map((review) => (
										<div
											key={review.id}
											className='bg-white rounded-2xl p-6 shadow-soft'
										>
											<div className='flex items-start justify-between'>
												<div>
													<div className='flex items-center gap-2'>
														<p className='font-medium text-deep-brown'>
															{review.userName}
														</p>
														{review.verified && (
															<span className='text-xs bg-sage/10 text-sage px-2 py-0.5 rounded-full'>
																Verified
																Purchase
															</span>
														)}
													</div>
													<StarRating
														rating={review.rating}
														size='sm'
													/>
												</div>
												<span className='text-xs text-warm-gray'>
													{new Date(
														review.date
													).toLocaleDateString(
														'en-IN',
														{
															year: 'numeric',
															month: 'short',
															day: 'numeric',
														}
													)}
												</span>
											</div>
											<p className='mt-3 text-warm-gray leading-relaxed'>
												{review.comment}
											</p>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
