/* eslint-disable */
import Image from 'next/image';
import { Bookmark, Calendar, Clock, Link as LinkIcon, Share2, Eye, MessageSquare, ChevronRight, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import React from 'react';

const postDetail = {
    id: 'ky-thi-fe',
    title: 'What is the FE Exam? Everything you need to know to pass',
    excerpt: 'From definition, exam structure, registration to a detailed study roadmap.',
    coverImage: '/blog-it-fe-thumbnail.jpg',
    author: {
        name: 'Nguyễn Lê Tuấn Phi',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
    },
    date: '01/05/2026',
    category: 'IT Certification',
    readTime: '30 minutes',
    tags: ['FE', 'IT FE', 'Itshiken', 'Japan', 'Career'],
    views: '1.2k',
    comments: '15',
    relatedPosts: [
        { 
            id: 'ky-thi-it-passport', 
            title: 'What is the IT Passport Exam? A complete guide to passing', 
            image: '/blog-it-passport-thumbnail.jpg', 
            date: '25/04/2026',
            href: '/en/blogs/ky-thi-it-passport'
        },
        { 
            id: 'ky-thi-ap', 
            title: 'What is the AP (Applied Information Technology Engineer) Exam?', 
            image: '/blog-it-passport-thumbnail.jpg', 
            date: '08/05/2026',
            href: '/en/blogs/ky-thi-ap'
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

const compareStyles = {
    // .compare
    container: 'grid grid-cols-1 sm:grid-cols-2 gap-4 my-6',

    // .compare-card
    cardBase: 'rounded-md p-5 border-2 transition-colors',

    // .compare-card.fe & .compare-card.ip
    cardVariants: {
        fe: 'border-primary bg-primary/10 dark:border-blue-700 dark:bg-blue-900/20',
        ip: 'border-secondary bg-gray-50 dark:border-blue-900 dark:bg-blue-900/10',
    },

    // .compare-card h4
    titleBase: 'text-[15px] font-bold mb-2.5',
    titleVariants: {
        fe: 'text-primary dark:text-blue-900',
        ip: 'text-secondary dark:text-blue-900',
    },

    // .compare-card ul & li
    list: 'list-disc pl-4 m-0 space-y-1.5',
    listItem: 'text-sm text-secondary dark:text-slate-300',
};
const sessionStyles = {
    container: 'grid grid-cols-1 sm:grid-cols-2 gap-4 my-6',
    cardBase: 'rounded-md p-5 border-2 transition-colors',
    cardVariants: {
        morning: 'border-primary bg-primary/10 dark:border-blue-700 dark:bg-blue-900/20',
        afternoon: 'border-secondary bg-gray-50 dark:border-blue-500 dark:bg-blue-900/10',
    },
    titleBase: 'text-[15px] font-bold mb-2.5',
    titleVariants: {
        morning: 'text-primary dark:text-blue-900',
        afternoon: 'text-secondary dark:text-blue-900',
    },
    text: 'text-sm mb-1.5 text-muted-foreground',
    strong: 'font-semibold text-slate-900 dark:text-slate-200',
};

export default function ContentEn() {
    return (
        <main className="min-h-screen bg-background transition-colors duration-300">
            {/* HERO SECTION */}
            <header className="bg-card pt-12 pb-8 border-b border-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-primary dark:hover:text-blue-400 transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="//category" className="hover:text-primary dark:hover:text-blue-400 transition-colors">Blog</Link>
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
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {postDetail.readTime}</span>
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
                                <button className="p-2 rounded-full hover:bg-secondary/20 transition-colors" title="Save">
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
                            <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                                What is the FE Certificate?
                            </figcaption>
                        </figure>

                        <div className="p-6 sm:p-10 text-lg leading-relaxed text-foreground/80">
                <p className="mb-4">
                    If you are working in the IT industry and want a certification to prove your capabilities – or are
                    aiming for the Japanese labor market – you have probably heard of the FE certification. But what
                    exactly is FE, what do you study, and can you pass it starting from almost zero?
                </p>

                <p className="mb-6">
                    This article will answer everything. No fluff, just practical information and what you really need
                    to know to get started.
                </p>



                {/* SECTION 1 */}
                <h2
                    id="it-fe-la-gi"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40"
                >
                    1. What Is The FE Certificate?
                </h2>
                <p className="mb-6">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://viblo.asia/p/thi-do-chung-chi-ki-su-cntt-chuan-nhat-ban-fe-fundamental-information-technology-engineers-examination-tu-con-so-0-eW65GGO65DO"
                        className="font-medium text-primary underline mr-1 dark:text-blue-900"
                    >
                        FE
                    </a>
                    – <strong>Fundamental Information Technology Engineer Examination (基本情報技術者試験)</strong> – is
                    Japan's standard basic IT engineer certification. This is a national exam organized by{' '}
                    <strong>IPA</strong>
                    (Information-technology Promotion Agency) and officially recognized by the Japanese Ministry of
                    Economy, Trade and Industry (METI).
                </p>
                <p className="mb-6">
                    The special thing about FE is:{' '}
                    <strong>it doesn't matter where you studied or what degree you have</strong>. This certification
                    solely evaluates your practical knowledge and skills in the IT field – including both theory and
                    programming abilities.
                </p>

                {/* INFO BOX */}
                <div className="flex gap-4 bg-primary/10 dark:bg-blue-900/20 border dark:border-blue-800 rounded-md p-5 my-8">
                    <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-secondary dark:text-blue-100 m-0">
                        FE is at <strong>Level 2</strong> in the Japanese IT Skill Standard (ITSS) scale. This is the
                        next step after IT Passport (Level 1) and is the foundation to climb to higher levels such as
                        AP, PM, or SC.
                    </p>
                </div>

                {/* SECTION 2 */}
                <h2
                    id="fe-khac-it-passport"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40"
                >
                    2. How Is FE Different From IT Passport?
                </h2>

                <p className="mb-6">
                    Many people often ask: "I already have an IT Passport, is FE worth studying next?" The answer is:{' '}
                    <strong>
                        these two certifications are completely different in terms of target audience, difficulty, and
                        content
                    </strong>
                    . Below is a comparison to help you easily visualize:
                </p>
                <div className={compareStyles.container}>
                    <div className={`${compareStyles.cardBase} ${compareStyles.cardVariants.fe}`}>
                        <h4 className={`${compareStyles.titleBase} ${compareStyles.titleVariants.fe}`}>
                            FE Certificate (Level 2)
                        </h4>
                        <ul className={compareStyles.list}>
                            <li className={compareStyles.listItem}>For engineers, developers, programmers</li>
                            <li className={compareStyles.listItem}>
                                Includes a practical skills section (afternoon exam)
                            </li>
                            <li className={compareStyles.listItem}>Requires algorithmic and programming thinking</li>
                            <li className={compareStyles.listItem}>Pass rate is around 20–25%</li>
                            <li className={compareStyles.listItem}>
                                Can replace a university degree for a Japanese visa
                            </li>
                        </ul>
                    </div>

                    <div className={`${compareStyles.cardBase} ${compareStyles.cardVariants.ip}`}>
                        <h4 className={`${compareStyles.titleBase} ${compareStyles.titleVariants.ip}`}>
                            IT Passport (Level 1)
                        </h4>
                        <ul className={compareStyles.list}>
                            <li className={compareStyles.listItem}>For all audiences including non-IT</li>
                            <li className={compareStyles.listItem}>Only includes a multiple-choice theory section</li>
                            <li className={compareStyles.listItem}>General knowledge, management, strategy</li>
                            <li className={compareStyles.listItem}>Pass rate is around 52%</li>
                            <li className={compareStyles.listItem}>Cannot replace a university degree for a visa</li>
                        </ul>
                    </div>
                </div>
                <p>
                    In short: IT Passport is the "IT passport" to enter the industry, while FE is the "engineer ID card"
                    to prove you can actually do the job. If you are a dev or want to become a professional engineer, FE
                    is the true destination.
                </p>

                {/* SECTION 3 */}
                <h2
                    id="cau-truc-de-thi"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40"
                >
                    3. Detailed FE Exam Structure
                </h2>
                <p className="mb-6">
                    This is the most asked part. Knowing the exam structure clearly will help you allocate your study
                    time more wisely.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-border/60 rounded-md p-5 my-6 text-center font-medium">
                    This is the most important part you need to grasp before starting to study. The FE exam consists of{' '}
                    <strong>two separate sections</strong>, often called the "morning exam" and "afternoon exam" – 150
                    minutes each, taken on the same day.
                </div>

                <div className={sessionStyles.container}>
                    {/* Card Buổi Sáng */}
                    <div className={`${sessionStyles.cardBase} ${sessionStyles.cardVariants.morning}`}>
                        <h4 className={`${sessionStyles.titleBase} ${sessionStyles.titleVariants.morning}`}>
                            Morning Session – Theory
                        </h4>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Duration:</strong> 150 minutes
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Number of questions:</strong> 80 short
                            multiple-choice questions
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Points per question:</strong> 1.25 points
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Passing criteria:</strong> Correct ≥ 48/80
                            questions (≥ 60 points)
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Content:</strong> Comprehensive IT knowledge –
                            hardware, networking, database, security, algorithms, project management, legal...
                        </p>
                    </div>

                    {/* Card Buổi Chiều */}
                    <div className={`${sessionStyles.cardBase} ${sessionStyles.cardVariants.afternoon}`}>
                        <h4 className={`${sessionStyles.titleBase} ${sessionStyles.titleVariants.afternoon}`}>
                            Afternoon Session – Skills
                        </h4>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Duration:</strong> 150 minutes
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Number of questions:</strong> 8 long questions,
                            each with multiple sub-questions
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Structure:</strong> Questions 1–5 are mandatory (12
                            pts/q), Question 6 is mandatory (20 pts), choose either Question 7 or 8 (20 pts)
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Passing criteria:</strong> ≥ 60 points
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Content:</strong> Programming
                            (C/Java/Python/Assembly/Excel), algorithms, system design, practical security
                        </p>
                    </div>
                </div>

                {/* WARNING BOX */}
                <div className="flex gap-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-md p-5 my-8">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-yellow-900 dark:text-yellow-100 m-0">
                        Important: Both sections must meet their respective passing thresholds. If you pass one section,
                        your result is <strong>reserved for the immediate next exam</strong> and you only need to retake
                        the remaining section – this is a rather "friendly" point of FE compared to many other
                        certifications.
                    </p>
                </div>

                {/* TIẾP TỤC SECTION 3 */}
                <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
                    Key knowledge areas to master
                </h3>
                <p className="mb-6">
                    The scope of the FE exam is quite broad but mainly focuses on the following areas:
                </p>

                <div className="overflow-x-auto mb-8">
                    <table className="w-full border border-border/60 text-sm text-left">
                        <thead className="bg-[#053825] text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    Topic
                                </th>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    Key focus areas
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-foreground/80">
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Basic Computer Science
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Binary, number systems, logical operations, data structures (stack, queue, tree,
                                    hash)
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Computer Architecture
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    RAM, CPU, scheduling algorithms (FIFO, LRU), cache memory
                                </td>
                            </tr>
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Computer Networks
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    TCP/IP, DNS, DHCP, NAT, common protocols
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Databases
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    SQL, DB design, relations, normalization
                                </td>
                            </tr>
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Security
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    SQL injection, phishing, encryption, security policies
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Software Development
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Development lifecycle, testing (unit test, integration test), object-oriented design
                                </td>
                            </tr>
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Management & Strategy
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Project management, break-even, business strategy, IT auditing
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Programming (afternoon exam)
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Algorithms, flowcharts, C/Java/Python code – choose the 1 language you are strongest
                                    in
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <figure className="my-8">
                    {/* Sử dụng thẻ img thay vì Image của Next.js để tránh lỗi cấu hình domain host (nếu có) với Unsplash */}
                    <Image
                        width={500}
                        height={500}
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=75"
                        alt="Computer screen displaying programming code for the afternoon FE exam"
                        className="w-full h-auto object-cover rounded-md shadow-sm"
                        loading="lazy"
                    />
                    <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                        The afternoon session of FE requires practical programming thinking – you will choose the
                        language you are most confident in to take the test.
                    </figcaption>
                </figure>

                {/* SECTION 4 */}
                <h2
                    id="loi-ich"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40"
                >
                    4. Practical Benefits Of Having An FE Certificate
                </h2>
                <p className="mb-4">
                    Why choose FE over other international IT certifications? Here are the reasons shared by many
                    Vietnamese engineers working in Japan:
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-blue-900 mt-6 mb-3">
                    Apply for a working visa in Japan – no university degree required
                </h3>
                <p className="mb-4">
                    This is the "killer feature" of FE that not every certification has. Normally, to apply for an IT
                    engineer working visa in Japan, you need a related university degree or more than 10 years of
                    experience. But
                    <strong> possessing an FE certificate can substitute for both of the above conditions</strong>. For
                    those who do not have a university degree but are truly good at technical skills, this is an
                    extremely valuable path.
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-blue-900 mt-6 mb-3">
                    Bonus points for Kodo (Highly Skilled) visa & permanent residency
                </h3>
                <p className="mb-4">
                    The FE certificate is counted in Japan's "Highly Skilled Professional" (高度人材ポイント制度) point
                    system. This helps you accumulate points faster to apply for a Kodo (Highly Skilled Worker) visa and
                    subsequently a permanent residency visa.
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-blue-900 mt-6 mb-3">
                    Recognized in 12 countries
                </h3>
                <p className="mb-6">
                    FE is not only valuable in Japan. The FE exam under the <strong>ITPEC</strong> (IT Professionals
                    Examination Council) framework is equivalently recognized in 12 Asian countries including India,
                    Singapore, South Korea, China, Philippines, Thailand, Vietnam, Myanmar, Taiwan, Malaysia, Mongolia,
                    and Bangladesh.
                </p>

                {/* SUCCESS BOX */}
                <div className="flex gap-4 bg-primary/10 dark:bg-green-900/20 border-l-4 border-primary dark:border-green-500 rounded-r-md p-5 my-8">
                    <CheckCircle2 className="w-6 h-6 text-primary dark:text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-slate-800 dark:text-green-100 m-0">
                        <strong>Lifetime validity + a stepping stone to higher levels:</strong> Like IT Passport, the FE
                        certificate has no expiration date. And after FE, you have a solid foundation to conquer AP
                        (Applied IT Engineer), followed by specialized certifications like PM (Project Manager), SC
                        (Security), DB (Database) depending on your career path.
                    </p>
                </div>

                {/* SECTION 5 */}
                <h2
                    id="dang-ky"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40"
                >
                    5. How To Register For The FE Exam
                </h2>
                <div className="overflow-x-auto mb-6">
                    <table className="w-full border border-border/60 text-sm text-left">
                        <thead className="bg-[#053825] text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    Criteria
                                </th>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    🇻🇳 In Vietnam
                                </th>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    🇯🇵 In Japan
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-foreground/80">
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Organizing body
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    HITC / VITEC (in coordination with IPA – ITPEC)
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    IPA directly
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Exam schedule
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Twice a year (April & October)
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Twice a year (April & October)
                                </td>
                            </tr>
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Exam language
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    English + Vietnamese translation
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Japanese (needs around N2–N3)
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Exam format
                                </td>
                                <td className="px-4 py-3 border border-border/60">Paper-based</td>
                                <td className="px-4 py-3 border border-border/60">
                                    Computer-based (CBT)
                                </td>
                            </tr>
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Fee
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    ~1,500,000 VND
                                </td>
                                <td className="px-4 py-3 border border-border/60">~7,500 JPY</td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Location
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Hanoi, Da Nang, Ho Chi Minh City and some other places
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Across 47 prefectures in Japan
                                </td>
                            </tr>
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Results
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    ~20 days after the exam
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    View immediately after the exam (CBT)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* TIP BOX */}
                <div className="flex gap-4 bg-gray-50 dark:bg-blue-900/20 border-l-4 border-secondary dark:border-blue-900 rounded-r-md p-5 my-8">
                    <p className="text-sm sm:text-base text-secondary dark:text-blue-100 m-0">
                        <strong>Tip:</strong> If you take the exam in Vietnam, the test comes with a Vietnamese
                        translation so you don't need to worry too much about English. More importantly is understanding
                        the IT terminology. But if possible,{' '}
                        <strong>read the English version as the primary source</strong> – many people have reflected
                        that the Vietnamese translation is sometimes not very natural.
                    </p>
                </div>

                {/* SECTION 6 */}
                <h2
                    id="lo-trinh"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40"
                >
                    6. 3-Month FE Study Roadmap From Scratch
                </h2>

                <figure className="my-8">
                    <Image
                        width={500}
                        height={500}
                        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=900&q=75"
                        alt="A person planning to study for the FE certificate with a notebook and computer"
                        className="w-full h-auto object-cover rounded-md shadow-sm"
                        loading="lazy"
                    />
                    <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                        The total preparation time for FE usually ranges from 3 months (for IT folks) to 5–6 months (for
                        complete beginners).
                    </figcaption>
                </figure>

                <p className="mb-6">
                    This is a practical roadmap shared by many who have passed FE. No need for over 12 million in
                    tuition fees, no need for fancy courses – just discipline and the right method.
                </p>

                {/* STEPS */}
                <div className="flex flex-col gap-4 my-8">
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-border/60 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg dark:bg-blue-900">
                            1
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-blue-900 text-lg mb-1">
                                Month 1 – Read foundational textbooks (morning exam)
                            </h4>
                            <p className="text-sm text-muted-foreground m-0">
                                Use the "New FE Textbook Vol.1 & Vol.2" by IPA (free English version available). Spend
                                1–2 hours each evening, no need to memorize everything immediately. Goal: understand the
                                overall chapters, note keywords in Q&A format. At the end of each chapter, do the
                                exercises for that chapter.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-border/60 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg dark:bg-blue-900">
                            2
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-blue-900 text-lg mb-1">
                                Month 2 – Practice past papers (morning exam + start afternoon exam)
                            </h4>
                            <p className="text-sm text-muted-foreground m-0">
                                Download past exam papers from the ITPEC website (itpec.org). Do at least 1 morning exam
                                daily, read the answer explanations carefully even for the correct ones. Simultaneously,
                                start getting used to the afternoon exam, choose your strongest programming language
                                (Java/Python/C) for in-depth review.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-border/60 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg dark:bg-blue-900">
                            3
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground text-lg mb-1 text-blue-900">
                                Month 3 – Tackle afternoon exam & comprehensive mock tests
                            </h4>
                            <p className="text-sm text-muted-foreground m-0">
                                Focus on tackling the afternoon exam – this is the part where most people fail. Practice
                                reading questions quickly, identify easy questions to do first. At the end of the month,
                                take full mock tests for both morning and afternoon in a continuous 300 minutes to get
                                used to the real pressure. Remember: for questions 7/8, you choose 1 – decide in advance
                                and don't hesitate in the exam room.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-border/60 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg dark:bg-blue-900">
                            4
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-blue-900 text-lg mb-1">
                                Final Week – Quick review of weaknesses, maintain mentality
                            </h4>
                            <p className="text-sm text-muted-foreground m-0">
                                Do not learn new knowledge. Review questions you often get wrong, revise frequently
                                appearing keywords. Get enough sleep. In the exam room, do easy questions first –
                                average less than 2 minutes per question for the morning exam, don't "get stuck" on a
                                difficult one.
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">
                    Recommended materials & tools
                </h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                        <strong>Official books:</strong>
                        <a
                            href={'https://pdfcoffee.com/new-fe-textbook-vol2-pdf-free.html'}
                            className="ml-1 font-bold underline text-primary dark:text-blue-900"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            New FE Textbook Vol.1 & Vol.2 (Published by IPA, free PDF on LIGHTBOAT)
                        </a>
                    </li>
                    <li>
                        <strong>Past papers:</strong>
                        <a
                            href="https://itpec.org/"
                            className="ml-1 font-bold underline text-primary dark:text-blue-900"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download at itpec.org – papers from 2017 to present
                        </a>
                    </li>
                    <li>
                        <strong>Japanese review site:</strong>
                        <a
                            href="https://www.fe-siken.com/"
                            className="ml-1 font-bold underline text-primary dark:text-blue-900"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            fe-siken.com (if you take the exam in Japan)
                        </a>
                    </li>
                    <li>
                        <strong>Online mock exams:</strong>
                        <Link href="/en/" className="ml-1 font-bold underline text-primary dark:text-blue-900">
                            IT Shiken – interface simulates the real exam, automatic grading, free
                        </Link>
                    </li>
                </ul>

                {/* INTERNAL LINK 2 */}
                <Link
                    href="/en/exams"
                    className="flex items-center gap-4 bg-primary/10 dark:bg-blue-900/10 border border-green-200 dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md hover:border-primary dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-900 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – Free FE Exam Practice
                        </div>
                        <div className="font-semibold text-foreground group-hover:text-primary dark:group-hover:text-blue-900 transition-colors">
                            Take FE mock exams online – 99% simulation of real exams, automatic grading right after
                            completion
                        </div>
                    </div>
                </Link>

                {/* SECTION 7 - FAQ */}
                <h2
                    id="faq"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40"
                >
                    7. Frequently Asked Questions (FAQ)
                </h2>

                <div className="space-y-4 mb-10">
                    <div className="border border-border/60 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-foreground">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            Is FE difficult? What is the pass rate?
                        </div>
                        <div className="p-4 border-t border-border/60 text-foreground/80 text-sm md:text-base bg-card">
                            The average FE pass rate in Vietnam is under 25% – quite low. This doesn't mean it's
                            impossible to pass, but rather many people study incorrectly or neglect the afternoon
                            section. If you study for a full 3 months following the right roadmap, the chance of passing
                            is entirely realistic.
                        </div>
                    </div>

                    <div className="border border-border/60 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-foreground">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            Should I take the FE exam if I don't have a university degree?
                        </div>
                        <div className="p-4 border-t border-border/60 text-foreground/80 text-sm md:text-base bg-card">
                            This is one of the reasons many people choose FE. The FE certificate is recognized by the
                            Japanese government to replace a university degree when applying for an IT engineer working
                            visa. Therefore, if you want to work in Japan without an IT university degree, FE is the
                            shortest and most practical path.
                        </div>
                    </div>

                    <div className="border border-border/60 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-foreground">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            Which programming language should I choose for the afternoon exam?
                        </div>
                        <div className="p-4 border-t border-border/60 text-foreground/80 text-sm md:text-base bg-card">
                            The afternoon exam allows you to choose 1 of 5 languages: C, Java, Python, Assembly, Excel.
                            The most common advice from the community is to choose the language you use daily. Python
                            and Java are the two most popular choices because of their clear syntax, which is easy to
                            read under exam conditions.
                        </div>
                    </div>

                    <div className="border border-border/60 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-foreground">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            If I pass one section, do I need to retake both?
                        </div>
                        <div className="p-4 border-t border-border/60 text-foreground/80 text-sm md:text-base bg-card">
                            No. If you pass one section (morning or afternoon), that result is reserved for the
                            immediate next exam. You only need to retake the section you haven't passed. This
                            significantly reduces the pressure for first-time test-takers.
                        </div>
                    </div>

                    <div className="border border-border/60 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-foreground">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>I am a non-IT
                            person, should I take the FE exam?
                        </div>
                        <div className="p-4 border-t border-border/60 text-foreground/80 text-sm md:text-base bg-card">
                            To be honest: FE is quite challenging for someone with absolutely no IT background because
                            of the programming and algorithm sections. If you are non-IT, you should start with IT
                            Passport first to build a foundation, then decide whether to climb up to FE. Many comtors,
                            BAs, and testers have passed FE after moving up from IT Passport – it's entirely feasible
                            given enough study time.
                        </div>
                    </div>
                </div>

                {/* INTERNAL LINK 3 */}
                <Link
                    href="/en/flashcards"
                    className="flex items-center gap-4 bg-primary/10 dark:bg-blue-900/10 border border-green-200 dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md hover:border-primary dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-900 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – Flashcards
                        </div>
                        <div className="font-semibold text-foreground group-hover:text-primary dark:group-hover:text-blue-900 transition-colors">
                            Review IT vocabulary & concepts using Flashcards – learn fast, remember longer
                        </div>
                    </div>
                </Link>

                {/* CONCLUSION */}
                <div className="bg-slate-50 dark:bg-slate-800/30 border border-border/60 rounded-md p-6 sm:p-8 my-10">
                    <h2 className="text-xl font-bold text-foreground mb-4">Conclusion</h2>
                    <p className="mb-4 text-foreground/80">
                        The FE certificate is not easy, but it is worth all the effort you put in. Not just a line on
                        your CV, FE is also a real door for you to work in Japan, get a visa without a university
                        degree, and have a solid foundation to step up to higher levels.
                    </p>
                    <p className="text-foreground/80 font-medium mb-4">
                        More importantly: <strong>you don't need a perfect starting point</strong>. Many people have
                        passed FE from almost zero, just by studying right and sticking to the plan. The 3-month roadmap
                        above is realistic and has been verified by people in the community themselves.
                    </p>
                    <p className="text-foreground/80 font-medium">
                        Good luck conquering this engineering certificate!
                    </p>
                </div>

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
                        <div className="sticky top-24 bg-card p-6 rounded-2xl shadow-sm border border-border/40">
                            <h3 className="font-bold text-base text-foreground mb-5 flex items-center gap-2 pb-3 border-b border-border/40">
                                <Bookmark className="w-4 h-4 text-blue-500" /> Table of Contents
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="#it-fe-la-gi" className="flex items-center gap-2.5 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">1</span>
                                        What is FE?
                                    </a>
                                </li>
                                <li>
                                    <a href="#fe-khac-it-passport" className="flex items-center gap-2.5 text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">2</span>
                                        Differs from IT Passport?
                                    </a>
                                </li>
                                <li>
                                    <a href="#cau-truc-de-thi" className="flex items-center gap-2.5 text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 flex items-center justify-center text-xs font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors">3</span>
                                        Exam structure
                                    </a>
                                </li>
                                <li>
                                    <a href="#loi-ich" className="flex items-center gap-2.5 text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">4</span>
                                        Benefits
                                    </a>
                                </li>
                                <li>
                                    <a href="#dang-ky" className="flex items-center gap-2.5 text-muted-foreground hover:text-pink-600 dark:hover:text-pink-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300 flex items-center justify-center text-xs font-bold group-hover:bg-pink-600 group-hover:text-white transition-colors">5</span>
                                        How to register
                                    </a>
                                </li>
                                <li>
                                    <a href="#lo-trinh-on-luyen" className="flex items-center gap-2.5 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">6</span>
                                        Study roadmap
                                    </a>
                                </li>
                                <li>
                                    <a href="#faq" className="flex items-center gap-2.5 text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">7</span>
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>

            {/* CTA BOX */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-gradient-to-br from-[#053825] to-primary dark:to-blue-800 rounded-xl p-8 sm:p-10 text-center shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">Start Practicing For FE Today?</h3>
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                        IT Shiken provides free FE mock exams, a real-exam simulation interface, automatic grading, and detailed result analysis – helping you clearly know where your weaknesses lie.
                    </p>
                    <Button asChild className="text-lg !py-6 bg-accent hover:bg-accent/90 text-slate-900 border-none">
                        <Link href="/en/exams">Take FE Mock Exam Now – For Free</Link>
                    </Button>
                </div>
            </div>

            {/* RELATED POSTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border/40">
                <h3 className="text-2xl font-bold text-foreground mb-8">Related Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postDetail.relatedPosts.map((post) => (
                        <Link key={post.id} href={post.href} className="group block">
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
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
