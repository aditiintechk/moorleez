import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const connectionString = process.env.DATABASE_URL!
console.log(
	'🔍 Using DATABASE_URL:',
	connectionString.includes('schema=test') ? 'TEST ✅' : 'PRODUCTION ❌'
)
const adapter = new PrismaNeon({ connectionString })
export const prismaConnection = new PrismaClient({ adapter })
