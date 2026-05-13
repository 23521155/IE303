import Image from 'next/image';
import { Bookmark, Calendar, Clock, Share2 } from 'lucide-react';
import React from 'react';

const postDetail = {
    id: 'ky-thi-ap',
    title: 'What is AP (Applied Information Technology Engineer) Exam?',
    excerpt: 'AP Certification - A solid stepping stone for your senior software engineering career in Japan.',
    coverImage: '/blog-it-passport-thumbnail.jpg',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
    },
    date: '08/05/2026',
    category: 'IT Certification',
    readTime: '25 min',
    tags: ['AP', 'IT AP', 'Itshiken', 'Japan', 'Career'],
};

export default function ContentEn() {
    return (
        <main className="min-h-screen bg-background py-8 transition-colors duration-300 text-foreground/90">
            {/* HEADER */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="mb-4">
                    <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                        {postDetail.category}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-secondary dark:text-foreground mb-6 leading-tight">
                    {postDetail.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-8 max-w-4xl">{postDetail.excerpt}</p>

                {/* META */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-border/40">
                    <div className="flex items-center gap-3">
                        <Image
                            src={postDetail.author.avatar}
                            alt={postDetail.author.name}
                            height={48}
                            width={48}
                            className="w-12 h-12 rounded-full border border-border/60 object-cover"
                        />
                        <div>
                            <div className="font-semibold text-secondary dark:text-foreground">{postDetail.author.name}</div>
                            <div className="text-xs text-muted-foreground">{postDetail.author.role}</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {postDetail.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {postDetail.readTime}
                        </div>

                        <div className="flex items-center gap-2 pl-4 border-l border-border/40">
                            <button className="p-2 rounded-full hover:bg-muted/60 hover:text-primary transition-colors">
                                <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-muted/60 hover:text-primary transition-colors">
                                <Bookmark className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER IMAGE */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <Image
                    src={postDetail.coverImage}
                    alt={postDetail.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto max-h-[500px] object-cover rounded-2xl border border-border/60"
                />
            </div>

            {/* CONTENT */}
            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-lg leading-relaxed text-foreground/80">
                <p className="mb-6">
                    If you have passed FE, the next step on the software engineering career ladder in Japan is the AP (Applied Information Technology Engineer) certification.
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-12 mb-6 pb-2 border-b border-border/50">
                    1. How is AP different from FE?
                </h2>
                <p className="mb-4">
                    While FE evaluates the ability to "write code and understand systems", AP evaluates the ability to "design systems and manage projects".
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>No more exams requiring basic algorithms in C, Java, or Python.</li>
                    <li>Strong focus on database design, system architecture, and business strategy.</li>
                    <li>The afternoon exam consists of case-study questions requiring analysis and solutions.</li>
                </ul>

                <h2 className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-12 mb-6 pb-2 border-b border-border/50">
                    2. Benefits of the AP Certification
                </h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Confirming Senior Level:</strong> Many companies require AP for promotion to Project Manager or Leader positions.</li>
                    <li><strong>Visa Points:</strong> AP brings significant points when applying for a Highly Skilled Professional visa in Japan.</li>
                </ul>
            </article>
        </main>
    );
}
