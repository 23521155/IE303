'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { examService, type RatingSummary } from '@/src/services/examService';

export function ExamRatingStars({
    examId,
    t,
    readOnly = false,
}: {
    examId: string;
    t: any;
    readOnly?: boolean;
}) {
    const tr = (key: string) => {
        if (typeof t === 'function') return t(key);
        return t?.[key];
    };

    const [summary, setSummary] = useState<RatingSummary | null>(null);
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await examService.getRatingSummary(examId);
                setSummary(data);
            } catch (e) {
                setSummary(null);
            }
        };
        load();
    }, [examId]);

    const handleRate = async (value: number) => {
        if (readOnly) return;
        if (submitting) return;

        setSubmitting(true);
        try {
            const data = await examService.submitRating(examId, value);
            setSummary(data);
            toast.success(tr('thankYouFeedback') || 'Thank you for your feedback!');
        } catch (e) {
            // ignore
        } finally {
            setSubmitting(false);
        }
    };

    const currentUserRating = summary?.userRating ?? 0;
    const displayUserRating = hoverValue ?? currentUserRating;

    return (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] p-8">
            <div className="flex items-start justify-between gap-8 flex-wrap">
                <div className="min-w-[240px]">
                    {!readOnly && (
                        <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                            {tr('rateExam') || 'Đánh giá đề'}
                        </div>
                    )}
                    {!readOnly && (
                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {tr('clickToRate') || 'Nhấn vào sao để đánh giá'}
                        </div>
                    )}

                    <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                        {(tr('currentRating') || 'Điểm trung bình') + ': '}
                        <span className="font-semibold text-slate-900 dark:text-white">
                            {summary ? `${summary.rating} / 5` : '--'}
                        </span>
                        {summary ? ` (${summary.ratingCount})` : ''}
                    </div>
                </div>

                {!readOnly && (
                    <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, idx) => {
                            const value = idx + 1;
                            const active = value <= displayUserRating;
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    disabled={submitting}
                                    onClick={() => handleRate(value)}
                                    onMouseEnter={() => setHoverValue(value)}
                                    onMouseLeave={() => setHoverValue(null)}
                                    className="p-1.5"
                                    aria-label={`rate-${value}`}
                                >
                                    <Star
                                        className={
                                            'h-8 w-8 transition-colors ' +
                                            (active ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600')
                                        }
                                    />
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {!readOnly && (
                <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                    {summary?.userRating
                        ? (tr('yourRating') || 'Bạn đã đánh giá') + `: ${summary.userRating}/5`
                        : ''}
                </div>
            )}
        </div>
    );
}
