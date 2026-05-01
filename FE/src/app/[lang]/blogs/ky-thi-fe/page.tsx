import { Bookmark, Calendar, Clock, Link as LinkIcon, Share2, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import React from 'react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';

// Cập nhật Mock data theo nội dung mới
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
};

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

export const metadata: Metadata = {
    title: postDetail.title,
    description: 'Tìm hiểu FE: khái niệm, cấu trúc đề thi, so sánh, cách đăng ký, lộ trình ôn luyện chi tiết.',
    keywords: ['FE', 'iPass', 'chứng chỉ IT Nhật', 'IT Shiken'],
    openGraph: {
        title: postDetail.title,
        description: 'Tìm hiểu FE: khái niệm, cấu trúc đề thi, so sánh, cách đăng ký, lộ trình ôn luyện chi tiết.',
        url: `${baseUrl}/vi/blogs/${postDetail.id}`,
        siteName: 'ITShiken',
        images: {
            url: postDetail.coverImage,
            width: 1200,
            height: 630,
            alt: postDetail.title,
        },
        locale: 'vi_VN',
        phoneNumbers: '0903571094',
        emails: 'nguyenletuanphi910.2019@gmail.com',
        type: 'article',
        countryName: 'Việt Nam',
    },
};

const compareStyles = {
    // .compare
    container: 'grid grid-cols-1 sm:grid-cols-2 gap-4 my-6',

    // .compare-card
    cardBase: 'rounded-md p-5 border-2 transition-colors',

    // .compare-card.fe & .compare-card.ip
    cardVariants: {
        fe: 'border-primary bg-primary/10 dark:border-blue-700 dark:bg-blue-900/20',
        ip: 'border-secondary bg-gray-50 dark:border-blue-500 dark:bg-blue-900/10',
    },

    // .compare-card h4
    titleBase: 'text-[15px] font-bold mb-2.5',
    titleVariants: {
        fe: 'text-primary dark:text-blue-400',
        ip: 'text-secondary dark:text-blue-400',
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
        morning: 'text-primary dark:text-blue-400',
        afternoon: 'text-secondary dark:text-blue-400',
    },
    text: 'text-sm mb-1.5 text-slate-600 dark:text-slate-400',
    strong: 'font-semibold text-slate-900 dark:text-slate-200',
};

