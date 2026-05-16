'use client';
import React, { useState } from 'react';
import { Layers, JapaneseYen, Monitor, Database, BrainCircuit, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AnimateInView from '@/src/animation/AnimateInView';
import { motion } from 'framer-motion';

// Dữ liệu mock cho các bộ Flashcard — UNCHANGED
const FLASHCARD_DECKS = [
    {
        id: '1',
        title: 'Từ vựng IT Passport cơ bản',
        category: 'IT Passport',
        icon: <Monitor className="w-6 h-6 text-primary" />,
        cardsCount: 150,
        author: 'Fizz',
        thumbnail:
            'https://images.unsplash.com/photo-1763568258605-6783d4fad7b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwSVQlMjBwcm9ncmFtbWluZyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MzM3MDk2OHww&ixlib=rb-4.1.0&q=80&w=1080',
        color: 'bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800',
        tags: ['Strategy', 'Management', 'Technology'],
    },
    {
        id: '2',
        title: 'Fundamental Information Technology (FE)',
        category: 'FE Exam',
        icon: <Database className="w-6 h-6 text-primary" />,
        cardsCount: 320,
        author: 'Fizz',
        thumbnail:
            'https://images.unsplash.com/photo-1763568258605-6783d4fad7b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwSVQlMjBwcm9ncmFtbWluZyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MzM3MDk2OHww&ixlib=rb-4.1.0&q=80&w=1080',
        color: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-100 dark:border-indigo-800',
        tags: ['Algorithms', 'Hardware', 'Network'],
    },
    {
        id: '3',
        title: 'Từ vựng JLPT N3 - Trọng tâm',
        category: 'Tiếng Nhật',
        icon: <JapaneseYen className="w-6 h-6 text-primary" />,
        cardsCount: 500,
        author: 'Fu',
        thumbnail:
            'https://images.unsplash.com/photo-1627348440972-1c9eed5543ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMGphcGFuZXNlJTIwZmxhc2hjYXJkc3xlbnwxfHx8fDE3NzMzNzA5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        color: 'bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-800',
        tags: ['Kanji', 'Vocab', 'Daily'],
    },
    {
        id: '4',
        title: 'Ngữ pháp Tiếng Nhật ứng dụng trong IT',
        category: 'Tiếng Nhật IT',
        icon: <BrainCircuit className="w-6 h-6 text-primary" />,
        cardsCount: 85,
        author: 'Tài',
        thumbnail:
            'https://images.unsplash.com/photo-1627348440972-1c9eed5543ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMGphcGFuZXNlJTIwZmxhc2hjYXJkc3xlbnwxfHx8fDE3NzMzNzA5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        color: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800',
        tags: ['Communication', 'Email', 'Meeting'],
    },
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const gridVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07, delayChildren: 0.04 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.65, ease: EASE_OUT_EXPO },
    },
};

export function FlashcardDecks({ t, lang }: { t: any; lang: string }) {
    // useState filtering logic — UNCHANGED
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'IT Passport', 'FE Exam', 'Tiếng Nhật', 'Tiếng Nhật IT'];

    const filteredDecks =
        activeCategory === 'All' ? FLASHCARD_DECKS : FLASHCARD_DECKS.filter((deck) => deck.category === activeCategory);

    return (
        <main className="bg-background min-h-screen transition-colors duration-300">
            {/* ─── Hero section ─────────────────────────────────────────────── */}
            <section className="relative pt-20 pb-10 overflow-hidden">
                {/* Ambient amber glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(232, 121, 33, 0.09) 0%, transparent 65%)',
                    }}
                />
                {/* Dot-grid texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, var(--color-secondary) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <AnimateInView>
                        <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide mb-4">
                            {t.flashcardBadge ?? t.flashcardLib}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary dark:text-foreground mb-3">
                            {t.flashcardLib}
                        </h1>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-xl">{t.flashcardDesc}</p>
                    </AnimateInView>
                </div>
            </section>

            {/* ─── Sticky unified toolbar ───────────────────────────────────── */}
            <div className="sticky top-14 z-20 bg-[#fef8f4] dark:bg-muted/[0.08] border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="flex items-stretch h-12 overflow-x-auto"
                        style={{ scrollbarWidth: 'none' }}
                        aria-label="Filter by category"
                    >
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat;
                            const count =
                                cat === 'All'
                                    ? FLASHCARD_DECKS.length
                                    : FLASHCARD_DECKS.filter((d) => d.category === cat).length;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setActiveCategory(cat)}
                                    aria-pressed={isActive}
                                    className={`relative shrink-0 h-full px-3.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary/40 flex items-center gap-1.5 cursor-pointer ${
                                        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <span>{cat === 'All' ? t.cat_all : cat}</span>
                                    <span
                                        className={`text-[0.65rem] tabular-nums leading-none transition-colors ${
                                            isActive ? 'text-primary/60' : 'text-muted-foreground/40'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                    {isActive && (
                                        <motion.span
                                            layoutId="tab-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                                            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ─── Card grid ────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                    key={activeCategory}
                >
                    {filteredDecks.map((deck) => (
                        <motion.div
                            key={deck.id}
                            variants={cardVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
                            className="group rounded-xl border border-[rgba(0,0,0,0.1)] dark:border-white/10 bg-white dark:bg-[#1a1a1a] overflow-hidden hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col"
                        >
                            {/* Top visual area */}
                            <div className="h-28 bg-primary/5 dark:bg-primary/[0.12] relative overflow-hidden flex items-center justify-center">
                                {/* Faded background texture */}
                                <div className="absolute inset-0 opacity-[0.05]">
                                    <img
                                        src={deck.thumbnail}
                                        alt=""
                                        aria-hidden="true"
                                        className="w-full h-full object-cover grayscale"
                                    />
                                </div>
                                {/* Icon in a grounded container */}
                                <div className="relative z-10 bg-background/80 dark:bg-[#111827]/80 p-3 rounded-xl border border-border/50 group-hover:border-primary/30 transition-colors">
                                    {deck.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-2.5 gap-2">
                                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground/60">
                                        {deck.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-[0.65rem] font-mono tabular-nums text-muted-foreground/50 bg-muted/50 px-1.5 py-0.5 rounded flex-shrink-0">
                                        <Layers className="w-3 h-3" />
                                        {deck.cardsCount} {t.cards}
                                    </span>
                                </div>

                                <h3 className="text-[0.9375rem] font-semibold leading-snug text-secondary dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                                    {deck.title}
                                </h3>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {deck.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[0.6rem] font-medium bg-muted/50 text-muted-foreground/70 border border-border/40 px-2 py-0.5 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground/60">
                                        {t.createdBy}{' '}
                                        <span className="font-medium text-foreground/70">{deck.author}</span>
                                    </p>
                                    <Link
                                        href={`/${lang}/flashcards/${deck.id}`}
                                        className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                                    >
                                        {t.studyNow}
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredDecks.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground py-20">
                        {t.noFlashcards ?? 'Không có bộ thẻ nào.'}
                    </p>
                )}
            </div>
        </main>
    );
}
