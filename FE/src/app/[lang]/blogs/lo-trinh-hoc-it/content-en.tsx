import Image from 'next/image';
import { Bookmark, Calendar, Clock, Share2, Eye, MessageSquare, ChevronRight, Link as LinkIcon, Mail, CheckCircle2, Target, Lightbulb } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

const Facebook = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const Twitter = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;

const postDetail = {
    id: 'lo-trinh-hoc-it',
    title: 'Japan IT Certification Roadmap (IPA): From Beginner to Expert',
    excerpt: 'A comprehensive guide to Japan\'s national IT certification system. Detailed analysis of target audiences, key content, and tips to pass each level from IT Passport to Specialist.',
    coverImage: '/it-roadmap.png',
    author: { name: 'Trần Thiên Phú', role: 'Author', avatar: '/Shin.png', bio: 'Over 5 years of experience working in Japan. Sharing knowledge about programming, Japanese IT workplace culture, and career development.' },
    date: '08/05/2026',
    category: 'Learning Path',
    readTime: '20 min',
    views: '15.2K',
    comments: 38,
    tags: ['IT', 'Roadmap', 'IPA', 'IT Passport', 'FE', 'AP', 'Career'],
    relatedPosts: [
        { id: 'ky-thi-it-passport', title: 'What is the IT Passport Exam? Complete Guide A-Z', image: '/blog-it-passport-thumbnail.jpg', date: '01/05/2026', href: '/en/blogs/ky-thi-it-passport' },
        { id: 'ky-thi-fe', title: 'What is the FE Exam? Everything You Need to Know', image: '/blog-it-fe-thumbnail.jpg', date: '01/05/2026', href: '/en/blogs/ky-thi-fe' },
        { id: 'ky-thi-ap', title: 'What is the AP (Applied Information Technology Engineer) Exam?', image: '/blog-it-passport-thumbnail.jpg', date: '08/05/2026', href: '/en/blogs/ky-thi-ap' },
    ]
};

