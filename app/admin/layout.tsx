import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/auth/roles'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

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

	return (
		<div className='flex min-h-screen bg-gray-100'>
			{/* Sidebar */}
			<aside className='w-64 bg-white shadow-lg'>
				<div className='p-6'>
					<h1 className='text-2xl font-bold text-gray-800'>
						Admin Panel
					</h1>
					<p className='text-sm text-gray-500'>Moorlee&apos;z</p>
				</div>

				<nav className='mt-6'>
					<Link
						href='/admin'
						className='block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition'
					>
						📊 Dashboard
					</Link>
					<Link
						href='/admin/products'
						className='block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition'
					>
						📦 Products
					</Link>
					<Link
						href='/admin/orders'
						className='block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition'
					>
						📋 Orders
					</Link>
				</nav>

				<div className='absolute bottom-6 left-6'>
					<UserButton afterSignOutUrl='/' />
				</div>
			</aside>

			{/* Main content */}
			<main className='flex-1 p-8'>{children}</main>
		</div>
	)
}
