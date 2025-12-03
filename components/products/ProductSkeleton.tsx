export default function ProductSkeleton() {
	return (
		<>
			{Array(6)
				.fill(0)
				.map((_, i) => (
					<div
						key={i}
						className='bg-white rounded-lg shadow-md overflow-hidden'
					>
						{/* Image Skeleton - Gray rectangle matching real image */}
						<div className='relative h-48 w-full bg-gray-300 animate-pulse'></div>

						{/* Content Area */}
						<div className='p-4 space-y-3'>
							{/* Category - Small bar */}
							<div className='h-3 bg-gray-200 rounded w-16 animate-pulse'></div>

							{/* Title - Medium bar */}
							<div className='h-4 bg-gray-300 rounded w-3/4 animate-pulse'></div>

							{/* Description - 2 lines */}
							<div className='space-y-2'>
								<div className='h-3 bg-gray-200 rounded w-full animate-pulse'></div>
								<div className='h-3 bg-gray-200 rounded w-5/6 animate-pulse'></div>
							</div>

							{/* Price + Button Row */}
							<div className='flex items-center justify-between pt-2'>
								{/* Price */}
								<div className='h-6 bg-gray-300 rounded w-20 animate-pulse'></div>

								{/* Button */}
								<div className='h-10 bg-gray-200 rounded-lg w-32 animate-pulse'></div>
							</div>

							{/* Stock Info */}
							<div className='h-3 bg-gray-200 rounded w-24 animate-pulse'></div>
						</div>
					</div>
				))}
		</>
	)
}
