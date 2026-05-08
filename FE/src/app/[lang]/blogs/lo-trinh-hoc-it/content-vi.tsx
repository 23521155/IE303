import Image from 'next/image';
import { 
    Bookmark, Calendar, Clock, Share2, 
    Eye, MessageSquare, ChevronRight, 
    Link as LinkIcon,
    Mail, CheckCircle2, Target, Lightbulb
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

// Custom SVG Icons for Brands (Lucide removed them)
const Facebook = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const Twitter = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;

// --- DỮ LIỆU MẪU ĐƯỢC MỞ RỘNG ---
const postDetail = {
    id: 'lo-trinh-hoc-it',
    title: 'Lộ trình chứng chỉ IT Nhật Bản (IPA) từ Cơ bản đến Chuyên gia',
    excerpt: 'Hướng dẫn toàn diện về hệ thống chứng chỉ Công nghệ thông tin quốc gia Nhật Bản. Phân tích chi tiết đối tượng, nội dung trọng tâm và mẹo vượt qua từng cấp độ từ IT Passport đến Specialist.',
    coverImage: '/it-roadmap.png', 
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/Shin.png', 
        bio: 'Hơn 5 năm kinh nghiệm làm việc tại Nhật Bản. Chia sẻ kiến thức về lập trình, văn hóa doanh nghiệp IT và lộ trình phát triển sự nghiệp.',
    },
    date: '08/05/2026',
    category: 'Lộ trình học',
    readTime: '20 phút',
    views: '15.2K',
    comments: 38,
    tags: ['IT', 'Roadmap', 'IPA', 'IT Passport', 'FE', 'AP', 'Career'],
    relatedPosts: [
        { 
            id: 'ky-thi-it-passport', 
            title: 'Kỳ thi IT Passport là gì? Cẩm nang chinh phục chứng chỉ IT Nhật Bản từ A-Z', 
            image: '/blog-it-passport-thumbnail.jpg', 
            date: '01/05/2026',
            href: '/vi/blogs/ky-thi-it-passport'
        },
        { 
            id: 'ky-thi-fe', 
            title: 'Kỳ thi FE là gì? Giải đáp mọi thắc mắc giúp bạn tự tin chinh phục', 
            image: '/blog-it-fe-thumbnail.jpg', 
            date: '01/05/2026',
            href: '/vi/blogs/ky-thi-fe'
        },
        { 
            id: 'ky-thi-ap', 
            title: 'Kỳ thi AP (Applied Information Technology Engineer) là gì?', 
            image: '/blog-it-passport-thumbnail.jpg', 
            date: '08/05/2026',
            href: '/vi/blogs/ky-thi-ap'
        },
    ]
};

