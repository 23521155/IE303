'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, GraduationCap, ChevronDown, BadgeCheck, BrainCircuit, MonitorCheck } from 'lucide-react';
import { registerAction } from '@/src/actions/authActions';
import { Button } from '@/src/components/ui/button';
import { toast } from 'sonner';

export function Register({ t, lang }: { t: any; lang: string }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 8) {
            toast.error(t.passwordTooShort);
            return;
        }

        if (password !== confirmPassword) {
            toast.error(t.passwordMismatch);
            return;
        }

        const registerPromise = (async () => {
            const res = await registerAction({
                name,
                email,
                phoneNumber,
                status,
                password,
            });

            if (!res.success) {
                throw new Error(res.message);
            }

            // redirect sau khi thành công
            router.push('/login');

            return res.message;
        })();

        toast.promise(registerPromise, {
            loading: `${t.registering}...`,
            success: `${t.registerSuccess}`,
            error: `${t.registerFail}`,
        });
    };

    const inputClass =
        'w-full pl-10 pr-4 py-2.5 bg-[var(--input-background)] dark:bg-white/[0.06] border border-transparent rounded-md text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all';

    const labelClass = 'block text-sm font-medium text-foreground mb-1.5';

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
                                {t.registerBrandLine1}<br />
                                {t.registerBrandLine2}<br />
                                <span className="text-primary">{t.registerBrandHighlight}</span>
                            </p>
                            <p className="text-sm text-white/55 leading-relaxed">
                                {t.registerBrandDesc}
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
            <div className="relative flex-1 flex items-center justify-center px-6 py-14 bg-background overflow-y-auto">
                {/* Ambient amber warmth */}
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

                <div className="relative z-10 w-full max-w-xl">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-3.5 py-1 text-xs font-semibold mb-4">
                            <span className="inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                            {t.heroBadge}
                        </div>
                        <h1 className="text-2xl font-bold text-secondary dark:text-foreground tracking-tight">
                            {t.createAccountHeader}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1.5">{t.joinNow}</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Full name */}
                            <div>
                                <label className={labelClass} htmlFor="name">
                                    {t.fullName}
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={inputClass}
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className={labelClass} htmlFor="email">
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
                                        className={inputClass}
                                        placeholder="nguyenvana@example.com"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className={labelClass} htmlFor="phoneNumber">
                                    {t.phoneNumber}
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className={inputClass}
                                        placeholder="0987 654 321"
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className={labelClass} htmlFor="status">
                                    {t.currentStatus}
                                </label>
                                <div className="relative">
                                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                                    <select
                                        id="status"
                                        name="status"
                                        required
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full pl-10 pr-8 py-2.5 bg-[var(--input-background)] dark:bg-white/[0.06] border border-transparent rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 appearance-none transition-all cursor-pointer"
                                    >
                                        <option value="" disabled hidden>
                                            {t.chooseStatus}
                                        </option>
                                        <option value="thcs" className='dark:text-black'>{t.statusMS}</option>
                                        <option value="thpt" className='dark:text-black'>{t.statusHS}</option>
                                        <option value="daihoc" className='dark:text-black'>{t.statusUni}</option>
                                        <option value="caohoc" className='dark:text-black'>{t.statusGrad}</option>
                                        <option value="dilam" className='dark:text-black'>{t.statusWorking}</option>
                                        <option value="khac" className='dark:text-black'>{t.statusOther}</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className={labelClass} htmlFor="password">
                                    {t.password}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={inputClass}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* Confirm password */}
                            <div>
                                <label className={labelClass} htmlFor="confirmPassword">
                                    {t.confirmPassword}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={inputClass}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                        </div>

                        <Button type="submit" className="w-full">
                            {t.registerBtn}
                        </Button>
                    </form>

                    {/* Footer */}
                    <p className="mt-6 text-sm text-muted-foreground text-center">
                        {t.alreadyHaveAccount}{' '}
                        <Link
                            href={`/${lang}/login`}
                            className="text-primary font-medium hover:text-primary/75 transition-colors"
                        >
                            {t.backToLogin}
                        </Link>
                    </p>

                </div>
            </div>

        </div>
    );
}
