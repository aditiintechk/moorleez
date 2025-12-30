'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const sortOptions = [
	{ value: 'newest', label: 'Newest' },
	{ value: 'price-low', label: 'Price: Low to High' },
	{ value: 'price-high', label: 'Price: High to Low' },
	{ value: 'oldest', label: 'Oldest' },
]

export default function SortDropdown() {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const router = useRouter()
	const searchParams = useSearchParams()

	const currentSort = searchParams.get('sort') || 'newest'
	const currentOption =
		sortOptions.find((opt) => opt.value === currentSort) || sortOptions[0]

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () =>
			document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleSelect = (value: string) => {
		const params = new URLSearchParams(searchParams.toString())
		if (value === 'newest') {
			params.delete('sort')
		} else {
			params.set('sort', value)
		}
		router.push(`/?${params.toString()}`)
		setIsOpen(false)
	}

	return (
		<div ref={dropdownRef} className='relative'>
			{/* Trigger Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center justify-between gap-2 bg-beige border border-light-gray rounded-md px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-deep-brown font-medium hover:border-clay transition-colors cursor-pointer min-w-[140px] sm:min-w-40'
			>
				<span>{currentOption.label}</span>
				<svg
					className={`w-4 h-4 text-warm-gray transition-transform ${
						isOpen ? 'rotate-180' : ''
					}`}
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 9l-7 7-7-7'
					/>
				</svg>
			</button>

			{/* Dropdown Menu */}
			{isOpen && (
				<div className='absolute right-0 mt-1 w-full bg-cream border border-light-gray rounded-md shadow-lg z-50 overflow-hidden animate-fade-in'>
					{sortOptions.map((option) => (
						<button
							key={option.value}
							onClick={() => handleSelect(option.value)}
							className={`w-full text-left px-3 py-2 text-xs sm:text-sm transition-colors cursor-pointer ${
								currentSort === option.value
									? 'bg-beige text-deep-brown font-medium'
									: 'text-warm-brown hover:bg-beige'
							}`}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
