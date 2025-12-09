import React from 'react'
import Link from 'next/link'

const Footer = () => {
	return (
		<footer className='bg-gray-100 py-8 mt-auto'>
			<div className='max-w-7xl mx-auto px-10'>
				<div className='flex justify-between items-center'>
					<p className='text-gray-600'>© 2024 Moorleez Art Studio</p>
					<Link
						href='/admin'
						className='text-gray-500 hover:text-gray-700 text-sm'
					>
						Admin
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default Footer
