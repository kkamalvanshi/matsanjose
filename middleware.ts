import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if user is accessing the login page
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next()
  }

  // Check for authentication cookie
  const authCookie = request.cookies.get('mat-auth')
  
  // If no auth cookie or invalid cookie, redirect to login
  if (!authCookie || authCookie.value !== 'authenticated') {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

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