import { Product as PrismaProduct } from '@prisma/client'

export type Product = PrismaProduct

export type ProductData = Omit<Product, 'createdAt'>
