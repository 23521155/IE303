'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/src/store/authStore';

const STORAGE_KEY = 'itshiken-banner-dismissed';

export function AnnouncementBanner({ t, lang }: { t: any; lang: string }) {
    const { user } = useAuthStore();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const dismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
        if (!dismissed) setVisible(true);
    }, []);

    const dismiss = () => {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        setVisible(false);
    };

    if (user || !visible) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-primary/20 bg-[#fef8f4] dark:bg-card">
            <div className=" mx-auto pl-8 sm:px-6 lg:px-8 h-13 flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-primary shrink-0" />

                <p className="text-sm text-foreground flex-1 min-w-0 truncate">{t.bannerText}</p>

                <div className="flex items-center gap-2 shrink-0">
                    <Link
                        href={`/${lang}/register`}
                        className="text-xs font-semibold bg-primary text-white dark:text-black px-3 py-1.5 rounded-md hover:bg-primary/85 transition-colors whitespace-nowrap"
                    >
                        {t.registerNow}
                    </Link>
                    <Link
                        href={`/${lang}/login`}
                        className="text-xs font-medium text-primary border border-primary/30 px-3 py-1.5 rounded-md hover:bg-primary/8 transition-colors whitespace-nowrap"
                    >
                        {t.login}
                    </Link>
                </div>

                <button
                    onClick={dismiss}
                    aria-label="Dismiss"
                    className="shrink-0 p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
