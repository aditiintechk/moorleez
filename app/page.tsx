import ProductList from '@/components/products/ProductList'
import ProductSkeleton from '@/components/products/ProductSkeleton'
import { Suspense } from 'react'
import { prismaConnection } from '@/lib/connection/prisma'
import Link from 'next/link'
import SortDropdown from '@/components/ui/SortDropdown'

// Get categories from database
async function getCategories() {
	const products = await prismaConnection.product.findMany({
		where: { isDeleted: false },
		select: { category: true },
		distinct: ['category'],
	})
	return products.map((p) => p.category)
}

// Get product count
async function getProductCount(category?: string) {
	return prismaConnection.product.count({
		where: {
			isDeleted: false,
			...(category ? { category } : {}),
		},
	})
}

export default async function ShopPage({
	searchParams,
}: {
	searchParams: Promise<{ category?: string; sort?: string; search?: string }>
}) {
	const params = await searchParams
	const categories = await getCategories()
	const productCount = await getProductCount(params.category)

	return (
		<div className='min-h-screen bg-cream'>
			{/* Filters Bar */}
			<div className='bg-cream border-b border-light-gray sticky top-[57px] sm:top-[73px] z-30'>
				<div className='max-w-7xl mx-auto px-4 py-3 sm:py-4'>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
						{/* Category Filters - horizontal scroll on mobile */}
						<div className='flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0'>
							<Link
								href='/'
								className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
									!params.category
										? 'bg-deep-brown text-cream'
										: 'text-warm-brown hover:bg-beige'
								}`}
							>
								All
							</Link>
							{categories.map((cat) => (
								<Link
									key={cat}
									href={`/?category=${cat}`}
									className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all capitalize whitespace-nowrap cursor-pointer shrink-0 ${
										params.category === cat
											? 'bg-deep-brown text-cream'
											: 'text-warm-brown hover:bg-beige'
									}`}
								>
									{cat}
								</Link>
							))}
						</div>

						{/* Sort Dropdown */}
						<SortDropdown />
					</div>
				</div>
			</div>

			{/* Products Grid */}
			<div className='max-w-7xl mx-auto px-4 py-4 sm:py-8'>
				{productCount > 0 ? (
					<div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
						<Suspense fallback={<ProductSkeleton />}>
							<ProductList
								category={params.category}
								sort={params.sort}
								search={params.search}
							/>
						</Suspense>
					</div>
				) : (
					/* Empty State */
					<div className='text-center py-16'>
						<div className='w-20 h-20 mx-auto mb-6 rounded-full bg-beige flex items-center justify-center'>
							<svg
								className='w-10 h-10 text-clay'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
								/>
							</svg>
						</div>
						<h3 className='text-xl font-semibold text-deep-brown font-(family-name:--font-heading) mb-2'>
							No products found
						</h3>
						<p className='text-warm-gray mb-6'>
							{params.category
								? `No products in "${params.category}" category yet.`
								: 'No products available at the moment.'}
						</p>
						{params.category && (
							<Link href='/' className='btn-primary inline-block'>
								View All Products
							</Link>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
