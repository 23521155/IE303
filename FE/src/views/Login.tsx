'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, BadgeCheck, BrainCircuit, MonitorCheck } from 'lucide-react';
import { loginAction } from '@/src/actions/authActions';
import { useAuthStore, usePathStore } from '@/src/store/authStore';
import { Button } from '@/src/components/ui/button';
import { toast } from 'sonner';
import { userService } from '@/src/services/userService';

export function Login({ t, lang }: { t: any; lang: string }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { setUser } = useAuthStore();

    const { path } = usePathStore();
    console.log('login ', path);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginPromise = (async () => {
            const res = await loginAction({ email, password });

            if (!res.success) {
                throw new Error(res.message);
            }

            const user = await userService.getMe();

            setUser(user);

            router.push(path);

            return res.message;
        })();

        toast.promise(loginPromise, {
            loading: `${t.logging}...`,
            success: `${t.loginSuccess}`,
            error: `${t.loginFail}`,
        });
    };

    return (
        <div className="flex h-[calc(100dvh-4rem)]">

            {/* ── Brand panel — desktop only ─────────────────────────────── */}
            <div className="hidden lg:flex lg:w-[42%] flex-col relative overflow-hidden bg-secondary shadow-[8px_0_32px_rgba(0,0,0,0.18)]" style={{ zIndex: 1 }}>
                {/* Dot-grid on navy */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.07]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                {/* Thumbnail — full width, flush to top */}
                <div className="relative w-full shrink-0">
                    <Image
                        src={`/thumbnail-${lang}.png`}
                        alt="IT Shiken"
                        width={720}
                        height={360}
                        className="w-full object-cover"
                        priority
                    />
                    {/* Soft fade into panel background */}
                    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-secondary to-transparent" />
                </div>

                {/* Content below thumbnail */}
                <div className="relative flex-1 flex flex-col justify-center px-10 py-8">
                    {/* Amber warmth from bottom of thumbnail */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232, 121, 33, 0.18) 0%, transparent 65%)',
                        }}
                    />

                    {/* Flex layout with gradient divider */}
                    <div className="relative flex items-start">
                        {/* Subtle right tint */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/[0.03] pointer-events-none" />

                        {/* Left: heading + description + cert pills */}
                        <div className="flex-[1.2] space-y-4 pr-7 relative">
                            <p className="text-[1.5rem] font-bold text-white leading-[1.25] tracking-tight">
                                {t.loginBrandLine1}<br />
                                {t.loginBrandLine2}<br />
                                <span className="text-primary">{t.loginBrandHighlight}</span>
                            </p>
                            <p className="text-sm text-white/55 leading-relaxed">
                                {t.loginBrandDesc}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {['IT Passport', 'FE', 'AP'].map((cert) => (
                                    <span
                                        key={cert}
                                        className="text-xs font-medium bg-white/10 text-white/75 border border-white/15 rounded-full px-3 py-1"
                                    >
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Gradient divider */}
                        <div className="self-stretch w-px shrink-0 bg-gradient-to-b from-transparent via-white/[0.12] to-transparent" />

                        {/* Right: feature highlights */}
                        <div className="flex-1 flex flex-col justify-start gap-5 pl-7 relative">
                            {([
                                { Icon: BadgeCheck, label: t.brandFeatureIPA },
                                { Icon: BrainCircuit, label: t.brandFeatureAI },
                                { Icon: MonitorCheck, label: t.brandFeatureCBT },
                            ] as const).map(({ Icon, label }) => (
                                <div key={label} className="flex items-center gap-3">
                                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm text-white/70 leading-snug">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Form panel ──────────────────────────────────────────────── */}
            <div className="relative flex-1 flex items-center justify-center px-6 bg-background overflow-y-auto">
                {/* Ambient amber warmth — same cadence as ExamList */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(232, 121, 33, 0.07) 0%, transparent 65%)',
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, var(--color-secondary) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                <div className="relative z-10 w-full max-w-sm">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-3.5 py-1 text-xs font-semibold mb-4">
                            <span className="inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                            {t.heroBadge}
                        </div>
                        <h1 className="text-2xl font-bold text-secondary dark:text-foreground tracking-tight">
                            {t.login}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1.5">{t.welcomeBack}</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleLogin}>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="email">
                                {t.emailAddress}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-[var(--input-background)] dark:bg-white/[0.06] border border-transparent rounded-md text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all"
                                    placeholder="nguyenvana@example.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="password">
                                {t.password}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-[var(--input-background)] dark:bg-white/[0.06] border border-transparent rounded-md text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between pt-0.5">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary/30 dark:bg-white/10"
                                />
                                <span className="text-sm text-muted-foreground">{t.rememberMe}</span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-primary hover:text-primary/75 transition-colors"
                            >
                                {t.forgotPassword}
                            </Link>
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-full mt-1">
                            {t.login}
                        </Button>

                        {/* Divider */}
                        <div className="relative py-1">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-3 bg-background text-xs text-muted-foreground/55">
                                    {t.orContinueWith}
                                </span>
                            </div>
                        </div>

                        {/* Google */}
                        <Button variant="outline" type="button" className="w-full">
                            <svg className="h-4 w-4 mr-2 shrink-0" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            {t.loginWithGoogle}
                        </Button>

                    </form>

                    {/* Footer */}
                    <p className="text-sm text-muted-foreground text-center mt-8">
                        {t.noAccount}{' '}
                        <Link
                            href={`/${lang}/register`}
                            className="text-primary font-medium hover:text-primary/75 transition-colors"
                        >
                            {t.registerNow}
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    );
}
