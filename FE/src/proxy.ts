import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/src/utils/i18n';

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Bỏ qua file hệ thống
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
        return;
    }

    const segments = pathname.split('/');
    const locale = segments[1];

    const hasLocale = locales.includes(locale as any);

    if (!hasLocale) {
        return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
    }
}

export const config = {
    matcher: ['/:path*'],
};
