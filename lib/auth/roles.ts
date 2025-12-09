import { User } from '@clerk/nextjs/server'

export type UserRole = 'admin' | 'customer'

export function getUserRole(user: User | null): UserRole {
	if (!user) return 'customer'

	const role = user.publicMetadata?.role as UserRole
	return role || 'customer'
}

export function isAdmin(user: User | null): boolean {
	return getUserRole(user) === 'admin'
}

export function isCustomer(user: User | null): boolean {
	return getUserRole(user) === 'customer'
}
