'use client'
import { Exam } from '@/src/services/examService';
import type { Locale } from '@/src/utils/i18n';
import { motion } from 'framer-motion';
import { BookOpen, Clock } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

type CardProps = { exam: Exam; lang: string; t: any; index: number };

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.65, ease: EASE_OUT_EXPO },
    },
};

export default function RegularExamCard({ exam, lang, t, index }: CardProps) {
    const examTitle = typeof exam.title === 'string' ? exam.title : exam.title[lang as Locale];
    const num = String(index + 1).padStart(2, '0');

    return (
        <motion.article
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="group rounded-xl border border-[rgba(0,0,0,0.1)] dark:border-white/10 bg-white dark:bg-[#1a1a1a] overflow-hidden hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.28)] transition-all duration-300 flex flex-col"
        >
            {/* Card header — no photo, amber-tinted with faded index */}
            <div className="relative h-[72px] bg-primary/5 dark:bg-primary/[0.12] flex items-center px-5 overflow-hidden flex-shrink-0">
                <span
                    className="absolute right-3 text-6xl font-black leading-none select-none pointer-events-none text-primary/[0.12] dark:text-primary/[0.18]"
                    aria-hidden="true"
                >
                    {num}
                </span>
                <span className="relative z-10 bg-primary/10 text-primary text-[0.7rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {exam?.category?.name}
                </span>
            </div>

            <div className="p-5 flex flex-col gap-3 flex-1">
                <h2 className="text-[0.9375rem] font-semibold leading-snug text-secondary dark:text-white line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {examTitle}
                </h2>

                <div className="flex items-center gap-4 text-xs text-[#717182] dark:text-slate-400 mt-auto">
                    <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 shrink-0" />
                        {exam.questionCount} {t.questions}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        {exam.duration} {t.minutes}
                    </span>
                </div>

                <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="w-full mt-1"
                    aria-label={`${t.takeExamNow}: ${examTitle}`}
                >
                    <Link href={`/${lang}/exams/${exam.id}`}>
                        {t.takeExamNow}
                    </Link>
                </Button>
            </div>
        </motion.article>
    );
};