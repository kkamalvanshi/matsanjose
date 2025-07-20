import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Debug logging
  console.log('Middleware running for path:', request.nextUrl.pathname)
  
  // Check if user is accessing the login page
  if (request.nextUrl.pathname === '/login') {
    console.log('Allowing access to login page')
    return NextResponse.next()
  }

  // Check for authentication cookie
  const authCookie = request.cookies.get('mat-auth')
  console.log('Auth cookie:', authCookie?.value)
  
  // If no auth cookie or invalid cookie, redirect to login
  if (!authCookie || authCookie.value !== 'authenticated') {
    console.log('No valid auth cookie, redirecting to login')
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  console.log('User authenticated, allowing access')
  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * - login page
     */
    '/((?!api|_next/static|_next/image|favicon|.*\\.|login).*)'
  ],
} 