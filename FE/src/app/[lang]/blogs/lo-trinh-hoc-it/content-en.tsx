import Image from 'next/image';
import { Bookmark, Calendar, Clock, Share2 } from 'lucide-react';
import React from 'react';

const postDetail = {
    id: 'lo-trinh-hoc-it',
    title: 'Japan IT Certification Roadmap (IPA) from Basic to Expert',
    excerpt: 'A comprehensive guide to the Japanese national IT certification system, including exam structures and registration procedures for each level.',
    coverImage: '/blog-it-fe-thumbnail.jpg',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
    },
    date: '08/05/2026',
    category: 'Learning Path',
    readTime: '30 min',
    tags: ['IT', 'Roadmap', 'IPA', 'IT Passport', 'FE', 'AP', 'Career'],
};

export default function ContentEn() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#121212] py-8 transition-colors duration-300 text-slate-900 dark:text-slate-200">
            {/* HEADER */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="mb-4">
                    <span className="bg-primary text-white dark:bg-blue-900  text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                        {postDetail.category}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                    {postDetail.title}
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-4xl">{postDetail.excerpt}</p>

                {/* META */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <Image
                            src={postDetail.author.avatar}
                            alt={postDetail.author.name}
                            height={48}
                            width={48}
                            className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 object-cover"
                        />
                        <div>
                            <div className="font-semibold text-slate-900 dark:text-white">{postDetail.author.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{postDetail.author.role}</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {postDetail.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {postDetail.readTime} read
                        </div>

                        <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
                            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
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
                    className="w-full h-auto max-h-[500px] object-cover rounded-md shadow-sm"
                />
            </div>

            {/* CONTENT */}
            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                <p className="mb-6">
                    Japan's Information Technology Certification system, organized by IPA (Information-technology Promotion Agency), is divided into 4 levels (Level 1 to Level 4). This article analyzes the roadmap from beginner to expert, along with details on exam structures and registration procedures.
                </p>

                <figure className="my-10">
                    <img 
                        src="/it-roadmap.png" 
                        alt="Japan IT Certification Roadmap from Basic to Advanced" 
                        className="w-full h-auto object-contain rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] dark:shadow-none border border-slate-100 dark:border-slate-800 bg-white"
                    />
                    <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                        Roadmap of Japanese National IT Certifications (Source: IPA)
                    </figcaption>
                </figure>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    Level 1: Common Knowledge - IT Passport (IP)
                </h2>
                <p className="mb-4">
                    <strong>IT Passport</strong> is your entry ticket into the tech world. It is the most fundamental certification intended for anyone working in a modern corporate environment.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 my-8">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-primary dark:bg-blue-600 rounded-full"></span>
                        IT Passport Exam Structure & Registration
                    </h4>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                        <li><strong>Exam Format:</strong> Computer-Based Testing (CBT)</li>
                        <li><strong>Duration & Questions:</strong> 120 minutes - 100 multiple-choice questions (4 options)</li>
                        <li><strong>Passing Score:</strong> Total score over 600/1000, with no section below 300 points.
                            <ul className="list-disc pl-6 mt-1 text-sm">
                                <li>Strategy Section: Approx. 35 questions</li>
                                <li>Management Section: Approx. 20 questions</li>
                                <li>Technology Section: Approx. 45 questions</li>
                            </ul>
                        </li>
                        <li className="pt-2 border-t border-slate-200 dark:border-slate-700"><strong>Exam Fee:</strong> 7,500 JPY</li>
                        <li><strong>Registration Procedure:</strong> Register online via the IPA website. CBT exams are held <strong>year-round</strong> at test centers nationwide (Prometric/CBT-Solutions). You can schedule the exam on any weekend.</li>
                    </ul>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    Level 2: Basic Knowledge & Skills - FE / SG
                </h2>
                <p className="mb-4">
                    This stage is for those aiming to become practical software engineers or basic information security managers. It includes 2 certifications: <strong>FE (Fundamental Information Technology Engineer)</strong> and <strong>SG (Information Security Management)</strong>.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 my-8">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-secondary dark:bg-blue-600 rounded-full"></span>
                        FE / SG Exam Structure & Registration
                    </h4>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">For FE (Fundamental IT Engineer):</p>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300 text-sm mb-4">
                        <li><strong>Format:</strong> Computer-Based Testing (CBT) - Available year-round.</li>
                        <li><strong>Structure:</strong> Divided into 2 subjects on the same day.
                            <ul className="list-disc pl-6 mt-1">
                                <li><strong>Subject A (Theory):</strong> 90 mins - 60 multiple-choice questions. Passing score: 600/1000.</li>
                                <li><strong>Subject B (Practical):</strong> 100 mins - 20 scenario questions (reading code, algorithms, security). Passing score: 600/1000.</li>
                            </ul>
                        </li>
                    </ul>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2 pt-4 border-t border-slate-200 dark:border-slate-700">For SG (Information Security Management):</p>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300 text-sm mb-4">
                        <li><strong>Format:</strong> CBT - Available year-round.</li>
                        <li><strong>Structure:</strong> Subject A (Theory - 60 mins/48 questions) and Subject B (Scenario - 60 mins/12 questions).</li>
                    </ul>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-sm"><strong>Exam Fee:</strong> 7,500 JPY per exam.</p>
                        <p className="text-sm"><strong>Registration Procedure:</strong> Register through the IPA CBT portal. You can flexibly choose the exam date and time at test centers, similar to IT Passport.</p>
                    </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    Level 3: Applied Knowledge & Skills - AP
                </h2>
                <p className="mb-4">
                    <strong>AP (Applied Information Technology Engineer)</strong> is a crucial certification to establish yourself as a Senior Engineer or Project Manager. At this level, you need comprehensive system analysis and design capabilities.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 my-8">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-green-500 rounded-full"></span>
                        AP Exam Structure & Registration
                    </h4>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                        <li><strong>Exam Format:</strong> Paper-based. Held twice a year (Spring in April and Autumn in October).</li>
                        <li><strong>Exam Structure:</strong>
                            <ul className="list-disc pl-6 mt-1 text-sm">
                                <li><strong>Morning (09:30 - 12:00):</strong> 150 mins - 80 multiple-choice questions covering comprehensive IT. Passing score: 60%.</li>
                                <li><strong>Afternoon (13:00 - 15:30):</strong> 150 mins - Descriptive/Case study. You must answer 4 out of 11 advanced scenario questions. Passing score: 60%.</li>
                            </ul>
                        </li>
                        <li className="pt-2 border-t border-slate-200 dark:border-slate-700"><strong>Exam Fee:</strong> 7,500 JPY</li>
                        <li><strong>Registration Procedure:</strong> Since it is paper-based, you must register 2-3 months in advance on the IPA website. (Spring registration starts mid-January; Autumn registration starts mid-July).</li>
                    </ul>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    Level 4: Advanced Professional (Specialist)
                </h2>
                <p className="mb-4">
                    This is the highest level in the IPA system. Certifications at Level 4 are divided into 9 specialized areas, including: IT Strategist (ST), System Architect (SA), Project Manager (PM), Network Specialist (NW), Database Specialist (DB), etc.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 my-8">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
                        Level 4 Exam Structure & Registration
                    </h4>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                        <li><strong>Exam Format:</strong> Paper-based. Each certification is held only once a year (either Spring or Autumn depending on the subject).</li>
                        <li><strong>Exam Structure (Very strict):</strong>
                            <ul className="list-disc pl-6 mt-1 text-sm">
                                <li>Morning I (50 mins): General multiple-choice (Exempt if you hold AP or passed another Level 4 exam within 2 years).</li>
                                <li>Morning II (40 mins): Specialized multiple-choice.</li>
                                <li>Afternoon I (90 mins): Short descriptive answers based on scenarios.</li>
                                <li>Afternoon II (120 mins): Essay - Requires writing an analytical essay on an actual project you have worked on.</li>
                            </ul>
                        </li>
                        <li className="pt-2 border-t border-slate-200 dark:border-slate-700"><strong>Procedure & Fee:</strong> 7,500 JPY. The registration schedule is the same as the AP exam.</li>
                    </ul>
                </div>

                <div className="bg-primary/10 dark:bg-blue-900/20 border-l-4 border-primary rounded-r-md p-6 my-10">
                    <h3 className="text-xl font-bold text-primary dark:text-blue-100 mb-3">Roadmap Advice</h3>
                    <p className="text-slate-800 dark:text-slate-200">
                        Start from <strong>FE</strong> if you have a solid IT background, or from <strong>IT Passport</strong> if you are changing careers. The <strong>AP</strong> certificate is the most valuable long-term goal to maximize your appeal to Japanese employers, before you decide to delve into a specific Level 4 branch.
                    </p>
                </div>
            </article>
        </main>
    );
}
