'use client'

import { useState } from 'react'
import Image from 'next/image'
import ProductModal from './ProductModal'
import { deleteProduct } from '../products/actions'

interface Product {
	id: string
	name: string
	description: string
	price: number
	image: string
	stock: number
	category: string
	isDeleted: boolean
}

interface ProductsClientProps {
	products: Product[]
}

export default function ProductsClient({ products }: ProductsClientProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const [toastMessage, setToastMessage] = useState('')
	const [showToast, setShowToast] = useState(false)
	const [toastType, setToastType] = useState<'success' | 'error'>('success')

	// Stats
	const activeProducts = products.filter(p => !p.isDeleted).length
	const deletedProducts = products.filter(p => p.isDeleted).length
	const lowStockCount = products.filter(p => !p.isDeleted && p.stock <= 5).length

	const handleAddProduct = () => {
		setModalMode('create')
		setSelectedProduct(null)
		setIsModalOpen(true)
	}

	const handleEditProduct = (product: Product) => {
		setModalMode('edit')
		setSelectedProduct(product)
		setIsModalOpen(true)
	}

	const showToastMessage = (message: string, type: 'success' | 'error') => {
		setToastMessage(message)
		setToastType(type)
		setShowToast(true)
		setTimeout(() => setShowToast(false), 3000)
	}

	const handleDeleteProduct = async (productId: string, actionLabel: string) => {
		try {
			const result = await deleteProduct(productId, actionLabel)

			if (result.success) {
				showToastMessage(result.message || 'Operation successful', 'success')
			} else {
				const errorMsg = 'error' in result ? result.error || 'Error' : 'Error'
				showToastMessage(errorMsg, 'error')
			}
		} catch (err) {
			console.error('Error:', err)
			showToastMessage('Something went wrong', 'error')
		}
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedProduct(null)
	}

	const getStockStatus = (stock: number) => {
		if (stock === 0) return { label: 'Out', color: 'bg-red-100 text-red-700' }
		if (stock <= 5) return { label: `${stock} left`, color: 'bg-terracotta/20 text-terracotta' }
		return { label: `${stock}`, color: 'bg-sage/20 text-sage' }
	}

	return (
		<div className='space-y-4'>
			{/* Page Header */}
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-xl font-bold text-deep-brown font-[family-name:var(--font-heading)]'>
						Products
					</h1>
					<p className='text-xs text-warm-gray'>
						Manage your product catalog
					</p>
				</div>
				<button
					onClick={handleAddProduct}
					className='inline-flex items-center gap-1.5 bg-terracotta hover:bg-terracotta/90 text-cream px-3 py-1.5 rounded-lg text-xs font-medium transition-colors'
				>
					<svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
					</svg>
					Add Product
				</button>
			</div>

			{/* Quick Stats */}
			<div className='grid grid-cols-3 gap-3'>
				<div className='bg-white rounded-lg p-3 shadow-soft flex items-center gap-3'>
					<div className='w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center'>
						<svg className='w-4 h-4 text-sage' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
						</svg>
					</div>
					<div>
						<p className='text-lg font-bold text-deep-brown'>{activeProducts}</p>
						<p className='text-[10px] text-warm-gray'>Active</p>
					</div>
				</div>
				<div className='bg-white rounded-lg p-3 shadow-soft flex items-center gap-3'>
					<div className='w-8 h-8 rounded-lg bg-terracotta/10 flex items-center justify-center'>
						<svg className='w-4 h-4 text-terracotta' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
						</svg>
					</div>
					<div>
						<p className='text-lg font-bold text-deep-brown'>{lowStockCount}</p>
						<p className='text-[10px] text-warm-gray'>Low Stock</p>
					</div>
				</div>
				<div className='bg-white rounded-lg p-3 shadow-soft flex items-center gap-3'>
					<div className='w-8 h-8 rounded-lg bg-warm-gray/10 flex items-center justify-center'>
						<svg className='w-4 h-4 text-warm-gray' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
						</svg>
					</div>
					<div>
						<p className='text-lg font-bold text-deep-brown'>{deletedProducts}</p>
						<p className='text-[10px] text-warm-gray'>Archived</p>
					</div>
				</div>
			</div>

			{/* Products Grid */}
			{products.length > 0 ? (
				<div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
					{products.map((product) => (
						<div
							key={product.id}
							className={`bg-white rounded-lg shadow-soft overflow-hidden transition-all duration-200 hover:shadow-medium ${
								product.isDeleted ? 'opacity-60 ring-1 ring-warm-gray/30' : ''
							}`}
						>
							{/* Product Image */}
							<div className='relative aspect-square bg-beige'>
								<Image
									src={product.image}
									alt={product.name}
									fill
									className='object-cover'
								/>
								{/* Badges */}
								<div className='absolute top-2 left-2'>
									<span className='bg-deep-brown/80 text-cream text-[9px] font-medium px-1.5 py-0.5 rounded capitalize'>
										{product.category.length > 8 ? product.category.slice(0, 8) + '..' : product.category}
									</span>
								</div>
								{product.isDeleted && (
									<div className='absolute top-2 right-2'>
										<span className='bg-warm-gray text-white text-[9px] font-medium px-1.5 py-0.5 rounded'>
											Archived
										</span>
									</div>
								)}
								{!product.isDeleted && (
									<div className='absolute bottom-2 left-2'>
										<span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${getStockStatus(product.stock).color}`}>
											{getStockStatus(product.stock).label}
										</span>
									</div>
								)}
							</div>

							{/* Product Info */}
							<div className='p-2.5'>
								<h3 className='font-medium text-xs text-deep-brown mb-0.5 line-clamp-1'>
									{product.name}
								</h3>
								<p className='text-[10px] text-warm-gray mb-2 line-clamp-1'>
									{product.description}
								</p>

								<div className='flex items-center justify-between mb-2'>
									<p className='text-sm font-bold text-deep-brown'>
										₹{product.price.toLocaleString('en-IN')}
									</p>
									<p className='text-[9px] text-warm-gray'>
										#{product.id.slice(0, 6)}
									</p>
								</div>

								{/* Action Buttons */}
								<div className='flex gap-1.5'>
									<button
										onClick={() => handleEditProduct(product)}
										className='flex-1 inline-flex items-center justify-center gap-1 bg-beige text-deep-brown px-2 py-1.5 rounded text-[10px] font-medium hover:bg-clay/20 transition'
									>
										<svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
										</svg>
										Edit
									</button>
									<button
										onClick={() => handleDeleteProduct(
											product.id,
											product.isDeleted ? 'Restore' : 'Delete'
										)}
										className={`flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded text-[10px] font-medium transition ${
											product.isDeleted
												? 'bg-sage/10 text-sage hover:bg-sage/20'
												: 'bg-terracotta/10 text-terracotta hover:bg-terracotta/20'
										}`}
									>
										{product.isDeleted ? (
											<>
												<svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
													<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
												</svg>
												Restore
											</>
										) : (
											<>
												<svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
													<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
												</svg>
												Delete
											</>
										)}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				/* Empty State */
				<div className='bg-white rounded-lg shadow-soft p-8 text-center'>
					<div className='w-14 h-14 mx-auto mb-4 rounded-full bg-beige flex items-center justify-center'>
						<svg className='w-7 h-7 text-clay' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
						</svg>
					</div>
					<h3 className='text-sm font-semibold text-deep-brown mb-1'>
						No products yet
					</h3>
					<p className='text-xs text-warm-gray mb-4'>
						Add your first product to get started
					</p>
					<button
						onClick={handleAddProduct}
						className='inline-flex items-center gap-1.5 bg-terracotta hover:bg-terracotta/90 text-cream px-3 py-1.5 rounded-lg text-xs font-medium transition-colors'
					>
						<svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
						</svg>
						Add Product
					</button>
				</div>
			)}

			{/* Modal */}
			<ProductModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				mode={modalMode}
				product={selectedProduct}
			/>

			{/* Toast Notification */}
			{showToast && (
				<div className='fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in'>
					<div className={`px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm ${
						toastType === 'success' 
							? 'bg-deep-brown text-cream' 
							: 'bg-terracotta text-white'
					}`}>
						{toastType === 'success' ? (
							<svg className='w-4 h-4 text-sage' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
							</svg>
						) : (
							<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
							</svg>
						)}
						<span className='font-medium text-xs'>{toastMessage}</span>
					</div>
				</div>
			)}
		</div>
	)
}
