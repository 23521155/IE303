'use client';
import React from 'react';
import { Calendar, Clock, CheckCircle, ChevronRight, FileText } from 'lucide-react';
import Link from 'next/link';

type AttemptListItem = {
    id: string;
    examId: string;
    examTitle: Record<string, string> | null;
    score: number;
    totalCorrect: number;
    questionCount: number;
    timeSpentSeconds: number;
    createdAt: string;
};

interface HistoryTabProps {
    t: any;
    lang: string;
    recentAttempts: AttemptListItem[];
    summaryLoading: boolean;
    summaryError: string | null;
    isMyProfile: boolean;
}

function pickExamTitle(title: Record<string, string> | null | undefined, lang: string): string {
    if (!title) return '';
    const key = lang in title ? lang : 'vi';
    return title[key] || title.vi || title.en || Object.values(title)[0] || '';
}

function formatDuration(seconds: number, lang: string): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (lang === 'en') return m > 0 ? `${m}m${s ? ` ${s}s` : ''}` : `${s}s`;
    if (lang === 'ja') return m > 0 ? `${m}分${s ? `${s}秒` : ''}` : `${s}秒`;
    return m > 0 ? `${m} phút${s ? ` ${s}s` : ''}` : `${s}s`;
}

function getMaxScore(examId: string): number {
    const l = examId?.toLowerCase() ?? '';
    return l.includes('it-passport') || l.includes('fe') || l.includes('sg') ? 1000 : 100;
}

export function HistoryTab({ t, lang, recentAttempts, summaryLoading, summaryError, isMyProfile }: HistoryTabProps) {
    const localeTag = lang === 'vi' ? 'vi-VN' : lang === 'ja' ? 'ja-JP' : 'en-US';

    if (summaryLoading) {
        return <p className="text-sm text-muted-foreground py-8 text-center">{t.loading}</p>;
    }

    if (summaryError) {
        return <p className="text-sm text-destructive py-4 text-center">{t.activityLoadFailed}</p>;
    }

    if (recentAttempts.length === 0) {
        return (
            <div className="flex flex-col items-center py-16 text-center">
                <FileText className="w-10 h-10 text-border mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">{t.noCompletedExamsYet}</p>
                <p className="text-sm text-muted-foreground mb-5">
                    {t.noCompletedExamsYetDesc ?? 'Hãy thử sức với một đề thi ngay hôm nay!'}
                </p>
                <Link
                    href={`/${lang}/exams`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                    {t.exploreExams ?? 'Khám phá đề thi'} <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    return (
        <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-5">
                {recentAttempts.length}{' '}
                {lang === 'ja' ? '回の受験' : lang === 'en' ? 'attempts' : 'lần thi gần đây'}
            </p>

            <div className="divide-y divide-border/40">
                {recentAttempts.map((exam) => {
                    const dateStr = exam.createdAt
                        ? new Date(exam.createdAt).toLocaleDateString(localeTag)
                        : '';
                    const timeStr = formatDuration(exam.timeSpentSeconds ?? 0, lang);
                    const title = pickExamTitle(exam.examTitle, lang) || exam.examId;
                    const maxScore = getMaxScore(exam.examId);
                    const accuracy =
                        exam.questionCount > 0
                            ? Math.round((exam.totalCorrect / exam.questionCount) * 100)
                            : 0;

                    return (
                        <div key={exam.id} className="py-4 flex items-center justify-between gap-4 group">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                    {title}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 mt-1">
                                    <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {dateStr}
                                    </span>
                                    <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {timeStr}
                                    </span>
                                    <span className="font-mono text-xs flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                                        <CheckCircle className="w-3 h-3" />
                                        {accuracy}%
                                    </span>
                                </div>
                            </div>

                            <div className="text-right shrink-0">
                                <p className="text-sm font-semibold text-foreground">
                                    {exam.score}
                                    <span className="text-xs font-normal text-muted-foreground"> / {maxScore}</span>
                                </p>
                                <p className="font-mono text-xs text-muted-foreground">
                                    {exam.totalCorrect}/{exam.questionCount}
                                </p>
                            </div>

                            {isMyProfile && (
                                <Link
                                    href={`/${lang}/exams/${exam.examId}/results/${exam.id}`}
                                    className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
