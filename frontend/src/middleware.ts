import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { AuthPayloadProp } from '../../shared/types/token.type';
import { refreshAccessToken } from './service/auth';
import { isTokenValid } from './utils/jwt';

const DASHBOARD_ENTRY = '/dashboard';
const SIGN_IN_ROUTE = '/sign-in';
const SIGN_UP_ROUTE = '/sign-up';

export const PROTECTED_ROUTES = ['/dashboard', '/categories', '/expenses', '/settings', '/reports'];

function redirectToSignIn(response: NextResponse, request: NextRequest): NextResponse {
  const signInUrl = new URL(SIGN_IN_ROUTE, request.url);

  response.cookies.delete(process.env.NEXT_ACCESS_TOKEN_KEY!);
  response.cookies.delete(process.env.NEXT_REFRESH_TOKEN_KEY!);

  return NextResponse.redirect(signInUrl);
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  const isGuardRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = pathname === SIGN_IN_ROUTE || pathname === SIGN_UP_ROUTE;

  const accessToken = request.cookies.get(process.env.NEXT_ACCESS_TOKEN_KEY!)?.value;
  const refreshToken = request.cookies.get(process.env.NEXT_REFRESH_TOKEN_KEY!)?.value;

  let isAccessValid = isGuardRoute && isTokenValid(accessToken);
  const isRefreshValid = isGuardRoute && isTokenValid(refreshToken);

  if (isGuardRoute && !isAccessValid && isRefreshValid) {
    try {
      const authPayload = await refreshAccessToken({ mode: 'server' });

      isAccessValid = true;

      response.cookies.set({
        name: process.env.NEXT_ACCESS_TOKEN_KEY!,
        value: authPayload[AuthPayloadProp.AccessToken],
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: process.env.NODE_ENV === 'production',
      });

      response.cookies.set({
        name: process.env.NEXT_REFRESH_TOKEN_KEY!,
        value: authPayload[AuthPayloadProp.RefreshToken],
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: process.env.NODE_ENV === 'production',
      });
    } catch {
      return redirectToSignIn(response, request);
    }
  }

  const isAuthenticated = isAccessValid && isRefreshValid;

  if (isGuardRoute && !isAuthenticated) {
    return redirectToSignIn(response, request);
  }

  if (isAuthRoute && isAuthenticated) {
    const dashboardUrl = new URL(DASHBOARD_ENTRY, request.url);

    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: [...PROTECTED_ROUTES, SIGN_IN_ROUTE, SIGN_UP_ROUTE],
};
