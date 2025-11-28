# Day 2: Shopping Cart Implementation

**Date:** Tuesday, November 26, 2024  
**Time Available:** 4-6 hours  
**Goal:** Add functional shopping cart with React Context

---

## What You'll Build Today

By end of today, users will be able to:

-   ✅ Add products to cart
-   ✅ View cart with all items
-   ✅ Update quantities (+/- buttons)
-   ✅ Remove items from cart
-   ✅ See live total calculation
-   ✅ Cart icon in header showing item count

---

## Task Breakdown (Step-by-Step)

### Task 1: Create Cart Context (1 hour)

**Why Context API?**  
We need global state for cart that's accessible from any component (product page, header, cart page).

**Step 1.1: Create the Cart Context file**

Create new file: `app/context/CartContext.tsx`

```typescript
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// Define types
type CartItem = {
	id: string
	name: string
	price: number
	image: string
	quantity: number
}

type CartContextType = {
	items: CartItem[]
	addToCart: (product: any) => void
	removeFromCart: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
	clearCart: () => void
	totalItems: number
	totalPrice: number
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([])

	// Add item to cart
	const addToCart = (product: any) => {
		setItems((currentItems) => {
			// Check if item already exists
			const existingItem = currentItems.find(
				(item) => item.id === product.id
			)

			if (existingItem) {
				// Increase quantity
				return currentItems.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			}

			// Add new item
			return [
				...currentItems,
				{
					id: product.id,
					name: product.name,
					price: product.price,
					image: product.image,
					quantity: 1,
				},
			]
		})
	}

	// Remove item from cart
	const removeFromCart = (productId: string) => {
		setItems((currentItems) =>
			currentItems.filter((item) => item.id !== productId)
		)
	}

	// Update quantity
	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId)
			return
		}

		setItems((currentItems) =>
			currentItems.map((item) =>
				item.id === productId ? { ...item, quantity } : item
			)
		)
	}

	// Clear entire cart
	const clearCart = () => {
		setItems([])
	}

	// Calculate totals
	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
	const totalPrice = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	)

	return (
		<CartContext.Provider
			value={{
				items,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				totalItems,
				totalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

// Custom hook to use cart
export function useCart() {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCart must be used within CartProvider')
	}
	return context
}
```

**Step 1.2: Wrap your app with CartProvider**

Update `app/layout.tsx`:

```typescript
import { CartProvider } from './context/CartContext'
import './globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<CartProvider>{children}</CartProvider>
			</body>
		</html>
	)
}
```

**✅ Checkpoint:** Context is set up, no errors in terminal

---

### Task 2: Update Product Page - Add to Cart Button (1 hour)

**Step 2.1: Make product card a Client Component**

Since we're using cart context (with useState), product cards need to be client components.

Create new file: `app/components/ProductCard.tsx`

```typescript
'use client'

import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

type Product = {
	id: string
	name: string
	description: string
	price: number
	image: string
	stock: number
	category: string
}

export default function ProductCard({ product }: { product: Product }) {
	const { addToCart } = useCart()
	const [added, setAdded] = useState(false)

	const handleAddToCart = () => {
		addToCart(product)
		setAdded(true)

		// Reset button after 2 seconds
		setTimeout(() => setAdded(false), 2000)
	}

	return (
		<div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'>
			<div className='relative h-64 w-full'>
				<Image
					src={product.image}
					alt={product.name}
					fill
					className='object-cover'
				/>
			</div>

			<div className='p-6'>
				<div className='text-sm text-gray-500 mb-2'>
					{product.category}
				</div>
				<h3 className='text-xl font-semibold mb-2'>{product.name}</h3>
				<p className='text-gray-600 mb-4 line-clamp-2'>
					{product.description}
				</p>

				<div className='flex items-center justify-between'>
					<span className='text-2xl font-bold text-gray-900'>
						${product.price.toFixed(2)}
					</span>

					<button
						onClick={handleAddToCart}
						disabled={product.stock === 0}
						className={`px-6 py-2 rounded-lg transition-colors ${
							added
								? 'bg-green-600 text-white'
								: product.stock === 0
								? 'bg-gray-300 text-gray-500 cursor-not-allowed'
								: 'bg-blue-600 text-white hover:bg-blue-700'
						}`}
					>
						{added
							? '✓ Added!'
							: product.stock === 0
							? 'Out of Stock'
							: 'Add to Cart'}
					</button>
				</div>

				<div className='mt-3 text-sm text-gray-500'>
					{product.stock > 0 ? (
						<span className='text-green-600'>
							In Stock ({product.stock})
						</span>
					) : (
						<span className='text-red-600'>Out of Stock</span>
					)}
				</div>
			</div>
		</div>
	)
}
```

**Step 2.2: Update main page to use ProductCard**

Update `app/page.tsx`:

