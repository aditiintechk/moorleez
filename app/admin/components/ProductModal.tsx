'use client'

import { useForm } from 'react-hook-form'
import { createProduct, editProduct } from '../products/actions'
import { useEffect, useState } from 'react'
import { ProductData } from '@/types'

interface ProductModalProps {
	isOpen: boolean
	onClose: () => void
	mode: 'create' | 'edit'
	product?: ProductData | null
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
				result = await createProduct(data)
			} else {
				if (!product?.id) {
					setError('Product ID is missing')
					setIsLoading(false)
					return
				}
				result = await editProduct(product.id, data)
			}

			if (result.success) {
				reset()
				onClose()
			} else {
				setError('error' in result ? result.error : 'Something went wrong')
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
		<div className='fixed inset-0 backdrop-blur-md bg-deep-brown/20 flex items-center justify-center z-50 p-4'>
			<div className='bg-white rounded-2xl shadow-dramatic max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar animate-scale-in'>
				{/* Header */}
				<div className='flex justify-between items-center p-6 border-b border-light-gray sticky top-0 bg-white rounded-t-2xl z-10'>
					<div>
						<h2 className='text-xl font-bold text-deep-brown font-[family-name:var(--font-heading)]'>
							{mode === 'create' ? 'Add New Product' : 'Edit Product'}
						</h2>
						<p className='text-sm text-warm-gray mt-1'>
							{mode === 'create' 
								? 'Fill in the details for your new product' 
								: 'Update the product information'
							}
						</p>
					</div>
					<button
						onClick={onClose}
						className='w-10 h-10 rounded-full bg-beige hover:bg-clay/20 flex items-center justify-center transition-colors'
						aria-label='Close'
					>
						<svg className='w-5 h-5 text-warm-brown' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
						</svg>
					</button>
				</div>

				{/* Error Message */}
				{error && (
					<div className='mx-6 mt-4 bg-terracotta/10 text-terracotta p-4 rounded-xl flex items-center gap-3'>
						<svg className='w-5 h-5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
						</svg>
						{error}
					</div>
				)}

				{/* Form */}
				<form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-5'>
					{/* Name Field */}
					<div>
						<label className='block text-sm font-medium text-charcoal mb-2'>
							Product Name *
						</label>
						<input
							type='text'
							{...register('name', {
								required: 'Name is required',
								minLength: { value: 3, message: 'Minimum 3 characters' },
							})}
							className={`input ${errors.name ? 'border-terracotta' : ''}`}
							placeholder='Beautiful Artwork'
						/>
						{errors.name && (
							<p className='text-terracotta text-sm mt-1.5'>
								{errors.name.message}
							</p>
						)}
					</div>

					{/* Description Field */}
					<div>
						<label className='block text-sm font-medium text-charcoal mb-2'>
							Description *
						</label>
						<textarea
							{...register('description', {
								required: 'Description is required',
								minLength: { value: 10, message: 'Minimum 10 characters' },
							})}
							rows={4}
							className={`input resize-none ${errors.description ? 'border-terracotta' : ''}`}
							placeholder='Describe the product in detail...'
						/>
						{errors.description && (
							<p className='text-terracotta text-sm mt-1.5'>
								{errors.description.message}
							</p>
						)}
					</div>

					{/* Price and Stock - Side by Side */}
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-charcoal mb-2'>
								Price (₹) *
							</label>
							<input
								type='number'
								step='0.01'
								{...register('price', {
									required: 'Price is required',
									min: { value: 0.01, message: 'Must be greater than 0' },
									valueAsNumber: true,
								})}
								className={`input ${errors.price ? 'border-terracotta' : ''}`}
								placeholder='999.00'
							/>
							{errors.price && (
								<p className='text-terracotta text-sm mt-1.5'>
									{errors.price.message}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-medium text-charcoal mb-2'>
								Stock Quantity *
							</label>
							<input
								type='number'
								{...register('stock', {
									required: 'Stock is required',
									min: { value: 0, message: 'Cannot be negative' },
									valueAsNumber: true,
								})}
								className={`input ${errors.stock ? 'border-terracotta' : ''}`}
								placeholder='10'
							/>
							{errors.stock && (
								<p className='text-terracotta text-sm mt-1.5'>
									{errors.stock.message}
								</p>
							)}
						</div>
					</div>

					{/* Category Field */}
					<div>
						<label className='block text-sm font-medium text-charcoal mb-2'>
							Category *
						</label>
						<select
							{...register('category', { required: 'Category is required' })}
							className={`input ${errors.category ? 'border-terracotta' : ''}`}
						>
							<option value=''>Select a category</option>
							<option value='paintings'>Paintings</option>
							<option value='crochet'>Crochet</option>
							<option value='crafts'>Crafts</option>
							<option value='custom'>Custom Orders</option>
						</select>
						{errors.category && (
							<p className='text-terracotta text-sm mt-1.5'>
								{errors.category.message}
							</p>
						)}
					</div>

					{/* Image URL Field */}
					<div>
						<label className='block text-sm font-medium text-charcoal mb-2'>
							Image URL *
						</label>
						<input
							type='url'
							{...register('image', {
								required: 'Image URL is required',
								pattern: { value: /^https?:\/\/.+/, message: 'Must be a valid URL' },
							})}
							className={`input ${errors.image ? 'border-terracotta' : ''}`}
							placeholder='https://example.com/image.jpg'
						/>
						{errors.image && (
							<p className='text-terracotta text-sm mt-1.5'>
								{errors.image.message}
							</p>
						)}
						<p className='text-xs text-warm-gray mt-1.5'>
							Enter a direct URL to the product image
						</p>
					</div>

					{/* Action Buttons */}
					<div className='flex gap-3 pt-4 border-t border-light-gray'>
						<button
							type='button'
							onClick={onClose}
							className='btn-secondary flex-1'
							disabled={isLoading}
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={isLoading}
							className='btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
						>
							{isLoading ? (
								<>
									<svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
										<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
										<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
									</svg>
									Saving...
								</>
							) : (
								<>
									{mode === 'create' ? (
										<>
											<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
												<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
											</svg>
											Create Product
										</>
									) : (
										<>
											<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
												<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
											</svg>
											Update Product
										</>
									)}
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
