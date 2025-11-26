// Next.js error handling
'use client'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
			<div className='text-center max-w-md'>
				<h2 className='text-3xl font-bold text-red-600 mb-4'>
					Something went wrong!
				</h2>
				<p className='text-gray-600 mb-6'>
					{error.message || 'Unable to load products'}
				</p>
				<button
					onClick={reset}
					className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700'
				>
					Try again
				</button>
			</div>
		</div>
	)
}
