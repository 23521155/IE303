'use client';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import Image from 'next/image';

export default function Footer({ t, lang }: { t: any; lang: string }) {
    return (
        <footer className="bg-slate-900 dark:bg-black text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <Link href={`/${lang}/`} className="flex items-center gap-2  mb-4">
                        <Image src={'/itShikenLogo-darkMode.png'} alt={'logo'} height={100} width={100} />
                    </Link>
                    <p className="text-sm max-w-sm mb-6 text-slate-400">{t.footerDesc}</p>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">{t.categories}</h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link href={`/${lang}/exams`} className="hover:text-blue-400 transition-colors">
                                IT Passport
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/exams`} className="hover:text-blue-400 transition-colors">
                                FE
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/exams`} className="hover:text-blue-400 transition-colors">
                                SG
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">{t.support}</h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                {t.userGuide}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                {t.faq}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                {t.contact}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 text-center">
                &copy; {new Date().getFullYear()} IT Shiken. {t.allRightsReserved}
            </div>
        </footer>
    );
}