export default function BlogPage() {
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
                            {postDetail.readTime} đọc
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
                    alt="IT FE là gì - chứng chỉ công nghệ thông tin Nhật Bản"
                    width={500}
                    height={500}
                    className="w-full h-auto max-h-[500px] object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                    Chứng chỉ FE là gì?
                </figcaption>
            </div>

            {/* CONTENT */}
            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                <p className="mb-4">
                    Nếu bạn đang làm trong ngành IT và muốn có một tấm chứng chỉ để chứng minh năng lực – hoặc đang nhắm
                    đến thị trường lao động Nhật Bản – thì hẳn bạn đã từng nghe đến chứng chỉ FE. Nhưng FE cụ thể là gì,
                    học những gì, và liệu bạn có thi được không từ con số gần bằng 0?
                </p>

                <p className="mb-6">
                    Bài viết này sẽ trả lời hết. Không có từ ngữ màu mè, chỉ có thông tin thực tế và những gì bạn thực
                    sự cần biết để bắt đầu.
                </p>

                {/* TABLE OF CONTENTS (TOC) */}
                <nav className="bg-primary/10 dark:bg-blue-900/10 border-l-4 border-primary rounded-r-md p-6 my-10">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary dark:text-blue-400 mb-4">
                        Nội Dung Bài Viết
                    </h3>
                    <ul className="space-y-2 text-base text-secondary">
                        <li>
                            <a
                                href="#it-fe-la-gi"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                1. Chứng chỉ IT FE là gì?
                            </a>
                        </li>
                        <li>
                            <a
                                href="#fe-khac-it-passport"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                2. FE khác IT Passport chỗ nào?
                            </a>
                        </li>
                        <li>
                            <a
                                href="#cau-truc-de-thi"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                3. Cấu trúc đề thi chi tiết
                            </a>
                        </li>
                        <li>
                            <a
                                href="#loi-ich"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                4. Lợi ích thực tế khi có chứng chỉ FE
                            </a>
                        </li>
                        <li>
                            <a
                                href="#dang-ky"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                5. Cách đăng ký dự thi tại Việt Nam & Nhật Bản
                            </a>
                        </li>
                        <li>
                            <a
                                href="#lo-trinh-on-luyen"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                6. Lộ trình ôn luyện 3 tháng từ con số 0
                            </a>
                        </li>
                        <li>
                            <a href="#faq" className="hover:text-primary dark:hover:text-blue-400 transition-colors">
                                7. Câu hỏi thường gặp
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* SECTION 1 */}
                <h2
                    id="it-fe-la-gi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    1. Chứng Chỉ FE Là Gì?
                </h2>
                <p className="mb-6">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://viblo.asia/p/thi-do-chung-chi-ki-su-cntt-chuan-nhat-ban-fe-fundamental-information-technology-engineers-examination-tu-con-so-0-eW65GGO65DO"
                        className="font-medium text-primary underline mr-1"
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
                <div className="flex gap-4 bg-primary/10 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-5 my-8">
                    <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-secondary dark:text-blue-100 m-0">
                        FE nằm ở <strong>Level 2</strong> trong thang chuẩn kỹ năng IT Nhật Bản (ITSS). Đây là bước tiếp
                        theo sau IT Passport (Level 1) và là nền tảng để leo lên các cấp độ cao hơn như AP, PM, hay SC.
                    </p>
                </div>

                {/* SECTION 2 */}
                <h2
                    id="fe-khac-it-passport"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
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
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    3. Cấu Trúc Đề Thi FE Chi Tiết
                </h2>
                <p className="mb-6">
                    Đây là phần nhiều người hỏi nhất. Biết rõ cấu trúc đề thi sẽ giúp bạn phân bổ thời gian ôn luyện một
                    cách khôn ngoan hơn.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 my-6 text-center font-medium">
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
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">
                    Nội dung kiến thức cần nắm
                </h3>
                <p className="mb-6">Phạm vi đề thi FE khá rộng nhưng tập trung chủ yếu vào các mảng sau:</p>

                <div className="overflow-x-auto mb-8">
                    <table className="w-full border border-slate-200 dark:border-slate-700 text-sm text-left">
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
                        <tbody className="text-slate-700 dark:text-slate-300">
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Khoa học máy tính cơ sở
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    Nhị phân, hệ cơ số, phép toán logic, cấu trúc dữ liệu (stack, queue, tree, hash)
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Kiến trúc máy tính
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    RAM, CPU, thuật toán lập lịch (FIFO, LRU), bộ nhớ cache
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Mạng máy tính
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    TCP/IP, DNS, DHCP, NAT, các giao thức phổ biến
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Cơ sở dữ liệu
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    SQL, thiết kế CSDL, quan hệ, chuẩn hóa
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Bảo mật
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    SQL injection, phishing, mã hóa, chính sách bảo mật
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Phát triển phần mềm
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    Vòng đời phát triển, kiểm thử (unit test, integration test), thiết kế hướng đối
                                    tượng
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Quản lý & Chiến lược
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    Quản lý dự án, hòa vốn, chiến lược kinh doanh, kiểm toán IT
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Lập trình (đề chiều)
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
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
                    <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                        Phần thi buổi chiều của FE đòi hỏi tư duy lập trình thực tế – bạn sẽ chọn ngôn ngữ mình tự tin
                        nhất để làm bài.
                    </figcaption>
                </figure>

                {/* SECTION 4 */}
                <h2
                    id="loi-ich"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    4. Lợi Ích Thực Tế Khi Có Chứng Chỉ FE
                </h2>
                <p className="mb-4">
                    Tại sao lại chọn FE thay vì các chứng chỉ IT quốc tế khác? Đây là những lý do mà nhiều kỹ sư Việt
                    Nam đang làm việc tại Nhật chia sẻ:
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-blue-400 mt-6 mb-3">
                    Xin visa làm việc tại Nhật – không cần bằng đại học
                </h3>
                <p className="mb-4">
                    Đây là điểm "killer feature" của FE mà không phải chứng chỉ nào cũng có. Thông thường để xin visa
                    lao động kỹ sư tại Nhật, bạn cần bằng đại học chuyên ngành liên quan hoặc hơn 10 năm kinh nghiệm.
                    Nhưng <strong>sở hữu chứng chỉ FE thay thế được cả hai điều kiện trên</strong>. Với những bạn không
                    có bằng đại học nhưng thực sự giỏi kỹ thuật, đây là con đường cực kỳ giá trị.
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-blue-400 mt-6 mb-3">
                    Cộng điểm visa Kodo & visa vĩnh trú
                </h3>
                <p className="mb-4">
                    Chứng chỉ FE được tính vào hệ thống điểm "Nhân lực chất lượng cao" (高度人材ポイント制度) của Nhật.
                    Điều này giúp bạn tích lũy điểm nhanh hơn để xin visa Kodo (Highly Skilled Worker) và sau đó là visa
                    vĩnh trú.
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-blue-400 mt-6 mb-3">
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
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    5. Cách Đăng Ký Thi FE
                </h2>
                <div className="overflow-x-auto mb-6">
                    <table className="w-full border border-slate-200 dark:border-slate-700 text-sm text-left">
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
                        <tbody className="text-slate-700 dark:text-slate-300">
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Đơn vị tổ chức
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    HITC / VITEC (phối hợp IPA – ITPEC)
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    IPA trực tiếp
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Lịch thi
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    2 lần/năm (tháng 4 & tháng 10)
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    2 lần/năm (tháng 4 & tháng 10)
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Ngôn ngữ đề
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    Tiếng Anh + bản dịch tiếng Việt
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    Tiếng Nhật (cần khoảng N2–N3)
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Hình thức thi
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    Thi trên giấy
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    Thi trên máy tính (CBT)
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Lệ phí
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    ~1.500.000 VNĐ
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">~7.500 yên</td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Địa điểm
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    Hà Nội, Đà Nẵng, TP.HCM và một số nơi khác
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    Khắp 47 tỉnh thành Nhật
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    Kết quả
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    ~20 ngày sau khi thi
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    Xem ngay sau khi thi (CBT)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* TIP BOX */}
                <div className="flex gap-4 bg-gray-50 dark:bg-blue-900/20 border-l-4 border-secondary dark:border-blue-500 rounded-r-md p-5 my-8">
                    <p className="text-sm sm:text-base text-secondary dark:text-blue-100 m-0">
                        <strong>Mẹo:</strong> Nếu bạn thi tại Việt Nam, đề có bản dịch tiếng Việt kèm theo nên không cần
                        lo về tiếng Anh quá nhiều. Quan trọng hơn là hiểu được các thuật ngữ IT. Nhưng nếu có thể,{' '}
                        <strong>hãy đọc đề bản tiếng Anh là chính</strong> – nhiều bạn phản ánh bản dịch tiếng Việt đôi
                        lúc không thật sự tự nhiên.
                    </p>
                </div>

                {/* SECTION 6 */}
                <h2
                    id="lo-trinh"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
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
                    <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
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
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            1
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                Tháng 1 – Đọc giáo trình nền (đề sáng)
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                Dùng sách "New FE Textbook Vol.1 & Vol.2" của IPA (có bản tiếng Anh miễn phí). Mỗi ngày
                                1–2 giờ buổi tối, không cần nhớ hết ngay. Mục tiêu: hiểu tổng thể các chương, ghi chú
                                keyword dạng Q&A. Cuối mỗi chương làm bài tập của chương đó.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            2
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                Tháng 2 – Luyện đề cũ (đề sáng + bắt đầu đề chiều)
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                Tải đề thi các năm từ trang ITPEC (itpec.org). Làm mỗi ngày ít nhất 1 đề buổi sáng, đọc
                                kỹ giải thích đáp án kể cả câu làm đúng. Song song bắt đầu làm quen với đề buổi chiều,
                                chọn ngôn ngữ lập trình bạn mạnh nhất (Java/Python/C) để ôn chuyên sâu.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            3
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                Tháng 3 – Chiến đề chiều & thực chiến tổng hợp
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                Tập trung xử lý đề chiều – đây là phần nhiều bạn trượt nhất. Luyện đọc đề nhanh, xác
                                định câu dễ làm trước. Cuối tháng thi thử đủ cả sáng lẫn chiều trong 300 phút liên tục
                                để quen với áp lực thật. Ghi nhớ: câu 7/8 được chọn 1 – hãy quyết định sẵn từ trước
                                không phân vân trong phòng thi.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            4
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                Tuần cuối – Ôn nhanh điểm yếu, giữ tâm lý
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                Không học kiến thức mới. Xem lại những câu hay sai, ôn các từ khóa hay xuất hiện. Ngủ đủ
                                giấc. Vào phòng thi làm câu dễ trước – mỗi câu trung bình dưới 2 phút cho đề sáng, đừng
                                "ngồi chết" ở một câu khó.
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                    Tài liệu & công cụ nên dùng
                </h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                        <strong>Sách chính thức:</strong>
                        <a
                            href={'https://pdfcoffee.com/new-fe-textbook-vol2-pdf-free.html'}
                            className="ml-1 font-bold underline text-primary"
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
                            className="ml-1 font-bold underline text-primary"
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
                            className="ml-1 font-bold underline text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            fe-siken.com (nếu bạn thi ở Nhật)
                        </a>
                    </li>
                    <li>
                        <strong>Thi thử online:</strong>
                        <Link href="/vi/" className="ml-1 font-bold underline text-primary">
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
                        <div className="text-xs text-primary dark:text-blue-400 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – Luyện Đề FE Miễn Phí
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                            Thi thử đề FE online – mô phỏng 99% đề thật, chấm điểm tự động ngay sau khi làm
                        </div>
                    </div>
                </Link>

                {/* SECTION 7 - FAQ */}
                <h2
                    id="faq"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    7. Câu Hỏi Thường Gặp
                </h2>

                <div className="space-y-4 mb-10">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            FE có khó không? Tỷ lệ đậu bao nhiêu?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            Tỷ lệ đậu FE tại Việt Nam trung bình dưới 25% – khá thấp. Điều này không có nghĩa là không
                            thi được, mà là nhiều bạn ôn chưa đúng cách hoặc bỏ qua phần đề chiều. Nếu ôn đủ 3 tháng
                            theo đúng lộ trình, cơ hội đậu là hoàn toàn thực tế.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            Không có bằng đại học, có nên thi FE không?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            Đây là một trong những lý do mà rất nhiều người chọn FE. Chứng chỉ FE được chính phủ Nhật
                            công nhận để thay thế bằng đại học khi xin visa lao động kỹ sư CNTT. Vì vậy, nếu bạn muốn
                            làm việc tại Nhật mà không có bằng đại học CNTT, FE là con đường ngắn nhất và thực tế nhất.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            Nên chọn ngôn ngữ lập trình nào cho đề chiều?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            Đề chiều cho phép bạn chọn 1 trong 5 ngôn ngữ: C, Java, Python, Assembly, Excel. Lời khuyên
                            phổ biến nhất từ cộng đồng là chọn ngôn ngữ bạn đang dùng hàng ngày. Python và Java là hai
                            lựa chọn phổ biến nhất vì cú pháp rõ ràng, dễ đọc trong điều kiện thi cử.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            Đậu một phần, có cần thi lại cả hai không?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            Không. Nếu bạn đậu một phần (sáng hoặc chiều), kết quả đó được bảo lưu sang kỳ thi ngay liền
                            sau. Bạn chỉ cần thi lại phần chưa đậu. Điều này giúp giảm áp lực đáng kể cho những bạn lần
                            đầu thi.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            Mình là dân non-IT, có nên thi FE không?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
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
                        <div className="text-xs text-primary dark:text-blue-400 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – Flashcard
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                            Ôn từ vựng & khái niệm IT bằng Flashcard – học nhanh, nhớ lâu hơn
                        </div>
                    </div>
                </Link>

                {/* CONCLUSION */}
                <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-md p-6 sm:p-8 my-10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Tóm Lại</h2>
                    <p className="mb-4 text-slate-700 dark:text-slate-300">
                        Chứng chỉ FE không dễ, nhưng nó xứng đáng với mọi công sức bạn bỏ ra. Không chỉ là một dòng trên
                        CV, FE còn là cánh cửa thực sự để bạn làm việc tại Nhật, xin visa mà không cần bằng đại học, và
                        có nền tảng vững để bước lên những cấp độ cao hơn.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-4">
                        Quan trọng hơn: <strong>bạn không cần xuất phát điểm hoàn hảo</strong>. Nhiều người đã đậu FE từ
                        gần con số 0, chỉ nhờ ôn đúng cách và kiên trì theo kế hoạch. Lộ trình 3 tháng ở trên là thực
                        tế, đã được kiểm chứng bởi chính những người trong cộng đồng.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                        Chúc bạn chinh phục được tấm chứng chỉ kỹ sư này!
                    </p>
                </div>

                {/* CTA BOX */}
                <div className="bg-gradient-to-br from-[#053825] to-primary dark:to-blue-800 rounded-md p-8 sm:p-10 text-center my-12 shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">Bắt Đầu Luyện Thi FE Ngay Hôm Nay?</h3>
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                        IT Shiken cung cấp đề thi thử FE miễn phí, giao diện mô phỏng đề thật, chấm điểm tự động và phân
                        tích kết quả chi tiết – giúp bạn biết rõ mình đang yếu chỗ nào.
                    </p>

                    <Button asChild className="text-lg !py-6 bg-accent hover:bg-accent/90 text-slate-900 border-none">
                        <Link href="/vi/exams">Thi Thử FE Ngay – Miễn Phí</Link>
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
                        <span className="text-sm text-slate-500 dark:text-slate-400">Chia sẻ:</span>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-primary transition-colors">
                            <LinkIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
