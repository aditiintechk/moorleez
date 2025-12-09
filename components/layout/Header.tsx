'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/app/context/CartContext'
import { useEffect, useState } from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Header() {
	const { totalItems } = useCart()
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsMounted(true)
	}, [])

	return (
		<header className='bg-white shadow-sm sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-10 py-4'>
				<div className='flex items-center justify-between'>
					{/* Logo/Brand */}
					<Link href='/' className='flex items-center gap-3'>
						<Image
							src='/apple-touch-icon.png'
							alt='Moorleez Art Studio Logo'
							width={60}
							height={60}
							className='object-contain'
						/>
						<div className='flex flex-col'>
							<h1 className='text-2xl font-bold text-gray-900'>
								Moorleez Art Studio
							</h1>
							<p className='text-sm text-gray-600'>
								Fine Art & Handmade Goods
							</p>
						</div>
					</Link>

					{/* RIGHT SIDE: Auth + Cart */}
					<div className='flex items-center gap-4'>
						{/* Auth Section */}
						<SignedOut>
							{/* Show Sign In button when logged out */}
							<SignInButton mode='modal'>
								<button className='text-gray-700 hover:text-blue-600 transition-colors font-medium'>
									Sign In
								</button>
							</SignInButton>
						</SignedOut>

						<SignedIn>
							{/* Show user button when logged in */}
							<UserButton
								afterSignOutUrl='/'
								appearance={{
									elements: {
										avatarBox: 'w-10 h-10',
									},
								}}
							/>
						</SignedIn>

						{/* Cart Icon */}
						<Link
							href='/cart'
							className='relative flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
						>
							{/* Cart SVG Icon */}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
								/>
							</svg>

							<span className='font-semibold'>Cart</span>

							{/* Item count badge */}
							{isMounted && totalItems > 0 && (
								<span className='absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center'>
									{totalItems}
								</span>
							)}
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}
