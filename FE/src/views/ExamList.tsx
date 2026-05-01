'use client';
import {useState} from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Filter, Search, Users} from 'lucide-react';
import {Category, Exam} from '../services/examService';
import type {Locale} from '@/src/utils/i18n'
import { Button }  from '@/src/components/ui/button'
import Image from 'next/image';
export function ExamList({ t, lang, examsData, categoriesData }: { t: any; lang: string; examsData: Exam[]; categoriesData: Category[] }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const language = lang;

    const exams = examsData;
    const categories = [{id: "all", name: "Tất cả"}, ...categoriesData]

    const filteredExams = exams.filter((exam) => {
        const matchesCategory = activeCategory === 'all' || exam.category.id === activeCategory;

        const title = typeof exam.title === 'string' ? exam.title : exam.title[language as Locale];
        const desc = typeof exam.description === 'string' ? exam.description : exam.description[language as Locale];

        const matchesSearch =
            title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });


    return (
        <main className="bg-slate-50 dark:bg-[#121212] min-h-screen pt-10 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-secondary dark:text-white mb-4 tracking-tight">
                        {t.examLibrary}
                    </h1>
                    <p className="text-lg text-secondary dark:text-slate-400 max-w-2xl mx-auto">{t.examLibDesc}</p>
                </div>

                {/* Search and Filter */}
                <div className="bg-background border border-border rounded-2xl p-4 mb-8 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">

                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                            <input
                                type="text"
                                aria-label={t.searchExams}
                                placeholder={t.searchExams}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="
          w-full pl-10 pr-4 py-2.5
          bg-muted/40
          border border-border
          rounded-xl
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-primary/40
          focus:border-primary
          transition
        "
                            />
                        </div>

                        {/* Categories */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    variant={activeCategory === category.id ? 'default' : 'outline'}
                                    aria-pressed={activeCategory === category.id}
                                >
                                    {t[`cat_${category.id}`] || category.name}
                                </Button>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Results */}
                <div className="mb-6 flex justify-between items-center text-secondary dark:text-slate-400 font-medium">
                    <span>
                        {t.found}
                        <strong className="text-primary dark:text-blue-400 mx-1">{filteredExams.length}</strong>
                        {t.examsCount}
                    </span>
                    <button className="flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 transition-colors bg-white dark:bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm text-sm">
                        <Filter className="h-4 w-4" /> {t.latest}
                    </button>
                </div>

                {filteredExams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredExams.map((exam) => (
                            <article
                                key={exam.id}
                                className="relative h-[420px] rounded-md overflow-hidden group shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                            >
                                {/* Image */}
                                <Image
                                    src={exam.image}
                                    alt={
                                        typeof exam.title === 'string'
                                            ? exam.title
                                            : exam.title[language as Locale]
                                    }
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                                {/* Category badge */}
                                <div className="absolute top-4 left-4 z-20">
                <span className="bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-sm backdrop-blur">
                    {t[`cat_${exam.category.id}`] || exam.category.name}
                </span>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 p-5 w-full text-white">
                                    {/* Title */}
                                    <h2 className="text-xl font-bold mb-2 line-clamp-2">
                                        {typeof exam.title === 'string'
                                            ? exam.title
                                            : exam.title[language as Locale]}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-sm text-white/80 mb-4 line-clamp-2">
                                        {typeof exam.description === 'string'
                                            ? exam.description
                                            : exam.description[language as Locale]}
                                    </p>

                                    {/* Info */}
                                    <div className="flex flex-wrap items-center gap-2 mb-5 text-xs">
                    <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-sm flex items-center gap-1">
                        ⭐ {exam.rating} ({exam.ratingCount})
                    </span>

                                        <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-sm flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                                            {exam.duration} {t.minutes}
                    </span>

                                        <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-sm flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                                            {exam.participants.toLocaleString()}
                    </span>

                                        <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-sm flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                                            {exam.questionCount} {t.questions}
                    </span>
                                    </div>

                                    {/* CTA */}

                                        <Button
                                            asChild
                                            variant="secondary"
                                            className="w-full font-semibold backdrop-blur bg-white/90 text-black hover:bg-white cursor-pointer"
                                        >
                                            <Link href={`/${lang}/exams/${exam.id}`}>
                                            {t.takeExamNow}
                                            </Link>
                                        </Button>

                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="bg-background border border-border rounded-2xl p-12 text-center shadow-sm">

                        {/* Icon */}
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="h-10 w-10 text-primary" />
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl text-secondary font-bold mb-2">
                            {t.noResults}
                        </h2>

                        {/* Desc */}
                        <p className="text-secondary mb-6">
                            {t.noResultsDesc} <span className="text-primary font-medium">{searchQuery}</span>
                        </p>

                        {/* Button */}
                        <Button
                            variant="default"
                            onClick={() => {
                                setSearchQuery('');
                                setActiveCategory('all');
                            }}
                            className="px-6 py-2.5 rounded-xl"
                        >
                            {t.clearFilter}
                        </Button>
                    </div>
                )}
            </div>
        </main>
    );
}
