import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = request.cookies.get(name)
          return cookie?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Set cookie on the request
          request.cookies.set({
            name,
            value,
            ...options,
          })
          // Create a new response with updated headers
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          // Set cookie on the response
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // Remove cookie from the request
          request.cookies.delete(name)
          // Create a new response with updated headers
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          // Remove cookie from the response
          response.cookies.delete(name)
        },
      },
    }
  )

  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/signin'
      redirectUrl.searchParams.set(`redirectedFrom`, request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return response
  } catch (error) {
    console.error('Auth error:', error)
    // In case of auth error, redirect to signin
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    return NextResponse.redirect(redirectUrl)
  }
}

export const config = {
  matcher: [
    '/create-deck-from-pdf',
    '/dashboard',
    '/profile',
    '/settings',
    '/test/decks'
  ]
} 