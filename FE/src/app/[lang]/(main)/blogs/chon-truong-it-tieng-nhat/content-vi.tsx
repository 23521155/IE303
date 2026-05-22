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
    title: 'Bạn Muốn Chọn Trường Để Vừa Học IT Vừa Học Tiếng Nhật? Hãy Ghé Qua Website Này!',
    excerpt: 'Trong kỷ nguyên số, kết hợp IT với Tiếng Nhật là "tấm vé vàng" để bước vào thị trường lao động nghìn đô. Làm sao để chọn đúng trường đào tạo tốt cả hai? Hãy để Uni2Insight và IT Shiken đồng hành cùng bạn.',
    coverImage: '/uni2insight-real.png',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/Shin.png',
        bio: 'Hơn 5 năm kinh nghiệm làm việc tại Nhật Bản. Chia sẻ kiến thức về lập trình, văn hóa doanh nghiệp IT và lộ trình phát triển sự nghiệp.',
    },
    date: '20/05/2026',
    category: 'Định hướng',
    readTime: '8 phút',
    views: '1.2K',
    comments: 12,
    tags: ['IT Tiếng Nhật', 'Chọn trường', 'Uni2Insight', 'IT Shiken', 'BrSE'],
    relatedPosts: [
        {
            id: 'lo-trinh-hoc-it',
            title: 'Lộ trình chứng chỉ IT Nhật Bản (IPA) từ Cơ bản đến Chuyên gia',
            image: '/it-roadmap.png',
            date: '08/05/2026',
            href: '/vi/blogs/lo-trinh-hoc-it'
        },
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
    ]
};

