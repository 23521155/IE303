import Link from 'next/link';
import { Clock, Users, Star, FileText, AlertCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { Exam } from '../services/examService';
import type { Locale } from '@/src/utils/i18n';

export function ExamDetail({ examData, t, lang }: { examData: Exam | null; t: any; lang: string }) {
    const exam = examData;

    if (!exam) {
        return (
            <main className="min-h-[60vh] flex flex-col items-center justify-center bg-background p-6 text-center">
                <AlertCircle className="h-10 w-10 text-muted-foreground/40 mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">{t.notFoundExam}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t.examNotFoundDesc}</p>
                <Link
                    href={`/${lang}/exams`}
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                    ← {t.backToList}
                </Link>
            </main>
        );
    }

    const examTitle =
        typeof exam.title === 'string' ? exam.title : exam.title[lang as Locale];
    const examDesc =
        typeof exam.description === 'string'
            ? exam.description
            : exam.description[lang as Locale];
    const categoryName = t[`cat_${exam.category.id}`] || exam.category.name;

    const META_ITEMS = [
        { label: t.time,          value: `${exam.duration} ${t.minutes}`,       Icon: Clock     },
        { label: t.questionCount, value: String(exam.questionCount),             Icon: FileText  },
        { label: t.participants,  value: exam.participants.toLocaleString(),     Icon: Users     },
        { label: t.rating,        value: `${exam.rating} / 5.0`,                Icon: Star      },
    ];

    const RULES = [t.notice1, t.notice2, t.notice3].filter(Boolean);

    return (
        <main className="bg-background min-h-screen">

            {/* ─── Identity zone ─────────────────────────────────────────── */}
            <div className="relative border-b border-border overflow-hidden">
                {/* Restrained amber ambient glow */}
                <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                    style={{
                        background:
                            'radial-gradient(ellipse 55% 80% at 15% 50%, rgba(232,121,33,0.07) 0%, transparent 65%)',
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
                    {/* Breadcrumb */}
                    <nav
                        className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8"
                        aria-label="Breadcrumb"
                    >
                        <Link
                            href={`/${lang}/exams`}
                            className="hover:text-foreground transition-colors duration-150"
                        >
                            {t.examLibrary}
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-40" />
                        <span className="text-foreground/70 truncate max-w-[260px] sm:max-w-none">
                            {examTitle}
                        </span>
                    </nav>

                    {/* Category badge + H1 */}
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded px-2.5 py-1 mb-5">
                            {categoryName}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary dark:text-foreground leading-snug">
                            {examTitle}
                        </h1>
                    </div>
                </div>
            </div>

            {/* ─── Two-column content ────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid lg:grid-cols-[1fr_300px] gap-10 xl:gap-14 items-start">

                    {/* ── Left: description + rules ── */}
                    <div className="space-y-10">

                        {/* Description */}
                        {(examDesc || t.introDesc) && (
                            <section aria-labelledby="section-intro">
                                <h2
                                    id="section-intro"
                                    className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4 pb-3 border-b border-border/40"
                                >
                                    {t.intro}
                                </h2>
                                {examDesc && (
                                    <p className="text-base text-foreground/80 leading-relaxed">
                                        {examDesc}
                                    </p>
                                )}
                                {t.introDesc && (
                                    <p className="text-base text-muted-foreground leading-relaxed mt-4">
                                        {t.introDesc}
                                    </p>
                                )}
                            </section>
                        )}

                        {/* Rules */}
                        {RULES.length > 0 && (
                            <section aria-labelledby="section-rules">
                                <h2
                                    id="section-rules"
                                    className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4 pb-3 border-b border-border/40"
                                >
                                    {t.examNotice}
                                </h2>
                                <ol className="divide-y divide-border/40 border border-border/60 rounded-lg overflow-hidden">
                                    {RULES.map((rule, i) => (
                                        <li key={i} className="flex items-start gap-4 px-5 py-4">
                                            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[0.65rem] font-bold inline-flex items-center justify-center">
                                                {i + 1}
                                            </span>
                                            <span className="text-sm text-foreground/75 leading-relaxed">
                                                {rule}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        )}

                        {/* Mobile CTA — hidden on desktop */}
                        <div className="lg:hidden pt-2">
                            <Link
                                href={`/${lang}/exams/${exam.id}/take`}
                                className="flex items-center justify-center gap-2 w-full h-11 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors"
                            >
                                {t.startDoingExam}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <p className="text-xs text-muted-foreground/55 text-center mt-3">
                                {t.autoGrading} · {t.instantResults}
                            </p>
                        </div>
                    </div>

                    {/* ── Right: sticky summary card — desktop only ── */}
                    <aside className="hidden lg:block" aria-label="Exam summary">
                        <div className="lg:sticky lg:top-[calc(3.5rem+1px)]">
                            <div className="border border-border rounded-xl overflow-hidden">

                                {/* Card header */}
                                <div className="px-5 py-4 bg-muted/[0.3] border-b border-border">
                                    <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground/70">
                                        {t.examInfo}
                                    </p>
                                </div>

                                {/* Meta rows */}
                                <dl className="divide-y divide-border/50 px-5">
                                    {META_ITEMS.map(({ label, value, Icon }) => (
                                        <div
                                            key={label}
                                            className="flex items-center justify-between py-3.5 gap-4"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                                                <dt className="text-sm text-muted-foreground truncate">
                                                    {label}
                                                </dt>
                                            </div>
                                            <dd className="text-sm font-semibold text-foreground tabular-nums flex-shrink-0">
                                                {value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>

                                {/* CTA */}
                                <div className="px-5 py-5 border-t border-border/50 space-y-3">
                                    <Link
                                        href={`/${lang}/exams/${exam.id}/take`}
                                        className="flex items-center justify-center gap-2 w-full h-10 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors"
                                    >
                                        {t.startDoingExam}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <p className="text-xs text-muted-foreground/55 text-center">
                                        {t.autoGrading} · {t.instantResults}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}
