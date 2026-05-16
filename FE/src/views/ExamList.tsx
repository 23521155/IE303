'use client';
import { useState, useMemo } from 'react';
import {Search, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Category, Exam } from '../services/examService';
import type { Locale } from '@/src/utils/i18n';
import { Button } from '@/src/components/ui/button';
import AnimateInView from '@/src/animation/AnimateInView';
import { motion } from 'framer-motion';
import RegularExamCard from '@/src/components/ui/regular-exam-card';
import FeaturedExamCard from '@/src/components/ui/featured-exam-card';


const gridVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07, delayChildren: 0.04 },
    },
};



export function ExamList({ t, lang, examsData, categoriesData }: { t: any; lang: string; examsData: Exam[]; categoriesData: Category[] }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [{ id: 'all', name: t.catAll ?? 'Tất cả' }, ...categoriesData];

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { all: examsData.length };
        categoriesData.forEach((cat) => {
            counts[cat.id] = examsData.filter((e) => e.category.id === cat.id).length;
        });
        return counts;
    }, [examsData, categoriesData]);

    const filteredExams = examsData.filter((exam) => {
        const matchesCategory = activeCategory === 'all' || exam.category.id === activeCategory;
        const title = typeof exam.title === 'string' ? exam.title : exam.title[lang as Locale];
        const desc = typeof exam.description === 'string' ? exam.description : exam.description[lang as Locale];
        const matchesSearch =
            title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });


    return (
        <main className="bg-background min-h-screen transition-colors duration-300">

            {/* ─── Header — pure identity, no controls ──────────────────────────── */}
            <section className="relative pt-20 pb-8 overflow-hidden">
                {/* Ambient amber glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(232, 121, 33, 0.09) 0%, transparent 65%)',
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
                            {t.examLibBadge ?? t.examLibrary}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary dark:text-foreground mb-3">
                            {t.examLibrary}
                        </h1>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
                            {t.examLibDesc}
                        </p>
                    </AnimateInView>
                </div>
            </section>

            {/* ─── Unified toolbar — sticky ─────────────────────────────────────── */}
            <div className="sticky top-14 z-20 bg-[#fef8f4] dark:bg-muted/[0.08] border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-stretch h-12">

                        {/* Left: category tabs with count badges, spring underline */}
                        <div
                            className="flex items-stretch flex-1 min-w-0 overflow-x-auto"
                            style={{ scrollbarWidth: 'none' }}
                            aria-label={t.filterByCategory ?? 'Filter by category'}
                        >
                            {categories.map((cat) => {
                                const isActive = activeCategory === cat.id;
                                const count = categoryCounts[cat.id] ?? 0;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setActiveCategory(cat.id)}
                                        aria-pressed={isActive}
                                        className={`relative shrink-0 h-full px-3.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary/40 flex items-center gap-1.5 cursor-pointer ${
                                            isActive
                                                ? 'text-foreground'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        <span>{t[`cat_${cat.id}`] || cat.name}</span>
                                        <span className={`text-[0.65rem] tabular-nums leading-none transition-colors ${
                                            isActive ? 'text-primary/60' : 'text-muted-foreground/40'
                                        }`}>
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

                        {/* Vertical separator */}
                        <div className="hidden md:block w-px my-2.5 bg-border/60 flex-shrink-0 mx-3" />

                        {/* Right controls — desktop */}
                        <div className="hidden md:flex items-center gap-2 flex-shrink-0">

                            {/* Search — primary command surface */}
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder={t.searchExams}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    aria-label={t.searchExams}
                                    className="h-8 w-56 pl-8 pr-6 text-xs border border-border/60 rounded-md bg-background placeholder:text-muted-foreground/50 focus:outline-none focus:bg-background focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all duration-150"
                                />
                                {!searchQuery && (
                                    <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[0.6rem] text-muted-foreground/35 font-mono select-none pointer-events-none hidden xl:block">
                                        /
                                    </kbd>
                                )}
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        aria-label="Clear search"
                                        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors text-sm leading-none cursor-pointer"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>

                            {/* Sort — chevron signals interactivity */}
                            <button
                                type="button"
                                className="flex items-center gap-1 h-8 px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/60 rounded-md bg-background/70 hover:bg-background transition-colors focus:outline-none focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
                            >
                                <ArrowUpDown className="w-3 h-3 flex-shrink-0 opacity-70" />
                                <span>{t.latest ?? 'Mới nhất'}</span>
                                <ChevronDown className="w-3 h-3 flex-shrink-0 opacity-40" />
                            </button>

                            {/* Thin divider */}
                            <div className="w-px h-4 bg-border/50" />

                            {/* Result count */}
                            <span className="text-xs tabular-nums whitespace-nowrap">
                                <span className="text-foreground/80 font-medium">{filteredExams.length}</span>
                                <span className="text-muted-foreground/50"> {t.examsCount}</span>
                            </span>
                        </div>

                        {/* Mobile: result count only */}
                        <div className="flex md:hidden items-center pl-2 flex-shrink-0">
                            <span className="text-xs text-muted-foreground/60 tabular-nums">
                                {filteredExams.length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile search — non-sticky row below toolbar ───────────────────── */}
            <div className="md:hidden border-b border-border/60 bg-background">
                <div className="max-w-7xl mx-auto px-4 py-2.5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input
                            type="text"
                            placeholder={t.searchExams}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label={t.searchExams}
                            className="w-full h-9 pl-9 pr-4 text-sm bg-muted/40 dark:bg-white/5 border border-transparent rounded-md placeholder:text-muted-foreground/60 focus:outline-none focus:bg-background focus:border-border transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* ─── Grid ─────────────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="pt-8" />

                {filteredExams.length > 0 ? (
                    <motion.div
                        key={`${activeCategory}-${searchQuery}`}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {filteredExams.map((exam, index) =>
                            index === 0 ? (
                                <FeaturedExamCard key={exam.id} exam={exam} lang={lang} t={t} index={index} />
                            ) : (
                                <RegularExamCard key={exam.id} exam={exam} lang={lang} t={t} index={index} />
                            )
                        )}
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                            <Search className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-lg font-semibold text-secondary dark:text-foreground mb-2">
                            {t.noResults}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                            {t.noResultsDesc}
                            {searchQuery && (
                                <> <span className="font-medium text-secondary dark:text-foreground">"{searchQuery}"</span></>
                            )}
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                        >
                            {t.clearFilter}
                        </Button>
                    </div>
                )}
            </div>
        </main>
    );
}
