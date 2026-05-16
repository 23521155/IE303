'use client'
import { Exam } from '@/src/services/examService';
import type { Locale } from '@/src/utils/i18n';
import { motion } from 'framer-motion';
import { BookOpen, Clock } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';


const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;


type CardProps = { exam: Exam; lang: string; t: any; index: number };


const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.65, ease: EASE_OUT_EXPO },
    },
};

export default function FeaturedExamCard({ exam, lang, t, index }: CardProps) {
    const examTitle = typeof exam.title === 'string' ? exam.title : exam.title[lang as Locale];
    const examDesc = typeof exam.description === 'string' ? exam.description : exam.description[lang as Locale];
    const num = String(index + 1).padStart(2, '0');

    return (
        <motion.article
            variants={cardVariants}
            whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="sm:col-span-2 group rounded-xl border border-[rgba(0,0,0,0.1)] dark:border-white/10 bg-white dark:bg-[#1a1a1a] overflow-hidden hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300"
        >
            <div className="flex flex-col sm:flex-row h-full">
                {/* Identity panel — amber tint, faded index number */}
                <div className="relative sm:w-52 flex-shrink-0 bg-primary/5 dark:bg-primary/[0.12] flex items-center justify-center min-h-[140px] overflow-hidden">
                    {/* Category ghim cứng ở góc trên cùng bên trái */}
                    <span className="absolute top-5 left-5 z-10 bg-primary/10 text-primary text-[0.7rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
        {t[`cat_${exam.category.id}`] || exam.category.name}
    </span>

                    {/* Số thứ tự nằm ngay chính giữa khung */}
                    <span
                        className="text-[7rem] font-black leading-none select-none pointer-events-none text-primary/[0.12] dark:text-primary/[0.18]"
                        aria-hidden="true"
                    >
        {num}
    </span>
                </div>

                {/* Content panel */}
                <div className="flex-1 p-6 flex flex-col gap-3">
                    <h2 className="text-xl font-bold leading-snug text-secondary dark:text-white group-hover:text-primary transition-colors duration-200">
                        {examTitle}
                    </h2>
                    {examDesc && (
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {examDesc}
                        </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-[#717182] dark:text-slate-400 mt-auto pt-2">
                        <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 shrink-0" />
                            {exam.questionCount} {t.questions}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            {exam.duration} {t.minutes}
                        </span>
                        <span className="ml-auto tabular-nums">⭐ {exam.rating}</span>
                    </div>
                    <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="self-start mt-1"
                        aria-label={`${t.takeExamNow}: ${examTitle}`}
                    >
                        <Link href={`/${lang}/exams/${exam.id}`}>
                            {t.takeExamNow}
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.article>
    );
};