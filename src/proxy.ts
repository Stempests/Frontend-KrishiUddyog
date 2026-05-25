import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const PROTECTED_ROUTES = ['/dashboard'];

// Routes that authenticated users should NOT see (auth-only pages)
const AUTH_ROUTES = ['/login', '/register'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read the lightweight cookie we set on login/logout.
  // (Zustand `persist` writes to localStorage, which is not accessible on the
  // Edge. We sync auth state to a cookie so the proxy can read it.)
  const authCookie = request.cookies.get('agriconnect_authenticated')?.value;
  const isAuthenticated = authCookie === 'true';

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Unauthenticated user trying to access a protected route → redirect to /
  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('redirected', 'true');
    return NextResponse.redirect(redirectUrl);
  }

  // Authenticated user trying to access login/register → send them to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static  (static files)
     * - _next/image   (image optimization)
     * - favicon.ico
     * - public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
