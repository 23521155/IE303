'use client';
import React from 'react';
import {
    BrainCircuit,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Target,
    ChevronRight,
    BarChart2,
    Map,
    Lightbulb,
} from 'lucide-react';
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

interface AICoachTabProps {
    t: any;
    lang: string;
    completedCount: number;
    totalPracticeSeconds: number;
    recentAttempts: AttemptListItem[];
    summaryLoading: boolean;
}

function ProgressBar({ value }: { value: number }) {
    const pct = Math.min(Math.max(value, 0), 100);
    return (
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
            />
        </div>
    );
}

const RECS = {
    low: {
        vi: 'Độ chính xác dưới 60%. Hãy ôn lại kiến thức cơ bản và dùng flashcard trước khi thi thêm.',
        en: 'Accuracy below 60%. Review core concepts and use flashcards before taking more exams.',
        ja: '正答率が60%未満です。基本概念を復習し、フラッシュカードを活用してください。',
    },
    mid: {
        vi: 'Tiến bộ tốt. Xem lại câu sai để xác định chủ đề yếu và đẩy độ chính xác lên trên 80%.',
        en: 'Good progress. Review incorrect answers to identify weak topics and push accuracy above 80%.',
        ja: '良い進捗です。不正解を確認して弱点を特定し、80%以上を目指してください。',
    },
    high: {
        vi: 'Độ chính xác xuất sắc. Tập trung vào quản lý thời gian và thử các đề thi khó hơn.',
        en: 'Excellent accuracy. Focus on time management and challenge yourself with harder exam sets.',
        ja: '優れた正答率です。時間管理に集中し、難易度の高い問題に挑戦してください。',
    },
};

const PATH_STEPS = {
    low: {
        vi: ['Ôn lại lý thuyết cơ bản', 'Dùng flashcard hàng ngày', 'Thử đề dễ hơn', 'Thi thử lại sau 1 tuần'],
        en: ['Review core theory', 'Use flashcards daily', 'Try easier exam sets', 'Retake practice exam after 1 week'],
        ja: ['基本理論を復習', '毎日フラッシュカードを使う', '易しい問題から始める', '1週間後に再挑戦'],
    },
    mid: {
        vi: ['Xem lại câu sai', 'Tập trung vào chủ đề yếu', 'Tăng tốc độ làm bài', 'Thi thử đề khó hơn'],
        en: ['Review wrong answers', 'Focus on weak topics', 'Improve speed', 'Try harder exam sets'],
        ja: ['不正解を確認', '弱点トピックに集中', 'スピードを向上', 'より難しい問題に挑戦'],
    },
    high: {
        vi: ['Thử đề thi thật', 'Tối ưu thời gian làm bài', 'Luyện tập đều đặn', 'Chuẩn bị thi chính thức'],
        en: ['Try real exam sets', 'Optimize exam time', 'Practice consistently', 'Prepare for official exam'],
        ja: ['実際の試験問題に挑戦', '時間管理を最適化', '継続的に練習', '本試験の準備'],
    },
};

function rec(key: keyof typeof RECS, lang: string): string {
    const entry = RECS[key];
    return (entry as Record<string, string>)[lang] ?? entry.vi;
}

function pathSteps(key: keyof typeof PATH_STEPS, lang: string): string[] {
    const entry = PATH_STEPS[key];
    return (entry as Record<string, string[]>)[lang] ?? entry.vi;
}

function LoadingState({ t }: { t: any }) {
    return <p className="text-sm text-muted-foreground py-8 text-center">{t.loading}</p>;
}

function EmptyState({ lang, t }: { lang: string; t: any }) {
    return (
        <div className="border border-border/60 rounded-lg p-8 flex flex-col items-center text-center">
            <BrainCircuit className="w-10 h-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">
                {lang === 'ja' ? '受験履歴がありません' : lang === 'en' ? 'No exam history yet' : 'Chưa có lịch sử thi'}
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
                {lang === 'en'
                    ? 'Complete your first exam to unlock your AI Coach analysis.'
                    : lang === 'ja'
                    ? '最初の試験を受けてAIコーチの分析を解放しましょう。'
                    : 'Hoàn thành bài thi đầu tiên để mở khóa phân tích AI Coach.'}
            </p>
            <Link
                href={`/${lang}/exams`}
                className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-primary hover:underline"
            >
                {t.exploreExams ?? 'Khám phá đề thi'} <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
    );
}

