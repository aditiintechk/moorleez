// Next.js error handling
'use client'

import Link from 'next/link'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	console.error('Error caught:', error)
	return (
		<div className='h-[80vh] bg-gray-50 flex items-center justify-center'>
			<div className='text-center max-w-md'>
				<h2 className='text-4xl mb-4'>⚠️</h2>
				<h2 className='text-3xl font-bold text-red-600 mb-4'>
					Something went wrong!
				</h2>
				<p className='text-gray-600 mb-6 text-lg px-4'>
					We encountered an unexpected error. Please try again or
					return home.
				</p>
				<div className='flex justify-center gap-6'>
					<button
						onClick={reset}
						className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 cursor-pointer'
					>
						Try again
					</button>
					<Link
						href='/'
						className='inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700'
					>
						Go to Home
					</Link>
				</div>
			</div>
		</div>
	)
}
