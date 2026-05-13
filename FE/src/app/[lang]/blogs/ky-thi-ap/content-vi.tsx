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
    title: 'Kỳ thi AP (Applied Information Technology Engineer) là gì?',
    excerpt: 'Chứng chỉ Kỹ sư CNTT Ứng dụng (AP) - Bước đệm vững chắc cho sự nghiệp kỹ sư phần mềm cao cấp tại Nhật Bản.',
    coverImage: '/blog-it-passport-thumbnail.jpg',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/Shin.png', 
    },
    date: '08/05/2026',
    category: 'Chứng chỉ IT',
    readTime: '25 phút',
    tags: ['AP', 'IT AP', 'Itshiken', 'NhatBan', 'Career'],
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
                        </figure>

                        <div className="p-6 sm:p-10 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                            <p className="mb-6 drop-cap">
                                Chào anh em IT. Nếu đang làm việc hoặc có ý định phát triển sự nghiệp tại các doanh nghiệp, tập đoàn tại Nhật Bản, chắc hẳn anh em đã từng nghe đến hệ thống chuẩn kỹ năng CNTT - ITSS (Information Technology Skill Standards). Trong đó, Kỳ thi Kỹ sư Công nghệ thông tin Ứng dụng (Applied Information Technology Engineer Examination - 応用情報技術者試験, gọi tắt là AP) được xem là "bảo chứng" uy tín nhất cho năng lực của một kỹ sư.
                            </p>
                            <p className="mb-6">
                                AP không đơn thuần là bài test kiểm tra bạn code giỏi cỡ nào. Nó là bài kiểm tra toàn diện để xem bạn có tư duy của một Leader, System Architect hay Project Manager hay không. Tỷ lệ đỗ của AP khá gắt gao, chỉ dao động ở mức 20% - 25%. Tuy nhiên, nếu có chiến thuật đúng đắn, việc chinh phục nó hoàn toàn nằm trong tầm tay.
                            </p>

                            <h2 id="section-1" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xl">1</span>
                                Tại sao lại là AP mà không phải chứng chỉ nào khác?
                            </h2>
                            <p className="mb-4">
                                Việc sở hữu chứng chỉ AP mang lại những đặc quyền cực kỳ rõ ràng, tác động trực tiếp đến thu nhập và cuộc sống tại Nhật:
                            </p>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li><strong>Điểm cộng Visa Vĩnh trú:</strong> Được cộng thẳng 20 điểm vào hồ sơ Visa Nhân lực chất lượng cao (HSP). Đây là cú hích cực lớn giúp rút ngắn thời gian lấy vĩnh trú (PR) xuống chỉ còn từ 1 đến 3 năm.</li>
                                <li><strong>Trợ cấp hàng tháng (Shikaku Teate):</strong> Rất nhiều công ty Nhật có chính sách cộng thêm từ 10,000 đến 30,000 JPY/tháng vào lương cơ bản nếu bạn có bằng AP.</li>
                                <li><strong>Cơ hội thăng tiến:</strong> Đánh dấu sự chuyển mình từ một lập trình viên (Coder/Programmer) sang các vị trí cấp cao hơn như thiết kế hệ thống (SE - System Engineer).</li>
                            </ul>

                            <h2 id="section-2" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 text-xl">2</span>
                                Thể lệ cuộc chơi: Một ngày "đốt não" với 2 bài thi
                            </h2>
                            <p className="mb-6">
                                Kỳ thi AP do IPA tổ chức 2 lần một năm (tháng 4 và tháng 10). Bạn sẽ thi liền 2 bài trong cùng một ngày. Điểm cốt lõi là: Phải đạt tối thiểu 60/100 điểm cho CẢ HAI bài thi. Nếu trượt bài sáng, bài chiều của bạn sẽ không được chấm.
                            </p>

                            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">
                                Trận chiến 1: Bài thi Buổi sáng (午前 - Gozen) - Cuộc chạy nước rút
                            </h3>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li><strong>Thời gian:</strong> 150 phút cho 80 câu trắc nghiệm. Bạn chỉ có chưa tới 2 phút cho mỗi câu.</li>
                                <li><strong>Cấu trúc kiến thức:</strong>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li><strong>Technology (~50 câu):</strong> Cơ sở toán học, thuật toán, kiến trúc máy tính, OS, Network, Database, Security.</li>
                                        <li><strong>Management (~10 câu):</strong> Quản lý dự án (PMBOK), quản lý rủi ro, ITIL.</li>
                                        <li><strong>Strategy (~20 câu):</strong> Chiến lược kinh doanh, kiến trúc doanh nghiệp, kế toán, luật (bản quyền, lao động).</li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-md">
                                <div className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Chiến thuật thực chiến:
                                </div>
                                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                    Đừng cố học thuộc lòng sách giáo khoa. Chìa khóa ở đây là cày Past Papers (đề cũ) vì IPA thường xào lại khoảng 40-50% câu hỏi cũ. Hãy dùng trang web 応用情報技術者試験過去問道場 (AP Siken Kakomon Dojo). Cày nát các đề của 5-7 năm gần nhất đến khi tỷ lệ đúng luôn trên 80% là bạn đã nắm chắc vé qua môn.
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-3">
                                Trận chiến 2: Bài thi Buổi chiều (午後 - Gogo) - Lựa chọn thế mạnh
                            </h3>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Phần thi tự luận ngắn và phân tích Case Study (dài 5-10 trang) trong 150 phút.</li>
                                <li>Có 11 chủ đề. Bạn bắt buộc phải làm <strong>Câu 1: Bảo mật (Information Security)</strong>. Sau đó, chọn làm 4 câu nữa trong số 10 chủ đề còn lại (Chiến lược kinh doanh, Lập trình, Kiến trúc hệ thống, Mạng, Cơ sở dữ liệu, Hệ thống nhúng, Phát triển HTTT, Quản lý dự án, Quản lý dịch vụ, Kiểm toán).</li>
                            </ul>
                            <p className="mb-6">
                                Đối với những anh em đang làm mảng Web Development (ví dụ như MERN stack hay Full-stack), hãy tận dụng tối đa nền tảng kỹ thuật. Đừng "đứng núi này trông núi nọ", hãy chốt sổ luôn các môn thế mạnh từ ở nhà. Lời khuyên là nhắm thẳng vào <strong>Cơ sở dữ liệu (Database)</strong> và <strong>Kiến trúc hệ thống (System Architecture)</strong>.
                            </p>

                            <h2 id="section-3" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 text-xl">3</span>
                                "Phá đảo" môn Database và System Architecture
                            </h2>
                            <p className="mb-6">
                                Đây là hai "mỏ vàng" điểm số nếu bạn đã có kinh nghiệm làm Web.
                            </p>

                            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">
                                Môn Database (データベース): Khi tư duy dữ liệu lên ngôi
                            </h3>
                            <p className="mb-4">
                                AP yêu cầu một tư duy hệ thống khắt khe theo chuẩn Cơ sở dữ liệu quan hệ (RDBMS).
                            </p>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li><strong>Tuyệt chiêu đọc ERD:</strong> Đừng lao vào đọc text ngay. Hãy nhìn lướt sơ đồ Thực thể - Mối quan hệ (ERD) trước. Khi đọc văn bản, gạch chân ngay các cụm từ chỉ số lượng và mối quan hệ (Ví dụ: "Một đơn hàng có thể có nhiều sản phẩm" -&gt; Quan hệ 1-N).</li>
                                <li><strong>Bắt bệnh Chuẩn hóa (正規化 - Seikika):</strong> Đề thi rất thích hỏi về Chuẩn 1, 2 và 3. Hãy nhớ quy tắc: "Bảng này đã phụ thuộc hoàn toàn vào Khóa chính (主キー) chưa? Có bị phụ thuộc bắc cầu không?". Nếu thấy thông tin dư thừa, hãy tách bảng và chỉ định Khóa ngoại (外部キー).</li>
                                <li><strong>"Bắt Keyword" SQL bằng tiếng Nhật:</strong>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>Sắp xếp giảm dần: 降順 (Koujun) = <code>ORDER BY ... DESC</code></li>
                                        <li>Gộp nhóm: グループ化 (Gurupuka) = <code>GROUP BY</code></li>
                                        <li>Loại bỏ trùng lặp: 重複を排除 (Choufuku wo haijo) = <code>DISTINCT</code></li>
                                    </ul>
                                </li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-3">
                                Môn Kiến trúc hệ thống (システムアーキテクチャ): Bài toán tối ưu hóa
                            </h3>
                            <p className="mb-4">
                                Môn này kiểm tra xem anh em có biết cách tính toán sức chịu tải của server, băng thông mạng, hay thiết kế hệ thống dự phòng hay không.
                            </p>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li><strong>Vẽ luồng dữ liệu (Data Flow):</strong> Case Study thường rất dài. Hãy vẽ phác ra nháp các Component: <code>Client -&gt; Load Balancer -&gt; Web Server -&gt; DB Server</code>. Đề bài nói nghẽn ở đâu, đánh dấu "X" ngay chỗ đó.</li>
                                <li><strong>Công thức "nằm lòng":</strong> Bắt buộc thuộc cách tính Hệ số sẵn sàng (Availability - 稼働率).
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>Hệ thống nối tiếp: <code>A × B</code></li>
                                        <li>Hệ thống song song: <code>1 - (1-A) × (1-B)</code></li>
                                    </ul>
                                </li>
                                <li><strong>Từ vựng cứu mạng:</strong>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>Nút thắt cổ chai: ボトルネック (Bottleneck) - Xác định nghẽn do CPU, RAM hay I/O.</li>
                                        <li>Tính khả dụng cao: 高可用性 (High Availability).</li>
                                        <li>Mở rộng hệ thống: スケールアップ (Scale up - Tăng cấu hình 1 máy) vs スケールアウト (Scale out - Tăng số lượng máy).</li>
                                    </ul>
                                </li>
                            </ul>

                            <h2 id="section-4" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 text-xl">4</span>
                                Nỗi ám ảnh mang tên "Tiếng Nhật chuyên ngành"
                            </h2>
                            <p className="mb-4">
                                Kiến thức IT của AP không làm khó được kỹ sư Việt, nhưng rào cản ngôn ngữ thì có. Việc bạn đã thi qua JLPT N3 và đang trong quá trình hướng tới N2 là một nền tảng rất vững chắc. Tuy nhiên, đọc hiểu phân tích hệ thống hoàn toàn khác với đọc hiểu đời sống.
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="flex gap-3">
                                    <Target className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">Tốc độ là sống còn</h4>
                                        <p className="text-base text-slate-600 dark:text-slate-400">Bạn chỉ có 30 phút cho mỗi Case Study. Đừng đọc dịch từng chữ. Hãy dùng kỹ thuật Scanning, tìm cấu trúc: 「～という課題がある」(Có vấn đề là...) hoặc 「～を満たす必要がある」(Cần phải thỏa mãn...). Đây là chìa khóa để nhặt ra ràng buộc (constraint) cho thiết kế.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">Viết tự luận</h4>
                                        <p className="text-base text-slate-600 dark:text-slate-400">Bạn phải viết những câu ngắn (15-40 ký tự) bằng tiếng Nhật để giải thích giải pháp. Hãy tập viết súc tích, dùng đúng cấu trúc thể rút gọn (Thể thông thường / である).</p>
                                    </div>
                                </div>
                            </div>

                            <h2 id="section-5" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300 text-xl">5</span>
                                Lộ trình ôn tập đề xuất (Chiến dịch 4 tháng)
                            </h2>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li><strong>Tháng 1:</strong> Tổng ôn lý thuyết. Đọc cuốn sách "All in One" (オールインワン) để làm quen mặt chữ Hán tự chuyên ngành.</li>
                                <li><strong>Tháng 2:</strong> Cày đề buổi sáng trên Kakomon Dojo. Đặt mục tiêu mỗi ngày 50-100 câu. Sai đâu ghi chú đó.</li>
                                <li><strong>Tháng 3:</strong> Luyện đề buổi chiều. Chọn 4 môn cố định, bấm giờ 30 phút/bài. Tập gạch chân từ khóa và viết câu trả lời.</li>
                                <li><strong>Tháng 4 (Giai đoạn nước rút):</strong> Làm Full Test 2-3 lần (cả sáng lẫn chiều) vào cuối tuần để quen với áp lực ngồi phòng thi liên tục 5 tiếng đồng hồ.</li>
                            </ul>

                            <h2 id="conclusion" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800 scroll-mt-24">
                                Kết luận
                            </h2>
                            <p className="mb-4">
                                Kỳ thi AP thực sự là một thử thách "khó nhằn", đòi hỏi bạn phải cân bằng giữa kiến thức kỹ thuật hệ thống, tư duy quản lý và năng lực xử lý tiếng Nhật. Tuy nhiên, giá trị mà nó mang lại cho con đường sự nghiệp, thu nhập và định cư tại Nhật Bản là hoàn toàn xứng đáng với từng giờ bạn bỏ ra để cày cuốc.
                            </p>
                            <p className="font-medium text-slate-800 dark:text-slate-200">
                                Chúc anh em chân cứng đá mềm và sớm cầm trên tay tấm thẻ chứng chỉ quyền lực này!
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
                                    <a href="#section-1" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">1</span>
                                        Tại sao lại là AP?
                                    </a>
                                </li>
                                <li>
                                    <a href="#section-2" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">2</span>
                                        Thể lệ cuộc chơi
                                    </a>
                                </li>
                                <li>
                                    <a href="#section-3" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 flex items-center justify-center text-xs font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors">3</span>
                                        Giải mã Case Study
                                    </a>
                                </li>
                                <li>
                                    <a href="#section-4" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">4</span>
                                        Tiếng Nhật chuyên ngành
                                    </a>
                                </li>
                                <li>
                                    <a href="#section-5" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300 flex items-center justify-center text-xs font-bold group-hover:bg-pink-600 group-hover:text-white transition-colors">5</span>
                                        Lộ trình ôn tập
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
