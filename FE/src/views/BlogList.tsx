'use client';

import React from 'react';
import { Clock, Calendar, User, BookOpen, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

export function BlogList({ t, lang, blogPosts }: { t: any; lang: string; blogPosts: any }) {
    const handleShare = async (id: string) => {
        const url = `${window.location.origin}/${lang}/blogs/${id}`;

        if (navigator.share) {
            await navigator.share({
                title: t.blog.shareTitle,
                url,
            });
        } else {
            navigator.clipboard.writeText(url);
            toast.success(t.blog.copySuccess);
        }
    };
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#121212] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                {/* HEADER */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{t.blog.title}</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.blog.description}</p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post: any) => (
                        <article
                            key={post.id}
                            className="relative h-[420px] rounded-md overflow-hidden group shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                        >
                            {/* CLICKABLE OVERLAY (click toàn card) */}
                            <Link href={`/${lang}/blogs/${post.id}`} className="absolute inset-0 z-10" />

                            {/* IMAGE */}
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            {/* READ TIME */}
                            <div className="absolute top-4 right-4 z-20">
                                <span className="bg-white/90 dark:bg-black/80 text-black dark:text-white text-xs font-semibold px-3 py-1 rounded-md flex items-center gap-1 backdrop-blur">
                                    <Clock className="w-3.5 h-3.5" />
                                    {post.readTime}
                                </span>
                            </div>

                            {/* CATEGORY */}
                            <div className="absolute top-4 left-4 z-20">
                                <span className="bg-primary dark:text-secondary text-white text-xs font-semibold px-3 py-1 rounded-md shadow-sm">
                                    {post.category}
                                </span>
                            </div>

                            {/* CONTENT */}
                            <div className="absolute bottom-0 p-5 w-full text-white flex flex-col z-20">
                                {/* TITLE */}
                                <h2 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>

                                {/* EXCERPT */}
                                <p className="text-sm text-white/80 mb-4 line-clamp-2">{post.excerpt}</p>

                                {/* INFO */}
                                <div className="flex flex-wrap gap-2 text-xs mb-5">
                                    <span className="bg-white/20 px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-white/10">
                                        <User className="w-3.5 h-3.5" />
                                        {post.author}
                                    </span>

                                    <span className="bg-white/20 px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-white/10">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.date}
                                    </span>
                                </div>

                                {/* BUTTONS */}
                                <div className="flex gap-2 mt-auto relative z-20">
                                    {/* READ */}
                                    <Link
                                        href={`/${lang}/blogs/${post.id}`}
                                        className="flex-1 py-2.5 px-3 bg-white/90 hover:bg-white text-black rounded-md text-sm font-medium flex items-center justify-center transition-colors"
                                    >
                                        {t.blog.readMore}
                                    </Link>

                                    {/* SHARE */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); // tránh click card
                                            handleShare(post.id);
                                        }}
                                        className="flex-1 py-2.5 px-3 bg-white/20 hover:bg-white/30 text-white rounded-md text-sm font-medium flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
                                    >
                                        <Share2 className="w-4 h-4 mr-1.5" />
                                        {t.blog.share}
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
