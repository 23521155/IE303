'use client';

import { Bookmark, Calendar, Clock, Link as LinkIcon, Share2, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import React from 'react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

// Cập nhật Mock data theo nội dung mới
const postDetail = {
    id: 'ky-thi-it-passport',
    title: 'Kỳ thi IT Passport là gì? Cẩm nang chinh phục chứng chỉ IT Nhật Bản từ A-Z',
    excerpt: 'Từ định nghĩa, cấu trúc đề thi, cách đăng ký đến lộ trình ôn luyện – tất cả trong một bài viết.',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    author: {
        name: 'IT Shiken',
        role: 'Publisher',
        avatar: 'https://ui-avatars.com/api/?name=IT+Shiken&background=0D8ABC&color=fff',
    },
    date: '01/05/2026',
    category: 'Chứng chỉ IT',
    readTime: '7 phút',
    tags: ['ITPassport', 'Itshiken', 'NhatBan', 'Career'],
};

export default function BlogDetail({ id }: { id: string }) {
    return (
        <div className="min-h-screen bg-white dark:bg-[#121212] py-8 transition-colors duration-300 text-slate-900 dark:text-slate-200">
            {/* HEADER */}
            <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
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
                        <img
                            src={postDetail.author.avatar}
                            alt={postDetail.author.name}
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
            </header>

            {/* COVER IMAGE */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <img
                    src={postDetail.coverImage}
                    alt="Người đang học luyện thi chứng chỉ IT Passport trên máy tính"
                    className="w-full h-auto max-h-[500px] object-cover rounded-md shadow-sm"
                />
            </div>

            {/* CONTENT */}
            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                <p className="mb-6">
                    Bạn đang tìm hiểu về IT Passport và không biết nên bắt đầu từ đâu? Hay bạn đang phân vân không biết
                    chứng chỉ này có thực sự cần thiết với mình không? Yên tâm, bài viết này sẽ giải đáp tất tần tật từ
                    A đến Z để bạn có đủ thông tin và tự tin bước vào kỳ thi này.
                </p>

                {/* TABLE OF CONTENTS (TOC) */}
                <nav className="bg-primary/10 dark:bg-blue-900/10 border-l-4 border-primary rounded-r-md p-6 my-10">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary dark:text-blue-400 mb-4">
                        Nội Dung Bài Viết
                    </h3>
                    <ul className="space-y-2 text-base text-secondary">
                        <li>
                            <a
                                href="#it-passport-la-gi"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                1. IT Passport là gì?
                            </a>
                        </li>
                        <li>
                            <a
                                href="#ai-nen-thi"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                2. Ai nên thi IT Passport?
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
                                4. Lợi ích khi có chứng chỉ IT Passport
                            </a>
                        </li>
                        <li>
                            <a
                                href="#dang-ky"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                5. Cách đăng ký dự thi
                            </a>
                        </li>
                        <li>
                            <a
                                href="#lo-trinh-on-luyen"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                6. Lộ trình ôn luyện hiệu quả
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
                    id="it-passport-la-gi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    1. IT Passport Là Gì?
                </h2>
                <p className="mb-6">
                    <strong>IT Passport</strong> (tiếng Nhật: ITパスポート, viết tắt là <strong>iPass</strong>) là chứng
                    chỉ cấp quốc gia level 1 theo Chuẩn Công nghệ thông tin Nhật Bản (ITSS), do Bộ Kinh tế, Thương mại
                    và Công nghiệp Nhật Bản (METI) quản lý và cấp thông qua tổ chức IPA –{' '}
                    <em>Information-technology Promotion Agency</em>.
                </p>
                <p className="mb-6">
                    Nói đơn giản hơn: đây là tấm "hộ chiếu" dành cho bất kỳ ai muốn bước chân vào lĩnh vực công nghệ
                    thông tin – dù bạn học dân kinh tế, ngoại ngữ hay bất kỳ ngành nào khác. Chứng chỉ này chứng minh
                    bạn có nền tảng kiến thức IT đủ để làm việc trong môi trường công nghệ, đặc biệt là tại các công ty
                    Nhật Bản.
                </p>

                {/* INFO BOX */}
                <div className="flex gap-4 bg-primary/10 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-5 my-8">
                    <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-secondary dark:text-blue-100 m-0">
                        <strong>IT Passport không phải chứng chỉ dành riêng cho dân IT.</strong> Ngược lại, đây chính là
                        kỳ thi lý tưởng cho những ai <em>không xuất thân từ chuyên ngành CNTT</em> nhưng muốn làm việc
                        trong môi trường công nghệ hoặc với đối tác Nhật Bản.
                    </p>
                </div>

                <figure className="my-8">
                    <img
                        src="https://images.unsplash.com/photo-1484807352052-23338990c6c6?auto=format&fit=crop&w=900&q=75"
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
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
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
                        <div className="text-4xl mb-4">💼</div>
                        <h4 className="font-bold text-primary dark:text-blue-400 mb-2">Dân Sales & Marketing</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Làm việc với khách hàng công nghệ, cần hiểu sản phẩm IT để tư vấn tốt hơn.
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <div className="text-4xl mb-4">🌐</div>
                        <h4 className="font-bold text-primary dark:text-blue-400 mb-2">IT Comtor / Biên dịch IT</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Cần vốn từ vựng và kiến thức nền tảng IT để dịch thuật chính xác, chuyên nghiệp.
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <div className="text-4xl mb-4">👩‍💼</div>
                        <h4 className="font-bold text-primary dark:text-blue-400 mb-2">Back-office & HR</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Làm việc trong công ty IT nhưng không phải kỹ sư, muốn hiểu "ngôn ngữ" của đồng nghiệp.
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <div className="text-4xl mb-4">🎓</div>
                        <h4 className="font-bold text-primary dark:text-blue-400 mb-2">Sinh viên chuyển ngành</h4>
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
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
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
                                <td className="px-4 py-3 text-primary dark:text-blue-400" colSpan={2}>
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
                <a
                    href="https://itshiken.io.vn/vi/exams"
                    className="flex items-center gap-4 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-400 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – Luyện Đề Miễn Phí
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                            Thi thử IT Passport online ngay – chấm điểm tự động, miễn phí 100%
                        </div>
                    </div>
                </a>

                {/* SECTION 4 */}
                <h2
                    id="loi-ich"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
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
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
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
                                <td className="px-4 py-3">VITEC (phối hợp IPA)</td>
                                <td className="px-4 py-3">IPA – Information-technology Promotion Agency</td>
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
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
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
                    Tài liệu ôn luyện nên dùng gì?
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
                <a
                    href="https://itshiken.io.vn/vi/materials"
                    className="flex items-center gap-4  dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-400 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – Tài Liệu
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                            Xem kho tài liệu luyện thi IT Passport được cập nhật liên tục
                        </div>
                    </div>
                </a>

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
                            IT Passport khác gì so với chứng chỉ FE?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            IT Passport là level 1 – level cơ bản nhất, dành cho mọi đối tượng kể cả non-IT, tập trung
                            vào kiến thức tổng quát. FE (Fundamental IT Engineer) là level 2, khó hơn và thiên về kỹ
                            thuật chuyên sâu, phù hợp với dev và sinh viên CNTT. Nhiều người chọn IT Passport làm bước
                            đệm trước khi chinh phục FE.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            Chứng chỉ IT Passport có giá trị được bao lâu?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            Vĩnh viễn. Không như nhiều chứng chỉ khác cần gia hạn, IT Passport một khi đã đậu là có giá
                            trị mãi mãi. Đây là một trong những lý do nhiều người chọn đầu tư vào chứng chỉ này.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            Người không biết tiếng Nhật có thi được không?
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            Hoàn toàn được. Bạn có thể đăng ký thi lại vào kỳ tiếp theo mà không bị giới hạn số lần. Hãy
                            xem lần trượt là cơ hội để hiểu rõ hơn điểm yếu của mình và cải thiện.
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
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

                {/* CTA BOX */}
                <div className="bg-gradient-to-br from-secondary/60 to-secondary dark:to-blue-800 rounded-md p-8 sm:p-10 text-center my-12 shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">Sẵn Sàng Luyện Thi IT Passport Chưa?</h3>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        IT Shiken cung cấp đề thi thử miễn phí, sát đề thật, chấm điểm tự động và phân tích kết quả chi
                        tiết. Bắt đầu ngay hôm nay – không cần đăng ký!
                    </p>

                    <Button asChild className="text-lg !py-6">
                        <Link href="https://itshiken.io.vn/vi/exams">Thi Thử Ngay – Miễn Phí</Link>
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
        </div>
    );
}
