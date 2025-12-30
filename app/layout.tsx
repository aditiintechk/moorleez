import type { Metadata } from 'next'
import { Playfair_Display, Lora, Dancing_Script, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from './context/CartContext'
import Header from '@/components/layout/Header'
import { ClerkProvider } from '@clerk/nextjs'
import { Suspense } from 'react'

// Heading font - elegant serif
const playfair = Playfair_Display({
	variable: '--font-heading',
	subsets: ['latin'],
	display: 'swap',
})

// Body font - warm, readable serif
const lora = Lora({
	variable: '--font-body',
	subsets: ['latin'],
	display: 'swap',
})

// Accent font - handwritten feel
const dancingScript = Dancing_Script({
	variable: '--font-accent',
	subsets: ['latin'],
	display: 'swap',
})

// UI font - clean sans-serif for buttons/labels
const inter = Inter({
	variable: '--font-ui',
	subsets: ['latin'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: `Moorleez Art Studio | Where Handmade Meets Heart`,
	description: 'Discover unique handmade art, acrylic paintings, crochet creations, and custom crafts. Each piece tells a story of creativity and passion.',
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
		<html lang='en'>
			<body
					className={`
						${playfair.variable} 
						${lora.variable} 
						${dancingScript.variable} 
						${inter.variable} 
						antialiased 
						min-h-screen 
						flex 
						flex-col
					`}
			>
				<CartProvider>
					<Suspense fallback={<div className='h-20' />}>
						<Header />
					</Suspense>
						<main className='flex-1'>
					{children}
						</main>
				</CartProvider>
			</body>
		</html>
		</ClerkProvider>
	)
}
