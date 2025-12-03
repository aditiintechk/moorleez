import Link from 'next/link'

const NotFoundPage = () => {
	return (
		<div className='h-[80vh] bg-gray-50 flex items-center justify-center'>
			<div className='text-center max-w-md'>
				<h2 className='text-3xl font-bold text-red-600 mb-4'>
					Page Not Found.
				</h2>
				<p className='text-gray-600 mb-6 text-xl'>
					😢 Uh oh, We are not able to find the page you are looking
					for. Please return to the home page.
				</p>
				<Link
					href='/'
					className='inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700'
				>
					Go to Home
				</Link>
			</div>
		</div>
	)
}

export default NotFoundPage
