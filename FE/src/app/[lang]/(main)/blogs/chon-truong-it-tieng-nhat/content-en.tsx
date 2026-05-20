import Image from 'next/image';
import {
    Bookmark, Calendar, Clock, Share2,
    Eye, MessageSquare, ChevronRight,
    CheckCircle2, Target, Lightbulb, AlertTriangle
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

// Custom SVG Icons for Brands
const Facebook = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const Twitter = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;

const postDetail = {
    id: 'chon-truong-it-tieng-nhat',
    title: 'Choosing a School for IT and Japanese Studies: Check Uni2Insight & IT Shiken',
    excerpt: 'In the digital era, combining IT with Japanese is a golden ticket to a high-paying career. How do you choose the right school? Let Uni2Insight and IT Shiken guide your way.',
    coverImage: '/uni2insight-real.png',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/Shin.png',
        bio: 'Over 5 years of experience working in Japan. Sharing knowledge about programming, Japanese IT workplace culture, and career development.',
    },
    date: '20/05/2026',
    category: 'Career Guide',
    readTime: '8 min',
    views: '1.2K',
    comments: 12,
    tags: ['IT Japanese', 'School Choice', 'Uni2Insight', 'IT Shiken', 'BrSE'],
    relatedPosts: [
        {
            id: 'lo-trinh-hoc-it',
            title: 'Japan IT Certification Roadmap (IPA): From Beginner to Expert',
            image: '/it-roadmap.png',
            date: '08/05/2026',
            href: '/en/blogs/lo-trinh-hoc-it'
        },
        {
            id: 'ky-thi-it-passport',
            title: 'What is the IT Passport Exam? Complete Guide A-Z',
            image: '/blog-it-passport-thumbnail.jpg',
            date: '01/05/2026',
            href: '/en/blogs/ky-thi-it-passport'
        },
        {
            id: 'ky-thi-fe',
            title: 'What is the FE Exam? Everything You Need to Know',
            image: '/blog-it-fe-thumbnail.jpg',
            date: '01/05/2026',
            href: '/en/blogs/ky-thi-fe'
        },
    ]
};

