import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
	'/',
	'/cart',
	'/checkout',
	'/order/[id]',
	'/api/orders',
])

const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/admin(.*)'])

const isCustomerRoute = createRouteMatcher(['/account(.*)'])

export default clerkMiddleware(async (auth, req) => {
	// check public routes
	if (isPublicRoute(req)) {
		return NextResponse.next()
	}

	// get user id and role
	const { userId, sessionClaims } = await auth()

	if (isAdminRoute(req)) {
		if (!userId) {
			return NextResponse.redirect(new URL('/sign-in', req.url))
		}

		const metadata = sessionClaims?.metadata as
			| { role?: string }
			| undefined
		const role = metadata?.role

		if (role !== 'admin') {
			return NextResponse.redirect(new URL('/', req.url))
		}

		return NextResponse.next()
	}

	if (isCustomerRoute(req)) {
		if (!userId) {
			return NextResponse.redirect(new URL('/sign-in', req.url))
		}

		return NextResponse.next()
	}

	return NextResponse.next()
})

export const config = {
	matcher: [
		// Skip Next.js internals and all static files
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
}