export function AICoachGraphTab({ t, lang, completedCount, totalPracticeSeconds, recentAttempts, summaryLoading }: AICoachTabProps) {
    if (summaryLoading) return <LoadingState t={t} />;

    const hasData = completedCount > 0 && recentAttempts.length > 0;
    const localeTag = lang === 'vi' ? 'vi-VN' : lang === 'ja' ? 'ja-JP' : 'en-US';

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-1">
                    AI Coach
                </p>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-primary" />
                    {lang === 'en' ? 'Knowledge Graph' : lang === 'ja' ? 'ナレッジグラフ' : 'Knowledge Graph'}
                </h2>
            </div>

            {!hasData ? (
                <EmptyState lang={lang} t={t} />
            ) : (
                <>
                    <section>
                        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                            {lang === 'en' ? 'Accuracy by attempt' : lang === 'ja' ? '受験ごとの正答率' : 'Độ chính xác theo lần thi'}
                        </p>
                        <div className="border border-border/60 rounded-lg overflow-hidden divide-y divide-border/40">
                            {recentAttempts.slice(0, 5).map((attempt) => {
                                const acc = attempt.questionCount > 0
                                    ? Math.round((attempt.totalCorrect / attempt.questionCount) * 100)
                                    : 0;
                                const dateStr = attempt.createdAt
                                    ? new Date(attempt.createdAt).toLocaleDateString(localeTag)
                                    : '';
                                const title = attempt.examTitle
                                    ? (attempt.examTitle[lang] ?? attempt.examTitle['en'] ?? '')
                                    : '';
                                return (
                                    <div key={attempt.id} className="px-4 py-3">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-xs text-foreground/70 truncate max-w-[200px]" title={title}>
                                                {title || dateStr}
                                            </span>
                                            <span className="font-mono text-xs font-medium text-foreground">{acc}%</span>
                                        </div>
                                        <ProgressBar value={acc} />
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section>
                        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                            {lang === 'en' ? 'Full graph visualization' : lang === 'ja' ? '詳細グラフ' : 'Biểu đồ chi tiết'}
                        </p>
                        <div className="border border-border/60 rounded-lg p-6 flex flex-col items-center text-center gap-2">
                            <BarChart2 className="w-8 h-8 text-muted-foreground/40" />
                            <p className="text-sm text-muted-foreground">
                                {lang === 'en'
                                    ? 'Knowledge graph visualization is coming soon.'
                                    : lang === 'ja'
                                    ? '知識グラフの可視化は近日公開予定です。'
                                    : 'Trực quan hóa knowledge graph sẽ ra mắt sớm.'}
                            </p>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

export function AICoachPathTab({ t, lang, completedCount, totalPracticeSeconds, recentAttempts, summaryLoading }: AICoachTabProps) {
    if (summaryLoading) return <LoadingState t={t} />;

    const hasData = completedCount > 0 && recentAttempts.length > 0;

    const avgAccuracy = hasData
        ? Math.round(
              recentAttempts.reduce(
                  (sum, a) => sum + (a.questionCount > 0 ? (a.totalCorrect / a.questionCount) * 100 : 0),
                  0
              ) / recentAttempts.length
          )
        : 0;

    const tier: keyof typeof PATH_STEPS = avgAccuracy < 60 ? 'low' : avgAccuracy < 80 ? 'mid' : 'high';

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-1">
                    AI Coach
                </p>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Map className="w-4 h-4 text-primary" />
                    {lang === 'en' ? 'Learning Path' : lang === 'ja' ? '学習パス' : 'Lộ trình học'}
                </h2>
            </div>

            {!hasData ? (
                <EmptyState lang={lang} t={t} />
            ) : (
                <>
                    <section>
                        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                            {lang === 'en' ? 'Recommended next steps' : lang === 'ja' ? '推奨ステップ' : 'Bước tiếp theo được đề xuất'}
                        </p>
                        <div className="border border-border/60 rounded-lg overflow-hidden divide-y divide-border/40">
                            {pathSteps(tier, lang).map((step, i) => (
                                <div key={i} className="px-4 py-3 flex items-center gap-3">
                                    <span className="font-mono text-xs text-primary/60 shrink-0 w-5 text-right">{i + 1}</span>
                                    <span className="text-sm text-foreground">{step}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                            {lang === 'en' ? 'AI recommendation' : lang === 'ja' ? 'AIアドバイス' : 'Lời khuyên từ AI'}
                        </p>
                        <div className="border border-border/60 rounded-lg p-4 flex items-start gap-3">
                            {avgAccuracy < 60 ? (
                                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            ) : (
                                <Target className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            )}
                            <p className="text-sm text-foreground">{rec(tier, lang)}</p>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

export function AICoachInsightTab({ t, lang, completedCount, totalPracticeSeconds, recentAttempts, summaryLoading }: AICoachTabProps) {
    if (summaryLoading) return <LoadingState t={t} />;

    const hasData = completedCount > 0 && recentAttempts.length > 0;

    const avgAccuracy = hasData
        ? Math.round(
              recentAttempts.reduce(
                  (sum, a) => sum + (a.questionCount > 0 ? (a.totalCorrect / a.questionCount) * 100 : 0),
                  0
          ) / recentAttempts.length
          )
        : 0;

    const trendDelta =
        hasData && recentAttempts.length >= 2
            ? (() => {
                  const oldest = recentAttempts[recentAttempts.length - 1];
                  const newest = recentAttempts[0];
                  const oldAcc = oldest.questionCount > 0 ? (oldest.totalCorrect / oldest.questionCount) * 100 : 0;
                  const newAcc = newest.questionCount > 0 ? (newest.totalCorrect / newest.questionCount) * 100 : 0;
                  return Math.round(newAcc - oldAcc);
              })()
            : null;

    const totalHours = Math.round((totalPracticeSeconds / 3600) * 10) / 10;

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-1">
                    AI Coach
                </p>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    {lang === 'en' ? 'Performance Insight' : lang === 'ja' ? 'パフォーマンス分析' : 'Phân tích hiệu suất'}
                </h2>
            </div>

            {!hasData ? (
                <EmptyState lang={lang} t={t} />
            ) : (
                <>
                    <section>
                        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                            {lang === 'en' ? 'Overview' : lang === 'ja' ? '概要' : 'Tổng quan'}
                        </p>
                        <div className="border border-border/60 rounded-lg overflow-hidden divide-y divide-border/40">
                            <div className="px-4 py-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-foreground">
                                        {lang === 'en' ? 'Average accuracy' : lang === 'ja' ? '平均正答率' : 'Độ chính xác trung bình'}
                                    </span>
                                    <span className="font-mono text-sm font-medium text-foreground">{avgAccuracy}%</span>
                                </div>
                                <ProgressBar value={avgAccuracy} />
                            </div>

                            {trendDelta !== null && (
                                <div className="px-4 py-3 flex items-center justify-between">
                                    <span className="text-sm text-foreground">
                                        {lang === 'en' ? 'Trend vs. first attempt' : lang === 'ja' ? 'トレンド（初回比）' : 'Xu hướng so với lần đầu'}
                                    </span>
                                    <span className={`font-mono text-sm font-medium flex items-center gap-1 ${
                                        trendDelta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
                                    }`}>
                                        {trendDelta >= 0 ? '+' : ''}{trendDelta}%
                                        {trendDelta >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                    </span>
                                </div>
                            )}

                            <div className="px-4 py-3 flex items-center justify-between">
                                <span className="text-sm text-foreground">{t.completedExams ?? 'Completed Exams'}</span>
                                <span className="font-mono text-sm font-medium text-foreground">{completedCount}</span>
                            </div>

                            <div className="px-4 py-3 flex items-center justify-between">
                                <span className="text-sm text-foreground">
                                    {lang === 'en' ? 'Total study time' : lang === 'ja' ? '総学習時間' : 'Tổng thời gian học'}
                                </span>
                                <span className="font-mono text-sm font-medium text-foreground">{totalHours}h</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-3">
                            {lang === 'en' ? 'Editorial' : lang === 'ja' ? '編集後記' : 'Nhận xét'}
                        </p>
                        <div className="border border-border/60 rounded-lg p-4 flex items-start gap-3">
                            <BrainCircuit className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground">
                                {lang === 'en'
                                    ? 'Full AI Coach analysis — Knowledge Graph and Learning Path — is coming soon.'
                                    : lang === 'ja'
                                    ? 'AIコーチの詳細分析（知識グラフ、学習パス）は近日公開予定です。'
                                    : 'Phân tích đầy đủ của AI Coach (Knowledge Graph, Learning Path) sẽ ra mắt sớm.'}
                            </p>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
