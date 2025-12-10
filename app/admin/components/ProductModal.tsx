'use client'

import { useForm } from 'react-hook-form'
import { createProduct, editProduct } from '../products/actions'
import { useEffect, useState } from 'react'
import { ProductData } from '@/types'

interface ProductModalProps {
	isOpen: boolean
	onClose: () => void
	mode: 'create' | 'edit'
	product?: ProductData | null // We'll use this for edit mode later
}

type ProductFormData = {
	name: string
	description: string
	price: number
	image: string
	stock: number
	category: string
}

export default function ProductModal({
	isOpen,
	onClose,
	mode,
	product,
}: ProductModalProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProductFormData>({
		defaultValues: product || {
			name: '',
			description: '',
			price: 0,
			image: '',
			stock: 0,
			category: '',
		},
	})

	useEffect(() => {
		if (mode === 'edit' && product) {
			reset({
				name: product.name,
				description: product.description,
				price: product.price,
				image: product.image,
				stock: product.stock,
				category: product.category,
			})
		} else if (mode === 'create') {
			reset({
				name: '',
				description: '',
				price: 0,
				image: '',
				stock: 0,
				category: '',
			})
		}
	}, [mode, product, reset])

	const onSubmit = async (data: ProductFormData) => {
		setIsLoading(true)
		setError('')

		try {
			let result

			if (mode === 'create') {
				// Create new product
				result = await createProduct(data)
			} else {
				// Update existing product
				if (!product?.id) {
					setError('Product ID is missing')
					setIsLoading(false)
					return
				}
				result = await editProduct(product.id, data)
			}

			if (result.success) {
				// Success! Reset and close
				reset()
				onClose()
			} else {
				// Show error
				setError(
					'error' in result ? result.error : 'Something went wrong'
				)
			}
		} catch (err) {
			console.error('Error saving product:', err)
			setError('Something went wrong!')
		} finally {
			setIsLoading(false)
		}
	}

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 backdrop-blur-md bg-white/50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
				{/* Header */}
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-2xl font-bold text-gray-800'>
						{mode === 'create' ? 'Add New Product' : 'Edit Product'}
					</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700 text-2xl'
					>
						×
					</button>
				</div>

				{/* Error Message */}
				{error && (
					<div className='bg-red-50 text-red-600 p-3 rounded-lg mb-4'>
						{error}
					</div>
				)}

				{/* Form */}
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					{/* Name Field */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Product Name *
						</label>
						<input
							type='text'
							{...register('name', {
								required: 'Name is required',
								minLength: {
									value: 3,
									message: 'Minimum 3 characters',
								},
							})}
							className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='Beautiful Artwork'
						/>
						{errors.name && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.name.message}
							</p>
						)}
					</div>

					{/* Description Field */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Description *
						</label>
						<textarea
							{...register('description', {
								required: 'Description is required',
								minLength: {
									value: 10,
									message: 'Minimum 10 characters',
								},
							})}
							rows={4}
							className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='Describe the product...'
						/>
						{errors.description && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.description.message}
							</p>
						)}
					</div>

					{/* Price and Stock - Side by Side */}
					<div className='grid grid-cols-2 gap-4'>
						{/* Price Field */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Price (₹) *
							</label>
							<input
								type='number'
								step='0.01'
								{...register('price', {
									required: 'Price is required',
									min: {
										value: 0.01,
										message: 'Price must be greater than 0',
									},
									valueAsNumber: true,
								})}
								className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='999.00'
							/>
							{errors.price && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.price.message}
								</p>
							)}
						</div>

						{/* Stock Field */}
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Stock Quantity *
							</label>
							<input
								type='number'
								{...register('stock', {
									required: 'Stock is required',
									min: {
										value: 0,
										message: 'Stock cannot be negative',
									},
									valueAsNumber: true,
								})}
								className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='10'
							/>
							{errors.stock && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.stock.message}
								</p>
							)}
						</div>
					</div>

					{/* Category Field */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Category *
						</label>
						<input
							type='text'
							{...register('category', {
								required: 'Category is required',
							})}
							className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='Painting, Sculpture, etc.'
						/>
						{errors.category && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.category.message}
							</p>
						)}
					</div>

					{/* Image URL Field */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Image URL *
						</label>
						<input
							type='url'
							{...register('image', {
								required: 'Image URL is required',
								pattern: {
									value: /^https?:\/\/.+/,
									message: 'Must be a valid URL',
								},
							})}
							className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='https://example.com/image.jpg'
						/>
						{errors.image && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.image.message}
							</p>
						)}
					</div>

					{/* Action Buttons */}
					<div className='flex gap-3 pt-4'>
						<button
							type='button'
							onClick={onClose}
							className='flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium'
							disabled={isLoading}
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={isLoading}
							className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-blue-300'
						>
							{isLoading
								? 'Saving...'
								: mode === 'create'
								? 'Create Product'
								: 'Update Product'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
