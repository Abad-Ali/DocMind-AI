// // middleware.js
// import { NextResponse } from 'next/server'

// export function middleware(request) {
//   const token = request.cookies.get('token')?.value

//   const pathname = request.nextUrl.pathname

//   // public routes
//   const publicRoutes = ['/login', '/signup', '/signup/verify-email']

//   const isPublicRoute = publicRoutes.includes(pathname)

//   // if not logged in and trying to access protected page
//   if (!token && !isPublicRoute) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   // if logged in and trying to access login page
//   if (token && pathname === '/login') {
//     return NextResponse.redirect(new URL('/', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/', '/explore', '/search', '/dashboard', '/profile', '/profile/edit', '/pdf/:path*'],
// }