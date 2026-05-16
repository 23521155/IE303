"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { examService } from "../services/examService";
import type { ExamDetail, Question } from "../services/examService";
import { toast } from 'sonner';

interface TakeExamProps {
    t: any;
    lang: string;
    examId: string;
    exam: ExamDetail;
    questions: Question[];
    draftKey: string;
}

export function TakeExam({
    t,
    lang,
    examId,
    exam,
    questions,
    draftKey,
}: TakeExamProps) {
    const router = useRouter();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!exam) return;

        const savedTime = localStorage.getItem(`timer_${examId}`);

        if (savedTime) {
            setTimeLeft(parseInt(savedTime, 10));
        } else {
            setTimeLeft(exam.duration * 60);
        }

        const savedDraft = localStorage.getItem(draftKey);

        if (savedDraft) {
            try {
                setAnswers(JSON.parse(savedDraft));
            } catch (e) {
                console.error(e);
            }
        }
    }, [exam, examId, draftKey]);

    useEffect(() => {
        if (!exam || timeLeft <= 0 || isSubmitting) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                const next = prev - 1;

                localStorage.setItem(`timer_${examId}`, next.toString());

                if (next <= 0) {
                    clearInterval(timer);
                    handleSubmit();
                }

                return next;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [exam, timeLeft, isSubmitting]);

    const handleAnswer = (questionId: string, optionIndex: number) => {
        const newAnswers = {
            ...answers,
            [questionId]: optionIndex,
        };

        setAnswers(newAnswers);
        localStorage.setItem(draftKey, JSON.stringify(newAnswers));
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const timeSpent = exam.duration * 60 - Math.max(0, timeLeft);

            const responseData = await examService.submitExam(examId, {
                answers,
                timeSpent,
            });

            localStorage.removeItem(draftKey);
            localStorage.removeItem(`timer_${examId}`);

            router.push(`/${lang}/exams/${examId}/results/${responseData.attemptId}`);
        } catch (error) {
            console.error(error);
            toast.error(t.requireLoginSubmit);
            setIsSubmitting(false);
        }
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        if (h > 0) {
            return `${h.toString().padStart(2, "0")}:${m
                .toString()
                .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        }

        return `${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`;
    };

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-sm text-muted-foreground">
                {t.noQuestions}
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const answeredCount = Object.keys(answers).length;
    const progressPercent = (answeredCount / questions.length) * 100;

    const questionTopRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (questionTopRef.current) {
            questionTopRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [currentQuestionIndex]);

    return (
        <div className="min-h-screen bg-background">


            {/* ─── Sticky header ─────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 bg-[#fffcfb] border-b border-border/60">
                {/* Ultra-thin progress bar pinned to top of header */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-border/30">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
                    <div className="flex items-center h-14 gap-4">

                        {/* Left: question counter + exam title */}
                        <div className="flex-1 min-w-0 flex items-center gap-3">
                            <span className="flex-shrink-0 text-sm font-medium text-muted-foreground whitespace-nowrap">
                                <span className="font-bold text-foreground tabular-nums">
                                    {currentQuestionIndex + 1}
                                </span>
                                <span className="mx-0.5 text-border">/</span>
                                <span className="tabular-nums">{questions.length}</span>
                            </span>
                            <div className="w-px h-4 bg-border flex-shrink-0" />
                            <h1 className="text-sm text-muted-foreground truncate">
                                {typeof exam.title === "string"
                                    ? exam.title
                                    : exam.title[lang as keyof typeof exam.title]}
                            </h1>
                        </div>

                        {/* Right: timer + divider + submit */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <div
                                className={`flex items-center gap-1.5 font-mono text-sm font-semibold tabular-nums ${
                                    timeLeft < 300 ? 'text-red-500' : 'text-foreground/80'
                                }`}
                            >
                                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                {formatTime(timeLeft)}
                            </div>
                            <div className="w-px h-4 bg-border flex-shrink-0" />
                            <button
                                onClick={() => {
                                    if (window.confirm(t.confirmSubmit)) {
                                        handleSubmit();
                                    }
                                }}
                                disabled={isSubmitting}
                                className="h-8 px-3.5 text-sm font-medium bg-primary text-white hover:bg-primary/90 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isSubmitting ? t.submitting : t.submitExam}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ─── Body ──────────────────────────────────────────────────── */}

            <main className="max-w-[1600px] bg-[#fefdfc] mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

                {/* ── Question area ── */}
                <section ref={questionTopRef} className="space-y-5 scroll-mt-32">

                    {/* Question card */}
                    <div className="rounded-xl border border-[rgba(0,0,0,0.09)] dark:border-white/[0.08] bg-white dark:bg-[#111827] p-8">

                        {/* Question number */}
                        <div className="mb-6">
                            <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded px-2.5 py-1">
                                {t.question} {currentQuestionIndex + 1}
                            </span>
                        </div>

                        {/* Question text */}
                        <div className="text-[1.0625rem] leading-[1.8] text-foreground mb-8 [&_strong]:font-semibold [&_code]:text-sm [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
                                rehypePlugins={[rehypeRaw, rehypeKatex]}
                                components={{
                                    p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
                                    table: ({ node, ...props }) => (
                                        <div className="overflow-x-auto my-6">
                                            <table className="w-full text-left border-collapse border border-border" {...props} />
                                        </div>
                                    ),
                                    th: ({ node, ...props }) => (
                                        <th className="border border-border bg-muted/50 px-4 py-2.5 text-sm font-semibold" {...props} />
                                    ),
                                    td: ({ node, ...props }) => (
                                        <td className="border border-border px-4 py-2.5 text-sm" {...props} />
                                    ),
                                    img: ({ node, ...props }) => (
                                        <img
                                            className="max-w-full h-auto rounded-lg border border-border my-4 mx-auto"
                                            {...props}
                                            alt={props.alt || "Question Image"}
                                        />
                                    ),
                                }}
                            >
                                {currentQuestion.text}
                            </ReactMarkdown>
                        </div>

                        {/* Answer options */}
                        <div className="space-y-2.5">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = answers[currentQuestion.id] === index;

                                return (
                                    <label
                                        key={index}
                                        className={`group cursor-pointer rounded-lg border px-4 py-3.5 flex items-start gap-3.5 transition-colors duration-150 ${
                                            isSelected
                                                ? 'border-primary/40 bg-primary/[0.05] dark:bg-primary/[0.09]'
                                                : 'border-border/60 hover:border-border hover:bg-muted/40 dark:hover:bg-white/[0.025]'
                                        }`}
                                    >
                                        {/* Custom radio dot */}
                                        <div
                                            className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                                                isSelected
                                                    ? 'border-primary'
                                                    : 'border-border group-hover:border-muted-foreground'
                                            }`}
                                        >
                                            {isSelected && (
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                            )}
                                        </div>

                                        <input
                                            type="radio"
                                            className="sr-only"
                                            checked={isSelected}
                                            onChange={() => handleAnswer(currentQuestion.id, index)}
                                        />

                                        <span
                                            className={`text-[0.9375rem] leading-relaxed flex-1 ${
                                                isSelected
                                                    ? 'text-foreground font-medium'
                                                    : 'text-foreground/75'
                                            }`}
                                        >
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
                                                rehypePlugins={[rehypeRaw, rehypeKatex]}
                                                components={{
                                                    p: ({ node, ...props }) => <span {...props} />,
                                                    img: ({ node, ...props }) => (
                                                        <img
                                                            className="max-w-full h-auto rounded-lg"
                                                            {...props}
                                                            alt={props.alt || "Option Image"}
                                                        />
                                                    ),
                                                }}
                                            >
                                                {option}
                                            </ReactMarkdown>
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Prev / Next navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                            className="flex items-center gap-1.5 h-9 px-4 text-sm font-medium text-muted-foreground border border-border/60 rounded-md hover:text-foreground hover:border-border hover:bg-muted/40 transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            {t.prevQuestion}
                        </button>

                        <button
                            disabled={currentQuestionIndex === questions.length - 1}
                            onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                            className="flex items-center gap-1.5 h-9 px-4 text-sm font-medium text-muted-foreground border border-border/60 rounded-md hover:text-foreground hover:border-border hover:bg-muted/40 transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                        >
                            {t.nextQuestion}
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </section>

                {/* ── Question navigator sidebar ── */}
                <aside>
                    <div className="lg:sticky lg:top-[calc(3.5rem+1px)]">
                        <div className="rounded-xl border border-[rgba(0,0,0,0.09)] dark:border-white/[0.08] bg-white dark:bg-[#111827] overflow-hidden">

                            {/* Sidebar header */}
                            <div className="px-4 py-3.5 bg-muted/[0.3] border-b border-border flex items-center justify-between">
                                <h3 className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground/70">
                                    {t.questionList}
                                </h3>
                                <span className="text-xs tabular-nums font-semibold text-foreground">
                                    {answeredCount}
                                    <span className="text-muted-foreground font-normal">
                                        /{questions.length}
                                    </span>
                                </span>
                            </div>

                            {/* Number grid */}
                            <div className="p-4">
                                <div className="grid grid-cols-8 gap-1.5">
                                    {questions.map((q, index) => {
                                        const isAnswered = answers[q.id] !== undefined;
                                        const isCurrent = currentQuestionIndex === index;

                                        return (
                                            <button
                                                key={q.id}
                                                onClick={() => setCurrentQuestionIndex(index)}
                                                className={`h-7 w-full text-[0.7rem] font-medium rounded-sm transition-colors ${
                                                    isCurrent
                                                        ? 'bg-primary text-white'
                                                        : isAnswered
                                                        ? 'bg-secondary/90 dark:bg-secondary/70 text-white hover:bg-secondary dark:hover:bg-secondary/90'
                                                        : 'border border-border/60 text-foreground/50 hover:border-border hover:text-foreground hover:bg-muted/40'
                                                }`}
                                            >
                                                {index + 1}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* State legend */}
                                <div className="mt-4 pt-3.5 border-t border-border/40 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                                    <span className="flex items-center gap-1.5 text-[0.65rem] text-muted-foreground/60">
                                        <span className="w-3 h-3 rounded-sm border border-border/60 inline-block flex-shrink-0" />
                                        {t.unanswered}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[0.65rem] text-muted-foreground/60">
                                        <span className="w-3 h-3 rounded-sm bg-secondary/80 inline-block flex-shrink-0" />
                                        {t.answered}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[0.65rem] text-muted-foreground/60">
                                        <span className="w-3 h-3 rounded-sm bg-primary inline-block flex-shrink-0" />
                                        {t.currentQuestion}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

            </main>
        </div>
    );
}
