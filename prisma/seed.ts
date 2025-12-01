import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL!

const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
	await prisma.product.deleteMany()

	await prisma.product.createMany({
		data: [
			{
				name: 'Abstract Canvas Print',
				description: 'Beautiful abstract art piece, 24x36 inches',
				price: 899.99,
				image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500',
				stock: 15,
				category: 'Canvas Prints',
			},
			{
				name: 'Watercolor Landscape',
				description: 'Painted watercolor landscape, 18x24 inches',
				price: 1299.99,
				image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500',
				stock: 8,
				category: 'Original Paintings',
			},
			{
				name: 'Modern Art Poster',
				description: 'Minimalist poster design, 16x20 inches',
				price: 399.99,
				image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500',
				stock: 50,
				category: 'Posters',
			},
			{
				name: 'Acrylic Portrait',
				description: 'Custom acrylic portrait, 20x30 inches',
				price: 1999.99,
				image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=500',
				stock: 5,
				category: 'Original Paintings',
			},
			{
				name: 'Art Print Set',
				description: 'Set of 3 coordinating prints, 12x16 inches each',
				price: 799.99,
				image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500',
				stock: 25,
				category: 'Print Sets',
			},
		],
	})

	console.log('seeded 5 products')
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
