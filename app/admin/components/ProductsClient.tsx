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

	// Open modal for creating new product
	const handleAddProduct = () => {
		setModalMode('create')
		setSelectedProduct(null)
		setIsModalOpen(true)
	}

	// Open modal for editing existing product
	const handleEditProduct = (product: Product) => {
		setModalMode('edit')
		setSelectedProduct(product)
		setIsModalOpen(true)
	}

	const [toastMessage, setToastMessage] = useState('')
	const [showToast, setShowToast] = useState(false)

	const handleDeleteProduct = async (
		productId: string,
		actionLabel: string
	) => {
		try {
			const result = await deleteProduct(productId, actionLabel)

			if (result.success) {
				// Show success toast
				setToastMessage(result.message || 'Operation successful')
				setShowToast(true)

				// Auto-hide after 3 seconds
				setTimeout(() => {
					setShowToast(false)
				}, 3000)
			} else {
				// Show error toast
				const errorMsg =
					'error' in result
						? result.error || 'Error deleting product'
						: 'Error deleting product'
				setToastMessage(errorMsg)
				setShowToast(true)
				setTimeout(() => {
					setShowToast(false)
				}, 3000)
			}
		} catch (err) {
			console.error('Error deleting product:', err)
			setToastMessage('Error deleting product')
			setShowToast(true)
			setTimeout(() => {
				setShowToast(false)
			}, 3000)
		}
	}

	// Close modal
	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedProduct(null)
	}

	return (
		<div>
			<div className='flex justify-between items-center mb-8'>
				<h1 className='text-3xl font-bold text-gray-800'>Products</h1>
				<button
					onClick={handleAddProduct}
					className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold'
				>
					+ Add Product
				</button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{products.map((product) => (
					<div
						key={product.id}
						className={`bg-white rounded-lg shadow-md overflow-hidden ${
							product.isDeleted
								? 'opacity-50 border-2 border-red-300'
								: ''
						}`}
					>
						{/* Product Image */}
						<div className='relative h-48 bg-gray-100'>
							<Image
								src={product.image}
								alt={product.name}
								fill
								className='object-cover'
							/>
							{product.isDeleted && (
								<div className='absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>
									Deleted
								</div>
							)}
						</div>

						{/* Product Info */}
						<div className='p-4'>
							<h3 className='font-bold text-lg text-gray-800 mb-2'>
								{product.name}
							</h3>
							<p className='text-gray-600 text-sm mb-4 line-clamp-2'>
								{product.description}
							</p>

							<div className='flex justify-between items-center mb-4'>
								<div>
									<p className='text-2xl font-bold text-gray-900'>
										₹{product.price.toLocaleString('en-IN')}
									</p>
									<p className='text-sm text-gray-500'>
										Stock: {product.stock}
									</p>
								</div>
								<span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
									{product.category}
								</span>
							</div>

							{/* Action Buttons */}
							<div className='flex gap-2'>
								<button
									onClick={() => handleEditProduct(product)}
									className='flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium'
								>
									Edit
								</button>
								<button
									onClick={() =>
										handleDeleteProduct(
											product.id,
											product.isDeleted
												? 'Restore'
												: 'Delete'
										)
									}
									className='flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition font-medium'
								>
									{product.isDeleted ? 'Restore' : 'Delete'}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{products.length === 0 && (
				<div className='text-center py-12'>
					<p className='text-gray-500 text-lg'>
						No products yet. Add your first product!
					</p>
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
				<div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in'>
					<div className='bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2'>
						<svg
							className='w-5 h-5 text-green-400'
							fill='none'
							strokeWidth='2'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M5 13l4 4L19 7'
							/>
						</svg>
						<span className='font-medium'>{toastMessage}</span>
					</div>
				</div>
			)}
		</div>
	)
}
