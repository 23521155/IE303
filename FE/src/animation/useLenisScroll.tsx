// src/animation/useLenisScroll.ts
'use client';
import { useCallback } from 'react';

export function useLenisScroll() {
    const scrollTo = useCallback((target: string) => {
        // Lenis expose instance qua window
        const lenis = (window as any).__lenis;
        if (lenis) {
            lenis.scrollTo(target, { duration: 1.4 });
        } else {
            // fallback nếu chưa có lenis
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return { scrollTo };
}
