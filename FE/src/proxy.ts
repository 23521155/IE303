import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/src/utils/i18n';

const protectedRoutes = ['/profile', '/history', '/coach'];

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
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};