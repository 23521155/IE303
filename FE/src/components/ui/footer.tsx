'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ t, lang }: { t: any; lang: string }) {
    return (
        <footer className="bg-slate-900 dark:bg-[#0d0f14] border-t border-white/10 dark:border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                {/* Main grid: brand left, links right */}
                <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
                    {/* Brand column */}
                    <div className="flex-shrink-0 md:w-60">
                        <Link href={`/${lang}/`} className="inline-block">
                            <Image
                                src="/itShikenLogo-darkMode.png"
                                alt="IT Shiken"
                                height={32}
                                width={120}
                                className="object-contain"
                            />
                        </Link>
                        <p className="mt-4 text-sm leading-relaxed text-white/50 max-w-[240px]">{t.footerDesc}</p>
                    </div>

                    {/* Link columns */}
                    <div className="flex gap-12 md:gap-16 flex-wrap">
                        <div>
                            <p className="text-[0.7rem] font-semibold text-white/35 uppercase tracking-widest mb-4">
                                {t.categories}
                            </p>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href={`/${lang}/exams`}
                                        className="text-sm text-white/55 hover:text-white transition-colors duration-150"
                                    >
                                        IT Passport
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/${lang}/exams`}
                                        className="text-sm text-white/55 hover:text-white transition-colors duration-150"
                                    >
                                        FE
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/${lang}/exams`}
                                        className="text-sm text-white/55 hover:text-white transition-colors duration-150"
                                    >
                                        SG
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-[0.7rem] font-semibold text-white/35 uppercase tracking-widest mb-4">
                                {t.support}
                            </p>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href={`/${lang}/blogs`}
                                        className="text-sm text-white/55 hover:text-white transition-colors duration-150"
                                    >
                                        {t.faq}
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="mailto:nguyenletuanphi910.2019@gmail.com"
                                        className="text-sm text-white/55 hover:text-white transition-colors duration-150"
                                    >
                                        {t.contact}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-white/30">
                        &copy; {new Date().getFullYear()} IT Shiken. {t.allRightsReserved}
                    </p>
                    <nav className="flex items-center gap-5" aria-label="Footer navigation">
                        <Link
                            href={`/${lang}/exams`}
                            className="text-xs text-white/30 hover:text-white/55 transition-colors duration-150"
                        >
                            {t.exams}
                        </Link>
                        <Link
                            href={`/${lang}/flashcards`}
                            className="text-xs text-white/30 hover:text-white/55 transition-colors duration-150"
                        >
                            {t.flashcards}
                        </Link>
                        <Link
                            href={`/${lang}/blogs`}
                            className="text-xs text-white/30 hover:text-white/55 transition-colors duration-150"
                        >
                            {t.blogs}
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
