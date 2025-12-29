import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/auth/roles'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// Double-check auth (defense in depth!)
	const user = await currentUser()
	if (!isAdmin(user)) {
		redirect('/')
	}

	const navLinks = [
		{
			href: '/admin',
			label: 'Dashboard',
			icon: (
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
						d='M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
					/>
				</svg>
			),
		},
		{
			href: '/admin/analytics',
			label: 'Analytics',
			icon: (
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
						d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
					/>
				</svg>
			),
		},
		{
			href: '/admin/products',
			label: 'Products',
			icon: (
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
						d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
					/>
				</svg>
			),
		},
		{
			href: '/admin/orders',
			label: 'Orders',
			icon: (
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
						d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
					/>
				</svg>
			),
		},
	]

	return (
		<div className='flex min-h-screen'>
			{/* Sidebar - Dark Theme */}
			<aside className='w-64 bg-deep-brown flex flex-col fixed h-full'>
				{/* Logo Section */}
				<div className='p-6 border-b border-white/10'>
					<Link href='/admin' className='flex items-center gap-3'>
						<Image
							src='/apple-touch-icon.png'
							alt='Moorleez'
							width={40}
							height={40}
							className='rounded-lg'
						/>
						<div>
							<h1 className='text-lg font-bold text-cream font-(family-name:--font-heading)'>
								Moorleez
							</h1>
							<p className='text-xs text-cream'>Admin Panel</p>
						</div>
					</Link>
				</div>

				{/* Navigation */}
				<nav className='flex-1 py-6'>
					<div className='px-4 mb-2'>
						<p className='text-xs uppercase tracking-wider text-clay font-semibold'>
							Menu
						</p>
					</div>
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className='flex items-center gap-3 px-6 py-3 text-cream hover:text-cream hover:bg-white/10 transition-all duration-200 mx-2 rounded-lg group'
						>
							<span className='text-clay group-hover:text-terracotta transition-colors'>
								{link.icon}
							</span>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Quick Actions */}
				<div className='px-4 py-4 border-t border-white/10'>
					<Link
						href='/'
						className='flex items-center gap-3 px-4 py-2 text-clay hover:text-cream text-sm transition-colors'
					>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
							/>
						</svg>
						View Store
					</Link>
				</div>

				{/* User Section */}
				<div className='p-4 border-t border-white/10'>
					<div className='flex items-center gap-3 px-2'>
						<UserButton
							afterSignOutUrl='/'
							appearance={{
								elements: {
									avatarBox:
										'w-9 h-9 ring-2 ring-terracotta/50',
								},
							}}
						/>
						<div className='flex-1 min-w-0'>
							<p className='text-sm font-medium text-cream truncate'>
								{user?.firstName || 'Admin'}
							</p>
							<p className='text-xs text-clay truncate'>
								{user?.emailAddresses[0]?.emailAddress}
							</p>
						</div>
					</div>
				</div>
			</aside>

			{/* Main Content Area */}
			<main className='flex-1 ml-64 bg-cream min-h-screen'>
				{/* Page Content */}
				<div className='p-6'>{children}</div>
			</main>
		</div>
	)
}
