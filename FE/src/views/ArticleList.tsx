'use client';

import React from 'react';
import { Clock, Calendar, User, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import AnimateInView from '@/src/animation/AnimateInView';

export function ArticleList({ t, lang, blogPosts }: { t: any; lang: string; blogPosts: any }) {
    const handleShare = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
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
        <main className="min-h-screen bg-background transition-colors duration-300 pb-24">

            {/* ─── Hero section ─────────────────────────────────────────── */}
            <section className="relative pt-20 pb-16 overflow-hidden">
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
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                    <AnimateInView>
                        <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide mb-4">
                            {t.blog.badge ?? t.blog.title}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary dark:text-foreground mb-3">
                            {t.blog.title}
                        </h1>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-xl mx-auto">
                            {t.blog.description}
                        </p>
                    </AnimateInView>
                </div>
            </section>

            {/* ─── Article grid ─────────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post: any) => (
                        <article
                            key={post.id}
                            className="group relative rounded-2xl overflow-hidden border border-border/60 bg-white dark:bg-[#111827] hover:border-border hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.28)] transition-all duration-300 flex flex-col"
                        >
                            {/* Full-card invisible link — sits at z-10 */}
                            <Link
                                href={`/${lang}/blogs/${post.id}`}
                                className="absolute inset-0 z-10"
                                aria-label={post.title}
                            />

                            {/* ── Image area ── */}
                            <div className="relative aspect-[16/10] bg-muted/30 overflow-hidden flex-shrink-0">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Category badge — above the link overlay */}
                                <div className="absolute top-3 left-3 z-20">
                                    <span className="backdrop-blur-md bg-background/90 text-[0.65rem] font-mono uppercase tracking-widest text-foreground/70 px-2.5 py-1 rounded border border-border/30">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* ── Content area ── */}
                            <div className="p-6 flex flex-col flex-1">
                                {/* Meta row */}
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground/60">
                                        <Calendar className="w-3 h-3 flex-shrink-0" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground/60">
                                        <Clock className="w-3 h-3 flex-shrink-0" />
                                        {post.readTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-[0.9375rem] font-semibold leading-snug text-secondary dark:text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">
                                    {post.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                                    {post.excerpt}
                                </p>

                                {/* Card footer */}
                                <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                                    {/* Author */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-muted/60 border border-border/40 flex items-center justify-center flex-shrink-0">
                                            <User className="w-3 h-3 text-muted-foreground/60" />
                                        </div>
                                        <span className="text-xs text-muted-foreground/70 font-medium truncate max-w-[120px]">
                                            {post.author}
                                        </span>
                                    </div>

                                    {/* Share — z-20 floats above the invisible link */}
                                    <button
                                        onClick={(e) => handleShare(e, post.id)}
                                        className="relative z-20 p-1.5 rounded-md text-muted-foreground/50 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                                        aria-label={t.blog.share}
                                    >
                                        <Share2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
