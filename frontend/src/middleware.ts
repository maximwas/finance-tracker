import type { MiddlewareConfig, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const DASHBOARD_ENTRY = '/dashboard/overview';
const SIGN_IN_ROUTE = '/sign-in';
const SIGN_UP_ROUTE = '/sign-up';

export const PROTECTED_ROUTES = ['/dashboard'];

function hasAccessTokenCookie(request: NextRequest): boolean {
  return Boolean(request.cookies.get(process.env.NEXT_ACCESS_TOKEN_KEY!)?.value);
}

function hasRefreshTokenCookie(request: NextRequest): boolean {
  return Boolean(request.cookies.get(process.env.NEXT_REFRESH_TOKEN_KEY!)?.value);
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  const isGuardRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = pathname === SIGN_IN_ROUTE || pathname === SIGN_UP_ROUTE;

  const hasAccess = hasAccessTokenCookie(request);
  const hasRefresh = hasRefreshTokenCookie(request);
  const isAuthenticated = hasAccess || hasRefresh;

  if (isGuardRoute && !isAuthenticated) {
    const signInUrl = new URL(SIGN_IN_ROUTE, request.url);
    signInUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    const dashboardUrl = new URL(DASHBOARD_ENTRY, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const middlewareConfig: MiddlewareConfig = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up'],
};
