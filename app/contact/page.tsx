'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		
		// TODO: Connect to backend
		await new Promise(resolve => setTimeout(resolve, 1000))
		
		console.log('Form submitted:', formData)
		setSubmitted(true)
		setIsSubmitting(false)
	}

	if (submitted) {
		return (
			<div className='min-h-[70vh] bg-cream flex items-center justify-center px-4'>
				<div className='text-center max-w-md animate-fade-in'>
					<div className='w-20 h-20 mx-auto mb-6 rounded-full bg-sage/20 flex items-center justify-center'>
						<svg className='w-10 h-10 text-sage' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
						</svg>
					</div>
					<h2 className='text-3xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-4'>
						Message Sent!
					</h2>
					<p className='text-warm-gray mb-8 leading-relaxed'>
						Thank you for reaching out! I&apos;ll get back to you within 24-48 hours.
					</p>
					<Link href='/' className='btn-primary'>
						Back to Shop
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-cream'>
			{/* Hero Section */}
			<section className='bg-beige py-16'>
				<div className='max-w-4xl mx-auto px-4 text-center'>
					<span className='font-[family-name:var(--font-accent)] text-2xl text-terracotta'>
						Get in Touch
					</span>
					<h1 className='text-4xl lg:text-5xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mt-3 mb-4'>
						Let&apos;s Create Together
					</h1>
					<p className='text-warm-gray text-lg max-w-2xl mx-auto'>
						Have a question, custom order request, or just want to say hello? 
						I&apos;d love to hear from you!
					</p>
				</div>
			</section>

			{/* Main Content */}
			<section className='py-12 lg:py-20'>
				<div className='max-w-6xl mx-auto px-4'>
					<div className='grid grid-cols-1 lg:grid-cols-5 gap-12'>
						
						{/* Contact Form */}
						<div className='lg:col-span-3'>
							<div className='bg-white rounded-2xl shadow-soft p-6 lg:p-8'>
								<h2 className='text-2xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-6'>
									Send a Message
								</h2>
								
								<form onSubmit={handleSubmit} className='space-y-5'>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
										<div>
											<label className='block text-sm font-medium text-charcoal mb-2'>
												Your Name *
											</label>
											<input
												type='text'
												required
												value={formData.name}
												onChange={(e) => setFormData({ ...formData, name: e.target.value })}
												className='input'
												placeholder='John Doe'
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-charcoal mb-2'>
												Email Address *
											</label>
											<input
												type='email'
												required
												value={formData.email}
												onChange={(e) => setFormData({ ...formData, email: e.target.value })}
												className='input'
												placeholder='john@example.com'
											/>
										</div>
									</div>

									<div>
										<label className='block text-sm font-medium text-charcoal mb-2'>
											Subject *
										</label>
										<select
											required
											value={formData.subject}
											onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
											className='input'
										>
											<option value=''>Select a topic</option>
											<option value='general'>General Inquiry</option>
											<option value='custom'>Custom Order Request</option>
											<option value='order'>Order Status</option>
											<option value='collaboration'>Collaboration</option>
											<option value='feedback'>Feedback</option>
											<option value='other'>Other</option>
										</select>
									</div>

									<div>
										<label className='block text-sm font-medium text-charcoal mb-2'>
											Your Message *
										</label>
										<textarea
											required
											rows={6}
											value={formData.message}
											onChange={(e) => setFormData({ ...formData, message: e.target.value })}
											className='input resize-none'
											placeholder='Tell me about your inquiry, custom order idea, or just say hello...'
										/>
									</div>

									<button
										type='submit'
										disabled={isSubmitting}
										className='btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50'
									>
										{isSubmitting ? (
											<>
												<svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
													<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
													<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
												</svg>
												Sending...
											</>
										) : (
											<>
												<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
													<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
												</svg>
												Send Message
											</>
										)}
									</button>
								</form>
							</div>
						</div>

						{/* Contact Info */}
						<div className='lg:col-span-2 space-y-6'>
							{/* Direct Contact */}
							<div className='bg-white rounded-2xl shadow-soft p-6'>
								<h3 className='text-lg font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-4'>
									Direct Contact
								</h3>
								<div className='space-y-4'>
									<a 
										href='mailto:hello@moorleez.com'
										className='flex items-center gap-3 text-warm-gray hover:text-deep-brown transition-colors'
									>
										<div className='w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center shrink-0'>
											<svg className='w-5 h-5 text-terracotta' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
												<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
											</svg>
										</div>
										<div>
											<p className='text-xs text-warm-gray'>Email</p>
											<p className='text-deep-brown font-medium'>hello@moorleez.com</p>
										</div>
									</a>
									<a 
										href='tel:+919876543210'
										className='flex items-center gap-3 text-warm-gray hover:text-deep-brown transition-colors'
									>
										<div className='w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center shrink-0'>
											<svg className='w-5 h-5 text-sage' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
												<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
											</svg>
										</div>
										<div>
											<p className='text-xs text-warm-gray'>WhatsApp</p>
											<p className='text-deep-brown font-medium'>+91 98765 43210</p>
										</div>
									</a>
								</div>
							</div>

							{/* Social Links */}
							<div className='bg-white rounded-2xl shadow-soft p-6'>
								<h3 className='text-lg font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-4'>
									Follow Along
								</h3>
								<p className='text-sm text-warm-gray mb-4'>
									Stay updated with new artworks, behind-the-scenes, and more!
								</p>
								<div className='flex gap-3'>
									<a 
										href='#' 
										className='w-10 h-10 rounded-xl bg-beige flex items-center justify-center text-warm-brown hover:bg-terracotta hover:text-white transition-colors'
										aria-label='Instagram'
									>
										<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
											<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/>
										</svg>
									</a>
									<a 
										href='#' 
										className='w-10 h-10 rounded-xl bg-beige flex items-center justify-center text-warm-brown hover:bg-terracotta hover:text-white transition-colors'
										aria-label='Pinterest'
									>
										<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
											<path d='M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z'/>
										</svg>
									</a>
									<a 
										href='#' 
										className='w-10 h-10 rounded-xl bg-beige flex items-center justify-center text-warm-brown hover:bg-terracotta hover:text-white transition-colors'
										aria-label='Facebook'
									>
										<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
											<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/>
										</svg>
									</a>
									<a 
										href='#' 
										className='w-10 h-10 rounded-xl bg-beige flex items-center justify-center text-warm-brown hover:bg-terracotta hover:text-white transition-colors'
										aria-label='YouTube'
									>
										<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
											<path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/>
										</svg>
									</a>
								</div>
							</div>

							{/* Response Time */}
							<div className='bg-terracotta/10 rounded-2xl p-6'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-10 rounded-xl bg-terracotta/20 flex items-center justify-center shrink-0'>
										<svg className='w-5 h-5 text-terracotta' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
										</svg>
									</div>
									<div>
										<h4 className='font-semibold text-deep-brown'>Quick Response</h4>
										<p className='text-sm text-warm-gray mt-1'>
											I typically respond within 24-48 hours. For urgent matters, 
											WhatsApp is the fastest way to reach me!
										</p>
									</div>
								</div>
							</div>

							{/* FAQ Link */}
							<div className='bg-white rounded-2xl shadow-soft p-6'>
								<h3 className='text-lg font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-2'>
									Common Questions
								</h3>
								<p className='text-sm text-warm-gray mb-4'>
									Find quick answers to frequently asked questions.
								</p>
								<details className='group'>
									<summary className='cursor-pointer text-sm font-medium text-deep-brown flex items-center justify-between'>
										Do you take custom orders?
										<svg className='w-4 h-4 transition-transform group-open:rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
										</svg>
									</summary>
									<p className='mt-2 text-sm text-warm-gray'>
										Yes! I love bringing your ideas to life. Send me a message with your vision 
										and I&apos;ll get back to you with a quote.
									</p>
								</details>
								<details className='group mt-3'>
									<summary className='cursor-pointer text-sm font-medium text-deep-brown flex items-center justify-between'>
										What&apos;s the shipping time?
										<svg className='w-4 h-4 transition-transform group-open:rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
										</svg>
									</summary>
									<p className='mt-2 text-sm text-warm-gray'>
										Orders are typically shipped within 3-5 business days. Delivery takes 
										5-7 days within India.
									</p>
								</details>
								<details className='group mt-3'>
									<summary className='cursor-pointer text-sm font-medium text-deep-brown flex items-center justify-between'>
										Can I return or exchange?
										<svg className='w-4 h-4 transition-transform group-open:rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
										</svg>
									</summary>
									<p className='mt-2 text-sm text-warm-gray'>
										Due to the handmade nature of our products, we accept returns only for 
										damaged items. Please contact us within 48 hours of receiving your order.
									</p>
								</details>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