export default function ContentEn() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            <header className="bg-white dark:bg-[#121212] pt-12 pb-8 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                        <a href="/" className="hover:text-primary transition-colors">Home</a>
                        <ChevronRight className="w-4 h-4" />
                        <a href="/en/blogs" className="hover:text-primary transition-colors">Blog</a>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-800 dark:text-slate-200 truncate">{postDetail.title}</span>
                    </nav>
                    <div className="mb-6">
                        <span className="inline-block bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{postDetail.category}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.2]">{postDetail.title}</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{postDetail.excerpt}</p>
                    <div className="flex flex-wrap items-center justify-between gap-6 py-4">
                        <div className="flex items-center gap-4">
                            <Image src={postDetail.author.avatar} alt={postDetail.author.name} height={56} width={56} className="w-14 h-14 rounded-full border-2 border-white dark:border-slate-800 shadow-md object-cover" />
                            <div>
                                <div className="font-bold text-slate-900 dark:text-white text-base">{postDetail.author.name}</div>
                                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {postDetail.date}</span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {postDetail.readTime} read</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1.5 cursor-pointer"><Eye className="w-5 h-5" /> {postDetail.views}</span>
                            <span className="flex items-center gap-1.5 cursor-pointer"><MessageSquare className="w-5 h-5" /> {postDetail.comments}</span>
                            <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
                                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><Share2 className="w-4 h-4" /></button>
                                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><Bookmark className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-10">
                    <article className="lg:col-span-9 bg-white dark:bg-[#121212] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                        <figure className="w-full bg-slate-50 dark:bg-slate-800/50 p-4">
                            <Image src={postDetail.coverImage} alt="Japan IT Certification Roadmap (IPA)" width={1200} height={800} className="w-full h-auto object-contain rounded-lg" priority />
                            <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                                Japan&apos;s national IT certification roadmap (IPA) — from Level 1 (IT Passport) to Level 4 (Specialist). Source: <a href="https://www.ipa.go.jp/shiken/about/about.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">IPA</a>
                            </figcaption>
                        </figure>

                        <div className="p-6 sm:p-10 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                            <p className="mb-6">
                                For IT engineers seeking career growth in Japan, IPA (Information-technology Promotion Agency) certifications are more than just credentials — they are key factors for salary increases, promotions, and especially earning points toward the Highly Skilled Professional (HSP) visa. The system is divided into 4 distinct levels.
                            </p>

                            <h2 id="level-1" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xl">1</span>
                                IT Passport (IP) – General Knowledge
                            </h2>
                            <p className="mb-4">
                                <strong><a href="https://www3.jitec.ipa.go.jp/JitesCbt/index.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">IT Passport</a></strong> is the most basic certification. Contrary to popular belief, it is designed for <strong>all workers</strong> in the digital age, not just IT professionals.
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="flex gap-3">
                                    <Target className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">Target Audience</h4>
                                        <p className="text-base text-slate-600 dark:text-slate-400">New graduates, business staff (Sales, HR, Marketing) at IT companies, or career-changers who want a broad overview of technology and business management.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">Key Knowledge Areas</h4>
                                        <ul className="list-disc pl-5 mt-1 text-base text-slate-600 dark:text-slate-400">
                                            <li><strong>Strategy:</strong> Corporate management, law (copyright, personal data protection), basic business strategy.</li>
                                            <li><strong>Management:</strong> Project management, basic system development.</li>
                                            <li><strong>Technology:</strong> Foundational knowledge of hardware, networking, security, and logic.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/40 border-l-4 border-blue-500 p-5 rounded-r-lg mb-8">
                                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Study Tip:
                                </div>
                                <p className="text-base">The exam runs year-round as a CBT. No coding required — just memorize key terms and practice past papers at <a href="https://www.itpassportsiken.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IT Passport Kakomon Dojo (itpassportsiken.com)</a>. You can pass within 1–2 months of focused study.</p>
                            </div>

                            <h2 id="level-2" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 text-xl">2</span>
                                FE / SG – Fundamental IT Engineer
                            </h2>
                            <p className="mb-4">
                                This is the official milestone proving you are a <strong>real IT engineer</strong>. It splits into two popular tracks: <strong><a href="https://www.ipa.go.jp/shiken/kubun/fe.html" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-blue-400 hover:underline">FE (Fundamental IT Engineer)</a></strong> for software developers and <strong><a href="https://www.ipa.go.jp/shiken/kubun/sg.html" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-blue-400 hover:underline">SG (Information Security Management)</a></strong> for system administrators.
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">FE Exam Structure (Unique Format):</h4>
                                        <ul className="list-disc pl-5 mt-1 text-base text-slate-600 dark:text-slate-400">
                                            <li><strong>Section A (Theory - 90 min):</strong> 60 MCQs covering discrete math, data structures, algorithms, OS, databases, networking, and management topics.</li>
                                            <li><strong>Section B (Practical - 100 min):</strong> 20 questions. The most challenging part — 16 pseudo-code reading questions on algorithms and data structures, plus 4 security scenario questions.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <blockquote className="border-l-4 border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-800/80 p-5 italic text-slate-700 dark:text-slate-300 rounded-r-lg text-base">
                                "Since 2023, the FE exam dropped all specific programming languages (C, Java, Python...) in Section B, switching entirely to pseudo-code. This demands pure algorithmic thinking rather than memorizing syntax."
                            </blockquote>

                            <h2 id="level-3" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 text-xl">3</span>
                                AP – Applied IT Engineer & System Design
                            </h2>
                            <p className="mb-4">
                                <strong><a href="https://www.ipa.go.jp/shiken/kubun/ap.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">AP (Applied Information Technology Engineer)</a></strong> is the gold standard for Senior Engineers, Team Leads, and BrSEs. Holding this certification grants <strong>significant bonus points</strong> for Permanent Residency or the HSP visa.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl shadow-sm">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-base border-b pb-2 dark:border-slate-700">Morning (Multiple Choice)</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">80 questions / 150 min. Requires 60% to pass. Covers a very wide range from microprocessors, computer architecture, encryption algorithms to 3rd/4th normal form database design.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl shadow-sm">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-base border-b pb-2 dark:border-slate-700">Afternoon (Short Answer / Case Study)</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">150 min. Solve 1 mandatory question (Security) and <strong>choose 4 of 10</strong> specialty topics (Programming, DB, Network, Embedded, Audit...). Requires reading 4–5 page A4 system scenarios and writing short answers.</p>
                                </div>
                            </div>

                            <h2 id="level-4" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 text-xl">4</span>
                                Specialist – High-Level Expert
                            </h2>
                            <p className="mb-4">The "final boss" of IPA — pass rates are typically only <strong>10%–15%</strong>. Academic knowledge alone is not enough; you must have real project experience.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base mb-8">
                                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30"><strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/nw.html" target="_blank" rel="noopener noreferrer" className="hover:underline">NW (Network Specialist)</a>:</strong> Expert in network infrastructure design.</div>
                                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30"><strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/db.html" target="_blank" rel="noopener noreferrer" className="hover:underline">DB (Database Specialist)</a>:</strong> Expert in database design & optimization.</div>
                                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30"><strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/pm.html" target="_blank" rel="noopener noreferrer" className="hover:underline">PM (Project Manager)</a>:</strong> International-standard project management.</div>
                                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30"><strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/sa.html" target="_blank" rel="noopener noreferrer" className="hover:underline">SA (System Architect)</a>:</strong> Holistic solution design engineer.</div>
                                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30 sm:col-span-2"><strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/sc.html" target="_blank" rel="noopener noreferrer" className="hover:underline">SC (Security Specialist)</a>:</strong> National qualification for information security practice.</div>
                            </div>
                            <p className="text-base text-slate-700 dark:text-slate-300">
                                <strong>The dreaded Essay (論文):</strong> For PM, SA, and IT Strategist (ST) tracks, the afternoon exam requires handwriting a <strong>2,000–3,000 character essay in Japanese</strong> within 120 minutes, describing a real project you&apos;ve worked on. This is a massive barrier for non-native Japanese speakers.
                            </p>

                            <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Tags:</span>
                                    {postDetail.tags.map((tag) => (
                                        <a key={tag} href={`/tag/${tag}`} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors font-medium">#{tag}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>

                    <aside className="hidden lg:block lg:col-span-3 space-y-8">
                        <div className="sticky top-24 bg-white dark:bg-[#121212] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-5 flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                                <Bookmark className="w-4 h-4 text-blue-500" /> Table of Contents
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#level-1" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors group"><span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">1</span>IT Passport (IP)</a></li>
                                <li><a href="#level-2" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-green-600 transition-colors group"><span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">2</span>FE / SG</a></li>
                                <li><a href="#level-3" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-orange-600 transition-colors group"><span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 flex items-center justify-center text-xs font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors">3</span>AP</a></li>
                                <li><a href="#level-4" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-purple-600 transition-colors group"><span className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">4</span>Specialist</a></li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-gradient-to-br from-secondary/60 to-secondary dark:to-blue-800 rounded-xl p-8 sm:p-10 text-center shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to Practice for Your IT Certification?</h3>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">IT Shiken provides free practice exams, realistic questions, automatic grading and detailed analysis. Start today — no registration needed!</p>
                    <Button asChild className="text-lg !py-6"><Link href="/en/exams">Practice Now – Free</Link></Button>
                </div>
            </div>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Related Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postDetail.relatedPosts.map((post) => (
                        <a key={post.id} href={post.href} className="group block">
                            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                                <Calendar className="w-3.5 h-3.5" />{post.date}
                            </div>
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h4>
                        </a>
                    ))}
                </div>
            </section>
        </main>
    );
}
