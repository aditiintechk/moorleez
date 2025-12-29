export default function ProductSkeleton() {
	return (
		<>
			{Array(8)
				.fill(0)
				.map((_, i) => (
					<div
						key={i}
						className='bg-white rounded-lg overflow-hidden shadow-soft'
					>
						{/* Image Skeleton */}
						<div className='relative aspect-square bg-beige overflow-hidden'>
							<div className='absolute inset-0 bg-gradient-to-r from-beige via-cream to-beige animate-shimmer' />
							
							{/* Badge placeholder */}
							<div className='absolute top-2 left-2'>
								<div className='h-4 w-12 bg-warm-gray/20 rounded animate-pulse' />
							</div>
						</div>

						{/* Content Area */}
						<div className='p-2.5 space-y-2'>
							{/* Title */}
							<div className='h-3 bg-warm-gray/20 rounded w-3/4 animate-pulse' />

							{/* Description */}
							<div className='h-2.5 bg-warm-gray/10 rounded w-full animate-pulse' />

							{/* Price */}
							<div className='h-4 bg-warm-gray/20 rounded w-16 animate-pulse' />
						</div>
					</div>
				))}
		</>
	)
}