export default function DetailedPostVi() {
    return (
        <main className="min-h-screen bg-background transition-colors duration-300">
            {/* HERO SECTION */}
            <header className="bg-background border-b border-border/50 pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/category" className="hover:text-primary transition-colors">Blog</Link>
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
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {postDetail.readTime} đọc</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"><Eye className="w-5 h-5" /> {postDetail.views}</span>
                            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"><MessageSquare className="w-5 h-5" /> {postDetail.comments}</span>
                            <div className="flex items-center gap-2 pl-4 border-l border-border/40">
                                <button className="p-2 rounded-full hover:bg-muted/60 hover:text-primary transition-colors" title="Chia sẻ">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-muted/60 hover:text-primary transition-colors" title="Lưu bài">
                                    <Bookmark className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN LAYOUT: 2 COLUMNS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">

                    {/* CỘT TRÁI: NỘI DUNG CHÍNH */}
                    <article className="lg:col-span-8 rounded-xl border border-[rgba(0,0,0,0.1)] dark:border-white/10 bg-white dark:bg-[#1a1a1a] overflow-hidden">
                        <figure className="w-full bg-muted/[0.2] p-4">
                            <Image
                                src={postDetail.coverImage}
                                alt="Chọn trường Đại học học IT Tiếng Nhật"
                                width={1200}
                                height={800}
                                className="w-full h-auto object-contain rounded-lg"
                                priority
                            />
                            <figcaption className="text-center text-sm text-muted-foreground/60 mt-3 italic">
                                Học IT kết hợp Tiếng Nhật đang là xu thế đón đầu làn sóng tuyển dụng từ thị trường Nhật Bản.
                            </figcaption>
                        </figure>

                        <div className="p-6 sm:p-10 text-lg leading-relaxed text-foreground/80">
                            <p className="mb-6 drop-cap">
                                Trong kỷ nguyên số, Công nghệ thông tin (IT) là một ngành đầy quyền lực. Nhưng nếu bạn kết hợp IT với Tiếng Nhật, bạn đang nắm trong tay &quot;tấm vé vàng&quot; để bước vào thị trường lao động nghìn đô. Xu hướng trở thành Kỹ sư cầu nối (BrSE) hay Lập trình viên cho các doanh nghiệp Nhật Bản đang trở nên hot hơn bao giờ hết nhờ mức thu nhập hấp dẫn và cơ hội onsite (làm việc trực tiếp) tại xứ sở hoa anh đào.
                            </p>
                            <p className="mb-6">
                                Thế nhưng, bài toán đau đầu nhất của các sĩ tử và phụ huynh luôn là: <strong>&quot;Nên học trường nào để đảm bảo giỏi cả hai?&quot;</strong> Có trường rất mạnh về Code nhưng dạy tiếng Nhật chỉ cưỡi ngựa xem hoa. Có trường chương trình liên kết chuẩn Nhật nghe rất kêu nhưng học phí lại &quot;bỏng tay&quot;, còn chất lượng thực tế thì mơ hồ. Giữa một rừng thông tin quảng cáo ngày tuyển sinh, làm sao để tìm được sự thật?
                            </p>
                            <p className="mb-8">
                                Câu trả lời nằm ở một website cực kỳ lợi hại mà dân IT nhất định phải biết: <strong>Uni2Insight</strong>.
                            </p>

                            {/* SECTION 1 */}
                            <h2 id="part-1" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-12 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 dark:text-blue-300 text-xl">1</span>
                                Uni2Insight là gì? Tại sao lại là &quot;vũ khí&quot; của học sinh, sinh viên?
                            </h2>
                            <p className="mb-6">
                                Nếu bạn đã chán ngấy việc lên các group Facebook hỏi: <em>&quot;Trường X dạy IT hệ tiếng Nhật có tốt không?&quot;</em> để rồi nhận lại toàn các câu trả lời chung chung hoặc các bài seeding (quảng cáo ngầm) từ đội ngũ tuyển sinh, thì Uni2Insight chính là cuộc cách mạng dành cho bạn.
                            </p>
                            <p className="mb-6">
                                Về cơ bản, <a href="https://uni2insight.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Uni2Insight</a> là nền tảng chuyên tổng hợp các bài đánh giá, review về các trường Đại học, Cao đẳng và các ngành học tại Việt Nam. Điều làm nên giá trị của website này chính là: <strong>Thông tin đến từ người thật - việc thật.</strong>
                            </p>
                            
                            <div className="bg-muted/[0.15] border-l-4 border-blue-500 p-5 rounded-r-xl mb-8">
                                <div className="flex items-center gap-2 font-bold text-secondary dark:text-foreground mb-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Đặc điểm nổi bật của Uni2Insight:
                                </div>
                                <p className="text-base">
                                    Những bài viết, chấm điểm trên nền tảng này được đóng góp bởi chính các bạn sinh viên hoặc cựu sinh viên đã và đang &quot;lăn lộn&quot; tại ngôi trường đó. Đặc biệt, với chế độ đánh giá ẩn danh, sinh viên có thể thoải mái chia sẻ cả điểm tốt lẫn điểm xấu, những &quot;góc khuất&quot; mà không một cuốn cẩm nang tuyển sinh nào dám ghi vào.
                                </p>
                            </div>

                            {/* SECTION 2 */}
                            <h2 id="part-2" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 text-xl">2</span>
                                Vì sao dân định hướng &quot;IT + Tiếng Nhật&quot; phải check Uni2Insight?
                            </h2>
                            <p className="mb-6">
                                Đối với một ngành học đặc thù và tốn nhiều công sức như IT kết hợp ngôn ngữ, việc chọn sai môi trường sẽ khiến bạn cực kỳ mệt mỏi. Khi lên Uni2Insight, bạn sẽ soi được những thông tin vô giá sau:
                            </p>

                            <div className="space-y-6 mb-8">
                                <div className="flex gap-3">
                                    <Target className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-secondary dark:text-foreground text-lg">Sự thật về chất lượng đào tạo song song</h4>
                                        <p className="text-base text-muted-foreground mt-1">
                                            Học IT đã nặng, cày thêm bảng chữ cái Kanji và ngữ pháp tiếng Nhật lại càng áp lực gấp đôi. Trên Uni2Insight, các đàn anh đàn chị đi trước sẽ review thẳng thắn cho bạn:
                                        </p>
                                        <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                                            <li><strong>Mảng IT:</strong> Giảng viên dạy Code có tâm không? Giáo trình có cập nhật các công nghệ mới (như React, Node.js, AI, Cloud...) hay vẫn dạy những kiến thức lỗi thời?</li>
                                            <li><strong>Mảng tiếng Nhật:</strong> Chương trình ngôn ngữ của trường dạy có chất lượng không? Có cam kết lộ trình đạt JLPT (N3, N2) chuẩn chỉnh để ra trường đi làm được ngay, hay chỉ học cưỡi ngựa xem hoa cho đủ tín chỉ?</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-secondary dark:text-foreground text-lg">&quot;Bóc tách&quot; các chương trình chất lượng cao / liên kết Nhật Bản</h4>
                                        <p className="text-base text-muted-foreground mt-1">
                                            Các khóa học gắn mác &quot;Chuẩn Nhật&quot;, &quot;Học viện công nghệ liên kết&quot; thường đi kèm mức học phí rất cao. Thông qua các bài review chi tiết trên Uni2Insight, bạn sẽ biết được mức học phí đó có thực sự xứng đáng với cơ sở vật chất và trải nghiệm nhận lại hay không. Trường có thực sự giới thiệu sinh viên đi thực tập (internship) tại các doanh nghiệp Nhật Bản lớn hay không?
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-secondary dark:text-foreground text-lg">Review về môi trường, áp lực học tập và các câu lạc bộ</h4>
                                        <p className="text-base text-muted-foreground mt-1">
                                            Học song ngành đòi hỏi tính tự học rất cao. Đọc review trên Uni2Insight giúp bạn hình dung trước cuộc sống giảng đường: Áp lực thi cử, đồ án của trường có quá khốc liệt không? Các câu lạc bộ IT (Code, Lập trình) hoặc câu lạc bộ văn hóa Nhật Bản của trường có hoạt động mạnh mẽ không? Đây chính là nơi bạn rèn luyện kỹ năng mềm và tìm kiếm các đồng đội cùng chí hướng.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 3 */}
                            <h2 id="part-3" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 text-xl">3</span>
                                Lộ trình tối ưu: Vừa học tốt ở trường, vừa luyện chứng chỉ tại IT Shiken
                            </h2>
                            <p className="mb-6">
                                Lựa chọn được ngôi trường Đại học phù hợp từ Uni2Insight chỉ mới là 50% thành công. Để có thể tự tin bước chân vào các doanh nghiệp Nhật Bản với mức lương nghìn đô, bạn cần sở hữu các chứng chỉ IT chuẩn quốc gia Nhật Bản (do IPA cấp) như **IT Passport** hoặc **FE (Fundamental Information Technology Engineer)**.
                            </p>
                            <p className="mb-6">
                                Đây chính là lúc bạn cần đến <strong>IT Shiken</strong> — nền tảng luyện thi chứng chỉ IT Nhật Bản hàng đầu dành cho sinh viên Việt Nam.
                            </p>

                            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mb-8">
                                <div className="flex items-center gap-2 font-bold text-secondary dark:text-foreground mb-2 text-amber-700 dark:text-amber-400">
                                    <AlertTriangle className="w-5 h-5 text-amber-500" /> Bí quyết thành công cho BrSE tương lai:
                                </div>
                                <p className="text-base">
                                    Hãy lập tức tích lũy chứng chỉ **IT Passport** ngay từ năm nhất hoặc năm hai, và hướng tới chứng chỉ **FE** vào năm ba hoặc năm tư. Việc tự học và luyện thi thử miễn phí trên <Link href="/vi/exams" className="text-blue-600 hover:underline font-semibold">IT Shiken</Link> sẽ giúp bạn làm quen cấu trúc đề, hiểu rõ giải thích chi tiết bằng tiếng Việt để vượt qua kỳ thi dễ dàng nhất.
                                </p>
                            </div>

                            {/* SECTION 4 */}
                            <h2 id="part-4" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 text-xl">4</span>
                                Hướng dẫn nhanh cách &quot;săn&quot; thông tin trên Uni2Insight
                            </h2>
                            <p className="mb-6">
                                Để không bị ngợp giữa biển thông tin trên Uni2Insight, bạn có thể áp dụng mẹo nhỏ sau:
                            </p>
                            <ul className="list-decimal pl-6 space-y-3 mb-8">
                                <li><strong>Sử dụng thanh tìm kiếm:</strong> Gõ tên trường hoặc tên ngành học cụ thể (Ví dụ: <em>Công nghệ thông tin định hướng Nhật Bản, Kỹ thuật phần mềm hệ chất lượng cao...</em>).</li>
                                <li><strong>Lọc theo tiêu chí:</strong> Hãy chú ý đến các điểm số thành phần như Chất lượng giảng dạy, Cơ sở vật chất, và Cơ hội việc làm.</li>
                                <li><strong>Đọc kỹ các bài review có tâm:</strong> Ưu tiên những bài viết có phân tích cả ưu điểm và nhược điểm rõ ràng, tránh các bài khen quá đà hoặc chê bai cảm tính.</li>
                            </ul>

                            {/* SECTION 5 */}
                            <h2 id="part-5" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 text-xl">5</span>
                                Lời kết: Đừng để 4 năm thanh xuân là một canh bạc!
                            </h2>
                            <p className="mb-6">
                                Quyết định chọn trường sẽ thay đổi hoàn toàn lộ trình sự nghiệp và tương lai của bạn. Thay vì tin vào những lời quảng cáo &quot;tô hồng&quot; ngày tuyển sinh, hãy là một người trẻ thông thái, biết cách sử dụng công nghệ để tìm kiếm sự thật.
                            </p>
                            <p className="mb-6">
                                Hãy truy cập ngay <strong>Uni2Insight</strong> để đọc, để ngẫm và đưa ra lựa chọn chính xác nhất cho bản thân. Bên cạnh đó, đừng quên tiếp tục trau dồi kiến thức lập trình, thuật toán và cập nhật các tài liệu công nghệ hữu ích ngay tại <strong>IT Shiken</strong> để chuẩn bị cho mình một hành trang vững chắc nhất nhé.
                            </p>
                            <p className="mb-6 font-semibold">
                                Chúc các bạn tìm được ngôi trường chân ái của mình!
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

                    {/* CỘT PHẢI: TABLE OF CONTENTS */}
                    <aside className="hidden lg:block lg:col-span-4 space-y-8">
                        {/* Mục lục bài viết (Sticky) */}
                        <div className="sticky top-24 bg-white dark:bg-[#1a1a1a] border border-[rgba(0,0,0,0.1)] dark:border-white/10 rounded-xl overflow-hidden">
                            <h3 className="font-bold text-sm text-secondary dark:text-foreground px-5 pt-4 pb-3.5 flex items-center gap-2 bg-primary/[0.08] dark:bg-primary/[0.15] border-b border-[rgba(0,0,0,0.07)] dark:border-white/[0.07]">
                                <Bookmark className="w-4 h-4 text-primary" /> Nội Dung Bài Viết
                            </h3>
                            <ul className="space-y-3 text-sm px-5 pb-5 pt-3">
                                <li>
                                    <a href="#part-1" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">1</span>
                                        Uni2Insight là gì?
                                    </a>
                                </li>
                                <li>
                                    <a href="#part-2" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">2</span>
                                        Tại sao cần dùng Uni2Insight?
                                    </a>
                                </li>
                                <li>
                                    <a href="#part-3" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">3</span>
                                        Tích lũy bằng IT Shiken
                                    </a>
                                </li>
                                <li>
                                    <a href="#part-4" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">4</span>
                                        Cách săn tin tuyển sinh
                                    </a>
                                </li>
                                <li>
                                    <a href="#part-5" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">5</span>
                                        Lời kết
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
                    <h3 className="text-2xl font-bold text-white mb-4">Sẵn Sàng Chinh Phục Ngành IT Nhật Bản?</h3>
                    <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                        Tìm đánh giá trường học chân thực nhất trên Uni2Insight và bắt đầu ôn tập, luyện thi thử chứng chỉ IT Passport/FE miễn phí ngay hôm nay trên IT Shiken!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild className="text-lg !py-6 bg-white text-secondary hover:bg-white/90">
                            <a href="https://uni2insight.com" target="_blank" rel="noopener noreferrer">Ghé Uni2Insight</a>
                        </Button>
                        <Button asChild className="text-lg !py-6">
                            <Link href="/vi/exams">Luyện Đề IT Shiken</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* BÀI VIẾT LIÊN QUAN */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border/40">
                <h3 className="text-2xl font-bold text-secondary dark:text-foreground mb-8">Bài viết liên quan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postDetail.relatedPosts.map((post) => (
                        <Link key={post.id} href={post.href} className="group block rounded-xl border border-[rgba(0,0,0,0.1)] dark:border-white/10 bg-white dark:bg-[#1a1a1a] overflow-hidden hover:border-primary/30 transition-colors">
                            <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted/[0.15]">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 pt-3 px-4">
                                <Calendar className="w-3.5 h-3.5" />
                                {post.date}
                            </div>
                            <h4 className="font-bold text-lg text-secondary dark:text-foreground group-hover:text-primary transition-colors line-clamp-2 px-4 pb-4">
                                {post.title}
                            </h4>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
