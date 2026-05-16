/* eslint-disable */
import Image from 'next/image';
import { Bookmark, Calendar, Clock, Link as LinkIcon, Share2, Eye, MessageSquare, ChevronRight, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import React from 'react';

const postDetail = {
    id: 'ky-thi-fe',
    title: 'Kỳ thi FE là gì? Giải đáp mọi thắc mắc giúp bạn tự tin chinh phục',
    excerpt: 'Từ định nghĩa, cấu trúc đề thi, cách đăng ký đến lộ trình ôn luyện – tất cả trong một bài viết.',
    coverImage: '/blog-it-fe-thumbnail.jpg',
    author: {
        name: 'Nguyễn Lê Tuấn Phi',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
    },
    date: '01/05/2026',
    category: 'Chứng chỉ IT',
    readTime: '30 phút',
    tags: ['FE', 'IT FE', 'Itshiken', 'NhatBan', 'Career'],
    views: '1.2k',
    comments: '15',
    relatedPosts: [
        { 
            id: 'ky-thi-it-passport', 
            title: 'Kỳ thi IT Passport là gì? Giải đáp mọi thắc mắc giúp bạn tự tin chinh phục', 
            image: '/blog-it-passport-thumbnail.jpg', 
            date: '25/04/2026',
            href: '/vi/blogs/ky-thi-it-passport'
        },
        { 
            id: 'ky-thi-ap', 
            title: 'Kỳ thi AP (Applied Information Technology Engineer) là gì?', 
            image: '/blog-it-passport-thumbnail.jpg', 
            date: '08/05/2026',
            href: '/vi/blogs/ky-thi-ap'
        },
        { 
            id: 'lo-trinh-hoc-it', 
            title: 'Lộ trình chứng chỉ IT Nhật Bản (IPA) từ Cơ bản đến Chuyên gia', 
            image: '/it-roadmap.png', 
            date: '08/05/2026',
            href: '/vi/blogs/lo-trinh-hoc-it'
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
        afternoon: 'border-secondary bg-gray-50 dark:border-blue-900 dark:bg-blue-900/10',
    },
    titleBase: 'text-[15px] font-bold mb-2.5',
    titleVariants: {
        morning: 'text-primary dark:text-blue-900',
        afternoon: 'text-secondary dark:text-blue-900',
    },
    text: 'text-sm mb-1.5 text-muted-foreground',
    strong: 'font-semibold text-slate-900 dark:text-slate-200',
};

export default function ContentVi() {
    return (
        <main className="min-h-screen bg-background transition-colors duration-300">
            {/* HERO SECTION */}
            <header className="bg-card pt-12 pb-8 border-b border-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-primary dark:hover:text-blue-400 transition-colors">Trang chủ</Link>
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
                                <button className="p-2 rounded-full hover:bg-secondary/20 transition-colors" title="Chia sẻ">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-secondary/20 transition-colors" title="Lưu bài">
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
                                Chứng chỉ FE là gì?
                            </figcaption>
                        </figure>

                        <div className="p-6 sm:p-10 text-lg leading-relaxed text-foreground/80">
                            <p className="mb-6 drop-cap">
                                Nếu bạn đang làm trong ngành IT và muốn có một tấm chứng chỉ để chứng minh năng lực – hoặc đang nhắm
                                đến thị trường lao động Nhật Bản – thì hẳn bạn đã từng nghe đến chứng chỉ FE. Nhưng FE cụ thể là gì,
                                học những gì, và liệu bạn có thi được không từ con số gần bằng 0?
                            </p>

                            <p className="mb-6">
                                Bài viết này sẽ trả lời hết. Không có từ ngữ màu mè, chỉ có thông tin thực tế và những gì bạn thực
                                sự cần biết để bắt đầu.
                            </p>



                {/* SECTION 1 */}
                <h2
                    id="it-fe-la-gi"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24"
                >
                    1. Chứng Chỉ FE Là Gì?
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
                    – <strong>Fundamental Information Technology Engineer Examination (基本情報技術者試験)</strong> – là
                    chứng chỉ chuẩn kỹ sư CNTT cơ bản của Nhật Bản. Đây là kỳ thi cấp quốc gia do <strong>IPA</strong>
                    (Information-technology Promotion Agency) tổ chức và được Bộ Kinh tế, Thương mại và Công nghiệp Nhật
                    Bản (METI) công nhận chính thức.
                </p>
                <p className="mb-6">
                    Điểm đặc biệt của FE là: <strong>không quan tâm bạn học ở đâu hay bằng cấp gì</strong>. Chứng chỉ
                    này chỉ đánh giá kiến thức và kỹ năng thực tế của bạn trong lĩnh vực CNTT – bao gồm cả lý thuyết lẫn
                    khả năng lập trình.
                </p>

                {/* INFO BOX */}
                <div className="flex gap-4 bg-primary/10 dark:bg-blue-900/20 border  dark:border-blue-800 rounded-md p-5 my-8">
                    <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-secondary dark:text-blue-100 m-0">
                        FE nằm ở <strong>Level 2</strong> trong thang chuẩn kỹ năng IT Nhật Bản (ITSS). Đây là bước tiếp
                        theo sau IT Passport (Level 1) và là nền tảng để leo lên các cấp độ cao hơn như AP, PM, hay SC.
                    </p>
                </div>

                {/* SECTION 2 */}
                <h2
                    id="fe-khac-it-passport"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24"
                >
                    2. FE Khác IT Passport Chỗ Nào?
                </h2>

                <p className="mb-6">
                    Nhiều bạn hay hỏi: "Mình đã có IT Passport rồi, FE có đáng học tiếp không?" Câu trả lời là:{' '}
                    <strong>hai chứng chỉ này hoàn toàn khác nhau về đối tượng, độ khó và nội dung</strong>. Dưới đây là
                    so sánh để bạn dễ hình dung:
                </p>
                <div className={compareStyles.container}>
                    <div className={`${compareStyles.cardBase} ${compareStyles.cardVariants.fe}`}>
                        <h4 className={`${compareStyles.titleBase} ${compareStyles.titleVariants.fe}`}>
                            Chứng chỉ FE (Level 2)
                        </h4>
                        <ul className={compareStyles.list}>
                            <li className={compareStyles.listItem}>Dành cho kỹ sư, developer, lập trình viên</li>
                            <li className={compareStyles.listItem}>Có phần thi kỹ năng thực hành (đề chiều)</li>
                            <li className={compareStyles.listItem}>Yêu cầu tư duy thuật toán, lập trình</li>
                            <li className={compareStyles.listItem}>Tỷ lệ đậu khoảng 20–25%</li>
                            <li className={compareStyles.listItem}>Có thể thay thế bằng đại học xin visa Nhật</li>
                        </ul>
                    </div>

                    <div className={`${compareStyles.cardBase} ${compareStyles.cardVariants.ip}`}>
                        <h4 className={`${compareStyles.titleBase} ${compareStyles.titleVariants.ip}`}>
                            IT Passport (Level 1)
                        </h4>
                        <ul className={compareStyles.list}>
                            <li className={compareStyles.listItem}>Dành cho mọi đối tượng kể cả non-IT</li>
                            <li className={compareStyles.listItem}>Chỉ có phần thi lý thuyết trắc nghiệm</li>
                            <li className={compareStyles.listItem}>Kiến thức tổng quát, quản lý, chiến lược</li>
                            <li className={compareStyles.listItem}>Tỷ lệ đậu khoảng 52%</li>
                            <li className={compareStyles.listItem}>Không thay thế bằng đại học xin visa</li>
                        </ul>
                    </div>
                </div>
                <p>
                    Tóm lại: IT Passport là "hộ chiếu IT" để bước vào ngành, còn FE là "chứng minh thư kỹ sư" để khẳng
                    định bạn thực sự làm được việc. Nếu đang là dev hoặc đang muốn trở thành kỹ sư chuyên nghiệp, FE mới
                    là đích đến thực sự.
                </p>

                {/* SECTION 3 */}
                <h2
                    id="cau-truc-de-thi"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24"
                >
                    3. Cấu Trúc Đề Thi FE Chi Tiết
                </h2>
                <p className="mb-6">
                    Đây là phần nhiều người hỏi nhất. Biết rõ cấu trúc đề thi sẽ giúp bạn phân bổ thời gian ôn luyện một
                    cách khôn ngoan hơn.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-border/60 rounded-md p-5 my-6 text-center font-medium">
                    Đây là phần quan trọng nhất bạn cần nắm trước khi bắt đầu ôn. Kỳ thi FE gồm{' '}
                    <strong>hai phần thi riêng biệt</strong>, thường được gọi là "đề sáng" và "đề chiều" – mỗi phần 150
                    phút, thi cùng ngày.
                </div>

                <div className={sessionStyles.container}>
                    {/* Card Buổi Sáng */}
                    <div className={`${sessionStyles.cardBase} ${sessionStyles.cardVariants.morning}`}>
                        <h4 className={`${sessionStyles.titleBase} ${sessionStyles.titleVariants.morning}`}>
                            Buổi Sáng – Lý Thuyết
                        </h4>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Thời gian:</strong> 150 phút
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Số câu:</strong> 80 câu trắc nghiệm ngắn
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Điểm mỗi câu:</strong> 1.25 điểm
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Điều kiện đậu:</strong> Đúng ≥ 48/80 câu (≥ 60
                            điểm)
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Nội dung:</strong> Kiến thức IT tổng hợp – phần
                            cứng, mạng, cơ sở dữ liệu, bảo mật, thuật toán, quản lý dự án, pháp lý...
                        </p>
                    </div>

                    {/* Card Buổi Chiều */}
                    <div className={`${sessionStyles.cardBase} ${sessionStyles.cardVariants.afternoon}`}>
                        <h4 className={`${sessionStyles.titleBase} ${sessionStyles.titleVariants.afternoon}`}>
                            Buổi Chiều – Kỹ Năng
                        </h4>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Thời gian:</strong> 150 phút
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Số câu:</strong> 8 câu dài, mỗi câu có nhiều câu
                            con
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Cấu trúc:</strong> Câu 1–5 bắt buộc (12đ/câu), Câu
                            6 bắt buộc (20đ), Câu 7 hoặc 8 chọn 1 (20đ)
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Điều kiện đậu:</strong> ≥ 60 điểm
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>Nội dung:</strong> Lập trình
                            (C/Java/Python/Assembly/Excel), thuật toán, thiết kế hệ thống, bảo mật thực hành
                        </p>
                    </div>
                </div>

                {/* WARNING BOX */}
                <div className="flex gap-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-md p-5 my-8">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-yellow-900 dark:text-yellow-100 m-0">
                        Quan trọng: Cả hai phần đều phải đạt ngưỡng đậu riêng. Nếu đậu một phần, bạn được{' '}
                        <strong>bảo lưu kết quả sang kỳ thi ngay sau</strong> và chỉ cần thi lại phần còn lại – đây là
                        điểm khá "thân thiện" của FE so với nhiều chứng chỉ khác.
                    </p>
                </div>

                {/* TIẾP TỤC SECTION 3 */}
                <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
                    Nội dung kiến thức cần nắm
                </h3>
                <p className="mb-6">Phạm vi đề thi FE khá rộng nhưng tập trung chủ yếu vào các mảng sau:</p>

                <div className="overflow-x-auto mb-8">
                    <table className="w-full border border-border/60 text-sm text-left">
                        <thead className="bg-[#053825] text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    Chủ đề
                                </th>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    Trọng tâm cần chú ý
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-foreground/80">
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Khoa học máy tính cơ sở
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Nhị phân, hệ cơ số, phép toán logic, cấu trúc dữ liệu (stack, queue, tree, hash)
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Kiến trúc máy tính
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    RAM, CPU, thuật toán lập lịch (FIFO, LRU), bộ nhớ cache
                                </td>
                            </tr>
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Mạng máy tính
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    TCP/IP, DNS, DHCP, NAT, các giao thức phổ biến
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Cơ sở dữ liệu
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    SQL, thiết kế CSDL, quan hệ, chuẩn hóa
                                </td>
                            </tr>
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Bảo mật
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    SQL injection, phishing, mã hóa, chính sách bảo mật
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Phát triển phần mềm
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Vòng đời phát triển, kiểm thử (unit test, integration test), thiết kế hướng đối
                                    tượng
                                </td>
                            </tr>
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Quản lý & Chiến lược
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Quản lý dự án, hòa vốn, chiến lược kinh doanh, kiểm toán IT
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Lập trình (đề chiều)
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Thuật toán, flowchart, code C/Java/Python – chọn 1 ngôn ngữ bạn mạnh nhất
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
                        alt="Màn hình máy tính hiển thị code lập trình cho kỳ thi FE buổi chiều"
                        className="w-full h-auto object-cover rounded-md shadow-sm"
                        loading="lazy"
                    />
                    <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                        Phần thi buổi chiều của FE đòi hỏi tư duy lập trình thực tế – bạn sẽ chọn ngôn ngữ mình tự tin
                        nhất để làm bài.
                    </figcaption>
                </figure>

                {/* SECTION 4 */}
                <h2
                    id="loi-ich"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24"
                >
                    4. Lợi Ích Thực Tế Khi Có Chứng Chỉ FE
                </h2>
                <p className="mb-4">
                    Tại sao lại chọn FE thay vì các chứng chỉ IT quốc tế khác? Đây là những lý do mà nhiều kỹ sư Việt
                    Nam đang làm việc tại Nhật chia sẻ:
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-blue-900 mt-6 mb-3">
                    Xin visa làm việc tại Nhật – không cần bằng đại học
                </h3>
                <p className="mb-4">
                    Đây là điểm "killer feature" của FE mà không phải chứng chỉ nào cũng có. Thông thường để xin visa
                    lao động kỹ sư tại Nhật, bạn cần bằng đại học chuyên ngành liên quan hoặc hơn 10 năm kinh nghiệm.
                    Nhưng <strong>sở hữu chứng chỉ FE thay thế được cả hai điều kiện trên</strong>. Với những bạn không
                    có bằng đại học nhưng thực sự giỏi kỹ thuật, đây là con đường cực kỳ giá trị.
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-blue-900 mt-6 mb-3">
                    Cộng điểm visa Kodo & visa vĩnh trú
                </h3>
                <p className="mb-4">
                    Chứng chỉ FE được tính vào hệ thống điểm "Nhân lực chất lượng cao" (高度人材ポイント制度) của Nhật.
                    Điều này giúp bạn tích lũy điểm nhanh hơn để xin visa Kodo (Highly Skilled Worker) và sau đó là visa
                    vĩnh trú.
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-blue-900 mt-6 mb-3">
                    Được công nhận tại 12 quốc gia
                </h3>
                <p className="mb-6">
                    FE không chỉ có giá trị ở Nhật. Kỳ thi FE trong khuôn khổ <strong>ITPEC</strong> (IT Professionals
                    Examination Council) được công nhận tương đương tại 12 nước châu Á gồm Ấn Độ, Singapore, Hàn Quốc,
                    Trung Quốc, Philippines, Thái Lan, Việt Nam, Myanmar, Đài Loan, Malaysia, Mông Cổ và Bangladesh.
                </p>

                {/* SUCCESS BOX */}
                <div className="flex gap-4 bg-primary/10 dark:bg-green-900/20 border-l-4 border-primary dark:border-green-500 rounded-r-md p-5 my-8">
                    <CheckCircle2 className="w-6 h-6 text-primary dark:text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-slate-800 dark:text-green-100 m-0">
                        <strong>Giá trị vĩnh viễn + bậc thang lên cao hơn:</strong> Giống IT Passport, chứng chỉ FE
                        không có thời hạn. Và sau FE, bạn có nền tảng vững để chinh phục AP (Applied IT Engineer), sau
                        đó là các chứng chỉ chuyên sâu như PM (Project Manager), SC (Security), DB (Database) tùy hướng
                        đi của bạn.
                    </p>
                </div>

                {/* SECTION 5 */}
                <h2
                    id="dang-ky"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40"
                >
                    5. Cách Đăng Ký Thi FE
                </h2>
                <div className="overflow-x-auto mb-6">
                    <table className="w-full border border-border/60 text-sm text-left">
                        <thead className="bg-[#053825] text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    Tiêu chí
                                </th>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    🇻🇳 Tại Việt Nam
                                </th>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    🇯🇵 Tại Nhật Bản
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-foreground/80">
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Đơn vị tổ chức
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    HITC / VITEC (phối hợp IPA – ITPEC)
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    IPA trực tiếp
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Lịch thi
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    2 lần/năm (tháng 4 & tháng 10)
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    2 lần/năm (tháng 4 & tháng 10)
                                </td>
                            </tr>
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Ngôn ngữ đề
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Tiếng Anh + bản dịch tiếng Việt
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Tiếng Nhật (cần khoảng N2–N3)
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Hình thức thi
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Thi trên giấy
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Thi trên máy tính (CBT)
                                </td>
                            </tr>
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Lệ phí
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    ~1.500.000 VNĐ
                                </td>
                                <td className="px-4 py-3 border border-border/60">~7.500 yên</td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Địa điểm
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Hà Nội, Đà Nẵng, TP.HCM và một số nơi khác
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Khắp 47 tỉnh thành Nhật
                                </td>
                            </tr>
                            <tr className="bg-card">
                                <td className="px-4 py-3 font-medium border border-border/60">
                                    Kết quả
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    ~20 ngày sau khi thi
                                </td>
                                <td className="px-4 py-3 border border-border/60">
                                    Xem ngay sau khi thi (CBT)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* TIP BOX */}
                <div className="flex gap-4 bg-gray-50 dark:bg-blue-900/20 border-l-4 border-secondary dark:border-blue-900 rounded-r-md p-5 my-8">
                    <p className="text-sm sm:text-base text-secondary dark:text-blue-100 m-0">
                        <strong>Mẹo:</strong> Nếu bạn thi tại Việt Nam, đề có bản dịch tiếng Việt kèm theo nên không cần
                        lo về tiếng Anh quá nhiều. Quan trọng hơn là hiểu được các thuật ngữ IT. Nhưng nếu có thể,{' '}
                        <strong>hãy đọc đề bản tiếng Anh là chính</strong> – nhiều bạn phản ánh bản dịch tiếng Việt đôi
                        lúc không thật sự tự nhiên.
                    </p>
                </div>

                {/* SECTION 6 */}
                <h2
                    id="lo-trinh-on-luyen"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24"
                >
                    6. Lộ Trình Ôn Luyện FE 3 Tháng Từ Con Số 0
                </h2>

                <figure className="my-8">
                    <Image
                        width={500}
                        height={500}
                        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=900&q=75"
                        alt="Người đang lập kế hoạch ôn thi chứng chỉ FE với sổ tay và máy tính"
                        className="w-full h-auto object-cover rounded-md shadow-sm"
                        loading="lazy"
                    />
                    <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                        Tổng thời gian ôn luyện FE thường dao động từ 3 tháng (dân IT) đến 5–6 tháng (người mới hoàn
                        toàn).
                    </figcaption>
                </figure>

                <p className="mb-6">
                    Đây là lộ trình thực tế được nhiều bạn đã đậu FE chia sẻ. Không cần quá 12 triệu học phí, không cần
                    khóa học fancy – chỉ cần kỷ luật và đúng phương pháp.
                </p>

                {/* STEPS */}
                <div className="flex flex-col gap-4 my-8">
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-border/60 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg dark:bg-blue-900">
                            1
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900  text-lg mb-1 dark:text-blue-900">
                                Tháng 1 – Đọc giáo trình nền (đề sáng)
                            </h4>
                            <p className="text-sm text-muted-foreground m-0">
                                Dùng sách "New FE Textbook Vol.1 & Vol.2" của IPA (có bản tiếng Anh miễn phí). Mỗi ngày
                                1–2 giờ buổi tối, không cần nhớ hết ngay. Mục tiêu: hiểu tổng thể các chương, ghi chú
                                keyword dạng Q&A. Cuối mỗi chương làm bài tập của chương đó.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-border/60 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg dark:bg-blue-900">
                            2
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-blue-900 text-lg mb-1">
                                Tháng 2 – Luyện đề cũ (đề sáng + bắt đầu đề chiều)
                            </h4>
                            <p className="text-sm text-muted-foreground m-0">
                                Tải đề thi các năm từ trang ITPEC (itpec.org). Làm mỗi ngày ít nhất 1 đề buổi sáng, đọc
                                kỹ giải thích đáp án kể cả câu làm đúng. Song song bắt đầu làm quen với đề buổi chiều,
                                chọn ngôn ngữ lập trình bạn mạnh nhất (Java/Python/C) để ôn chuyên sâu.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-border/60 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg dark:bg-blue-900">
                            3
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-blue-900 text-lg mb-1">
                                Tháng 3 – Chiến đề chiều & thực chiến tổng hợp
                            </h4>
                            <p className="text-sm text-muted-foreground m-0">
                                Tập trung xử lý đề chiều – đây là phần nhiều bạn trượt nhất. Luyện đọc đề nhanh, xác
                                định câu dễ làm trước. Cuối tháng thi thử đủ cả sáng lẫn chiều trong 300 phút liên tục
                                để quen với áp lực thật. Ghi nhớ: câu 7/8 được chọn 1 – hãy quyết định sẵn từ trước
                                không phân vân trong phòng thi.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-border/60 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg dark:bg-blue-900">
                            4
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-blue-900 text-lg mb-1 ">
                                Tuần cuối – Ôn nhanh điểm yếu, giữ tâm lý
                            </h4>
                            <p className="text-sm text-muted-foreground m-0">
                                Không học kiến thức mới. Xem lại những câu hay sai, ôn các từ khóa hay xuất hiện. Ngủ đủ
                                giấc. Vào phòng thi làm câu dễ trước – mỗi câu trung bình dưới 2 phút cho đề sáng, đừng
                                "ngồi chết" ở một câu khó.
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">
                    Tài liệu & công cụ nên dùng
                </h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                        <strong>Sách chính thức:</strong>
                        <a
                            href={'https://pdfcoffee.com/new-fe-textbook-vol2-pdf-free.html'}
                            className="ml-1 font-bold underline text-primary dark:text-blue-900"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            New FE Textbook Vol.1 & Vol.2 (IPA phát hành, miễn phí PDF trên LIGHTBOAT)
                        </a>
                    </li>
                    <li>
                        <strong>Đề thi cũ:</strong>
                        <a
                            href="https://itpec.org/"
                            className="ml-1 font-bold underline text-primary dark:text-blue-900"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Tải tại itpec.org – đề từ 2017 đến nay
                        </a>
                    </li>
                    <li>
                        <strong>Trang ôn luyện tiếng Nhật:</strong>
                        <a
                            href="https://www.fe-siken.com/"
                            className="ml-1 font-bold underline text-primary dark:text-blue-900"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            fe-siken.com (nếu bạn thi ở Nhật)
                        </a>
                    </li>
                    <li>
                        <strong>Thi thử online:</strong>
                        <Link href="/vi/" className="ml-1 font-bold underline text-primary dark:text-blue-900">
                            IT Shiken – giao diện mô phỏng đề thật, chấm điểm tự động, miễn phí
                        </Link>
                    </li>
                </ul>

                {/* INTERNAL LINK 2 */}
                <Link
                    href="/vi/exams"
                    className="flex items-center gap-4 bg-primary/10 dark:bg-blue-900/10 border border-green-200 dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md hover:border-primary dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-900 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – Luyện Đề FE Miễn Phí
                        </div>
                        <div className="font-semibold text-foreground group-hover:text-primary dark:group-hover:text-blue-900 transition-colors">
                            Thi thử đề FE online – mô phỏng 99% đề thật, chấm điểm tự động ngay sau khi làm
                        </div>
                    </div>
                </Link>

                {/* SECTION 7 - FAQ */}
                <h2
                    id="faq"
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24"
                >
                    7. Câu Hỏi Thường Gặp
                </h2>

                <div className="space-y-4 mb-10">
                    <div className="border border-border/60 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-foreground">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            FE có khó không? Tỷ lệ đậu bao nhiêu?
                        </div>
                        <div className="p-4 border-t border-border/60 text-foreground/80 text-sm md:text-base bg-card">
                            Tỷ lệ đậu FE tại Việt Nam trung bình dưới 25% – khá thấp. Điều này không có nghĩa là không
                            thi được, mà là nhiều bạn ôn chưa đúng cách hoặc bỏ qua phần đề chiều. Nếu ôn đủ 3 tháng
                            theo đúng lộ trình, cơ hội đậu là hoàn toàn thực tế.
                        </div>
                    </div>

                    <div className="border border-border/60 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-foreground">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            Không có bằng đại học, có nên thi FE không?
                        </div>
                        <div className="p-4 border-t border-border/60 text-foreground/80 text-sm md:text-base bg-card">
                            Đây là một trong những lý do mà rất nhiều người chọn FE. Chứng chỉ FE được chính phủ Nhật
                            công nhận để thay thế bằng đại học khi xin visa lao động kỹ sư CNTT. Vì vậy, nếu bạn muốn
                            làm việc tại Nhật mà không có bằng đại học CNTT, FE là con đường ngắn nhất và thực tế nhất.
                        </div>
                    </div>

                    <div className="border border-border/60 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-foreground">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            Nên chọn ngôn ngữ lập trình nào cho đề chiều?
                        </div>
                        <div className="p-4 border-t border-border/60 text-foreground/80 text-sm md:text-base bg-card">
                            Đề chiều cho phép bạn chọn 1 trong 5 ngôn ngữ: C, Java, Python, Assembly, Excel. Lời khuyên
                            phổ biến nhất từ cộng đồng là chọn ngôn ngữ bạn đang dùng hàng ngày. Python và Java là hai
                            lựa chọn phổ biến nhất vì cú pháp rõ ràng, dễ đọc trong điều kiện thi cử.
                        </div>
                    </div>

                    <div className="border border-border/60 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-foreground">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            Đậu một phần, có cần thi lại cả hai không?
                        </div>
                        <div className="p-4 border-t border-border/60 text-foreground/80 text-sm md:text-base bg-card">
                            Không. Nếu bạn đậu một phần (sáng hoặc chiều), kết quả đó được bảo lưu sang kỳ thi ngay liền
                            sau. Bạn chỉ cần thi lại phần chưa đậu. Điều này giúp giảm áp lực đáng kể cho những bạn lần
                            đầu thi.
                        </div>
                    </div>

                    <div className="border border-border/60 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-foreground">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            Mình là dân non-IT, có nên thi FE không?
                        </div>
                        <div className="p-4 border-t border-border/60 text-foreground/80 text-sm md:text-base bg-card">
                            Thành thật mà nói: FE khá thách thức với người hoàn toàn không có nền tảng IT vì có phần lập
                            trình và thuật toán. Nếu bạn là non-IT, nên bắt đầu với IT Passport trước để xây nền, rồi
                            quyết định có leo lên FE không. Nhiều comtor, BA, tester đã đậu FE sau khi đi từ IT Passport
                            lên – hoàn toàn khả thi nếu có đủ thời gian ôn luyện.
                        </div>
                    </div>
                </div>

                {/* INTERNAL LINK 3 */}
                <Link
                    href="/vi/flashcards"
                    className="flex items-center gap-4 bg-primary/10 dark:bg-blue-900/10 border border-green-200 dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md hover:border-primary dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-900 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – Flashcard
                        </div>
                        <div className="font-semibold text-foreground group-hover:text-primary dark:group-hover:text-blue-900 transition-colors">
                            Ôn từ vựng & khái niệm IT bằng Flashcard – học nhanh, nhớ lâu hơn
                        </div>
                    </div>
                </Link>

                {/* CONCLUSION */}
                <div className="bg-slate-50 dark:bg-slate-800/30 border border-border/60 rounded-md p-6 sm:p-8 my-10">
                    <h2 className="text-xl font-bold text-foreground mb-4">Tóm Lại</h2>
                    <p className="mb-4 text-foreground/80">
                        Chứng chỉ FE không dễ, nhưng nó xứng đáng với mọi công sức bạn bỏ ra. Không chỉ là một dòng trên
                        CV, FE còn là cánh cửa thực sự để bạn làm việc tại Nhật, xin visa mà không cần bằng đại học, và
                        có nền tảng vững để bước lên những cấp độ cao hơn.
                    </p>
                    <p className="text-foreground/80 font-medium mb-4">
                        Quan trọng hơn: <strong>bạn không cần xuất phát điểm hoàn hảo</strong>. Nhiều người đã đậu FE từ
                        gần con số 0, chỉ nhờ ôn đúng cách và kiên trì theo kế hoạch. Lộ trình 3 tháng ở trên là thực
                        tế, đã được kiểm chứng bởi chính những người trong cộng đồng.
                    </p>
                    <p className="text-foreground/80 font-medium">
                        Chúc bạn chinh phục được tấm chứng chỉ kỹ sư này!
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
                                <Bookmark className="w-4 h-4 text-blue-500" /> Mục lục
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="#it-fe-la-gi" className="flex items-center gap-2.5 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">1</span>
                                        FE là gì?
                                    </a>
                                </li>
                                <li>
                                    <a href="#fe-khac-it-passport" className="flex items-center gap-2.5 text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">2</span>
                                        Khác IT Passport?
                                    </a>
                                </li>
                                <li>
                                    <a href="#cau-truc-de-thi" className="flex items-center gap-2.5 text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 flex items-center justify-center text-xs font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors">3</span>
                                        Cấu trúc đề thi
                                    </a>
                                </li>
                                <li>
                                    <a href="#loi-ich" className="flex items-center gap-2.5 text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">4</span>
                                        Lợi ích
                                    </a>
                                </li>
                                <li>
                                    <a href="#dang-ky" className="flex items-center gap-2.5 text-muted-foreground hover:text-pink-600 dark:hover:text-pink-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300 flex items-center justify-center text-xs font-bold group-hover:bg-pink-600 group-hover:text-white transition-colors">5</span>
                                        Cách đăng ký
                                    </a>
                                </li>
                                <li>
                                    <a href="#lo-trinh-on-luyen" className="flex items-center gap-2.5 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">6</span>
                                        Lộ trình học
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
                    <h3 className="text-2xl font-bold text-white mb-4">Bắt Đầu Luyện Thi FE Ngay Hôm Nay?</h3>
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                        IT Shiken cung cấp đề thi thử FE miễn phí, giao diện mô phỏng đề thật, chấm điểm tự động và phân tích kết quả chi tiết – giúp bạn biết rõ mình đang yếu chỗ nào.
                    </p>
                    <Button asChild className="text-lg !py-6 bg-accent hover:bg-accent/90 text-slate-900 border-none">
                        <Link href="/vi/exams">Thi Thử FE Ngay – Miễn Phí</Link>
                    </Button>
                </div>
            </div>

            {/* RELATED POSTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border/40">
                <h3 className="text-2xl font-bold text-foreground mb-8">Bài Viết Liên Quan</h3>
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
