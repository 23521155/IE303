import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/src/utils/i18n';

const protectedRoutes = ['/profile', '/history', '/coach'];

function decodeJwt(token: string) {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
        return NextResponse.next();
    }

    const segments = pathname.split('/');
    const locale = segments[1];
    const hasLocale = locales.includes(locale as any);

    if (!hasLocale) {
        return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
    }

    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathWithoutLocale.startsWith(route)
    );

    if (isProtectedRoute) {
        const token = request.cookies.get('access_token')?.value;

        if (!token) {
            const loginUrl = new URL(`/${locale}/`, request.url);
            return NextResponse.redirect(loginUrl);
        }

        if (pathWithoutLocale.startsWith('/profile/')) {
            const pathSegments = pathWithoutLocale.split('/').filter(Boolean);
            const profileIdInUrl = pathSegments[1];

            const payload = decodeJwt(token);
            const loggedInUserId = payload?.userId || payload?.id || payload?.sub;

            if (!loggedInUserId || String(loggedInUserId) !== String(profileIdInUrl)) {
                if (loggedInUserId) {
                    return NextResponse.redirect(new URL(`/${locale}/profile/${loggedInUserId}`, request.url));
                }
                return NextResponse.redirect(new URL(`/${locale}/`, request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};