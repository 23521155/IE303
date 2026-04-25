'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, FileText, Video, Download, PlayCircle, Search, Loader2, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BE_URL } from '@/src/utils/constans';

interface LearningMaterial {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    description: string;
    fileUrl: string;
    type: string;
    createdAt: string;
}

export function Materials({ t, lang, materials }: { t: any; lang: string; materials: LearningMaterial[] }) {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [categorySelect, setCategorySelect] = useState('all');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // const fetchMaterials = useCallback(async () => {
    //     setLoading(true);
    //     setError('');
    //     try {
    //         let url = `${BE_URL}/api/materials?`;
    //
    //         if (debouncedSearchQuery.trim()) {
    //             url = `${BE_URL}/api/materials/search?title=${encodeURIComponent(debouncedSearchQuery)}&`;
    //         }
    //
    //         if (categorySelect !== 'all') {
    //             url += `category=${encodeURIComponent(categorySelect)}&`;
    //         }
    //
    //         url += `size=50`;
    //
    //         const response = await fetch(url);
    //         if (!response.ok) throw new Error('Failed to fetch materials');
    //
    //         const data = await response.json();
    //
    //         setMaterials(data.content || data.value || []);
    //     } catch (err) {
    //         setError('An error occurred');
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [debouncedSearchQuery, categorySelect]);

    // useEffect(() => {
    //     fetchMaterials();
    // }, [fetchMaterials]);

    const filteredMaterials = materials?.filter((m) => {
        return activeTab === 'all' || m.type === activeTab;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                        <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                        {t.studyMaterials}
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{t.materialsDesc}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={categorySelect}
                            onChange={(e) => setCategorySelect(e.target.value)}
                            className="w-full sm:w-40 py-2 pl-4 pr-10 border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-colors cursor-pointer"
                        >
                            <option value="all">Tất cả</option>
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
                <button
                    onClick={() => setActiveTab('all')}
                    className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'all'
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                >
                    {t.allMaterials}
                </button>
                <button
                    onClick={() => setActiveTab('pdf')}
                    className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center ${
                        activeTab === 'pdf'
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                >
                    <FileText className="w-4 h-4 mr-2" /> {t.ebooksPdf}
                </button>
                <button
                    onClick={() => setActiveTab('video')}
                    className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center ${
                        activeTab === 'video'
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                >
                    <Video className="w-4 h-4 mr-2" /> {t.videoLectures}
                </button>
            </div>
            {/* Content */}
            {/*{loading ? (*/}
            {/*    <div className="flex justify-center items-center py-20">*/}
            {/*        <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />*/}
            {/*    </div>*/}
            {/*) : error ? (*/}
            {/*    <div className="text-center py-12 text-red-500">*/}
            {/*        <p>{error}</p>*/}
            {/*    </div>*/}
            {/*) : filteredMaterials.length === 0 ? (*/}
            {/*    <div className="text-center py-12">*/}
            {/*        <p className="text-gray-500 dark:text-gray-400">{t.noMaterialsFound}</p>*/}
            {/*    </div>*/}
            {/*) : (*/}({' '}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMaterials.map((material) => (
                    <div
                        key={material.id}
                        className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <ImageWithFallback
                                src={
                                    material.imageUrl ||
                                    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1080'
                                }
                                alt={material.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-gray-700 dark:text-gray-200 flex items-center shadow-sm">
                                {material.type === 'pdf' ? (
                                    <FileText className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
                                ) : (
                                    <Video className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
                                )}
                                {(material.type || 'UNKNOWN').toUpperCase()}
                            </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2 block">
                                {material.category}
                            </span>
                            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {material.title}
                            </h3>

                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                    {material.type === 'pdf' ? (
                                        <>
                                            <Download className="w-4 h-4 mr-1.5" />
                                            {/* No downloads property in backend yet, mockup below */}
                                            520 {t.downloads || 'lượt tải'}
                                        </>
                                    ) : (
                                        <>
                                            <PlayCircle className="w-4 h-4 mr-1.5" />
                                            1.2K {t.views || 'lượt xem'}
                                        </>
                                    )}
                                </div>
                                <span>{new Date(material.createdAt).toLocaleDateString()}</span>
                            </div>

                            <div className="mt-4 flex gap-2">
                                {/* View inline in browser */}
                                <a
                                    href={`${BE_URL}/api/materials/${material.id}/file`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                                >
                                    <FileText className="w-4 h-4 mr-1.5" />
                                    Xem
                                </a>
                                {/* Download */}
                                <a
                                    href={`${BE_URL}/api/materials/${material.id}/file?download=true`}
                                    className="flex-1 py-2.5 px-3 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors flex items-center justify-center border border-gray-200 dark:border-slate-700"
                                >
                                    <Download className="w-4 h-4 mr-1.5" />
                                    Tải về
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )
        </div>
    );
}
