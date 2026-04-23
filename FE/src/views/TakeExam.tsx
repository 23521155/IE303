"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Clock,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

import { examService } from "../services/examService";
import type { ExamDetail, Question } from "../services/examService";
import { Button } from "@/src/components/ui/button";

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
            const timeSpent =
                exam.duration * 60 - Math.max(0, timeLeft);

            const responseData = await examService.submitExam(examId, {
                answers,
                timeSpent,
            });

            localStorage.removeItem(draftKey);
            localStorage.removeItem(`timer_${examId}`);

            router.push(`/${lang}/results/${responseData.attemptId}`);
        } catch (error) {
            console.error(error);
            alert(
                "Vui lòng đăng nhập để nộp bài. Nếu đã đăng nhập thì vui lòng thử lại sau."
            );
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
            <div className="min-h-screen flex items-center justify-center">
                {t.noQuestions}
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const answeredCount = Object.keys(answers).length;
    const progressPercent =
        (answeredCount / questions.length) * 100;

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f19]">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-xl">
                <div className="max-w-[1600px] mx-auto px-6 py-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Left */}
                        <div className="space-y-2">
                            <p className="text-sm text-slate-500">
                                {t.question} {currentQuestionIndex + 1} /{" "}
                                {questions.length}
                            </p>

                            <h1 className="text-2xl font-bold text-secondary dark:text-white line-clamp-1">
                                {typeof exam.title === "string"
                                    ? exam.title
                                    : exam.title[
                                        lang as keyof typeof exam.title
                                        ]}
                            </h1>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <div
                                className={`px-5 py-3 rounded-sm border font-mono font-bold text-lg flex items-center gap-3 ${
                                    timeLeft < 300
                                        ? "bg-red-50 text-red-600 border-red-200"
                                        : "bg-primary/5 text-primary border-primary/20"
                                }`}
                            >
                                <Clock className="h-5 w-5" />
                                {formatTime(timeLeft)}
                            </div>

                            <Button
                                variant={"outline"}
                                onClick={() => {
                                    if (window.confirm(t.confirmSubmit)) {
                                        handleSubmit();
                                    }
                                }}
                                disabled={isSubmitting}
                                className="!h-auto !py-2.5 !px-5 rounded-full font-semibold"
                            >
                                {isSubmitting ? t.submitting : t.submitExam}
                            </Button>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-5">
                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-primary transition-all duration-300"
                                style={{
                                    width: `${progressPercent}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Body */}
            <main className="max-w-[1600px] mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8">
                {/* Question Area */}
                <section className="space-y-6">
                    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 shadow-sm">
                        <div className="mb-8">
                            <div className="inline-flex px-4 py-2 rounded-xl bg-primary/10 text-primary font-semibold mb-5">
                                {t.question} {currentQuestionIndex + 1}
                            </div>

                            <div className="text-2xl font-bold leading-relaxed text-secondary dark:text-white">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
                                        table: ({ node, ...props }) => (
                                            <div className="overflow-x-auto my-6 font-medium text-lg">
                                                <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-700" {...props} />
                                            </div>
                                        ),
                                        th: ({ node, ...props }) => (
                                            <th className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 font-bold" {...props} />
                                        ),
                                        td: ({ node, ...props }) => (
                                            <td className="border border-slate-200 dark:border-slate-700 px-4 py-3" {...props} />
                                        ),
                                    }}
                                >
                                    {currentQuestion.text}
                                </ReactMarkdown>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {currentQuestion.options.map(
                                (option, index) => {
                                    const isSelected =
                                        answers[currentQuestion.id] === index;

                                    return (
                                        <label
                                            key={index}
                                            className={`group cursor-pointer rounded-2xl border p-5 flex items-start gap-4 transition-all duration-200 ${
                                                isSelected
                                                    ? "border-primary bg-primary/5 shadow-sm"
                                                    : "border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                            }`}
                                        >
                                            <div
                                                className={`mt-1 h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                                                    isSelected
                                                        ? "border-primary bg-primary"
                                                        : "border-slate-400"
                                                }`}
                                            >
                                                {isSelected && (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-white" />
                                                )}
                                            </div>

                                            <input
                                                type="radio"
                                                className="hidden"
                                                checked={isSelected}
                                                onChange={() =>
                                                    handleAnswer(
                                                        currentQuestion.id,
                                                        index
                                                    )
                                                }
                                            />

                                            <span
                                                className={`text-lg leading-relaxed ${
                                                    isSelected
                                                        ? "font-medium text-secondary dark:text-white"
                                                        : "text-slate-700 dark:text-slate-300"
                                                }`}
                                            >
                        {option}
                      </span>
                                        </label>
                                    );
                                }
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            disabled={currentQuestionIndex === 0}
                            onClick={() =>
                                setCurrentQuestionIndex((prev) =>
                                    Math.max(0, prev - 1)
                                )
                            }
                            className="!h-auto px-5 py-3 rounded-full"
                        >
                            <ChevronLeft className="h-5 w-5" />
                            {t.prevQuestion}
                        </Button>

                        <Button
                            variant="outline"
                            disabled={
                                currentQuestionIndex ===
                                questions.length - 1
                            }
                            onClick={() =>
                                setCurrentQuestionIndex((prev) =>
                                    Math.min(
                                        questions.length - 1,
                                        prev + 1
                                    )
                                )
                            }
                            className="!h-auto px-5 py-3 rounded-full"
                        >
                            {t.nextQuestion}
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </section>

                {/* Sidebar */}
                <aside>
                    <div className="sticky top-28 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-secondary dark:text-white">
                                {t.questionList}
                            </h3>

                            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                                {answeredCount}/{questions.length}
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-3">
                            {questions.map((q, index) => {
                                const isAnswered =
                                    answers[q.id] !== undefined;
                                const isCurrent =
                                    currentQuestionIndex === index;

                                return (
                                    <button
                                        key={q.id}
                                        onClick={() =>
                                            setCurrentQuestionIndex(index)
                                        }
                                        className={`aspect-square rounded-xl text-sm font-semibold transition-all ${
                                            isCurrent
                                                ? "bg-primary text-white shadow-md"
                                                : isAnswered
                                                    ? "bg-primary/10 text-primary border border-primary/20"
                                                    : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 text-slate-500"
                                        }`}
                                    >
                                        {isAnswered && !isCurrent ? (
                                            <CheckCircle2 className="h-5 w-5 mx-auto" />
                                        ) : (
                                            index + 1
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}