export default function DetailedEnhancedPost() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* HERO SECTION */}
            <header className="bg-white dark:bg-[#121212] pt-12 pb-8 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                        <a href="/" className="hover:text-primary dark:hover:text-blue-400 transition-colors">Trang chủ</a>
                        <ChevronRight className="w-4 h-4" />
                        <a href="/category" className="hover:text-primary dark:hover:text-blue-400 transition-colors">Blog</a>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-800 dark:text-slate-200 truncate">{postDetail.title}</span>
                    </nav>

                    <div className="mb-6">
                        <span className="inline-block bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {postDetail.category}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.2]">
                        {postDetail.title}
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
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
                                <div className="font-bold text-slate-900 dark:text-white text-base">{postDetail.author.name}</div>
                                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {postDetail.date}</span>
                                    <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {postDetail.readTime} đọc</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"><Eye className="w-5 h-5" /> {postDetail.views}</span>
                            <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"><MessageSquare className="w-5 h-5" /> {postDetail.comments}</span>
                            <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
                                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Chia sẻ">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Lưu bài">
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

                    {/* CỘT TRÁI: NỘI DUNG CHÍNH */}
                    <article className="lg:col-span-9 bg-white dark:bg-[#121212] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                        
                        <figure className="w-full bg-slate-50 dark:bg-slate-800/50 p-4">
                            <Image 
                                src={postDetail.coverImage} 
                                alt="Lộ trình chứng chỉ IT Nhật Bản (IPA)" 
                                width={1200} 
                                height={800}
                                className="w-full h-auto object-contain rounded-lg"
                                priority 
                            />
                            <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                                Sơ đồ hệ thống chứng chỉ CNTT chuẩn quốc gia Nhật Bản (IPA) — từ Level 1 (IT Passport) đến Level 4 (Chuyên gia). Nguồn: <a href="https://www.ipa.go.jp/shiken/about/about.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">IPA</a>
                            </figcaption>
                        </figure>

                        <div className="p-6 sm:p-10 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                            <p className="mb-6 drop-cap">
                                Đối với các kỹ sư CNTT muốn phát triển sự nghiệp tại Nhật Bản, việc sở hữu chứng chỉ của Cơ quan Xúc tiến Công nghệ Thông tin (IPA) không chỉ là tấm vé thông hành mà còn là yếu tố quyết định để tăng lương, thăng tiến và đặc biệt là cộng điểm xét duyệt Visa Kỹ sư chất lượng cao (HSP). Hệ thống này được chia thành 4 cấp độ rõ rệt.
                            </p>

                            <h2 id="level-1" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xl">1</span>
                                IT Passport (IP) - Kiến thức chung
                            </h2>
                            <p className="mb-4">
                                <strong><a href="https://www3.jitec.ipa.go.jp/JitesCbt/index.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">IT Passport</a></strong> là chứng chỉ cơ bản nhất. Khác với lầm tưởng của nhiều người, chứng chỉ này không chỉ dành cho dân IT mà được thiết kế cho <strong>tất cả người lao động</strong> trong thời đại số.
                            </p>

                            <div className="space-y-4 mb-6">
                                <div className="flex gap-3">
                                    <Target className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">Đối tượng phù hợp</h4>
                                        <p className="text-base text-slate-600 dark:text-slate-400">Sinh viên mới ra trường, nhân sự khối kinh doanh (Sales, HR, Marketing) tại các công ty IT, hoặc người trái ngành muốn có cái nhìn tổng quan về công nghệ và quản trị doanh nghiệp.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">Kiến thức trọng tâm</h4>
                                        <ul className="list-disc pl-5 mt-1 text-base text-slate-600 dark:text-slate-400">
                                            <li><strong>Strategy (Chiến lược):</strong> Quản trị doanh nghiệp, luật pháp (bản quyền, bảo vệ dữ liệu cá nhân), chiến lược kinh doanh cơ bản.</li>
                                            <li><strong>Management (Quản lý):</strong> Quản lý dự án, phát triển hệ thống cơ bản.</li>
                                            <li><strong>Technology (Công nghệ):</strong> Kiến thức rất nền tảng về phần cứng, mạng, bảo mật, toán logic.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800/40 border-l-4 border-blue-500 p-5 rounded-r-lg mb-8">
                                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Mẹo ôn thi:
                                </div>
                                <p className="text-base">Kỳ thi diễn ra trên máy tính (CBT) quanh năm. Bạn không cần code, chỉ cần học thuộc từ vựng (đặc biệt là các thuật ngữ viết tắt tiếng Anh 3 chữ cái) và làm đề thi cũ (past papers) trên web <a href="https://www.itpassportsiken.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IT Passport Kakomon Dojo (itpassportsiken.com)</a> là có thể đỗ sau 1-2 tháng ôn luyện.</p>
                            </div>


                            {/* LEVEL 2 */}
                            <h2 id="level-2" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 text-xl">2</span>
                                FE / SG - Kỹ sư CNTT Cơ bản
                            </h2>
                            <p className="mb-4">
                                Đây là cột mốc chính thức xác nhận bạn là một <strong>kỹ sư IT thực thụ</strong>. Level này chia làm 2 nhánh phổ biến: <strong><a href="https://www.ipa.go.jp/shiken/kubun/fe.html" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-blue-400 hover:underline">FE (Fundamental IT Engineer)</a></strong> dành cho kỹ sư phát triển phần mềm và <strong><a href="https://www.ipa.go.jp/shiken/kubun/sg.html" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-blue-400 hover:underline">SG (Information Security Management)</a></strong> dành cho người quản lý hệ thống.
                            </p>

                            <div className="space-y-4 mb-6">
                                <div className="flex gap-3">
                                    <Target className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">Đối tượng phù hợp</h4>
                                        <p className="text-base text-slate-600 dark:text-slate-400">Lập trình viên từ Junior đến Mid-level (1-3 năm kinh nghiệm), sinh viên chuyên ngành Khoa học Máy tính. Rất nhiều công ty Nhật thưởng nóng (từ 5-10 vạn yên) hoặc tăng lương hàng tháng khi nhân viên lấy được FE.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">Cấu trúc đề FE cực kỳ đặc thù:</h4>
                                        <ul className="list-disc pl-5 mt-1 text-base text-slate-600 dark:text-slate-400">
                                            <li><strong>Môn A (Lý thuyết - 90 phút):</strong> 60 câu trắc nghiệm. Bao phủ Toán rời rạc, Cấu trúc dữ liệu, Thuật toán, OS, Database, Network và cả phần Management/Strategy như IP nhưng sâu hơn.</li>
                                            <li><strong>Môn B (Thực hành - 100 phút):</strong> 20 câu. Đây là phần đánh rớt nhiều nhất. Trong đó 16 câu là đọc hiểu mã giả (Pseudo-code) liên quan đến thuật toán và cấu trúc dữ liệu, 4 câu về tình huống Bảo mật (Security).</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <blockquote className="border-l-4 border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-800/80 p-5 italic text-slate-700 dark:text-slate-300 rounded-r-lg text-base">
                                "Từ năm 2023, FE đã bỏ thi các ngôn ngữ lập trình cụ thể (C, Java, Python...) ở môn B và chuyển hoàn toàn sang mã giả (Pseudo-code). Điều này đòi hỏi tư duy thuật toán thuần túy thay vì học vẹt syntax."
                            </blockquote>


                            {/* LEVEL 3 */}
                            <h2 id="level-3" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 text-xl">3</span>
                                AP - Kỹ sư Ứng dụng & Thiết kế Hệ thống
                            </h2>
                            <p className="mb-4">
                                <strong><a href="https://www.ipa.go.jp/shiken/kubun/ap.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">AP (Applied Information Technology Engineer)</a></strong> là bảo chứng vàng cho các Kỹ sư cấp cao (Senior), Team Lead hoặc BSE (BrSE - Kỹ sư cầu nối). Có bằng này, bạn được <strong>cộng điểm rất lớn</strong> khi xin Visa vĩnh trú hoặc Visa kỹ sư chất lượng cao.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl shadow-sm">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-base border-b pb-2 dark:border-slate-700">Buổi sáng (Trắc nghiệm)</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">80 câu / 150 phút. Yêu cầu 60% để đỗ. Kiến thức rất rộng, từ vi mạch, kiến trúc máy tính, thuật toán mã hóa sâu, đến thiết kế database chuẩn hóa bậc 3, bậc 4.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl shadow-sm">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-base border-b pb-2 dark:border-slate-700">Buổi chiều (Tự luận / Tình huống)</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">150 phút. Bạn phải giải 1 câu bắt buộc (Security) và <strong>chọn 4 trong 10 câu</strong> chuyên ngành (Lập trình, Database, Network, Embedded, Audit, Management...). Yêu cầu đọc hiểu tình huống hệ thống dài 4-5 trang A4 và viết câu trả lời ngắn.</p>
                                </div>
                            </div>
                            <p className="text-base text-slate-700 dark:text-slate-300">
                                <strong>Mẹo ôn thi AP:</strong> Kỳ thi chỉ tổ chức 2 lần/năm (Xuân và Thu) và thi hoàn toàn trên giấy (PBT). Kỹ năng sống còn ở môn Chiều là <strong>đọc hiểu tiếng Nhật siêu tốc</strong> và biết cách chọn bài thi thế mạnh của mình. Nếu không giỏi tiếng Nhật, hãy ưu tiên chọn các bài về Lập trình, Network, Database vì chúng dùng nhiều logic toán và sơ đồ.
                            </p>


                            {/* LEVEL 4 */}
                            <h2 id="level-4" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 text-xl">4</span>
                                Chuyên gia cấp cao (Specialist)
                            </h2>
                            <p className="mb-4">
                                Đây là "trùm cuối" của IPA, tỷ lệ đỗ thường chỉ dao động từ <strong>10% - 15%</strong>. Để lấy được Level 4, kiến thức hàn lâm là chưa đủ, bạn bắt buộc phải có kinh nghiệm chinh chiến thực tế qua các dự án lớn.
                            </p>

                            <h4 className="font-semibold text-slate-900 dark:text-white text-lg mt-6 mb-3">Các mảng chứng chỉ Level 4 phổ biến:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base mb-8">
                                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
                                    <strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/nw.html" target="_blank" rel="noopener noreferrer" className="hover:underline">NW (Network Specialist)</a>:</strong> Chuyên gia thiết kế hạ tầng mạng.
                                </div>
                                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
                                    <strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/db.html" target="_blank" rel="noopener noreferrer" className="hover:underline">DB (Database Specialist)</a>:</strong> Chuyên gia thiết kế & tối ưu CSDL.
                                </div>
                                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
                                    <strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/pm.html" target="_blank" rel="noopener noreferrer" className="hover:underline">PM (Project Manager)</a>:</strong> Quản lý dự án chuẩn quốc tế.
                                </div>
                                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
                                    <strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/sa.html" target="_blank" rel="noopener noreferrer" className="hover:underline">SA (System Architect)</a>:</strong> Kỹ sư thiết kế giải pháp tổng thể.
                                </div>
                                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30 sm:col-span-2">
                                    <strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/sc.html" target="_blank" rel="noopener noreferrer" className="hover:underline">RISS / SC (Chuyên gia Bảo mật)</a>:</strong> Chứng chỉ quốc gia có giá trị hành nghề về đăng ký an toàn thông tin.
                                </div>
                            </div>

                            <p className="text-base text-slate-700 dark:text-slate-300">
                                <strong>Nỗi ám ảnh mang tên Bài luận (Essay - 論文):</strong> Đối với các môn như PM, SA, ST (IT Strategist), phần thi Chiều II yêu cầu bạn phải viết tay một bài luận từ <strong>2000 đến 3000 chữ</strong> bằng tiếng Nhật trong vòng 120 phút. Bạn phải miêu tả một dự án thực tế mình đã làm, nêu vấn đề, phân tích giải pháp dựa trên lý thuyết luận của IPA và kết quả đạt được. Đây là rào cản cực lớn đối với kỹ sư người nước ngoài.
                            </p>

                            {/* Tags Section */}
                            <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Tags:</span>
                                    {postDetail.tags.map((tag) => (
                                        <a key={tag} href={`/tag/${tag}`} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm rounded-md hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-200 transition-colors font-medium">
                                            #{tag}
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </article>

                    {/* CỘT PHẢI: TABLE OF CONTENTS */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-8">
                        {/* Mục lục bài viết (Sticky) */}
                        <div className="sticky top-24 bg-white dark:bg-[#121212] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-5 flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                                <Bookmark className="w-4 h-4 text-blue-500" /> Nội Dung Bài Viết
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="#level-1" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">1</span>
                                        IT Passport (IP) – Level 1
                                    </a>
                                </li>
                                <li>
                                    <a href="#level-2" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">2</span>
                                        FE / SG – Level 2
                                    </a>
                                </li>
                                <li>
                                    <a href="#level-3" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 flex items-center justify-center text-xs font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors">3</span>
                                        AP – Level 3
                                    </a>
                                </li>
                                <li>
                                    <a href="#level-4" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">4</span>
                                        Chuyên gia (Specialist)
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
                    <h3 className="text-2xl font-bold text-white mb-4">Sẵn Sàng Luyện Thi Chứng Chỉ IT Chưa?</h3>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        IT Shiken cung cấp đề thi thử miễn phí, sát đề thật, chấm điểm tự động và phân tích kết quả chi tiết. Bắt đầu ngay hôm nay – không cần đăng ký!
                    </p>
                    <Button asChild className="text-lg !py-6">
                        <Link href="/vi/exams">Thi Thử Ngay – Miễn Phí</Link>
                    </Button>
                </div>
            </div>

            {/* BÀI VIẾT LIÊN QUAN */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Bài viết liên quan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postDetail.relatedPosts.map((post) => (
                        <a key={post.id} href={post.href} className="group block">
                            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                                <Calendar className="w-3.5 h-3.5" />
                                {post.date}
                            </div>
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                            </h4>
                        </a>
                    ))}
                </div>
            </section>
        </main>
    );
}