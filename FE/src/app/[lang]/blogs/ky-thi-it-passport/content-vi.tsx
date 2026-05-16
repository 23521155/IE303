import Image from 'next/image';
import { AlertTriangle, Bookmark, Calendar, CheckCircle2, Clock, Info, Link as LinkIcon, Share2, Eye, MessageSquare, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import React from 'react';

// Cập nhật Mock data theo nội dung mới
const postDetail = {
    id: 'ky-thi-it-passport',
    title: 'Kỳ thi IT Passport là gì? Cẩm nang chinh phục chứng chỉ IT Nhật Bản từ A-Z',
    excerpt: 'Từ định nghĩa, cấu trúc đề thi, cách đăng ký đến lộ trình ôn luyện – tất cả trong một bài viết.',
    coverImage: '/blog-it-passport-thumbnail.jpg',
    author: {
        name: 'Nguyễn Lê Tuấn Phi',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
    },
    date: '01/05/2026',
    category: 'Chứng chỉ IT',
    readTime: '30 phút',
    tags: ['ITPassport', 'Itshiken', 'NhatBan', 'Career'],
    views: '1.2k',
    comments: '15',
    relatedPosts: [
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
        { 
            id: 'lo-trinh-hoc-it', 
            title: 'Lộ trình chứng chỉ IT Nhật Bản (IPA) từ Cơ bản đến Chuyên gia', 
            image: '/it-roadmap.png', 
            date: '08/05/2026',
            href: '/vi/blogs/lo-trinh-hoc-it'
        },
    ]
};

export default function ContentVi() {
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
                                alt={postDetail.title} 
                                width={1200} 
                                height={800}
                                className="w-full h-auto object-cover rounded-lg max-h-[500px]"
                                priority 
                            />
                            <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                                Chứng chỉ IT Passport là gì?
                            </figcaption>
                        </figure>

                        <div className="p-6 sm:p-10 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                            <p className="mb-6 drop-cap">
                                Bạn đang tìm hiểu về IT Passport và không biết nên bắt đầu từ đâu? Hay bạn đang phân vân không biết
                                chứng chỉ này có thực sự cần thiết với mình không? Yên tâm, bài viết này sẽ giải đáp tất tần tật từ
                                A đến Z để bạn có đủ thông tin và tự tin bước vào kỳ thi này.
                            </p>



                {/* SECTION 1 */}
                <h2
                    id="it-passport-la-gi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24"
                >
                    1. IT Passport Là Gì?
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
                    (tiếng Nhật: ITパスポート, viết tắt là <strong>iPass</strong>) là chứng chỉ cấp quốc gia level 1
                    theo Chuẩn Công nghệ thông tin Nhật Bản (ITSS), do Bộ Kinh tế, Thương mại và Công nghiệp Nhật Bản
                    (METI) quản lý và cấp thông qua tổ chức IPA – <em>Information-technology Promotion Agency</em>.
                </p>
                <p className="mb-6">
                    Nói đơn giản hơn: đây là tấm "hộ chiếu" dành cho bất kỳ ai muốn bước chân vào lĩnh vực công nghệ
                    thông tin – dù bạn học dân kinh tế, ngoại ngữ hay bất kỳ ngành nào khác. Chứng chỉ này chứng minh
                    bạn có nền tảng kiến thức IT đủ để làm việc trong môi trường công nghệ, đặc biệt là tại các công ty
                    Nhật Bản.
                </p>

                {/* INFO BOX */}
                <div className="flex gap-4 bg-primary/10 dark:bg-blue-900/20 border dark:border-blue-800 rounded-md p-5 my-8">
                    <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-secondary dark:text-blue-100 m-0">
                        <strong>IT Passport không phải chứng chỉ dành riêng cho dân IT.</strong> Ngược lại, đây chính là
                        kỳ thi lý tưởng cho những ai <em>không xuất thân từ chuyên ngành CNTT</em> nhưng muốn làm việc
                        trong môi trường công nghệ hoặc với đối tác Nhật Bản.
                    </p>
                </div>

                <figure className="my-8">
                    <Image
                        width={500}
                        height={500}
                        src="https://blog.sendmoney.jp/wp-content/uploads/2024/07/luyen-thi-chung-chi-IT-passport.jpg"
                        alt="Logo IPA - tổ chức cấp chứng chỉ IT Passport Nhật Bản"
                        className="w-full rounded-md shadow-sm"
                    />
                    <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                        Chứng chỉ IT Passport do tổ chức IPA (Nhật Bản) cấp, được công nhận tại 7 quốc gia trên thế
                        giới.
                    </figcaption>
                </figure>

                {/* SECTION 2 */}
                <h2
                    id="ai-nen-thi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24"
                >
                    2. Ai Nên Thi IT Passport?
                </h2>
                <p className="mb-6">
                    Một trong những điểm khiến IT Passport khác với phần lớn các chứng chỉ IT khác là:{' '}
                    <strong>không giới hạn đối tượng tham dự</strong>. Không cần bằng cấp, không cần kinh nghiệm. Cứ
                    muốn thi là thi được.
                </p>
                <p className="mb-6">
                    Vậy chứng chỉ này đặc biệt phù hợp với ai? Đây là những nhóm người mà IT Passport thực sự tạo ra giá
                    trị rõ nét nhất:
                </p>

                {/* BENEFITS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary dark:text-blue-900 mb-2">Dân Sales & Marketing</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Làm việc với khách hàng công nghệ, cần hiểu sản phẩm IT để tư vấn tốt hơn.
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary dark:text-blue-900 mb-2">IT Comtor / Biên dịch IT</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Cần vốn từ vựng và kiến thức nền tảng IT để dịch thuật chính xác, chuyên nghiệp.
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary dark:text-blue-900 mb-2">Back-office & HR</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Làm việc trong công ty IT nhưng không phải kỹ sư, muốn hiểu "ngôn ngữ" của đồng nghiệp.
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary dark:text-blue-900 mb-2">Sinh viên chuyển ngành</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Muốn chuyển sang IT, cần có chứng chỉ để bổ sung CV và bắt đầu hành trình.
                        </p>
                    </div>
                </div>
                <p className="mb-6">
                    Và nếu bạn đang là kỹ sư, developer hay tester thì sao? IT Passport vẫn có giá trị vì nó bổ sung
                    phần kiến thức <strong>quản lý, chiến lược kinh doanh và pháp lý IT</strong> mà nhiều kỹ sư thường
                    bỏ qua.
                </p>

                {/* SECTION 3 */}
                <h2
                    id="cau-truc-de-thi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24"
                >
                    3. Cấu Trúc Đề Thi IT Passport
                </h2>
                <p className="mb-6">
                    Đây là phần nhiều người hỏi nhất. Biết rõ cấu trúc đề thi sẽ giúp bạn phân bổ thời gian ôn luyện một
                    cách khôn ngoan hơn.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 my-6 text-center font-medium">
                    Tổng quan: 100 câu trắc nghiệm <span className="mx-2 text-slate-300">|</span> Thời gian: 120 phút{' '}
                    <span className="mx-2 text-slate-300">|</span> Hình thức: CBT / Giấy
                </div>

                <div className="overflow-x-auto mb-6">
                    <table className="w-full border border-slate-200 dark:border-slate-700 text-sm text-left rounded-md">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Phần Thi</th>
                                <th className="px-4 py-3 font-semibold">Nội Dung</th>
                                <th className="px-4 py-3 font-semibold">Số Câu</th>
                                <th className="px-4 py-3 font-semibold">Điểm Đậu</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 dark:text-slate-300">
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium">Chiến lược (Strategy)</td>
                                <td className="px-4 py-3">Quản trị doanh nghiệp, pháp lý, chiến lược kinh doanh</td>
                                <td className="px-4 py-3">35 câu</td>
                                <td className="px-4 py-3">300/1000</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium">Quản lý (Management)</td>
                                <td className="px-4 py-3">Quản lý dự án, dịch vụ IT, kiểm thử phần mềm</td>
                                <td className="px-4 py-3">20 câu</td>
                                <td className="px-4 py-3">300/1000</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium">Kỹ thuật (Technology)</td>
                                <td className="px-4 py-3">Phần cứng, mạng, DB, bảo mật, thuật toán</td>
                                <td className="px-4 py-3">45 câu</td>
                                <td className="px-4 py-3">300/1000</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/20 font-bold">
                                <td className="px-4 py-3" colSpan={2}>
                                    Tổng điểm để đậu
                                </td>
                                <td className="px-4 py-3 text-primary dark:text-blue-900" colSpan={2}>
                                    ≥ 600/1000 (cả 3 phần ≥ 300)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* WARNING BOX */}
                <div className="flex gap-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-md p-5 my-8">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-yellow-900 dark:text-yellow-100 m-0">
                        <strong>Lưu ý quan trọng:</strong> Bạn phải đạt tối thiểu 300 điểm ở <em>cả 3 phần</em>. Nếu một
                        phần dưới 300 điểm, dù tổng điểm có cao hơn 600 bạn vẫn sẽ trượt. Đừng bỏ bê phần Quản lý chỉ vì
                        ít câu hỏi hơn nhé!
                    </p>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">Mức độ khó như thế nào?</h3>
                <p className="mb-6">
                    Theo phản hồi từ nhiều người đã thi, kỳ thi IT Passport không khó về mặt kỹ thuật – phần khó nhất
                    thường là lượng thuật ngữ tiếng Nhật (nếu thi ở Nhật) và khối lượng kiến thức trải rộng. Với người
                    chưa biết gì về IT, cần khoảng 80–100 giờ ôn luyện. Với người đang làm trong ngành IT, chỉ cần 20–30
                    giờ là đủ.
                </p>

                {/* INTERNAL LINK 1 */}
                <Link
                    href="/vi/exams"
                    className="flex items-center gap-4 dark:bg-blue-900/10 border  dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md  dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-900 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – Luyện Đề Miễn Phí
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-900 transition-colors">
                            Thi thử IT Passport online ngay – chấm điểm tự động, miễn phí 100%
                        </div>
                    </div>
                </Link>

                {/* SECTION 4 */}
                <h2
                    id="loi-ich"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24"
                >
                    4. Tại Sao Nên Có Chứng Chỉ IT Passport?
                </h2>
                <p className="mb-4">Nhiều người hỏi: "Học xong rồi để làm gì?" – và đây là câu trả lời thực tế nhất.</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                    Lợi thế khi xin việc & xét visa tại Nhật
                </h3>
                <p className="mb-4">
                    Với những ai hướng đến thị trường lao động Nhật Bản, IT Passport là một trong những tiêu chí được
                    nhiều công ty Nhật coi trọng. Hơn nữa, khi xét Visa lao động dài hạn hoặc visa vĩnh trú, chứng chỉ
                    này được tính vào bảng điểm "Điểm số nhân tài" (高度人材ポイント制度) của Nhật Bản.
                </p>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                    Mở ra nhiều cơ hội nghề nghiệp
                </h3>
                <p className="mb-4">
                    Người sở hữu IT Passport có thể dễ dàng tiếp cận nhiều vị trí khác nhau trong ngành IT:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                        <strong>Kỹ sư cầu nối (Bridge SE)</strong> – cầu nối giữa team Việt Nam và khách hàng Nhật
                    </li>
                    <li>
                        <strong>IT Comtor</strong> – biên phiên dịch chuyên ngành IT Nhật – Việt
                    </li>
                    <li>
                        <strong>Business Analyst, Consultant</strong> – phân tích yêu cầu khách hàng
                    </li>
                    <li>
                        <strong>Sale Engineering</strong> – bán hàng giải pháp công nghệ
                    </li>
                    <li>
                        <strong>Tester, QA</strong> – kiểm thử phần mềm
                    </li>
                </ul>

                {/* SUCCESS BOX */}
                <div className="flex gap-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-md p-5 my-8">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-green-900 dark:text-green-100 m-0">
                        <strong>Bước đệm lên chứng chỉ cao hơn:</strong> Sau IT Passport, bạn có thể tiếp tục chinh phục{' '}
                        <strong>FE (Fundamental IT Engineer)</strong>, rồi lên đến{' '}
                        <strong>AP (Applied IT Engineer)</strong>, <strong>PM (Project Manager)</strong>... Kiến thức sẽ
                        nối tiếp nhau, không học phí nào là uổng.
                    </p>
                </div>

                {/* SECTION 5 */}
                <h2
                    id="dang-ky"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24"
                >
                    5. Cách Đăng Ký Thi IT Passport
                </h2>
                <div className="overflow-x-auto mb-8">
                    <p className="mb-4">
                        Tùy bạn muốn thi ở đâu, quy trình sẽ có khác nhau một chút. Dưới đây là thông tin tổng hợp cho
                        cả hai trường hợp.
                    </p>
                    <table className="w-full border border-slate-200 dark:border-slate-700 text-sm text-left">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Tiêu chí</th>
                                <th className="px-4 py-3 font-semibold">🇻🇳 Tại Việt Nam</th>
                                <th className="px-4 py-3 font-semibold">🇯🇵 Tại Nhật Bản</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 dark:text-slate-300">
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium">Đơn vị tổ chức</td>
                                <td className="px-4 py-3">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.vitec.org.vn/hitcweb2024/index.php/sat-hach/dang-ky-sat-hach"
                                        className="text-primary underline"
                                    >
                                        VITEC (phối hợp IPA)
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
                                <td className="px-4 py-3 font-medium">Lịch thi</td>
                                <td className="px-4 py-3">2 lần/năm (Tháng 4 & 10)</td>
                                <td className="px-4 py-3">5–6 lần/năm, hàng tháng</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium">Hình thức</td>
                                <td className="px-4 py-3">Thi trên giấy</td>
                                <td className="px-4 py-3">CBT (Trên máy tính)</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium">Ngôn ngữ</td>
                                <td className="px-4 py-3">Tiếng Việt (Có bản dịch)</td>
                                <td className="px-4 py-3">Tiếng Nhật (Cần ~N3)</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium">Địa điểm</td>
                                <td className="px-4 py-3">Hà Nội, TP.HCM, Đà Nẵng, Bình Dương</td>
                                <td className="px-4 py-3">Khắp 47 tỉnh thành Nhật Bản</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* SECTION 6 */}
                <h2
                    id="lo-trinh-on-luyen"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24"
                >
                    6. Lộ Trình Ôn Luyện Hiệu Quả
                </h2>
                <p className="mb-6">
                    Nhiều bạn hỏi: "Cần bao lâu để ôn thi IT Passport?" Câu trả lời phụ thuộc vào nền tảng của bạn,
                    nhưng nhìn chung,<strong> 3 tháng là khoảng thời gian hợp lý </strong> cho người mới hoàn toàn. Đây
                    là lộ trình gợi ý theo từng giai đoạn:
                </p>

                {/* STEPS */}
                <div className="flex flex-col gap-4 my-8">
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            1
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                Tháng 1 – Nắm kiến thức nền (Input)
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                Đọc giáo trình chuẩn như "いちばんやさしいITパスポート". Đừng cố nhớ hết ngay, cứ đọc
                                qua để quen với các khái niệm. Mỗi ngày hoàn thành 10–15 trang là ổn.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            2
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                Tháng 2 – Làm đề cũ nhiều (Output)
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                Áp dụng tỷ lệ Input:Output = 3:7. Làm thật nhiều đề năm cũ, đọc kỹ giải thích đáp án kể
                                cả những câu làm đúng. Ghi chú keyword theo dạng Q&A.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            3
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                Tháng 3 – Luyện đề thực chiến
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                Tập trung vào phần còn yếu, luyện thi thử mô phỏng đúng 120 phút. Rèn tốc độ: mỗi câu
                                trung bình 72 giây, làm câu dễ trước, câu khó để lại.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            4
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                Tuần cuối – Ôn tổng thể & giữ tinh thần
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                Không học thêm kiến thức mới. Chỉ ôn lại các điểm dễ quên, giữ sức khỏe và tinh thần
                                thoải mái để vào phòng thi với trạng thái tốt nhất.
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                    Nghề nghiệp sau khi học xong?
                </h3>
                <p className="mb-4">
                    Có khá nhiều lựa chọn, nhưng những nguồn được cộng đồng đánh giá cao nhất bao gồm:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                        <strong>Kỹ sư cầu nối (Bridge SE)</strong> – cầu nối giữa team Việt Nam và khách hàng Nhật
                    </li>
                    <li>
                        <strong>IT Comtor</strong> – biên phiên dịch chuyên ngành IT Nhật – Việt
                    </li>
                    <li>
                        <strong>Business Analyst, Consultant</strong> – phân tích yêu cầu khách hàng
                    </li>
                    <li>
                        <strong>Sale Engineering</strong> – bán hàng giải pháp công nghệ
                    </li>
                    <li>
                        <strong>Tester, QA</strong> – kiểm thử phần mềm
                    </li>
                </ul>
                {/* INTERNAL LINK 2 */}
                <Link
                    href="/vi/materials"
                    className="flex items-center gap-4  dark:bg-blue-900/10 border  dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md  dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-900 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – Tài Liệu
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-900 transition-colors">
                            Xem kho tài liệu luyện thi IT Passport được cập nhật liên tục
                        </div>
                    </div>
                </Link>

                {/* SECTION 7 - FAQ */}
                <h2
                    id="faq"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24"
                >
                    7. Câu Hỏi Thường Gặp
                </h2>

                <div className="space-y-4 mb-10">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            IT Passport khác gì so với chứng chỉ FE?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            IT Passport là level 1 – level cơ bản nhất, dành cho mọi đối tượng kể cả non-IT, tập trung
                            vào kiến thức tổng quát.
                            <br />
                            <Link className="font-bold underline text-primary mr-1" href={'/vi/blogs/ky-thi-fe'}>
                                FE (Fundamental IT Engineer)
                            </Link>
                            là level 2, khó hơn và thiên về kỹ thuật chuyên sâu, phù hợp với dev và sinh viên CNTT.
                            Nhiều người chọn IT Passport làm bước đệm trước khi chinh phục FE.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            Chứng chỉ IT Passport có giá trị được bao lâu?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            Vĩnh viễn. Không như nhiều chứng chỉ khác cần gia hạn, IT Passport một khi đã đậu là có giá
                            trị mãi mãi. Đây là một trong những lý do nhiều người chọn đầu tư vào chứng chỉ này.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            Người không biết tiếng Nhật có thi được không?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            Hoàn toàn được. Tại Việt Nam, đề thi có bản dịch tiếng Việt đi kèm nên không yêu cầu tiếng
                            Nhật.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-900 font-extrabold">Q</span>
                            Tỷ lệ đậu của kỳ thi IT Passport là bao nhiêu?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            Theo số liệu từ IPA, tỷ lệ đậu của kỳ thi IT Passport ở Nhật vào khoảng 52% – tức là cứ 2
                            người thi thì có 1 người đậu. Đây không phải con số quá thấp nếu bạn có sự chuẩn bị đầy đủ.
                        </div>
                    </div>
                </div>

                {/* CONCLUSION */}
                <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-md p-6 sm:p-8 my-10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Tóm Lại</h2>
                    <p className="mb-4 text-slate-700 dark:text-slate-300">
                        IT Passport không phải là chứng chỉ chỉ dành cho dân kỹ thuật – đây là tấm vé dành cho bất kỳ ai
                        muốn bước vào môi trường làm việc IT, đặc biệt là với các công ty Nhật Bản. Kiến thức rộng nhưng
                        không quá khó, lộ trình ôn luyện rõ ràng và chứng chỉ có giá trị vĩnh viễn – đây thực sự là một
                        trong những khoản đầu tư cho bản thân có giá trị nhất bạn có thể làm.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-4">
                        Dù bạn đang là sinh viên, dân văn phòng, IT Comtor hay đang muốn chuyển sang ngành công nghệ –
                        hành trình chinh phục IT Passport hoàn toàn nằm trong tầm tay bạn. Quan trọng là bắt đầu đúng
                        cách và kiên trì theo lộ trình.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                        Chúc bạn ôn thi hiệu quả và sớm cầm tấm hộ chiếu IT trên tay!
                    </p>
                </div>

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
                        <div className="sticky top-24 bg-white dark:bg-[#121212] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-5 flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                                <Bookmark className="w-4 h-4 text-blue-500" /> Nội Dung Bài Viết
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="#it-passport-la-gi" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">1</span>
                                        IT Passport là gì?
                                    </a>
                                </li>
                                <li>
                                    <a href="#ai-nen-thi" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">2</span>
                                        Ai nên thi?
                                    </a>
                                </li>
                                <li>
                                    <a href="#cau-truc-de-thi" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 flex items-center justify-center text-xs font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors">3</span>
                                        Cấu trúc đề thi
                                    </a>
                                </li>
                                <li>
                                    <a href="#loi-ich" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">4</span>
                                        Lợi ích
                                    </a>
                                </li>
                                <li>
                                    <a href="#dang-ky" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300 flex items-center justify-center text-xs font-bold group-hover:bg-pink-600 group-hover:text-white transition-colors">5</span>
                                        Cách đăng ký
                                    </a>
                                </li>
                                <li>
                                    <a href="#lo-trinh-on-luyen" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">6</span>
                                        Lộ trình ôn luyện
                                    </a>
                                </li>
                                <li>
                                    <a href="#faq" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors group">
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
                <div className="bg-gradient-to-br from-secondary/60 to-secondary dark:to-blue-800 rounded-xl p-8 sm:p-10 text-center shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">Sẵn Sàng Luyện Thi IT Passport Chưa?</h3>
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
