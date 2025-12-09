import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from './context/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: `Moorlee'z Art Studio`,
	description: 'An E-commerce Website',
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: { url: '/apple-touch-icon.png' },
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			{' '}
			<html lang='en'>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
				>
					<CartProvider>
						<Header />
						{children}
					</CartProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
