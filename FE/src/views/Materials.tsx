'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FileText, Video, Download, Search, Loader2, Folder, LayoutList } from 'lucide-react';
import Link from 'next/link';
import AnimateInView from '@/src/animation/AnimateInView'; // Thêm import này

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

            const raw = json?.data ?? json;
            const data: PagedData | null = raw && Array.isArray(raw.content) ? raw : null;

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

    const CATEGORIES = [
        { value: 'all', label: t.allMaterials },
        { value: 'FE', label: 'FE' },
        { value: 'IT Passport', label: 'IT Passport' },
    ];

    const TABS = [
        { value: 'all', label: t.allMaterials, Icon: LayoutList },
        { value: 'pdf', label: t.ebooksPdf, Icon: FileText },
        { value: 'video', label: t.videoLectures, Icon: Video },
    ];

    return (
        <main className="bg-background min-h-screen transition-colors duration-300">
            {/* ─── Header — pure identity with gradient & animation ──────────────── */}
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
                            {t.materialsBadge ?? t.studyMaterials}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary dark:text-foreground mb-3">
                            {t.studyMaterials}
                        </h1>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-xl">{t.materialsDesc}</p>
                    </AnimateInView>
                </div>
            </section>

            {/* ─── Content Area ─────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                {/* ─── Split-pane OS Explorer Shell ─── */}
                {/* 1. LỚP CHA: Cố định h-[600px], dùng overflow-hidden (KHÔNG dùng overflow-y-auto ở đây) */}
                <div className="flex flex-col md:flex-row border border-border/60 rounded-xl overflow-hidden bg-white dark:bg-[#111827] h-[600px] lg:h-[700px] relative z-10 shadow-sm">
                    {/* ── Left sidebar: directory tree ── */}
                    <aside className="md:w-56 flex-shrink-0 border-b md:border-b-0 md:border-r border-border/60 bg-muted/[0.25] dark:bg-[#0d1117] flex flex-col">
                        {/* Sidebar header (cố định) */}
                        <div className="px-4 py-3 border-b border-border/60 flex-shrink-0">
                            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground/60">
                                {t.categories || 'Library'}
                            </p>
                        </div>

                        {/* Vùng điều hướng Category (cho phép cuộn độc lập nếu danh sách quá dài) */}
                        <div className="p-1.5 flex-1 overflow-y-auto custom-scrollbar">
                            {CATEGORIES.map(({ value, label }) => (
                                <button
                                    key={value}
                                    onClick={() => setCategorySelect(value)}
                                    className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                                        categorySelect === value
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                    }`}
                                >
                                    <Folder className="w-3.5 h-3.5 flex-shrink-0" />
                                    {label}
                                </button>
                            ))}

                            <div className="mx-3 my-2 border-t border-border/40" />

                            {/* Type filter */}
                            {TABS.map(({ value, label, Icon }) => (
                                <button
                                    key={value}
                                    onClick={() => setActiveTab(value)}
                                    className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                                        activeTab === value
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                                    {label}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* ── Main area ── */}
                    <div className="flex-1 min-w-0 flex flex-col h-full">
                        {/* Search toolbar (Cố định ở trên) */}
                        <div className="flex items-center gap-3 px-4 h-11 border-b border-border/60 flex-shrink-0">
                            <Search className="w-4 h-4 text-muted-foreground/45 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder={t.searchMaterials}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none min-w-0"
                            />
                            {searchQuery && (
                                <span className="font-mono text-[0.65rem] text-muted-foreground/50 tabular-nums flex-shrink-0">
                                    {filteredMaterials.length}
                                </span>
                            )}
                        </div>

                        {/* Column labels (Cố định ở trên) */}
                        <div className="hidden md:flex items-center px-4 h-8 bg-muted/[0.2] border-b border-border/40 flex-shrink-0">
                            <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground/45 flex-1">
                                {t.columnName || 'Name'}
                            </span>
                            <div className="flex items-center flex-shrink-0">
                                <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground/45 w-28 text-right">
                                    {t.columnCategory || 'Category'}
                                </span>
                                <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground/45 w-16 text-center">
                                    {t.columnType || 'Type'}
                                </span>
                                <span className="w-16" />
                            </div>
                        </div>

                        {/* 2. KHU VỰC CUỘN: CHỈ CUỘN DANH SÁCH FILE */}
                        <div className="flex-1 overflow-y-auto relative custom-scrollbar">
                            {filteredMaterials.map((material) => (
                                <div
                                    key={material.id}
                                    className="flex items-center justify-between py-3 px-4 border-b border-border/40 hover:bg-muted/[0.25] transition-colors group cursor-pointer"
                                >
                                    {/* Left: icon + title */}
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        {material.type === 'pdf' ? (
                                            <FileText className="w-4 h-4 text-primary/60 flex-shrink-0" />
                                        ) : (
                                            <Video className="w-4 h-4 text-secondary/60 dark:text-blue-400/60 flex-shrink-0" />
                                        )}
                                        <Link
                                            href={`/${lang}/materials/${material.id}`}
                                            className="text-sm text-foreground/85 hover:text-foreground truncate transition-colors"
                                        >
                                            {material.title}
                                        </Link>
                                    </div>

                                    {/* Right: meta + icon-only actions (desktop) */}
                                    <div className="hidden md:flex items-center flex-shrink-0 pl-4">
                                        <span className="font-mono text-xs text-muted-foreground/55 w-28 text-right truncate">
                                            {material.category}
                                        </span>
                                        <span className="font-mono text-xs text-muted-foreground/45 uppercase w-16 text-center">
                                            {material.type}
                                        </span>
                                        <div className="flex items-center gap-0.5 w-16 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/${lang}/materials/${material.id}`}
                                                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                                title={t.viewDetails}
                                            >
                                                <FileText className="w-3.5 h-3.5" />
                                            </Link>
                                            <a
                                                href={`/api/materials/${material.id}/file?download=true`}
                                                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                                title={t.download}
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Icon-only actions (mobile — always visible) */}
                                    <div className="flex md:hidden items-center gap-1 flex-shrink-0 pl-3">
                                        <Link
                                            href={`/${lang}/materials/${material.id}`}
                                            className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <FileText className="w-3.5 h-3.5" />
                                        </Link>
                                        <a
                                            href={`/api/materials/${material.id}/file?download=true`}
                                            className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </div>
                            ))}

                            {/* Sentinel for infinite scroll */}
                            <div ref={sentinelRef} className="h-4" />

                            {/* Đưa phần loading và text thông báo vào BÊN TRONG vùng cuộn */}
                            {loading && (
                                <div className="flex justify-center py-4 border-t border-border/40">
                                    <Loader2 className="w-4 h-4 animate-spin text-primary/60" />
                                </div>
                            )}
                            {!hasMore && materials.length > 0 && (
                                <p className="text-center font-mono text-[0.65rem] text-muted-foreground/35 py-4 border-t border-border/40">
                                    {t.allLoaded ?? '— end of list —'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
