import Link from 'next/link';
import {
    Clock,
    Users,
    Star,
    BookOpen,
    AlertCircle,
    FileText,
    CheckCircle2,
    ChevronLeft,
    ArrowRight,
} from 'lucide-react';
import { Exam } from '../services/examService';
import Image from 'next/image';
import { Button } from '@/src/components/ui/button';

export function ExamDetail({ examData, t, lang }: { examData: Exam | null; t: any; lang: string }) {
    const exam = examData;

    if (!exam) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#121212] p-6 text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {t('notFoundExam') || 'Không tìm thấy đề thi'}
                </h2>

                <Button asChild variant={'link'} className="flex items-center gap-2">
                    <Link href={`/${lang}/exams`}>{t('backToList') || 'Quay lại danh sách'}</Link>
                </Button>
            </div>
        );
    }

    return (
        <main className="bg-slate-50 dark:bg-[#121212] min-h-screen py-10 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button asChild variant={'link'} className="p-0 group">
                    <Link href={`/${lang}/exams`} className="flex items-center gap-2">
                        <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" /> {t.back}
                    </Link>
                </Button>
                <article className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-10 transition-colors duration-300">
                    <div className="relative h-64 sm:h-84 w-full">
                        <Image
                            priority
                            src={exam.image}
                            alt={
                                typeof exam.title === 'string'
                                    ? exam.title
                                    : exam.title[lang as keyof typeof exam.title]
                            }
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 shadow-sm">
                                {t[`cat_${exam.category.id}`] || exam.category.name}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight">
                                {typeof exam.title === 'string'
                                    ? exam.title
                                    : exam.title[lang as keyof typeof exam.title]}
                            </h1>
                        </div>
                    </div>

                    <div className="p-6 sm:p-10">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 border-b border-slate-100 dark:border-slate-800 pb-10">
                            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#222] rounded-2xl transition-colors duration-300">
                                <Clock className="h-8 w-8 text-primary mb-2" />
                                <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t.time}</span>
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {exam.duration} {t.minutes}
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#222] rounded-2xl transition-colors duration-300">
                                <FileText className="h-8 w-8 text-primary mb-2" />
                                <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                                    {t.questionCount}
                                </span>
                                <span className="font-bold text-slate-900 dark:text-white">{exam.questionCount}</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#222] rounded-2xl transition-colors duration-300">
                                <Users className="h-8 w-8 text-primary mb-2" />
                                <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                                    {t.participants}
                                </span>
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {exam.participants.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#222] rounded-2xl transition-colors duration-300">
                                <Star className="h-8 w-8 text-amber-400 mb-2" />
                                <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t.rating}</span>
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {exam.rating} ({exam.ratingCount})
                                </span>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4 flex items-center gap-2">
                                <BookOpen className="h-6 w-6 text-primary dark:text-blue-500" /> {t.intro}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                {typeof exam.description === 'string'
                                    ? exam.description
                                    : exam.description[lang as keyof typeof exam.description]}
                            </p>
                            <p className="text-secondary dark:text-slate-300 leading-relaxed text-lg mt-4">
                                {t.introDesc}
                            </p>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 sm:p-8 mb-10 transition-colors duration-300">
                            <h2 className="text-xl font-bold text-secondary dark:text-white mb-4 flex items-center gap-2">
                                <AlertCircle className="h-6 w-6 text-primary dark:text-blue-500" /> {t.examNotice}
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                                    <span className="text-secondary dark:text-slate-300">{t.notice1}</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                                    <span className="text-secondary dark:text-slate-300">{t.notice2}</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                                    <span className="text-secondary dark:text-slate-300">{t.notice3}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex justify-center">
                            <Button asChild className=" py-6.5 px-5 font-semibold text-lg ">
                                <Link href={`/${lang}/take-exam/${exam.id}`}>
                                    {t.startDoingExam} <ArrowRight className="h-6 w-6" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
