import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
	title: 'About the Artist | Moorleez Art Studio',
	description: 'Discover the story behind Moorleez Art Studio - where handmade meets heart. Learn about our passion for creating unique art pieces.',
}

export default function AboutPage() {
	return (
		<div className='min-h-screen bg-cream'>
			{/* Hero Section */}
			<section className='relative bg-deep-brown text-cream py-20 lg:py-32 overflow-hidden'>
				{/* Background Pattern */}
				<div className='absolute inset-0 opacity-10'>
					<div className='absolute top-0 left-0 w-72 h-72 bg-terracotta rounded-full blur-3xl' />
					<div className='absolute bottom-0 right-0 w-96 h-96 bg-clay rounded-full blur-3xl' />
				</div>
				
				<div className='max-w-4xl mx-auto px-4 text-center relative'>
					<span className='font-[family-name:var(--font-accent)] text-2xl text-clay'>
						Our Story
					</span>
					<h1 className='text-4xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mt-4 mb-6'>
						Where Handmade Meets Heart
					</h1>
					<p className='text-lg lg:text-xl text-cream/80 max-w-2xl mx-auto leading-relaxed'>
						Every piece tells a story. Every creation carries a piece of our soul. 
						Welcome to Moorleez Art Studio.
					</p>
				</div>
			</section>

			{/* Artist Story */}
			<section className='py-16 lg:py-24'>
				<div className='max-w-6xl mx-auto px-4'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
						{/* Image */}
						<div className='relative'>
							<div className='aspect-[4/5] rounded-3xl overflow-hidden bg-beige relative'>
								<Image
									src='https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800'
									alt='Artist at work'
									fill
									className='object-cover'
								/>
							</div>
							{/* Decorative element */}
							<div className='absolute -bottom-6 -right-6 w-32 h-32 bg-terracotta/20 rounded-2xl -z-10' />
							<div className='absolute -top-6 -left-6 w-24 h-24 bg-sage/20 rounded-2xl -z-10' />
						</div>

						{/* Content */}
						<div className='space-y-6'>
							<span className='text-terracotta font-medium uppercase tracking-wider text-sm'>
								Meet the Artist
							</span>
							<h2 className='text-3xl lg:text-4xl font-bold text-deep-brown font-[family-name:var(--font-heading)]'>
								Creating Art From the Heart
							</h2>
							<div className='space-y-4 text-warm-gray leading-relaxed'>
								<p>
									Hello! I&apos;m the creative soul behind Moorleez Art Studio. What started as 
									a childhood passion for colors and textures has blossomed into a journey 
									of creating art that brings joy to people&apos;s lives.
								</p>
								<p>
									Growing up, I found magic in the simple act of creation — whether it was 
									mixing paints to discover new colors, learning the intricate loops of 
									crochet from my grandmother, or experimenting with various crafts.
								</p>
								<p>
									Today, each piece I create carries that same sense of wonder and love. 
									I believe art should be accessible, personal, and meaningful. That&apos;s 
									why I pour my heart into every brushstroke, every stitch, every detail.
								</p>
							</div>
							<div className='flex items-center gap-4 pt-4'>
								<span className='font-[family-name:var(--font-accent)] text-2xl text-deep-brown'>
									— With love & creativity
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className='py-16 lg:py-24 bg-beige'>
				<div className='max-w-6xl mx-auto px-4'>
					<div className='text-center mb-12'>
						<span className='text-terracotta font-medium uppercase tracking-wider text-sm'>
							What We Stand For
						</span>
						<h2 className='text-3xl lg:text-4xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mt-3'>
							Our Values
						</h2>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{/* Value 1 */}
						<div className='bg-white rounded-2xl p-8 shadow-soft text-center'>
							<div className='w-16 h-16 mx-auto mb-6 rounded-2xl bg-terracotta/10 flex items-center justify-center'>
								<svg className='w-8 h-8 text-terracotta' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
								</svg>
							</div>
							<h3 className='text-xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-3'>
								Made with Love
							</h3>
							<p className='text-warm-gray leading-relaxed'>
								Every piece is handcrafted with genuine care and attention. No mass production, 
								just authentic artistry.
							</p>
						</div>

						{/* Value 2 */}
						<div className='bg-white rounded-2xl p-8 shadow-soft text-center'>
							<div className='w-16 h-16 mx-auto mb-6 rounded-2xl bg-sage/10 flex items-center justify-center'>
								<svg className='w-8 h-8 text-sage' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
								</svg>
							</div>
							<h3 className='text-xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-3'>
								Eco-Conscious
							</h3>
							<p className='text-warm-gray leading-relaxed'>
								We use sustainable materials whenever possible and minimize waste in our 
								creative process.
							</p>
						</div>

						{/* Value 3 */}
						<div className='bg-white rounded-2xl p-8 shadow-soft text-center'>
							<div className='w-16 h-16 mx-auto mb-6 rounded-2xl bg-clay/20 flex items-center justify-center'>
								<svg className='w-8 h-8 text-warm-brown' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' />
								</svg>
							</div>
							<h3 className='text-xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-3'>
								Uniquely Yours
							</h3>
							<p className='text-warm-gray leading-relaxed'>
								Each creation is one-of-a-kind. Small variations are part of what makes 
								handmade art special.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Process Section */}
			<section className='py-16 lg:py-24'>
				<div className='max-w-6xl mx-auto px-4'>
					<div className='text-center mb-12'>
						<span className='text-terracotta font-medium uppercase tracking-wider text-sm'>
							Behind the Scenes
						</span>
						<h2 className='text-3xl lg:text-4xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mt-3'>
							The Creative Process
						</h2>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
						{[
							{ 
								step: '01', 
								title: 'Inspiration', 
								description: 'Ideas bloom from nature, emotions, and everyday moments of beauty.',
								icon: '✨'
							},
							{ 
								step: '02', 
								title: 'Design', 
								description: 'Sketching, planning, and choosing the perfect colors and materials.',
								icon: '✏️'
							},
							{ 
								step: '03', 
								title: 'Creation', 
								description: 'Hours of careful handwork, bringing the vision to life.',
								icon: '🎨'
							},
							{ 
								step: '04', 
								title: 'Finishing', 
								description: 'Quality checks, packaging with care, ready for its new home.',
								icon: '🎁'
							},
						].map((item, idx) => (
							<div key={idx} className='relative'>
								{idx < 3 && (
									<div className='hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-light-gray' />
								)}
								<div className='relative bg-white rounded-2xl p-6 shadow-soft text-center'>
									<div className='text-3xl mb-4'>{item.icon}</div>
									<span className='text-xs text-terracotta font-bold'>STEP {item.step}</span>
									<h3 className='text-lg font-bold text-deep-brown font-[family-name:var(--font-heading)] mt-2 mb-2'>
										{item.title}
									</h3>
									<p className='text-sm text-warm-gray'>
										{item.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className='py-16 bg-deep-brown text-cream'>
				<div className='max-w-6xl mx-auto px-4'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
						{[
							{ number: '500+', label: 'Happy Customers' },
							{ number: '1000+', label: 'Artworks Created' },
							{ number: '3+', label: 'Years of Passion' },
							{ number: '100%', label: 'Handmade' },
						].map((stat, idx) => (
							<div key={idx}>
								<p className='text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-clay'>
									{stat.number}
								</p>
								<p className='text-cream/70 mt-2'>{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 lg:py-24'>
				<div className='max-w-4xl mx-auto px-4 text-center'>
					<h2 className='text-3xl lg:text-4xl font-bold text-deep-brown font-[family-name:var(--font-heading)] mb-4'>
						Ready to Find Your Perfect Piece?
					</h2>
					<p className='text-warm-gray text-lg mb-8 max-w-2xl mx-auto'>
						Browse our collection and discover art that speaks to your heart. 
						Each purchase supports an independent artist&apos;s dream.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link href='/' className='btn-primary'>
							Browse Collection
						</Link>
						<Link href='/contact' className='btn-secondary'>
							Get in Touch
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}

