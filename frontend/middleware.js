import { NextResponse } from 'next/server'

export function middleware(request) {

  const token = request.cookies.get('token')?.value

  const pathname = request.nextUrl.pathname

  const publicRoutes = [
    '/login',
    '/signup',
    '/signup/verify-email'
  ]

  const isPublicRoute = publicRoutes.includes(pathname)

  // not logged in
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    )
  }

  // already logged in
  if (token && isPublicRoute) {
    return NextResponse.redirect(
      new URL('/', request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/profile/:path*',
    '/explore/:path*',
    '/search/:path*',
  ],
}