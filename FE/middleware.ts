// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import {locales, defaultLocale} from '@/src/utils/i18n';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const segments = pathname.split('/');
    const locale = segments[1];

    const hasLocale = locales.includes(locale as any);

    if (!hasLocale) {
        return NextResponse.redirect(
            new URL(`/${defaultLocale}${pathname}`, request.url)
        );
    }
}