'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { loginAction } from '@/src/actions/authActions';
import { useAuthStore } from '@/src/store/authStore';
import { BE_URL } from '@/src/utils/constans';
import { Button } from '@/src/components/ui/button';
export function Login({ t, lang }: { t: any; lang: string }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { setUser } = useAuthStore();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await loginAction({ email, password });
        if (res.success) {
            const meRes = await fetch(`${BE_URL}/api/users/me`, {
                credentials: 'include',
            });
            const user = await meRes.json().then((data) => data.data);
            setUser(user);
            router.push('/');
        }
        alert(res.message);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#121212] transition-colors duration-300">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
                        {t.login}
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">{t.welcomeBack}</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label
                                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                                htmlFor="email"
                            >
                                {t.emailAddress}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="nguyenvana@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                                htmlFor="password"
                            >
                                {t.password}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 rounded dark:bg-[#222]"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-slate-900 dark:text-slate-300"
                            >
                                {t.rememberMe}
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link
                                href="/forgot-password"
                                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
                            >
                                {t.forgotPassword}
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-full py-5">
                            {t.login}
                        </Button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-[#1a1a1a] text-slate-500 dark:text-slate-400 transition-colors">
                                {t.orContinueWith}
                            </span>
                        </div>
                    </div>

                    <div>
                        <Button variant={'outline'} className="w-full py-5">
                            <svg
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            {t.loginWithGoogle}
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                    {t.noAccount}{' '}
                    <Link href={`/${lang}/register`}>
                        <Button variant={'link'}>
                            {t.registerNow} <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
