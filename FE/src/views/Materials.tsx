'use client';
import React, { useState } from 'react';
import { BookOpen, FileText, Video, Download, PlayCircle, Search, Filter } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const MOCK_MATERIALS = [
    {
        id: 1,
        title: 'Tổng hợp ngữ pháp Tiếng Anh B1-B2',
        type: 'pdf',
        category: 'Tiếng Anh',
        thumbnail:
            'https://images.unsplash.com/photo-1630734277837-ebe62757b6e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZGYlMjBkb2N1bWVudCUyMGljb258ZW58MXx8fHwxNzczMzcwMDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        size: '2.4 MB',
        downloads: 1245,
    },
    {
        id: 2,
        title: 'Video giải đề thi TOEIC 2024 (Part 5 & 6)',
        type: 'video',
        category: 'TOEIC',
        thumbnail:
            'https://images.unsplash.com/photo-1758272421523-9b2a777083ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHR1dG9yaWFsJTIwY291cnNlfGVufDF8fHx8MTc3MzM3MDAxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        duration: '1h 45m',
        views: 3420,
    },
    {
        id: 3,
        title: 'Cấu trúc đề thi JLPT N3 và các mẹo làm bài',
        type: 'pdf',
        category: 'Tiếng Nhật',
        thumbnail:
            'https://images.unsplash.com/photo-1673515335586-f9f662c01482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHN0dWR5JTIwbWF0ZXJpYWxzfGVufDF8fHx8MTc3MzM3MDAwNnww&ixlib=rb-4.1.0&q=80&w=1080',
        size: '5.1 MB',
        downloads: 890,
    },
    {
        id: 4,
        title: 'Hướng dẫn luyện nghe IELTS 8.0+',
        type: 'video',
        category: 'IELTS',
        thumbnail:
            'https://images.unsplash.com/photo-1758272421523-9b2a777083ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHR1dG9yaWFsJTIwY291cnNlfGVufDF8fHx8MTc3MzM3MDAxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        duration: '45m',
        views: 2100,
    },
    {
        id: 5,
        title: 'Bộ đề thi thử THPT Quốc Gia môn Toán (có đáp án)',
        type: 'pdf',
        category: 'Toán học',
        thumbnail:
            'https://images.unsplash.com/photo-1630734277837-ebe62757b6e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZGYlMjBkb2N1bWVudCUyMGljb258ZW58MXx8fHwxNzczMzcwMDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        size: '8.3 MB',
        downloads: 5600,
    },
];

export function Materials({ t, lang }: { t: any; lang: string }) {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMaterials = MOCK_MATERIALS.filter((m) => {
        const matchesTab = activeTab === 'all' || m.type === activeTab;
        const matchesSearch =
            m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
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

                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t.searchMaterials}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 transition-colors"
                        />
                    </div>
                    <button className="p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
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

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMaterials.map((material) => (
                    <div
                        key={material.id}
                        className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <ImageWithFallback
                                src={material.thumbnail}
                                alt={material.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-gray-700 dark:text-gray-200 flex items-center shadow-sm">
                                {material.type === 'pdf' ? (
                                    <FileText className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
                                ) : (
                                    <Video className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
                                )}
                                {material.type.toUpperCase()}
                            </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2 block">
                                {material.category}
                            </span>
                            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {material.title}
                            </h3>

                            <div className="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                    {material.type === 'pdf' ? (
                                        <>
                                            <Download className="w-4 h-4 mr-1.5" />
                                            {material.downloads} {t.downloads}
                                        </>
                                    ) : (
                                        <>
                                            <PlayCircle className="w-4 h-4 mr-1.5" />
                                            {material.views} {t.views}
                                        </>
                                    )}
                                </div>
                                <span>{material.size || material.duration}</span>
                            </div>

                            <button className="mt-4 w-full py-2.5 px-4 bg-gray-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium rounded-lg transition-colors flex items-center justify-center border border-transparent hover:border-blue-100 dark:hover:border-slate-700">
                                {material.type === 'pdf' ? (
                                    <>
                                        <Download className="w-4 h-4 mr-2" /> {t.download}
                                    </>
                                ) : (
                                    <>
                                        <PlayCircle className="w-4 h-4 mr-2" /> {t.watchNow}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMaterials.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">{t.noMaterialsFound}</p>
                </div>
            )}
        </div>
    );
}
