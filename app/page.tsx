import ProductList from '@/components/products/ProductList'
import ProductSkeleton from '@/components/products/ProductSkeleton'
import { Suspense } from 'react'

export default async function Home() {
	return (
		<main className='min-h-screen bg-gray-50 px-4 md:px-20'>
			<div className='max-w-7xl mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					<Suspense fallback={<ProductSkeleton />}>
						<ProductList />
					</Suspense>
				</div>
			</div>
		</main>
	)
}
