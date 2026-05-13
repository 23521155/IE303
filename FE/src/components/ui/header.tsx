'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMe } from '@/src/hooks/useMe';
import { logoutAction } from '@/src/actions/authActions';
import Link from 'next/link';
import { ChevronDown, Globe, LogOut, Menu, Moon, Settings, Sun, User, X } from 'lucide-react';
import { ImageWithFallback } from '@/src/components/figma/ImageWithFallback';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { usePathStore } from '@/src/store/authStore';

const NAV_ITEMS = [
    { label: 'home', path: '/' },
    { label: 'exams', path: '/exams' },
    { label: 'materials', path: '/materials' },
    { label: 'flashcards', path: '/flashcards' },
    { label: 'blogs', path: '/blogs' },
];

function avatarFromName(name: string): string {
    const seed = encodeURIComponent(name?.trim() || '?');
    return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}

export default function Header({ t, lang }: { t: any; lang: string }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

    const langDropdownRef = useRef<HTMLDivElement>(null);
    const mobileLangDropdownRef = useRef<HTMLDivElement>(null);

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const pathname = usePathname();
    const { setPath } = usePathStore();

    useEffect(() => {
        if (pathname && !pathname.includes('/login') && !pathname.includes('/register')) {
            setPath(pathname);
        }
    }, [pathname, setPath]);

    useEffect(() => {
        setIsDropdownOpen(false);
        setIsLangDropdownOpen(false);
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            const isOutsideDesktop = langDropdownRef.current && !langDropdownRef.current.contains(target);
            const isOutsideMobile = mobileLangDropdownRef.current && !mobileLangDropdownRef.current.contains(target);
            if (isOutsideDesktop && isOutsideMobile) setIsLangDropdownOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages = [
        { code: 'vi', label: 'Tiếng Việt' },
        { code: 'en', label: 'English' },
        { code: 'ja', label: '日本語' },
    ];

    const { user, setUser } = useMe();
    const router = useRouter();
    const avatarSrc = useMemo(() => avatarFromName(user?.name || '?'), [user?.name]);

    const handleLogout = async () => {
        await logoutAction();
        setUser(null);
        if (pathname?.includes('/profile')) router.push(`/${lang}/`);
    };

    const handleChangeLang = (newLang: string) => {
        const segments = pathname.split('/');
        segments[1] = newLang;
        router.push(segments.join('/'));
    };

    return (
        <header className="bg-[#fef8f4] border-b border-border sticky top-0 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-14">
                    {/* Logo */}
                    <Link href={`/${lang}/`} className="flex-shrink-0 mr-8">
                        <Image
                            src="/itShikenLogo.png"
                            alt="IT Shiken"
                            height={40}
                            width={150}
                            loading="eager"
                            className="object-contain dark:brightness-110"
                        />
                    </Link>

                    {/* Primary navigation */}
                    <nav className="hidden lg:flex items-stretch h-full" aria-label="Main navigation">
                        {NAV_ITEMS.map((item) => {
                            const href = item.path === '/' ? `/${lang}` : `/${lang}${item.path}`;
                            const isActive = item.path === '/' ? pathname === href : pathname.startsWith(href);
                            return (
                                <Link
                                    key={item.label}
                                    href={href}
                                    className={`relative flex items-center px-3.5 text-sm font-medium transition-colors duration-150
                                        after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-sm
                                        after:transition-opacity after:duration-150
                                        ${
                                            isActive
                                                ? 'text-foreground after:bg-primary after:opacity-100'
                                                : 'text-muted-foreground hover:text-foreground after:bg-primary after:opacity-0'
                                        }`}
                                >
                                    {t[item.label as keyof typeof t]}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Utility controls — desktop */}
                    <div className="hidden lg:flex items-center gap-1 ml-auto">
                        {/* Language switcher */}
                        <div className="relative" ref={langDropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="h-8 px-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors"
                                aria-label="Switch language"
                                aria-expanded={isLangDropdownOpen}
                            >
                                <Globe className="w-3.5 h-3.5" />
                                {lang}
                            </button>
                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-1.5 w-36 bg-background border border-border rounded-md shadow-md overflow-hidden z-50">
                                    {languages.map((language) => (
                                        <button
                                            key={language.code}
                                            type="button"
                                            onClick={() => {
                                                handleChangeLang(language.code);
                                                setIsLangDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                                                lang === language.code
                                                    ? 'text-primary font-medium bg-primary/5'
                                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                            }`}
                                        >
                                            {t[language.code as keyof typeof t]}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Theme toggle */}
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}*/}
                        {/*    className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors"*/}
                        {/*    aria-label="Toggle theme"*/}
                        {/*>*/}
                        {/*    {mounted && (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}*/}
                        {/*</button>*/}

                        <div className="w-px h-4 bg-border mx-1.5 flex-shrink-0" />

                        {/* Auth */}
                        {!user ? (
                            <>
                                <Link
                                    href={`/${lang}/login`}
                                    className="h-8 px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                                >
                                    {t.login}
                                </Link>
                                <Link
                                    href={`/${lang}/register`}
                                    className="h-8 px-3.5 text-sm font-medium bg-primary text-white hover:bg-primary/90 rounded-md inline-flex items-center transition-colors ml-0.5"
                                >
                                    {t.register}
                                </Link>
                            </>
                        ) : (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 h-8 pl-1.5 pr-2.5 hover:bg-muted/60 rounded-md transition-colors focus:outline-none"
                                    aria-expanded={isDropdownOpen}
                                >
                                    <div className="w-6 h-6 rounded-full overflow-hidden border border-border flex-shrink-0">
                                        <ImageWithFallback
                                            src={avatarSrc}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                                        {user?.name}
                                    </span>
                                    <ChevronDown
                                        className={`w-3.5 h-3.5 text-muted-foreground flex-shrink-0 transition-transform duration-150 ${
                                            isDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-1.5 w-52 bg-background border border-border rounded-md shadow-md overflow-hidden z-50">
                                        <div className="px-3 py-2.5 border-b border-border">
                                            <p className="text-xs text-muted-foreground">{t.loggedInAs}</p>
                                            <p className="text-sm font-medium text-foreground truncate mt-0.5">
                                                {user?.name}
                                            </p>
                                        </div>
                                        <div className="py-1">
                                            <Link
                                                href={`/${lang}/profile`}
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                                            >
                                                <User className="w-3.5 h-3.5" /> {t.profile}
                                            </Link>
                                            <Link
                                                href={`/${lang}/settings`}
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                                            >
                                                <Settings className="w-3.5 h-3.5" /> {t.settings}
                                            </Link>
                                        </div>
                                        <div className="py-1 border-t border-border">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
                                            >
                                                <LogOut className="w-3.5 h-3.5" /> {t.logout}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile controls */}
                    <div className="flex items-center gap-0.5 lg:hidden ml-auto" ref={mobileLangDropdownRef}>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="h-8 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {lang}
                            </button>
                            {isLangDropdownOpen && (
                                <div className="absolute right-0 top-full mt-1.5 w-36 bg-background border border-border rounded-md shadow-md overflow-hidden z-50">
                                    {languages.map((language) => (
                                        <button
                                            key={language.code}
                                            type="button"
                                            onClick={() => {
                                                handleChangeLang(language.code);
                                                setIsLangDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                                                lang === language.code
                                                    ? 'text-primary font-medium bg-primary/5'
                                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                            }`}
                                        >
                                            {t[language.code as keyof typeof t]}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}*/}
                        {/*    className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-md transition-colors"*/}
                        {/*    aria-label="Toggle theme"*/}
                        {/*>*/}
                        {/*    {mounted && (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}*/}
                        {/*</button>*/}
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-md transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu panel */}
            {isMenuOpen && (
                <div className="lg:hidden border-t border-border bg-background">
                    <nav className="px-3 py-3 space-y-0.5" aria-label="Mobile navigation">
                        {NAV_ITEMS.map((item) => {
                            const href = item.path === '/' ? `/${lang}` : `/${lang}${item.path}`;
                            const isActive = item.path === '/' ? pathname === href : pathname.startsWith(href);
                            return (
                                <Link
                                    key={item.label}
                                    href={href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                                        isActive
                                            ? 'text-foreground bg-muted/50'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                                    }`}
                                >
                                    {t[item.label as keyof typeof t]}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="px-3 pb-4 pt-2 border-t border-border space-y-1.5">
                        {!user ? (
                            <>
                                <Link
                                    href={`/${lang}/login`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full py-2.5 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-md transition-colors text-center"
                                >
                                    {t.login}
                                </Link>
                                <Link
                                    href={`/${lang}/register`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full py-2.5 px-3 text-sm font-medium bg-primary text-white hover:bg-primary/90 rounded-md transition-colors text-center"
                                >
                                    {t.register}
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 px-3 py-2.5">
                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-border flex-shrink-0">
                                        <ImageWithFallback
                                            src={avatarSrc}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                                </div>
                                <Link
                                    href={`/${lang}/profile`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-md transition-colors"
                                >
                                    <User className="w-4 h-4" /> {t.profile}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors text-left"
                                >
                                    <LogOut className="w-4 h-4" /> {t.logout}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
