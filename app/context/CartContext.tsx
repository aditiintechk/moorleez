'use client'

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import { CartItem, CartContextType, Product } from '@/types'

const CartContext = createContext<CartContextType | undefined>(undefined)
// define cart key
const CART_STORAGE_KEY = 'moorleez-cart'

// two helper functions
const loadCartFromStorage = (): CartItem[] => {
	if (typeof window === 'undefined') return []
	try {
		const saved = localStorage.getItem(CART_STORAGE_KEY)
		return saved ? JSON.parse(saved) : []
	} catch (error) {
		console.error('Failed to load cart from localstorage', error)
		return []
	}
}

const saveCartToStorage = (items: CartItem[]) => {
	if (typeof window === 'undefined') return []
	try {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
	} catch (error) {
		console.error('failed to save cart to storage', error)
	}
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>(loadCartFromStorage)

	const isInitialMount = useRef(true)

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false
			return
		}

		saveCartToStorage(items)
	}, [items])

	const addToCart = (product: Product) => {
		/* algo: check if item already exists
		        yes: increase the count of the item
		        no: add new item 
            */

		setItems((currentItems) => {
			const existingitem = currentItems.find(
				(item) => item.id === product.id
			)

			if (existingitem) {
				return currentItems.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			}

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

	const removeFromCart = (productId: string) => {
		setItems((currentItems) =>
			currentItems.filter((item) => item.id !== productId)
		)
	}

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

	const clearCart = () => {
		setItems([])
	}

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

/* create a custom hook to import the functions or cart context related object properties as - 
const {addToCart, items} = useCart() */

export function useCart() {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('usecart must be used within CartProvider')
	}
	return context
}
