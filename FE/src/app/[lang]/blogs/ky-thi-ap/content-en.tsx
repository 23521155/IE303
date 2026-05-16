/* eslint-disable */
import Image from 'next/image';
import { 
    Bookmark, Calendar, Clock, Share2, 
    Eye, MessageSquare, ChevronRight, 
    Target, Lightbulb, CheckCircle2
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

const postDetail = {
    id: 'ky-thi-ap',
    title: 'What is the Applied Information Technology Engineer (AP)?',
    excerpt: 'The AP Certification - A solid stepping stone for your senior software engineering career in Japan.',
    coverImage: '/blog-it-passport-thumbnail.jpg',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/Shin.png',
    },
    date: '08/05/2026',
    category: 'IT Certification',
    readTime: '25 min',
  views: '1.2k',
    comments: '15',
    tags: ['AP', 'IT AP', 'Itshiken', 'Japan', 'Career'],
    relatedPosts: [
        { 
            id: 'ky-thi-it-passport', 
            title: 'What is IT Passport? A Complete Guide to Conquering the Japanese IT Certification', 
            image: '/blog-it-passport-thumbnail.jpg', 
            date: '01/05/2026',
            href: '/en/blogs/ky-thi-it-passport'
        },
        { 
            id: 'ky-thi-fe', 
            title: 'What is the FE Exam? Answering All Your Questions to Help You Pass Confidently', 
            image: '/blog-it-fe-thumbnail.jpg', 
            date: '01/05/2026',
            href: '/en/blogs/ky-thi-fe'
        },
        { 
            id: 'lo-trinh-hoc-it', 
            title: 'Japanese IT Certification Roadmap (IPA) from Beginner to Expert', 
            image: '/it-roadmap.png', 
            date: '08/05/2026',
            href: '/en/blogs/lo-trinh-hoc-it'
        },
    ]
};

