'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/app/context/CartContext'
import { useEffect, useState } from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function Header() {
	const { totalItems } = useCart()
	const [isMounted, setIsMounted] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [searchOpen, setSearchOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	// Don't render header on admin pages
	const isAdminPage = pathname?.startsWith('/admin')

	useEffect(() => {
		// Set mounted after initial render to avoid hydration mismatch
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsMounted(true)

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		const searchFromUrl = searchParams.get('search')
		if (searchFromUrl) {
			// Set mounted after initial render to avoid hydration mismatch
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setSearchQuery(searchFromUrl)
		}
	}, [searchParams])

	// Hide header on admin pages
	if (isAdminPage) return null

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		if (searchQuery.trim()) {
			router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`)
			setSearchOpen(false)
		} else {
			// If search is empty, go back to all products
			router.push('/')
			setSearchOpen(false)
		}
	}

	const handleClearSearch = () => {
		setSearchQuery('')
		router.push('/')
	}

	return (
		<header
			className={`
				sticky top-0 z-50 transition-all duration-300
				${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-medium' : 'bg-cream'}
			`}
		>
			<div className='max-w-7xl mx-auto px-3 sm:px-6'>
				<div className='flex items-center justify-between py-3 sm:py-4 gap-2 sm:gap-4'>
					{/* Logo/Brand */}
					<Link
						href='/'
						className='flex items-center gap-2 sm:gap-3 group shrink-0'
					>
						<Image
							src='/apple-touch-icon.png'
							alt='Moorleez Art Studio'
							width={40}
							height={40}
							className='object-contain rounded-full ring-2 ring-clay/30 group-hover:ring-terracotta transition-all duration-300 w-9 h-9 sm:w-[45px] sm:h-[45px]'
						/>
						<div className='hidden sm:block'>
							<h1 className='text-xl font-bold text-deep-brown font-(family-name:--font-heading) tracking-tight leading-tight'>
								Moorleez
							</h1>
							<p className='text-xs text-warm-gray font-(family-name:--font-accent)'>
								Art Studio
							</p>
						</div>
					</Link>

					{/* Search Bar - Desktop */}
					<div className='hidden md:flex flex-1 max-w-xl mx-8'>
						<form
							onSubmit={handleSearch}
							className='relative w-full'
						>
							<input
								type='text'
								placeholder='Search for paintings, crochet, crafts...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-full bg-beige border-0 rounded-full px-5 py-3 pl-12 text-sm text-deep-brown placeholder:text-warm-gray focus:outline-none focus:bg-white transition-all'
							/>
							<svg
								className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
							{searchQuery && (
								<button
									type='button'
									onClick={handleClearSearch}
									className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-warm-gray hover:text-deep-brown'
								>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M6 18L18 6M6 6l12 12'
										/>
									</svg>
								</button>
							)}
						</form>
					</div>

					{/* Right side: Search (mobile), Auth, Cart */}
					<div className='flex items-center gap-1 sm:gap-3'>
						{/* Search button (mobile) */}
						<button
							onClick={() => setSearchOpen(!searchOpen)}
							className='md:hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-warm-brown hover:text-deep-brown hover:bg-beige rounded-full transition-all'
							aria-label='Search'
						>
							<svg
								className='w-4 h-4 sm:w-5 sm:h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
						</button>

						{/* Auth Section */}
						<SignedOut>
							<SignInButton mode='modal'>
								<button className='flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-warm-brown hover:text-deep-brown hover:bg-beige rounded-full transition-all cursor-pointer'>
									<svg
										className='w-4 h-4 sm:w-5 sm:h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
										/>
									</svg>
								</button>
							</SignInButton>
						</SignedOut>

						<SignedIn>
							<UserButton
								afterSignOutUrl='/'
								appearance={{
									elements: {
										avatarBox:
											'w-8 h-8 sm:w-10 sm:h-10 ring-2 ring-clay/30 hover:ring-terracotta transition-all',
									},
								}}
							/>
						</SignedIn>

						{/* Cart Button */}
						<Link
							href='/cart'
							className='relative flex items-center justify-center gap-2 bg-terracotta text-white p-2 sm:px-4 sm:py-2.5 rounded-full hover:bg-[#B8604F] transition-all duration-300 hover:shadow-lg group'
						>
							<svg
								className='w-5 h-5 group-hover:scale-110 transition-transform'
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

							<span className='hidden sm:inline font-semibold text-sm'>
								Cart
							</span>

							{/* Item count badge */}
							{isMounted && totalItems > 0 && (
								<span className='absolute -top-1.5 -right-1.5 bg-deep-brown text-cream text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in shadow-md'>
									{totalItems > 9 ? '9+' : totalItems}
								</span>
							)}
						</Link>
					</div>
				</div>

				{/* Mobile Search Bar */}
				{searchOpen && (
					<div className='md:hidden pb-4 animate-fade-in'>
						<form onSubmit={handleSearch} className='relative'>
							<input
								type='text'
								placeholder='Search products...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								autoFocus
								className='w-full bg-beige border-0 rounded-full px-5 py-3 pl-12 text-sm text-deep-brown placeholder:text-warm-gray focus:outline-none focus:bg-white transition-all'
							/>
							<svg
								className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
							<button
								type='button'
								onClick={() => setSearchOpen(false)}
								className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-warm-gray hover:text-deep-brown'
							>
								<svg
									className='w-5 h-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</form>
					</div>
				)}
			</div>
		</header>
	)
}
