'use client';
import React, { useState } from 'react';
import {
    Layers,
    BrainCircuit,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    Award,
    JapaneseYen,
    Monitor,
    Database,
    ArrowRight,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

// Dữ liệu mock cho các bộ Flashcard
const FLASHCARD_DECKS = [
    {
        id: '1',
        title: 'Từ vựng IT Passport cơ bản',
        category: 'IT Passport',
        icon: <Monitor className="w-6 h-6 text-blue-500" />,
        cardsCount: 150,
        author: 'Admin',
        thumbnail:
            'https://images.unsplash.com/photo-1763568258605-6783d4fad7b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwSVQlMjBwcm9ncmFtbWluZyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MzM3MDk2OHww&ixlib=rb-4.1.0&q=80&w=1080',
        color: 'bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800',
        tags: ['Strategy', 'Management', 'Technology'],
    },
    {
        id: '2',
        title: 'Fundamental Information Technology (FE)',
        category: 'FE Exam',
        icon: <Database className="w-6 h-6 text-indigo-500" />,
        cardsCount: 320,
        author: 'TechMaster',
        thumbnail:
            'https://images.unsplash.com/photo-1763568258605-6783d4fad7b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwSVQlMjBwcm9ncmFtbWluZyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MzM3MDk2OHww&ixlib=rb-4.1.0&q=80&w=1080',
        color: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-100 dark:border-indigo-800',
        tags: ['Algorithms', 'Hardware', 'Network'],
    },
    {
        id: '3',
        title: 'Từ vựng JLPT N3 - Trọng tâm',
        category: 'Tiếng Nhật',
        icon: <JapaneseYen className="w-6 h-6 text-red-500" />,
        cardsCount: 500,
        author: 'Nihongo Pro',
        thumbnail:
            'https://images.unsplash.com/photo-1627348440972-1c9eed5543ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMGphcGFuZXNlJTIwZmxhc2hjYXJkc3xlbnwxfHx8fDE3NzMzNzA5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        color: 'bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-800',
        tags: ['Kanji', 'Vocab', 'Daily'],
    },
    {
        id: '4',
        title: 'Ngữ pháp Tiếng Nhật ứng dụng trong IT',
        category: 'Tiếng Nhật IT',
        icon: <BrainCircuit className="w-6 h-6 text-emerald-500" />,
        cardsCount: 85,
        author: 'Admin',
        thumbnail:
            'https://images.unsplash.com/photo-1627348440972-1c9eed5543ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMGphcGFuZXNlJTIwZmxhc2hjYXJkc3xlbnwxfHx8fDE3NzMzNzA5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        color: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800',
        tags: ['Communication', 'Email', 'Meeting'],
    },
];

export function FlashcardDecks({ t, lang }: { t: any; lang: string }) {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'IT Passport', 'FE Exam', 'Tiếng Nhật', 'Tiếng Nhật IT'];

    const filteredDecks =
        activeCategory === 'All' ? FLASHCARD_DECKS : FLASHCARD_DECKS.filter((deck) => deck.category === activeCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 min-h-screen">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center justify-center">
                    <Layers className="w-10 h-10 text-blue-600 dark:text-blue-400 mr-3" />
                    {t.flashcardLib}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.flashcardDesc}</p>
            </div>

            {/* Bộ lọc danh mục */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                            activeCategory === cat
                                ? 'bg-blue-600 text-white shadow-md dark:shadow-none'
                                : 'bg-white dark:bg-[#1a1a1a] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                        }`}
                    >
                        {cat === 'All' ? t.cat_all : cat}
                    </button>
                ))}
            </div>

            {/* Lưới Flashcard Decks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDecks.map((deck) => (
                    <div
                        key={deck.id}
                        className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow group flex flex-col"
                    >
                        <div className={`h-32 ${deck.color} relative overflow-hidden flex items-center justify-center`}>
                            {/* Background pattern/image could go here, using an icon for now for cleaner look */}
                            <div className="absolute inset-0 opacity-20">
                                <ImageWithFallback
                                    src={deck.thumbnail}
                                    alt={deck.title}
                                    className="w-full h-full object-cover grayscale mix-blend-multiply dark:mix-blend-overlay"
                                />
                            </div>
                            <div className="z-10 bg-white dark:bg-[#2a2a2a] p-3 rounded-xl shadow-sm transform group-hover:scale-110 transition-transform">
                                {deck.icon}
                            </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    {deck.category}
                                </span>
                                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium px-2 py-1 rounded-md flex items-center">
                                    <Layers className="w-3 h-3 mr-1" /> {deck.cardsCount} {t.cards}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {deck.title}
                            </h3>

                            <div className="flex flex-wrap gap-1 mb-4">
                                {deck.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-[10px] bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700 px-2 py-0.5 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {t.createdBy}{' '}
                                    <span className="font-medium text-slate-700 dark:text-slate-300">
                                        {deck.author}
                                    </span>
                                </p>
                                <Link
                                    href={`/flashcard/${deck.id}`}
                                    className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                >
                                    {t.studyNow} <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