export default function ContentEn() {
    return (
        <main className="min-h-screen bg-background transition-colors duration-300">
            {/* HERO SECTION */}
            <header className="bg-card pt-12 pb-8 border-b border-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <a href="/en" className="hover:text-primary dark:hover:text-blue-400 transition-colors">Home</a>
                        <ChevronRight className="w-4 h-4" />
                        <a href="/en/category" className="hover:text-primary dark:hover:text-blue-400 transition-colors">Blog</a>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground/90 truncate">{postDetail.title}</span>
                    </nav>

                    <div className="mb-6">
                        <span className="inline-block bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {postDetail.category}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.2]">
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
                                className="w-14 h-14 rounded-full border-2 border-white dark:border-slate-800 shadow-md object-cover"
                            />
                            <div>
                                <div className="font-bold text-foreground text-base">{postDetail.author.name}</div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {postDetail.date}</span>
                                    <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {postDetail.readTime} read</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                            <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"><Eye className="w-5 h-5" /> {postDetail.views}</span>
                            <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"><MessageSquare className="w-5 h-5" /> {postDetail.comments}</span>
                            <div className="flex items-center gap-2 pl-4 border-l border-border/60">
                                <button className="p-2 rounded-full hover:bg-secondary/20 transition-colors" title="Share">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-secondary/20 transition-colors" title="Save post">
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
                    <article className="lg:col-span-9 bg-card rounded-2xl shadow-sm border border-border/40 overflow-hidden">
                        
                        <figure className="w-full bg-slate-50 dark:bg-slate-800/50 p-4">
                            <Image 
                                src={postDetail.coverImage} 
                                alt={postDetail.title} 
                                width={1200} 
                                height={800}
                                className="w-full h-auto object-cover rounded-lg max-h-[500px]"
                                priority 
                            />
                        </figure>

                        <div className="p-6 sm:p-10 text-lg leading-relaxed text-foreground/80">
                            <p className="mb-6 drop-cap">
                                Hello fellow IT engineers. If you are working or planning to develop your career at Japanese enterprises, you have probably heard of the ITSS (Information Technology Skill Standards). Among these, the Applied Information Technology Engineer Examination (応用情報技術者試験, briefly called AP) is considered the most prestigious "guarantee" of an engineer's competence.
                            </p>
                            <p className="mb-6">
                                AP is not just a test to check how well you code. It is a comprehensive assessment to see if you have the mindset of a Leader, System Architect, or Project Manager. The passing rate for AP is quite strict, usually hovering around 20% - 25%. However, with the right strategy, conquering it is entirely within reach.
                            </p>

                            <h2 id="section-1" className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xl">1</span>
                                Why AP and not another certificate?
                            </h2>
                            <p className="mb-4">
                                Possessing an AP certificate brings extremely clear privileges, directly impacting your income and life in Japan:
                            </p>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li><strong>Permanent Resident Visa Points:</strong> Directly adds 20 points to your Highly Skilled Professional (HSP) visa application. This is a huge boost that shortens the time to get PR to just 1 to 3 years.</li>
                                <li><strong>Monthly Allowance (Shikaku Teate):</strong> Many Japanese companies have a policy to add 10,000 to 30,000 JPY/month to your base salary if you hold an AP degree.</li>
                                <li><strong>Career Advancement:</strong> Marks the transition from a Programmer (Coder) to higher-level positions like System Engineer (SE).</li>
                            </ul>

                            <h2 id="section-2" className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 text-xl">2</span>
                                The Rules: A "brain-burning" day with 2 exams
                            </h2>
                            <p className="mb-6">
                                The AP exam is organized by IPA twice a year (April and October). You will take 2 consecutive tests on the same day. The core point is: You must score a minimum of 60/100 for BOTH exams. If you fail the morning exam, your afternoon exam won't be graded.
                            </p>

                            <h3 className="text-xl font-semibold text-foreground/90 mt-6 mb-3">
                                Battle 1: Morning Exam (午前 - Gozen) - The Sprint
                            </h3>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li><strong>Time:</strong> 150 minutes for 80 multiple-choice questions. You have less than 2 minutes per question.</li>
                                <li><strong>Knowledge Structure:</strong>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li><strong>Technology (~50 qs):</strong> Mathematics, algorithms, computer architecture, OS, Network, Database, Security.</li>
                                        <li><strong>Management (~10 qs):</strong> Project Management (PMBOK), risk management, ITIL.</li>
                                        <li><strong>Strategy (~20 qs):</strong> Business strategy, enterprise architecture, accounting, law (copyright, labor).</li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-md">
                                <div className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Practical Strategy:
                                </div>
                                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                    Don't try to memorize textbooks. The key here is grinding Past Papers because IPA often reuses about 40-50% of old questions. Use the website 応用情報技術者試験過去問道場 (AP Siken Kakomon Dojo). Grind the last 5-7 years of exams until your accuracy is always over 80%, and you are guaranteed to pass.
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold text-foreground/90 mt-8 mb-3">
                                Battle 2: Afternoon Exam (午後 - Gogo) - Choosing your strengths
                            </h3>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Short essay and Case Study analysis (5-10 pages long) in 150 minutes.</li>
                                <li>There are 11 topics. You are required to do <strong>Question 1: Information Security</strong>. Then, choose to answer 4 more questions from the remaining 10 topics (Business Strategy, Programming, System Architecture, Network, Database, Embedded Systems, IS Development, Project Management, Service Management, Audit).</li>
                            </ul>
                            <p className="mb-6">
                                For those working in Web Development (e.g., MERN stack or Full-stack), maximize your technical background. Don't "look at the other mountain", finalize your strong subjects before the exam day. The advice is to aim straight for <strong>Database</strong> and <strong>System Architecture</strong>.
                            </p>

                            <h2 id="section-3" className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 text-xl">3</span>
                                "Beating" Database and System Architecture
                            </h2>
                            <p className="mb-6">
                                These are two "gold mines" for points if you have Web experience.
                            </p>

                            <h3 className="text-xl font-semibold text-foreground/90 mt-6 mb-3">
                                Database (データベース): When data mindset rules
                            </h3>
                            <p className="mb-4">
                                AP requires a strict systems mindset following Relational Database Standards (RDBMS).
                            </p>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li><strong>ERD Reading Trick:</strong> Don't jump into reading the text right away. Glance over the Entity-Relationship Diagram (ERD) first. When reading the text, underline phrases indicating quantities and relationships (e.g., "An order can have multiple products" -&gt; 1-N relationship).</li>
                                <li><strong>Diagnosing Normalization (正規化 - Seikika):</strong> The exam loves asking about 1NF, 2NF, and 3NF. Remember the rule: "Is this table fully functionally dependent on the Primary Key (主キー)? Is there any transitive dependency?". If there is redundant data, split the table and assign a Foreign Key (外部キー).</li>
                                <li><strong>"Catching SQL Keywords" in Japanese:</strong>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>Descending sort: 降順 (Koujun) = <code>ORDER BY ... DESC</code></li>
                                        <li>Group: グループ化 (Gurupuka) = <code>GROUP BY</code></li>
                                        <li>Remove duplicates: 重複を排除 (Choufuku wo haijo) = <code>DISTINCT</code></li>
                                    </ul>
                                </li>
                            </ul>

                            <h3 className="text-xl font-semibold text-foreground/90 mt-8 mb-3">
                                System Architecture (システムアーキテクチャ): The optimization problem
                            </h3>
                            <p className="mb-4">
                                This subject tests if you know how to calculate server load capacity, network bandwidth, or design redundant systems.
                            </p>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li><strong>Drawing Data Flow:</strong> Case Studies are often very long. Sketch out the Components: <code>Client -&gt; Load Balancer -&gt; Web Server -&gt; DB Server</code>. Wherever the problem mentions a bottleneck, mark an "X" right there.</li>
                                <li><strong>"Must-know" formulas:</strong> You must memorize how to calculate Availability (稼働率).
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>Series system: <code>A × B</code></li>
                                        <li>Parallel system: <code>1 - (1-A) × (1-B)</code></li>
                                    </ul>
                                </li>
                                <li><strong>Lifesaving vocabulary:</strong>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>Bottleneck: ボトルネック (Bottleneck) - Identify if it's CPU, RAM, or I/O.</li>
                                        <li>High Availability: 高可用性.</li>
                                        <li>System Expansion: スケールアップ (Scale up - upgrading one machine) vs スケールアウト (Scale out - adding more machines).</li>
                                    </ul>
                                </li>
                            </ul>

                            <h2 id="section-4" className="text-2xl sm:text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 text-xl">4</span>
                                The nightmare called "Specialized Japanese"
                            </h2>
                            <p className="mb-4">
                                AP's IT knowledge isn't too hard for engineers, but the language barrier is. Having passed JLPT N3 and working towards N2 is a very solid foundation. However, reading and analyzing systems is completely different from daily reading comprehension.
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="flex gap-3">
                                    <Target className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground">Speed is survival</h4>
                                        <p className="text-base text-muted-foreground">You only have 30 minutes for each Case Study. Don't read and translate every word. Use the Scanning technique, find structures like: 「～という課題がある」(There is a problem...) or 「～を満たす必要がある」(Must satisfy...). This is the key to picking out constraints for the design.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground">Writing essays</h4>
                                        <p className="text-base text-muted-foreground">You must write short sentences (15-40 characters) in Japanese to explain the solution. Practice writing concisely, using the correct short form structure (Plain form / である).</p>
                                    </div>
                                </div>
                            </div>

                            <h2 id="section-5" className="text-2xl sm:text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300 text-xl">5</span>
                                Proposed Study Roadmap (4-Month Campaign)
                            </h2>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li><strong>Month 1:</strong> General theory review. Read the "All in One" (オールインワン) book to familiarize yourself with specialized Kanji.</li>
                                <li><strong>Month 2:</strong> Grind morning questions on Kakomon Dojo. Set a goal of 50-100 questions per day. Take notes of your mistakes.</li>
                                <li><strong>Month 3:</strong> Practice afternoon exams. Choose 4 fixed subjects, set a timer for 30 minutes/exam. Practice underlining keywords and writing answers.</li>
                                <li><strong>Month 4 (Sprint Phase):</strong> Take Full Tests 2-3 times (both morning and afternoon) on weekends to get used to the pressure of sitting in the exam room for 5 hours straight.</li>
                            </ul>

                            <h2 id="conclusion" className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24">
                                Conclusion
                            </h2>
                            <p className="mb-4">
                                The AP exam is truly a "tough" challenge, requiring you to balance technical system knowledge, management mindset, and Japanese processing ability. However, the value it brings to your career path, income, and settlement in Japan is absolutely worth every hour you spend grinding.
                            </p>
                            <p className="font-medium text-foreground/90">
                                Wish you a resilient spirit and soon hold this powerful certificate in your hands!
                            </p>

                            {/* Tags Section */}
                            <div className="mt-16 pt-8 border-t border-border/40">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-sm font-semibold text-foreground">Tags:</span>
                                    {postDetail.tags.map((tag) => (
                                        <a key={tag} href={`/tag/${tag}`} className="px-3 py-1.5 bg-secondary/10 text-slate-600 dark:text-slate-300 text-sm rounded-md hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-200 transition-colors font-medium">
                                            #{tag}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* RIGHT COLUMN: TABLE OF CONTENTS */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-8">
                        {/* Sticky TOC */}
                        <div className="sticky top-24 bg-card p-6 rounded-2xl shadow-sm border border-border/40">
                            <h3 className="font-bold text-base text-foreground mb-5 flex items-center gap-2 pb-3 border-b border-border/40">
                                <Bookmark className="w-4 h-4 text-blue-500" /> Table of Contents
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="#section-1" className="flex items-center gap-2.5 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">1</span>
                                        Why choose AP?
                                    </a>
                                </li>
                                <li>
                                    <a href="#section-2" className="flex items-center gap-2.5 text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">2</span>
                                        Exam Rules
                                    </a>
                                </li>
                                <li>
                                    <a href="#section-3" className="flex items-center gap-2.5 text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 flex items-center justify-center text-xs font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors">3</span>
                                        Decoding Case Studies
                                    </a>
                                </li>
                                <li>
                                    <a href="#section-4" className="flex items-center gap-2.5 text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">4</span>
                                        Specialized Japanese
                                    </a>
                                </li>
                                <li>
                                    <a href="#section-5" className="flex items-center gap-2.5 text-muted-foreground hover:text-pink-600 dark:hover:text-pink-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300 flex items-center justify-center text-xs font-bold group-hover:bg-pink-600 group-hover:text-white transition-colors">5</span>
                                        Study Roadmap
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>

            {/* CTA BOX */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-gradient-to-br from-secondary/60 to-secondary dark:to-blue-800 rounded-xl p-8 sm:p-10 text-center shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to Practice for IT Certifications?</h3>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        IT Shiken offers free mock exams that closely match the real tests, with automatic grading and detailed result analysis. Start today – no registration required!
                    </p>
                    <Button asChild className="text-lg !py-6">
                        <Link href="/en/exams">Take Mock Exam Now – Free</Link>
                    </Button>
                </div>
            </div>

            {/* RELATED POSTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border/40">
                <h3 className="text-2xl font-bold text-foreground mb-8">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postDetail.relatedPosts.map((post) => (
                        <a key={post.id} href={post.href} className="group block">
                            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-secondary/10">
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
                            <h4 className="font-bold text-lg text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                            </h4>
                        </a>
                    ))}
                </div>
            </section>
        </main>
    );
}