```typescript
import { PrismaClient } from '@prisma/client'
import ProductCard from './components/ProductCard'

const prisma = new PrismaClient()

export default async function Home() {
	const products = await prisma.product.findMany({
		orderBy: { createdAt: 'desc' },
	})

	return (
		<main className='min-h-screen bg-gray-50'>
			{/* Header */}
			<header className='bg-white shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 py-6'>
					<h1 className='text-3xl font-bold text-gray-900'>
						Moorleez Art Studio
					</h1>
					<p className='text-gray-600 mt-1'>
						Original artwork and prints
					</p>
				</div>
			</header>

			{/* Products Grid */}
			<div className='max-w-7xl mx-auto px-4 py-12'>
				<h2 className='text-2xl font-bold mb-8'>Shop Collection</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</main>
	)
}
```

**Step 2.3: Test it**

```bash
npm run dev
```

Open http://localhost:3000

-   Click "Add to Cart" on any product
-   Button should change to "✓ Added!" for 2 seconds
-   No errors in console

**✅ Checkpoint:** Can add items to cart (even though we can't see cart yet)

---

### Task 3: Create Header with Cart Icon (45 mins)

**Step 3.1: Create Header component**

Create new file: `app/components/Header.tsx`

```typescript
'use client'

import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function Header() {
	const { totalItems } = useCart()

	return (
		<header className='bg-white shadow-sm sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 py-4'>
				<div className='flex items-center justify-between'>
					{/* Logo/Brand */}
					<Link href='/' className='flex flex-col'>
						<h1 className='text-2xl font-bold text-gray-900'>
							Moorleez Art Studio
						</h1>
						<p className='text-sm text-gray-600'>
							Original artwork and prints
						</p>
					</Link>

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
						{totalItems > 0 && (
							<span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center'>
								{totalItems}
							</span>
						)}
					</Link>
				</div>
			</div>
		</header>
	)
}
```

**Step 3.2: Use Header in layout**

Update `app/layout.tsx`:

```typescript
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import './globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<CartProvider>
					<Header />
					{children}
				</CartProvider>
			</body>
		</html>
	)
}
```

**Step 3.3: Remove duplicate header from home page**

Update `app/page.tsx` - remove the header section (lines with "Moorleez Art Studio"), keep only the products grid:

```typescript
import { PrismaClient } from '@prisma/client'
import ProductCard from './components/ProductCard'

const prisma = new PrismaClient()

export default async function Home() {
	const products = await prisma.product.findMany({
		orderBy: { createdAt: 'desc' },
	})

	return (
		<main className='min-h-screen bg-gray-50'>
			<div className='max-w-7xl mx-auto px-4 py-12'>
				<h2 className='text-2xl font-bold mb-8'>Shop Collection</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</main>
	)
}
```

**✅ Checkpoint:**

-   Header is sticky at top
-   Cart button shows "0" when empty
-   Add product → cart badge updates to "1", "2", etc.

---

### Task 4: Build Cart Page (2 hours)

**Step 4.1: Create cart page**

Create new file: `app/cart/page.tsx`

```typescript
'use client'

import { useCart } from '../context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
	const { items, removeFromCart, updateQuantity, totalPrice, totalItems } =
		useCart()

	if (items.length === 0) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						Your cart is empty
					</h2>
					<p className='text-gray-600 mb-8'>
						Add some beautiful art pieces to get started!
					</p>
					<Link
						href='/'
						className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block'
					>
						Browse Products
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gray-50 py-12'>
			<div className='max-w-7xl mx-auto px-4'>
				<h1 className='text-3xl font-bold mb-8'>Shopping Cart</h1>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Cart Items - 2/3 width on desktop */}
					<div className='lg:col-span-2 space-y-4'>
						{items.map((item) => (
							<div
								key={item.id}
								className='bg-white rounded-lg shadow-md p-6'
							>
								<div className='flex gap-6'>
									{/* Product Image */}
									<div className='relative w-32 h-32 shrink-0'>
										<Image
											src={item.image}
											alt={item.name}
											fill
											className='object-cover rounded-lg'
										/>
									</div>

									{/* Product Info */}
									<div className='grow'>
										<h3 className='text-xl font-semibold mb-2'>
											{item.name}
										</h3>
										<p className='text-gray-600 mb-4'>
											${item.price.toFixed(2)} each
										</p>

										{/* Quantity Controls */}
										<div className='flex items-center gap-4'>
											<div className='flex items-center border border-gray-300 rounded-lg'>
												<button
													onClick={() =>
														updateQuantity(
															item.id,
															item.quantity - 1
														)
													}
													className='px-4 py-2 hover:bg-gray-100 transition-colors'
												>
													−
												</button>
												<span className='px-6 py-2 border-x border-gray-300 font-semibold'>
													{item.quantity}
												</span>
												<button
													onClick={() =>
														updateQuantity(
															item.id,
															item.quantity + 1
														)
													}
													className='px-4 py-2 hover:bg-gray-100 transition-colors'
												>
													+
												</button>
											</div>

											<button
												onClick={() =>
													removeFromCart(item.id)
												}
												className='text-red-600 hover:text-red-700 font-medium'
											>
												Remove
											</button>
										</div>
									</div>

									{/* Item Total */}
									<div className='text-right'>
										<p className='text-2xl font-bold text-gray-900'>
											$
											{(
												item.price * item.quantity
											).toFixed(2)}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Order Summary - 1/3 width on desktop, sticky */}
					<div className='lg:col-span-1'>
						<div className='bg-white rounded-lg shadow-md p-6 sticky top-24'>
							<h2 className='text-2xl font-bold mb-6'>
								Order Summary
							</h2>

							<div className='space-y-4 mb-6'>
								<div className='flex justify-between text-gray-600'>
									<span>Items ({totalItems})</span>
									<span>${totalPrice.toFixed(2)}</span>
								</div>
								<div className='flex justify-between text-gray-600'>
									<span>Shipping</span>
									<span>Calculated at checkout</span>
								</div>
								<div className='border-t pt-4 flex justify-between text-xl font-bold'>
									<span>Total</span>
									<span>${totalPrice.toFixed(2)}</span>
								</div>
							</div>

							<Link
								href='/checkout'
								className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center block'
							>
								Proceed to Checkout
							</Link>

							<Link
								href='/'
								className='w-full text-center text-blue-600 hover:text-blue-700 mt-4 block'
							>
								Continue Shopping
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
```

**✅ Checkpoint:** Test the cart page

-   Go to http://localhost:3000/cart
-   Should show empty state if no items
-   Add products → go to cart
-   Should see all items
-   Test quantity buttons (+/-)
-   Test remove button
-   Total should update correctly

---

### Task 5: Deploy & Test (30 mins)

**Step 5.1: Test everything locally**

-   [ ] Add multiple products to cart
-   [ ] Cart badge updates correctly
-   [ ] Cart page shows all items
-   [ ] Quantity buttons work
-   [ ] Remove button works
-   [ ] Total calculates correctly
-   [ ] Empty cart shows empty state
-   [ ] "Continue Shopping" works

**Step 5.2: Commit and push**

```bash
git add .
git commit -m "Add shopping cart functionality with React Context"
git push origin main
```

**Step 5.3: Wait for Vercel deployment**

-   Go to vercel.com → your project
-   Wait 2-3 minutes for auto-deploy
-   Visit your live URL
-   Test cart on production

**✅ Final Checkpoint:** Everything works on live site

---

### Task 6: Post on X/LinkedIn (15 mins)

**Your Day 2 post:**

```
Day 2: Shopping cart complete 🛒

Built:
✅ Global state with React Context
✅ Add/remove items
✅ Quantity controls
✅ Real-time total calculation
✅ Cart badge in header

Key learning: Separating server and client components in Next.js App Router. Server components for data fetching, client components for interactivity.

Live: [your-vercel-url]

#BuildInPublic #100DaysOfCode #NextJS

[Screenshot of your cart page with items]
```

**Post this on:**

-   X (Twitter)
-   LinkedIn

**Tips for screenshot:**

-   Add 2-3 items to cart
-   Take screenshot of cart page
-   Make sure it looks good
-   Show the quantity controls and total

---

## End of Day Checklist

Before you go to bed:

-   [ ] Shopping cart works locally
-   [ ] Deployed to Vercel
-   [ ] Posted on X
-   [ ] Posted on LinkedIn
-   [ ] Code committed to GitHub
-   [ ] Feeling proud of progress ✨

---

## What You Built Today

**Features:**

-   Global cart state management
-   Add to cart from product page
-   Cart icon with item count badge
-   Full cart page with:
    -   Product list with images
    -   Quantity controls
    -   Remove items
    -   Order summary
    -   Empty state

**Technical Skills Used:**

-   React Context API
-   Client vs Server Components
-   TypeScript types
-   State management
-   Component composition

---

## Common Issues & Solutions

**Issue: "useCart must be used within CartProvider"**

-   Solution: Make sure `CartProvider` wraps your entire app in `layout.tsx`

**Issue: "Objects are not valid as a React child"**

-   Solution: Make sure you're rendering `totalPrice.toFixed(2)` not just `totalPrice`

**Issue: Cart doesn't update when adding items**

-   Solution: Make sure `ProductCard` is using `'use client'` directive

**Issue: Images not loading on cart page**

-   Solution: Make sure `images.unsplash.com` is in `next.config.js` domains

**Issue: Deployment fails**

-   Solution: Check Vercel logs, usually it's a TypeScript error. Fix locally first.

---

## Tomorrow (Day 3)

We'll build:

-   Checkout page with customer form
-   Shipping address fields
-   Form validation with Zod
-   Order summary sidebar

But that's tomorrow. For now, celebrate today's win! 🎉

**You just built a functioning shopping cart from scratch. That's legit.**

---

## Time Spent Today (Estimate)

-   Task 1 (Cart Context): 1 hour
-   Task 2 (Product Card): 1 hour
-   Task 3 (Header): 45 mins
-   Task 4 (Cart Page): 2 hours
-   Task 5 (Deploy): 30 mins
-   Task 6 (Post): 15 mins

**Total: ~5.5 hours**

Well done. Now rest. Tomorrow is Day 3.