export default function DetailedPostEn() {
    return (
        <main className="min-h-screen bg-background transition-colors duration-300">
            {/* HERO SECTION */}
            <header className="bg-background border-b border-border/50 pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/en/blogs" className="hover:text-primary transition-colors">Blog</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground/80 truncate">{postDetail.title}</span>
                    </nav>

                    <div className="mb-6">
                        <span className="inline-block bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {postDetail.category}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-secondary dark:text-foreground mb-6 leading-[1.2]">
                        {postDetail.title}
                    </h1>

                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        {postDetail.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center justify-between gap-6 py-4">
                        <div className="flex items-center gap-4">
                            <Image
                                src={postDetail.author.avatar}
                                alt={postDetail.author.name}
                                height={56}
                                width={56}
                                className="w-14 h-14 rounded-full border-2 border-border/60 object-cover"
                            />
                            <div>
                                <div className="font-bold text-secondary dark:text-foreground text-base">{postDetail.author.name}</div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {postDetail.date}</span>
                                    <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-border/60"></span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {postDetail.readTime} read</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"><Eye className="w-5 h-5" /> {postDetail.views}</span>
                            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"><MessageSquare className="w-5 h-5" /> {postDetail.comments}</span>
                            <div className="flex items-center gap-2 pl-4 border-l border-border/40">
                                <button className="p-2 rounded-full hover:bg-muted/60 hover:text-primary transition-colors" title="Share">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-muted/60 hover:text-primary transition-colors" title="Save">
                                    <Bookmark className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN LAYOUT: 2 COLUMNS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-10">

                    {/* LEFT COLUMN: MAIN CONTENT */}
                    <article className="lg:col-span-9 bg-background rounded-2xl border border-border/60 overflow-hidden">
                        <figure className="w-full bg-muted/[0.2] p-4">
                            <Image
                                src={postDetail.coverImage}
                                alt="Choosing a university for IT and Japanese"
                                width={1200}
                                height={800}
                                className="w-full h-auto object-contain rounded-lg"
                                priority
                            />
                            <figcaption className="text-center text-sm text-muted-foreground/60 mt-3 italic">
                                Studying IT and Japanese is the current trend to catch the wave of recruitment from Japanese companies.
                            </figcaption>
                        </figure>

                        <div className="p-6 sm:p-10 text-lg leading-relaxed text-foreground/80">
                            <p className="mb-6 drop-cap">
                                In the digital era, Information Technology (IT) is a powerful domain. But if you combine IT with Japanese, you hold the &quot;golden ticket&quot; to step into a high-paying job market. The trend of becoming a Bridge Software Engineer (BrSE) or developer for Japanese corporations is more attractive than ever thanks to appealing compensation packages and onsite opportunities in Japan.
                            </p>
                            <p className="mb-6">
                                However, the hardest puzzle for students and parents is always: <strong>&quot;Which university ensures proficiency in both?&quot;</strong> Some universities excel at coding but teach Japanese superficially. Others offer prestigious Japanese-linked programs but come with astronomical tuition and vague quality. Amidst a jungle of admission advertisements, how do you find the truth?
                            </p>
                            <p className="mb-8">
                                The answer lies in a extremely helpful platform: <strong>Uni2Insight</strong>.
                            </p>

                            {/* SECTION 1 */}
                            <h2 id="part-1" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-12 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xl">1</span>
                                What is Uni2Insight? Why is it a student&apos;s best ally?
                            </h2>
                            <p className="mb-6">
                                If you are tired of asking in Facebook groups: <em>&quot;Is the Japanese-oriented IT program at University X good?&quot;</em> only to get generic replies or hidden advertisements, Uni2Insight is the game-changer you need.
                            </p>
                            <p className="mb-6">
                                Essentially, <a href="https://uni2insight.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Uni2Insight</a> is a platform aggregating reviews of universities, colleges, and majors in Vietnam. What makes it valuable is that: <strong>The information comes from real people and real experiences.</strong>
                            </p>
                            
                            <div className="bg-muted/[0.15] border-l-4 border-blue-500 p-5 rounded-r-xl mb-8">
                                <div className="flex items-center gap-2 font-bold text-secondary dark:text-foreground mb-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Key Features of Uni2Insight:
                                </div>
                                <p className="text-base">
                                    These reviews and ratings are contributed by current or former students who have actually studied there. Most importantly, with anonymous reviews, students can freely share both pros and cons, including things that admission guidebooks would never publish.
                                </p>
                            </div>

                            {/* SECTION 2 */}
                            <h2 id="part-2" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 text-xl">2</span>
                                Why should &quot;IT + Japanese&quot; students check Uni2Insight?
                            </h2>
                            <p className="mb-6">
                                For an intensive major like IT combined with language studies, choosing the wrong environment will exhaust you. By using Uni2Insight, you can check key points:
                            </p>

                            <div className="space-y-6 mb-8">
                                <div className="flex gap-3">
                                    <Target className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-secondary dark:text-foreground text-lg">The Truth About Dual-Major Quality</h4>
                                        <p className="text-base text-muted-foreground mt-1">
                                            IT is already heavy, and studying Kanji and Japanese grammar adds double the pressure. On Uni2Insight, seniors review:
                                        </p>
                                        <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                                            <li><strong>IT Side:</strong> Are coding instructors dedicated? Is the curriculum updated with new tech (React, Node.js, AI, Cloud...) or still using outdated textbooks?</li>
                                            <li><strong>Japanese Side:</strong> Is the language program high-quality? Does it guarantee a path to JLPT (N3, N2) so you can work right after graduation?</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-secondary dark:text-foreground text-lg">Dissecting High-Quality/Joint Programs</h4>
                                        <p className="text-base text-muted-foreground mt-1">
                                            Programs labeled &quot;Japanese-Standard&quot; often come with very high tuition. Through detailed reviews on Uni2Insight, you will know if the cost matches the facilities and actual value. Does the school introduce students to internships at major Japanese firms?
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 3 */}
                            <h2 id="part-3" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 text-xl">3</span>
                                The Perfect Roadmap: Excel in School, Master Exams with IT Shiken
                            </h2>
                            <p className="mb-6">
                                Choosing the right university on Uni2Insight is only 50% of the journey. To get a high-paying job, you need national Japanese IT certifications (issued by IPA) like **IT Passport** or **FE (Fundamental IT Engineer)**.
                            </p>
                            <p className="mb-6">
                                This is where <strong>IT Shiken</strong> comes in — the leading platform for Japanese IT certification prep in Vietnam.
                            </p>

                            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mb-8">
                                <div className="flex items-center gap-2 font-bold text-secondary dark:text-foreground mb-2 text-amber-700 dark:text-amber-400">
                                    <AlertTriangle className="w-5 h-5 text-amber-500" /> Success tip for future BrSEs:
                                </div>
                                <p className="text-base">
                                    Aim for **IT Passport** in your freshman or sophomore years, and target **FE** in your junior or senior years. Studying and practicing with mock tests on <Link href="/en/exams" className="text-blue-600 hover:underline font-semibold">IT Shiken</Link> helps you familiarize yourself with the exam structure and view detailed explanations.
                                </p>
                            </div>

                            {/* SECTION 4 */}
                            <h2 id="part-4" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 text-xl">4</span>
                                Quick Guide to Finding Information on Uni2Insight
                            </h2>
                            <p className="mb-6">
                                To easily navigate Uni2Insight, apply these quick tips:
                            </p>
                            <ul className="list-decimal pl-6 space-y-3 mb-8">
                                <li><strong>Use the Search Bar:</strong> Type in the specific school name or major (e.g., <em>Japanese-oriented IT, Software Engineering High Quality...</em>).</li>
                                <li><strong>Filter by Criteria:</strong> Check scores for Teaching Quality, Facilities, and Job Opportunities.</li>
                                <li><strong>Read Balanced Reviews:</strong> Prioritize reviews detailing both pros and cons.</li>
                            </ul>

                            {/* SECTION 5 */}
                            <h2 id="part-5" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 text-xl">5</span>
                                Conclusion: Don&apos;t Gamble with Your University Life!
                            </h2>
                            <p className="mb-6">
                                Choosing a school shapes your career trajectory. Instead of believing glossy admission ads, be a smart student who leverages technology to find the truth.
                            </p>
                            <p className="mb-6">
                                Visit <strong>Uni2Insight</strong> to read and reflect on your choices. Meanwhile, keep sharpening your programming skills and practicing on <strong>IT Shiken</strong> to build a solid career foundation.
                            </p>

                            {/* Tags Section */}
                            <div className="mt-16 pt-8 border-t border-border/40">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-sm font-semibold text-secondary dark:text-foreground">Tags:</span>
                                    {postDetail.tags.map((tag) => (
                                        <Link key={tag} href={`/tag/${tag}`} className="px-3 py-1.5 bg-muted/50 border border-border/40 text-foreground/70 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors font-medium">
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* RIGHT COLUMN: TABLE OF CONTENTS */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-8">
                        <div className="sticky top-24 bg-background/60 border border-border/50 p-6 rounded-2xl">
                            <h3 className="font-bold text-base text-secondary dark:text-foreground mb-5 flex items-center gap-2 pb-3 border-b border-border/40">
                                <Bookmark className="w-4 h-4 text-primary" /> Table of Contents
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="#part-1" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">1</span>
                                        What is Uni2Insight?
                                    </a>
                                </li>
                                <li>
                                    <a href="#part-2" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">2</span>
                                        Why use Uni2Insight?
                                    </a>
                                </li>
                                <li>
                                    <a href="#part-3" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">3</span>
                                        IT Shiken Practice
                                    </a>
                                </li>
                                <li>
                                    <a href="#part-4" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">4</span>
                                        How to Search
                                    </a>
                                </li>
                                <li>
                                    <a href="#part-5" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">5</span>
                                        Conclusion
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>

            {/* CTA BOX */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-gradient-to-br from-secondary/60 to-secondary dark:to-secondary/80 rounded-2xl p-8 sm:p-10 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to Master Japan&apos;s IT Industry?</h3>
                    <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                        Find the most authentic reviews on Uni2Insight and start preparing for IT Passport/FE exams for free today on IT Shiken!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild className="text-lg !py-6 bg-white text-secondary hover:bg-white/90">
                            <a href="https://uni2insight.com" target="_blank" rel="noopener noreferrer">Visit Uni2Insight</a>
                        </Button>
                        <Button asChild className="text-lg !py-6">
                            <Link href="/en/exams">Practice on IT Shiken</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* RELATED POSTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border/40">
                <h3 className="text-2xl font-bold text-secondary dark:text-foreground mb-8">Related Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postDetail.relatedPosts.map((post) => (
                        <Link key={post.id} href={post.href} className="group block">
                            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-muted/50">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                <Calendar className="w-3.5 h-3.5" />
                                {post.date}
                            </div>
                            <h4 className="font-bold text-lg text-secondary dark:text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                            </h4>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
