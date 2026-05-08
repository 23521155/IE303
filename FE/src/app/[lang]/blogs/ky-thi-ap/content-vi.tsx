import Image from 'next/image';
import { Bookmark, Calendar, Clock, Share2 } from 'lucide-react';
import React from 'react';

const postDetail = {
    id: 'ky-thi-ap',
    title: 'Kỳ thi AP (Applied Information Technology Engineer) là gì?',
    excerpt: 'Chứng chỉ Kỹ sư CNTT Ứng dụng (AP) - Bước đệm vững chắc cho sự nghiệp kỹ sư phần mềm cao cấp tại Nhật Bản.',
    coverImage: '/blog-it-passport-thumbnail.jpg',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
    },
    date: '08/05/2026',
    category: 'Chứng chỉ IT',
    readTime: '25 phút',
    tags: ['AP', 'IT AP', 'Itshiken', 'NhatBan', 'Career'],
};

export default function ContentVi() {
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
                    alt={postDetail.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto max-h-[500px] object-cover rounded-md shadow-sm"
                />
            </div>

            {/* CONTENT */}
            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                <p className="mb-6">
                    Nếu bạn đã vượt qua FE, bước tiếp theo trong nấc thang sự nghiệp kỹ sư phần mềm tại Nhật Bản chính là chứng chỉ AP (Kỹ sư CNTT Ứng dụng).
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    1. AP (Ứng dụng) khác gì so với FE (Cơ bản)?
                </h2>
                <p className="mb-4">
                    Trong khi FE đánh giá khả năng "viết code và hiểu hệ thống", thì AP đánh giá khả năng "thiết kế hệ thống và quản lý dự án".
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Không còn các bài thi yêu cầu viết thuật toán cơ bản bằng C, Java hay Python.</li>
                    <li>Tập trung mạnh vào thiết kế cơ sở dữ liệu, kiến trúc hệ thống, và chiến lược kinh doanh.</li>
                    <li>Đề thi chiều là các câu hỏi tình huống (Case study) dạng tự luận ngắn, yêu cầu phân tích vấn đề và đưa ra giải pháp.</li>
                </ul>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    2. Lợi ích khi sở hữu chứng chỉ AP
                </h2>
                <p className="mb-4">
                    AP là một chứng chỉ khó, nhưng phần thưởng mang lại rất xứng đáng:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Khẳng định trình độ Senior:</strong> Rất nhiều công ty yêu cầu AP để thăng tiến lên vị trí Quản lý dự án (Project Manager) hoặc Leader.</li>
                    <li><strong>Cộng điểm định cư:</strong> AP mang lại điểm số đáng kể khi bạn nộp hồ sơ xin visa Kỹ năng chất lượng cao (Highly Skilled Professional) tại Nhật.</li>
                    <li><strong>Miễn thi phần chung:</strong> Có AP sẽ được miễn thi buổi sáng phần chung cho các kỳ thi cấp độ chuyên gia (Level 4) như Kiến trúc sư hệ thống, Chuyên gia bảo mật... trong vòng 2 năm.</li>
                </ul>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    3. Chiến lược ôn thi AP
                </h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Buổi sáng (Trắc nghiệm):</strong> Cần giải thật nhiều đề cũ. Tỷ lệ câu hỏi lặp lại từ các kỳ trước khá cao.</li>
                    <li><strong>Buổi chiều (Tự luận):</strong> Bạn phải chọn 4/10 chủ đề. Hãy chọn chiến lược ôn tập 5-6 chủ đề thế mạnh của mình (ví dụ: Bảo mật, Cơ sở dữ liệu, Lập trình, Hệ thống mạng, Quản lý dự án) để đảm bảo an toàn nếu đề một môn nào đó quá khó.</li>
                </ul>
            </article>
        </main>
    );
}
