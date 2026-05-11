'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FileText, Video, Download, PlayCircle, Search, ChevronDown, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import Image from 'next/image';
import Link from 'next/link';

type LearningMaterial = {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    description: string;
    fileUrl: string;
    type: string;
    createdAt: string;
};

type PagedData = {
    content: LearningMaterial[];
    last: boolean;
    totalElements: number;
};

export function Materials({ t, lang, initialData }: { t: any; lang: string; initialData: PagedData }) {
    const [activeTab, setActiveTab] = useState('all');
    const [categorySelect, setCategorySelect] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [materials, setMaterials] = useState<LearningMaterial[]>(initialData.content);
    const [hasMore, setHasMore] = useState(!initialData.last);
    const [loading, setLoading] = useState(false);

    // Khai báo sentinelRef TRƯỚC các useEffect dùng nó
    const sentinelRef = useRef<HTMLDivElement>(null);
    const hasMoreRef = useRef(!initialData.last);
    const loadingRef = useRef(false);
    const currentPageRef = useRef(0);
    const categoryRef = useRef('all');
    const prevCategoryRef = useRef('all');

    const fetchPage = useCallback(async (pageNum: number, category: string, replace: boolean) => {
        if (loadingRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        try {
            const catParam = category !== 'all' ? `&category=${encodeURIComponent(category)}` : '';
            const res = await fetch(`/api/materials?page=${pageNum}&size=15${catParam}`);
            const json = await res.json();

            // Gateway có thể wrap { data: { content, last, ... } } hoặc trả thẳng
            const raw = json?.data ?? json;
            const data: PagedData | null = (raw && Array.isArray(raw.content)) ? raw : null;

            if (!data) {
                console.error('Unexpected response:', json);
                hasMoreRef.current = false;
                setHasMore(false);
                return;
            }

            setMaterials((prev) => (replace ? data.content : [...prev, ...data.content]));
            hasMoreRef.current = !data.last;
            setHasMore(!data.last);
            currentPageRef.current = pageNum;
        } catch (err) {
            console.error('Fetch error:', err);
            hasMoreRef.current = false;
            setHasMore(false);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, []);

    // Category thay đổi → reset và fetch lại từ đầu
    useEffect(() => {
        if (prevCategoryRef.current === categorySelect) return;
        prevCategoryRef.current = categorySelect;
        categoryRef.current = categorySelect;
        currentPageRef.current = 0;
        hasMoreRef.current = true;
        setHasMore(true);
        fetchPage(0, categorySelect, true);
    }, [categorySelect, fetchPage]);

    // Infinite scroll
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMoreRef.current && !loadingRef.current) {
                    fetchPage(currentPageRef.current + 1, categoryRef.current, false);
                }
            },
            { threshold: 0.1 },
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [fetchPage, hasMore]);

    const filteredMaterials = materials.filter((m) => {
        const matchesType = activeTab === 'all' || m.type === activeTab;
        const matchesSearch = !searchQuery || m.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-secondary dark:text-white flex items-center">
                        {t.studyMaterials}
                    </h1>
                    <p className="mt-2 text-secondary dark:text-gray-400">{t.materialsDesc}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={categorySelect}
                            onChange={(e) => setCategorySelect(e.target.value)}
                            className="w-full sm:w-40 py-2 pl-4 pr-10 border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-secondary dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none transition-colors cursor-pointer"
                        >
                            <option value="all">{t.allMaterials}</option>
                            <option value="FE">FE</option>
                            <option value="IT Passport">IT Passport</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>

                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t.searchMaterials}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-8 border-b border-gray-200 dark:border-slate-800">
                {(['all', 'pdf', 'video'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center cursor-pointer ${
                            activeTab === tab
                                ? 'border-primary text-primary dark:text-blue-400 dark:border-blue-400'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                        }`}
                    >
                        {tab === 'all' && t.allMaterials}
                        {tab === 'pdf' && (
                            <>
                                <Image src="/pdf.png" alt="pdf" height={20} width={20} className="mx-2" />
                                {t.ebooksPdf}
                            </>
                        )}
                        {tab === 'video' && (
                            <>
                                <Video className="w-4 h-4 mr-2" />
                                {t.videoLectures}
                            </>
                        )}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMaterials.map((material) => (
                    <article
                        key={material.id}
                        className="relative h-[420px] rounded-md overflow-hidden group shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                    >
                        <ImageWithFallback
                            src={
                                material.imageUrl ||
                                'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1080'
                            }
                            alt={material.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                        <div className="absolute top-4 right-4 z-20">
                            <span className="bg-white/90 dark:bg-black/80 text-xs font-semibold px-3 py-1 rounded-md flex items-center gap-1 backdrop-blur">
                                {material.type === 'pdf' ? (
                                    <Image src="/pdf.png" alt="pdf" width={14} height={14} />
                                ) : (
                                    <Video className="w-3.5 h-3.5 text-primary" />
                                )}
                                {(material.type || 'UNKNOWN').toUpperCase()}
                            </span>
                        </div>

                        <div className="absolute top-4 left-4 z-20">
                            <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-md backdrop-blur">
                                {material.category}
                            </span>
                        </div>

                        <div className="absolute bottom-0 p-5 w-full text-white flex flex-col">
                            <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition">
                                {material.title}
                            </h2>
                            {material.description && (
                                <p className="text-sm text-white/80 mb-3 line-clamp-2">{material.description}</p>
                            )}
                            <div className="flex flex-wrap gap-2 text-xs mb-4">
                                {material.type === 'pdf' ? (
                                    <span className="bg-white/20 px-3 py-1 rounded-md flex items-center gap-1">
                                        <Download className="w-3.5 h-3.5" />
                                        520 {t.downloads || 'lượt tải'}
                                    </span>
                                ) : (
                                    <span className="bg-white/20 px-3 py-1 rounded-md flex items-center gap-1">
                                        <PlayCircle className="w-3.5 h-3.5" />
                                        1.2K {t.views || 'lượt xem'}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2 mt-auto">
                                <Link
                                    href={`/${lang}/materials/${material.id}`}
                                    className="flex-1 py-2 px-3 bg-white/90 text-black rounded-md text-sm font-medium flex items-center justify-center hover:bg-white"
                                >
                                    <FileText className="w-4 h-4 mr-1" />
                                    {t.viewDetails}
                                </Link>
                                <a
                                    href={`/api/materials/${material.id}/file?download=true`}
                                    className="flex-1 py-2 px-3 bg-white/20 text-white rounded-md text-sm font-medium flex items-center justify-center hover:bg-white/30"
                                >
                                    <Download className="w-4 h-4 mr-1" />
                                    {t.download}
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Sentinel + trạng thái */}
            <div ref={sentinelRef} className="h-4 mt-8" />
            {loading && (
                <div className="flex justify-center py-6">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
            )}
            {!hasMore && materials.length > 0 && (
                <p className="text-center text-sm text-gray-400 dark:text-gray-600 py-6">
                    {t.allLoaded ?? 'Đã tải hết tài liệu'}
                </p>
            )}
        </div>
    );
}
