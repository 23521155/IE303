'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, UserPlus, ArrowLeft, Phone, GraduationCap } from 'lucide-react';
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

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-8 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#121212] transition-colors duration-300">
            {/* Đã đổi max-w-md thành max-w-2xl để form đủ rộng chứa 2 cột */}
            <div className="max-w-2xl w-full space-y-8 bg-white dark:bg-[#1a1a1a] p-8 rounded-md shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900 dark:text-white transition-colors">
                        {t.createAccountHeader}
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400 transition-colors">
                        {t.joinNow}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    {/* Đã đổi space-y-4 thành CSS Grid: 1 cột trên mobile, 2 cột trên tablet/desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Cột 1 - Hàng 1 */}
                        <div>
                            <label
                                className="block text-sm font-medium text-secondary dark:text-slate-300 mb-1 transition-colors"
                                htmlFor="name"
                            >
                                {t.fullName}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent transition-all"
                                    placeholder="Nguyễn Văn A"
                                />
                            </div>
                        </div>

                        {/* Cột 2 - Hàng 1 */}
                        <div>
                            <label
                                className="block text-sm font-medium text-secondary dark:text-slate-300 mb-1 transition-colors"
                                htmlFor="email"
                            >
                                {t.emailAddress}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent transition-all"
                                    placeholder="nguyenvana@example.com"
                                />
                            </div>
                        </div>

                        {/* Cột 1 - Hàng 2 */}
                        <div>
                            <label
                                className="block text-sm font-medium text-secondary dark:text-slate-300 mb-1 transition-colors"
                                htmlFor="phoneNumber"
                            >
                                {t.phoneNumber}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                </div>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent transition-all"
                                    placeholder="0987 654 321"
                                />
                            </div>
                        </div>

                        {/* Cột 2 - Hàng 2 */}
                        <div>
                            <label
                                className="block text-sm font-medium text-secondary dark:text-slate-300 mb-1 transition-colors"
                                htmlFor="status"
                            >
                                {t.currentStatus}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <GraduationCap className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                </div>
                                <select
                                    id="status"
                                    name="status"
                                    required
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent transition-all appearance-none"
                                >
                                    <option value="" disabled hidden>
                                        {t.chooseStatus}
                                    </option>
                                    <option value="thcs">{t.statusMS}</option>
                                    <option value="thpt">{t.statusHS}</option>
                                    <option value="daihoc">{t.statusUni}</option>
                                    <option value="caohoc">{t.statusGrad}</option>
                                    <option value="dilam">{t.statusWorking}</option>
                                    <option value="khac">{t.statusOther}</option>
                                </select>
                            </div>
                        </div>

                        {/* Cột 1 - Hàng 3 */}
                        <div>
                            <label
                                className="block text-sm font-medium text-secondary dark:text-slate-300 mb-1 transition-colors"
                                htmlFor="password"
                            >
                                {t.password}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Cột 2 - Hàng 3 */}
                        <div>
                            <label
                                className="block text-sm font-medium text-secondary dark:text-slate-300 mb-1 transition-colors"
                                htmlFor="confirmPassword"
                            >
                                {t.confirmPassword}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Phần nút bấm vẫn giữ nguyên độ rộng full width */}
                    <div>
                        <Button type="submit" className={'w-full py-5'}>
                            {t.registerBtn}
                        </Button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-800 transition-colors"></div>
                        </div>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400 transition-colors">
                    {t.alreadyHaveAccount}
                    <Button asChild variant="link" className="p-1">
                        <Link href={`/${lang}/login`}>{t.backToLogin}</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
