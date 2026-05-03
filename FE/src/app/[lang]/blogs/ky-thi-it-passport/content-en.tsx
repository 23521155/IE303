import Image from 'next/image';
import { AlertTriangle, Bookmark, Calendar, CheckCircle2, Clock, Info, Link as LinkIcon, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import React from 'react';

// Cập nhật Mock data theo nội dung mới
const postDetail = {
    id: 'ky-thi-it-passport',
    title: 'What is IT Passport Exam? Complete Guide from A-Z',
    excerpt: 'Definition, structure, registration, and study roadmap all in one place.',
    coverImage: '/blog-it-passport-thumbnail.jpg',
    author: {
        name: 'Nguyễn Lê Tuấn Phi',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
    },
    date: '01/05/2026',
    category: 'IT Certification',
    readTime: '30 minutes',
    tags: ['ITPassport', 'Itshiken', 'Japan', 'Career'],
};

export default function ContentEn() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#121212] py-8 transition-colors duration-300 text-slate-900 dark:text-slate-200">
            {/* HEADER */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="mb-4">
                    <span className="bg-primary text-white dark:bg-blue-900 dark:text-blue-100 text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
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
                    alt="What is IT Passport - Japanese information technology certification"
                    width={500}
                    height={500}
                    className="w-full h-auto max-h-[500px] object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                    What is the IT Passport certificate?
                </figcaption>
            </div>

            {/* CONTENT */}
            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                <p className="mb-6">
                    Are you learning about IT Passport and don't know where to start? Or are you wondering if this
                    certificate is really necessary for you? Rest assured, this article will answer everything from A to
                    Z so you have enough information and confidence to take this exam.
                </p>

                {/* TABLE OF CONTENTS (TOC) */}
                <nav className="bg-primary/10 dark:bg-white dark:border-blue-900 border-l-4 border-primary rounded-r-md p-6 my-10">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary dark:text-blue-900 mb-4">
                        Table of Contents
                    </h3>
                    <ul className="space-y-2 text-base text-secondary">
                        <li>
                            <a
                                href="#it-passport-la-gi"
                                className="hover:text-primary dark:hover:text-blue-900 transition-colors"
                            >
                                1. What is IT Passport?
                            </a>
                        </li>
                        <li>
                            <a
                                href="#ai-nen-thi"
                                className="hover:text-primary dark:hover:text-blue-900 transition-colors"
                            >
                                2. Who should take IT Passport?
                            </a>
                        </li>
                        <li>
                            <a
                                href="#cau-truc-de-thi"
                                className="hover:text-primary dark:hover:text-blue-900 transition-colors"
                            >
                                3. Detailed exam structure
                            </a>
                        </li>
                        <li>
                            <a
                                href="#loi-ich"
                                className="hover:text-primary dark:hover:text-blue-900 transition-colors"
                            >
                                4. Benefits of having an IT Passport certificate
                            </a>
                        </li>
                        <li>
                            <a
                                href="#dang-ky"
                                className="hover:text-primary dark:hover:text-blue-900 transition-colors"
                            >
                                5. How to register for the exam
                            </a>
                        </li>
                        <li>
                            <a
                                href="#lo-trinh-on-luyen"
                                className="hover:text-primary dark:hover:text-blue-900 transition-colors"
                            >
                                6. Effective study roadmap
                            </a>
                        </li>
                        <li>
                            <a href="#faq" className="hover:text-primary dark:hover:text-blue-900 transition-colors">
                                7. Frequently Asked Questions (FAQ)
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* SECTION 1 */}
                <h2
                    id="it-passport-la-gi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    1. What Is IT Passport?
                </h2>
                <p className="mb-6">
                    <a
                        href="https://btacademy.vn/it-comtor/it-passport-la-gi-loi-the-cua-chung-chi-it-passport"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-primary underline mr-1 dark:text-blue-900"
                    >
                        IT Passport
                    </a>
                    (Japanese: ITパスポート, abbreviated as <strong>iPass</strong>) is a national level 1 certification
                    under the Japanese IT Skill Standard (ITSS), managed and issued by the Japanese Ministry of Economy,
                    Trade and Industry (METI) through the IPA – <em>Information-technology Promotion Agency</em>.
                </p>
                <p className="mb-6">
                    Put simply: this is a "passport" for anyone who wants to step into the information technology field
                    – whether you study economics, foreign languages, or any other major. This certificate proves you
                    have a sufficient IT knowledge foundation to work in a tech environment, especially at Japanese
                    companies.
                </p>

                {/* INFO BOX */}
                <div className="flex gap-4 bg-primary/10 dark:bg-blue-900/20 border  dark:border-blue-800 rounded-md p-5 my-8">
                    <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-secondary dark:text-blue-100 m-0">
                        <strong>IT Passport is not a certificate exclusively for IT professionals.</strong> On the
                        contrary, this is the ideal exam for those who do not come from an IT background but want to
                        work in a tech environment or with Japanese partners.
                    </p>
                </div>

                <figure className="my-8">
                    <Image
                        width={500}
                        height={500}
                        src="https://blog.sendmoney.jp/wp-content/uploads/2024/07/luyen-thi-chung-chi-IT-passport.jpg"
                        alt="IPA Logo - the organization issuing the Japanese IT Passport certificate"
                        className="w-full rounded-md shadow-sm"
                    />
                    <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                        The IT Passport certificate is issued by IPA (Japan) and recognized in 7 countries around the
                        world.
                    </figcaption>
                </figure>

                {/* SECTION 2 */}
                <h2
                    id="ai-nen-thi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    2. Who Should Take IT Passport?
                </h2>
                <p className="mb-6">
                    One of the points that makes IT Passport different from most other IT certifications is:{' '}
                    <strong>there are no restrictions on who can take it</strong>. No degree required, no experience
                    required. Anyone who wants to take it, can.
                </p>
                <p className="mb-6">
                    So who is this certificate particularly suitable for? Here are the groups of people for whom IT
                    Passport truly creates the most distinct value:
                </p>

                {/* BENEFITS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary dark:text-blue-900 mb-2">
                            Sales & Marketing Professionals
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Working with tech clients, needing to understand IT products to consult better.
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary dark:text-blue-900 mb-2">IT Comtors / IT Translators</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Needing vocabulary and foundational IT knowledge to translate accurately and professionally.
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary dark:text-blue-900 mb-2">Back-office & HR</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Working in an IT company but not an engineer, wanting to understand the "language" of
                            colleagues.
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary dark:text-blue-900 mb-2">Career-switching Students</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Wanting to switch to IT, needing a certificate to boost the CV and start the journey.
                        </p>
                    </div>
                </div>
                <p className="mb-6">
                    And what if you are an engineer, developer, or tester? IT Passport is still valuable because it
                    supplements knowledge in <strong>management, business strategy, and IT law</strong> that many
                    engineers often overlook.
                </p>

                {/* SECTION 3 */}
                <h2
                    id="cau-truc-de-thi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    3. IT Passport Exam Structure
                </h2>
                <p className="mb-6">
                    This is the most asked part. Knowing the exam structure clearly will help you allocate your study
                    time more wisely.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 my-6 text-center font-medium">
                    Overview: 100 multiple-choice questions <span className="mx-2 text-slate-300">|</span> Duration: 120
                    minutes <span className="mx-2 text-slate-300">|</span> Format: CBT / Paper-based
                </div>

                <div className="overflow-x-auto mb-6">
                    <table className="w-full border border-slate-200 dark:border-slate-700 text-sm text-left rounded-md">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Section</th>
                                <th className="px-4 py-3 font-semibold">Content</th>
                                <th className="px-4 py-3 font-semibold">Questions</th>
                                <th className="px-4 py-3 font-semibold">Passing Score</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 dark:text-slate-300">
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium">Strategy</td>
                                <td className="px-4 py-3">Corporate governance, law, business strategy</td>
                                <td className="px-4 py-3">35 questions</td>
                                <td className="px-4 py-3">300/1000</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium">Management</td>
                                <td className="px-4 py-3">Project management, IT services, software testing</td>
                                <td className="px-4 py-3">20 questions</td>
                                <td className="px-4 py-3">300/1000</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium">Technology</td>
                                <td className="px-4 py-3">Hardware, networking, DB, security, algorithms</td>
                                <td className="px-4 py-3">45 questions</td>
                                <td className="px-4 py-3">300/1000</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/20 font-bold">
                                <td className="px-4 py-3" colSpan={2}>
                                    Total score to pass
                                </td>
                                <td className="px-4 py-3 text-primary dark:text-blue-900" colSpan={2}>
                                    ≥ 600/1000 (all 3 sections ≥ 300)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* WARNING BOX */}
                <div className="flex gap-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-md p-5 my-8">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-yellow-900 dark:text-yellow-100 m-0">
                        <strong>Important note:</strong> You must score at least 300 points in <em>all 3 sections</em>.
                        If one section is below 300 points, even if your total score is above 600, you will still fail.
                        Don't neglect the Management section just because it has fewer questions!
                    </p>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">How difficult is it?</h3>
                <p className="mb-6">
                    According to feedback from many test-takers, the IT Passport exam is not technically difficult – the
                    hardest part is usually the amount of Japanese terminology (if taking the test in Japan) and the
                    broad scope of knowledge. For someone with zero IT knowledge, about 80–100 study hours are needed.
                    For someone already working in the IT industry, 20–30 hours are sufficient.
                </p>

                {/* INTERNAL LINK 1 */}
                <Link
                    href="/en/exams"
                    className="flex items-center gap-4 dark:bg-blue-900/10 border  dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md  dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-900 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – Free Practice Exams
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-900 transition-colors">
                            Take the IT Passport mock exam online now – auto-grading, 100% free
                        </div>
                    </div>
                </Link>

                {/* SECTION 4 */}
                <h2
                    id="loi-ich"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    4. Why Should You Get An IT Passport Certificate?
                </h2>
                <p className="mb-4">
                    Many people ask: "What is the use of studying for this?" – and here is the most practical answer.
                </p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                    Advantages when applying for jobs & visas in Japan
                </h3>
                <p className="mb-4">
                    For those aiming for the Japanese labor market, IT Passport is one of the criteria highly valued by
                    many Japanese companies. Furthermore, when evaluating long-term working visas or permanent residency
                    visas, this certificate is counted in Japan's "Highly Skilled Professional" (高度人材ポイント制度)
                    point system.
                </p>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                    Opens up many career opportunities
                </h3>
                <p className="mb-4">
                    IT Passport holders can easily access many different positions in the IT industry:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                        <strong>Bridge SE</strong> – the bridge between the Vietnamese team and Japanese clients
                    </li>
                    <li>
                        <strong>IT Comtor</strong> – Japanese-Vietnamese IT specialized translator/interpreter
                    </li>
                    <li>
                        <strong>Business Analyst, Consultant</strong> – analyzing client requirements
                    </li>
                    <li>
                        <strong>Sales Engineering</strong> – selling tech solutions
                    </li>
                    <li>
                        <strong>Tester, QA</strong> – software testing
                    </li>
                </ul>

                {/* SUCCESS BOX */}
                <div className="flex gap-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-md p-5 my-8">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-green-900 dark:text-green-100 m-0">
                        <strong>Stepping stone to higher certifications:</strong> After IT Passport, you can continue to
                        conquer <strong>FE (Fundamental IT Engineer)</strong>, then up to{' '}
                        <strong>AP (Applied IT Engineer)</strong>, <strong>PM (Project Manager)</strong>... The
                        knowledge builds upon itself, no study effort is wasted.
                    </p>
                </div>

                {/* SECTION 5 */}
                <h2
                    id="dang-ky"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    5. How To Register For The Exam
                </h2>
                <div className="overflow-x-auto mb-8">
                    <p className="mb-4">
                        Depending on where you want to take the test, the process will differ slightly. Below is the
                        combined information for both cases.
                    </p>
                    <table className="w-full border border-slate-200 dark:border-slate-700 text-sm text-left">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Criteria</th>
                                <th className="px-4 py-3 font-semibold">🇻🇳 In Vietnam</th>
                                <th className="px-4 py-3 font-semibold">🇯🇵 In Japan</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 dark:text-slate-300">
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium">Organizing body</td>
                                <td className="px-4 py-3">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.vitec.org.vn/hitcweb2024/index.php/sat-hach/dang-ky-sat-hach"
                                        className="text-primary underline"
                                    >
                                        VITEC (in coordination with IPA)
                                    </a>
                                </td>
                                <td className="px-4 py-3">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www3.jitec.ipa.go.jp/JitesCbt/html/examination/apply.html"
                                        className="text-primary underline"
                                    >
                                        IPA – Information-technology Promotion Agency
                                    </a>
                                </td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium">Exam schedule</td>
                                <td className="px-4 py-3">Twice a year (April & October)</td>
                                <td className="px-4 py-3">5–6 times/year, monthly</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium">Exam format</td>
                                <td className="px-4 py-3">Paper-based</td>
                                <td className="px-4 py-3">CBT (Computer-based)</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium">Language</td>
                                <td className="px-4 py-3">Vietnamese (Translation available)</td>
                                <td className="px-4 py-3">Japanese (Needs ~N3)</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium">Location</td>
                                <td className="px-4 py-3">Hanoi, HCMC, Da Nang, Binh Duong</td>
                                <td className="px-4 py-3">Across 47 prefectures in Japan</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* SECTION 6 */}
                <h2
                    id="lo-trinh-on-luyen"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    6. Effective Study Roadmap
                </h2>
                <p className="mb-6">
                    Many ask: "How long does it take to study for IT Passport?" The answer depends on your background,
                    but generally,<strong> 3 months is a reasonable timeframe </strong> for absolute beginners. Here is
                    a suggested roadmap by phase:
                </p>

                {/* STEPS */}
                <div className="flex flex-col gap-4 my-8">
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            1
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                Month 1 – Grasp foundational knowledge (Input)
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                Read standard textbooks like "いちばんやさしいITパスポート" (The Easiest IT Passport).
                                Don't try to memorize everything immediately, just read through to get familiar with the
                                concepts. Completing 10–15 pages a day is fine.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            2
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                Month 2 – Do many past papers (Output)
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                Apply an Input:Output ratio of 3:7. Do a lot of past year papers, read the answer
                                explanations carefully even for questions you got right. Note down keywords in Q&A
                                format.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            3
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                Month 3 – Realistic mock exams
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                Focus on your weak areas, take simulated mock exams for exactly 120 minutes. Practice
                                your speed: average 72 seconds per question, do easy questions first, leave hard ones
                                for later.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            4
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                Final Week – Overall review & maintain mentality
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                Do not learn new knowledge. Just review easily forgotten points, stay healthy and keep a
                                relaxed mind to enter the exam room in the best state.
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                    Careers after completion?
                </h3>
                <p className="mb-4">
                    There are quite a few options, but the paths highly rated by the community include:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                        <strong>Bridge SE</strong> – the bridge between the Vietnamese team and Japanese clients
                    </li>
                    <li>
                        <strong>IT Comtor</strong> – Japanese-Vietnamese IT specialized translator/interpreter
                    </li>
                    <li>
                        <strong>Business Analyst, Consultant</strong> – analyzing client requirements
                    </li>
                    <li>
                        <strong>Sales Engineering</strong> – selling tech solutions
                    </li>
                    <li>
                        <strong>Tester, QA</strong> – software testing
                    </li>
                </ul>
                {/* INTERNAL LINK 2 */}
                <Link
                    href="/en/materials"
                    className="flex items-center gap-4  dark:bg-blue-900/10 border  dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md  dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-900 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – Materials
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-900 transition-colors">
                            View the continuously updated repository of IT Passport study materials
                        </div>
                    </div>
                </Link>

                {/* SECTION 7 - FAQ */}
                <h2
                    id="faq"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    7. Frequently Asked Questions (FAQ)
                </h2>

                <div className="space-y-4 mb-10">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            How is IT Passport different from the FE certificate?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            IT Passport is level 1 – the most basic level, for all audiences including non-IT, focusing
                            on general knowledge.
                            <br />
                            <Link className="font-bold underline text-primary mr-1" href={'/en/blogs/ky-thi-fe'}>
                                FE (Fundamental IT Engineer)
                            </Link>
                            is level 2, harder and geared towards in-depth technical skills, suitable for devs and IT
                            students. Many choose IT Passport as a stepping stone before conquering FE.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            How long is the IT Passport certificate valid for?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            Lifetime. Unlike many other certificates that need renewing, IT Passport is valid forever
                            once passed. This is one of the reasons many choose to invest in this certificate.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            Can someone who doesn't know Japanese take the exam?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            Absolutely. In Vietnam, the exam comes with a Vietnamese translation, so Japanese is not
                            required.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            What is the pass rate of the IT Passport exam?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            According to data from IPA, the pass rate for the IT Passport exam in Japan is about 52% –
                            meaning 1 out of every 2 test-takers passes. This is not a very low number if you are fully
                            prepared.
                        </div>
                    </div>
                </div>

                {/* CONCLUSION */}
                <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-md p-6 sm:p-8 my-10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Conclusion</h2>
                    <p className="mb-4 text-slate-700 dark:text-slate-300">
                        IT Passport is not a certificate solely for technical folks – it's a ticket for anyone who wants
                        to step into the IT working environment, especially with Japanese companies. The knowledge is
                        broad but not too difficult, the study roadmap is clear, and the certificate has lifetime
                        validity – this is truly one of the most valuable investments you can make in yourself.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-4">
                        Whether you are a student, office worker, IT Comtor, or looking to switch to the tech industry –
                        the journey to conquer IT Passport is completely within your reach. The key is starting right
                        and sticking to the roadmap.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                        Wishing you effective studying and soon holding the IT passport in your hands!
                    </p>
                </div>

                {/* CTA BOX */}
                <div className="bg-gradient-to-br from-secondary/60 to-secondary dark:to-blue-800 rounded-md p-8 sm:p-10 text-center my-12 shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready To Practice For IT Passport?</h3>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        IT Shiken provides free mock exams, close to real exams, with auto-grading and detailed result
                        analysis. Start today – no registration required!
                    </p>

                    <Button asChild className="text-lg !py-6">
                        <Link href="/en/exams">Take Mock Exam Now – Free</Link>
                    </Button>
                </div>
            </article>

            {/* FOOTER */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-2">
                        {postDetail.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm px-3 py-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500 dark:text-slate-400">Share:</span>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-primary transition-colors">
                            <LinkIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
