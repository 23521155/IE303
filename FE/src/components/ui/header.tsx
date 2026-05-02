'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { usePathname, useRouter } from 'next/navigation';
import { useMe } from '@/src/hooks/useMe';
import { logoutAction } from '@/src/actions/authActions';
import Link from 'next/link';
import { ChevronDown, Globe, LogOut, Menu, Moon, Settings, Sun, User, X } from 'lucide-react';
import { ImageWithFallback } from '@/src/components/figma/ImageWithFallback';
import Image from 'next/image';
import { Button } from '@/src/components/ui/button';
import { usePathStore } from '@/src/store/authStore';

const NAV_ITEMS = [
    {
        label: 'home',
        path: '/',
    },
    {
        label: 'exams',
        path: '/exams',
    },
    {
        label: 'materials',
        path: '/materials',
    },
    {
        label: 'flashcards',
        path: '/flashcards',
    },
    {
        label: 'blog',
        path: '/blogs',
    },
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

    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isDark =
                document.documentElement.classList.contains('dark') ||
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(isDark);
        }
    }, []);

    const pathname = usePathname();
    console.log('header ', pathname);

    const { setPath } = usePathStore();

    useEffect(() => {
        if (pathname && !pathname.includes('/login') && !pathname.includes('/register')) {
            setPath(pathname);
        }
    }, [pathname, setPath]);

    // Apply dark mode class to html element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Đóng menu khi đổi trang
    useEffect(() => {
        setIsDropdownOpen(false);
        setIsLangDropdownOpen(false);
        setIsMenuOpen(false);
    }, [pathname]);
    // Click outside to close language dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
                setIsLangDropdownOpen(false);
            }
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

    const avatarSrc = useMemo(() => {
        return avatarFromName(user?.name || '?');
    }, [user?.name]);

    const handleLogout = async () => {
        await logoutAction();
        setUser(null);
        if (pathname?.includes('/profile')) {
            router.push(`/${lang}/`);
        }
    };
    const handleChangeLang = (newLang: string) => {
        const segments = pathname.split('/');

        // segments = ["", "vi", "exams"]
        segments[1] = newLang;

        const newPath = segments.join('/');
        router.push(newPath);
    };

    return (
        <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href={`/${lang}/`}>
                        <Image src={'/itShikenLogo.png'} alt={'logo của ITShiken'} height={65} width={200} />
                    </Link>

                    {/* Nav items */}

                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={`/${lang}/${item.path}`}
                                className=" text-secondary
                                                cursor-pointer
                                                dark:text-foreground
                                                hover:text-primary
                                                relative
                                                font-medium
                                                transition-colors
                                                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                                                after:bg-primary after:transition-all hover:after:w-full"
                            >
                                {t[item.label as keyof typeof t]}
                            </Link>
                        ))}
                    </nav>

                    {/* Setting buttons */}

                    <div className="hidden lg:flex items-center gap-2 relative">
                        {/* Language Switcher */}
                        <div className="relative" ref={langDropdownRef}>
                            <Button
                                variant={'ghost'}
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="flex items-center gap-1 p-2 rounded-ml
                                               hover:bg-muted
                                               transition-colors
                                               text-secondary
                                               dark:text-foreground
                                               font-medium text-sm"
                            >
                                <Globe className="w-5 h-5" />
                                <span className="uppercase">{t.language}</span>
                            </Button>

                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden z-50">
                                    <div className="py-1">
                                        {languages.map((language) => (
                                            <p
                                                key={language.code}
                                                onClick={() => {
                                                    handleChangeLang(language.code);
                                                    setIsLangDropdownOpen(false);
                                                }}
                                                className={`w-full text-center px-4 py-2 text-sm cursor-pointer
                                                    ${
                                                        lang === language.code
                                                            ? 'text-primary dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20'
                                                            : 'text-secondary dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }
                                                `}
                                            >
                                                {t[language.code as keyof typeof t]}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <Button
                            variant={'ghost'}
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 mr-2"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </Button>

                        {!user ? (
                            <>
                                <Button asChild variant={'outline'}>
                                    <Link href={`/${lang}/login`}>{t.login}</Link>
                                </Button>

                                <Button asChild>
                                    <Link href={`/${lang}/register`}>{t.register}</Link>
                                </Button>
                            </>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 p-1.5 rounded-full transition-colors focus:outline-none"
                                >
                                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-100 dark:border-slate-700">
                                        <ImageWithFallback
                                            src={avatarSrc}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden lg:block">
                                        {user?.name}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform ${
                                            isDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden z-50">
                                        <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-800">
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{t.loggedInAs}</p>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                                                {user?.name}
                                            </p>
                                        </div>
                                        <div className="py-1">
                                            <Link
                                                href={`/${lang}/profile`}
                                                className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                <User className="w-4 h-4 mr-2" /> {t.profile}
                                            </Link>
                                            <Link
                                                href={`/${lang}/settings`}
                                                className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                <Settings className="w-4 h-4 mr-2" /> {t.settings}
                                            </Link>
                                        </div>
                                        <div className="py-1 border-t border-slate-50 dark:border-slate-800">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" /> {t.logout}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        <Button
                            variant={'ghost'}
                            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 font-medium text-xs uppercase"
                        >
                            {t.language}
                        </Button>
                        {isLangDropdownOpen && (
                            <div className="absolute right-0 top-0 mt-2 w-32 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden z-50">
                                <div className="py-1">
                                    {languages.map((language) => (
                                        <p
                                            key={language.code}
                                            onClick={() => {
                                                handleChangeLang(language.code);
                                                setIsLangDropdownOpen(false);
                                            }}
                                            className={`w-full text-center px-4 py-2 text-sm cursor-pointer
                                                    ${
                                                        lang === language.code
                                                            ? 'text-primary dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20'
                                                            : 'text-secondary dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }
                                                `}
                                        >
                                            {t[language.code as keyof typeof t]}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-slate-600 dark:text-slate-300 p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-[#1a1a1a] border-t border-blue-50 dark:border-slate-800 px-4 py-4 space-y-4">
                    <Link
                        href="/"
                        className="block text-secondary dark:text-slate-300 font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t.home}
                    </Link>
                    <Link
                        href="/exams"
                        className="block text-secondary dark:text-slate-300 font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t.exams}
                    </Link>
                    <Link
                        href="/materials"
                        className="block text-secondary dark:text-slate-300 font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t.materials}
                    </Link>
                    <Link
                        href="/flashcards"
                        className="block text-secondary dark:text-slate-300 font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t.flashcards}
                    </Link>
                    <Link
                        href="/blogs"
                        className="block text-secondary dark:text-slate-300 font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t.blog}
                    </Link>
                    <div className="pt-4 border-t border-blue-50 dark:border-slate-800 flex flex-col gap-3">
                        {!user ? (
                            <>
                                <Button asChild>
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                        {t.login}
                                    </Link>
                                </Button>

                                <Button asChild variant={'outline'}>
                                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                        {t.register}
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center p-3 bg-blue-50 dark:bg-slate-800/50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm mr-3">
                                        <ImageWithFallback
                                            src={avatarSrc}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white text-sm">
                                            Nguyễn Văn A
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            nguyenvana@example.com
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href={`/${lang}/profile`}
                                    className="flex items-center px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <User className="w-5 h-5 mr-3 text-slate-400" /> {t.profile}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium text-left"
                                >
                                    <LogOut className="w-5 h-5 mr-3 text-red-400" /> {t.logout}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
