import React from 'react';
import { Metadata } from 'next';
import ContentVi from './content-vi';
import ContentEn from './content-en';
import ContentJa from './content-ja';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

const commonData = {
    id: 'chon-truong-it-tieng-nhat',
    coverImage: '/uni2insight-real.png',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/Shin.png',
        url: 'https://www.facebook.com/Fi.is.me.hello?locale=vi_VN',
    },
    datePublished: '2026-05-20T17:00:00+07:00',
    dateModified: '2026-05-20T17:00:00+07:00',
};

const localizedData = {
    vi: {
        title: 'Bạn Muốn Chọn Trường Để Vừa Học IT Vừa Học Tiếng Nhật? Hãy Ghé Qua Website Này!',
        excerpt: 'Kỷ nguyên số đưa IT kết hợp Tiếng Nhật thành tấm vé vàng sự nghiệp. Hãy khám phá Uni2Insight để đọc review thực tế từ cựu sinh viên và chuẩn bị hành trang lập trình cùng IT Shiken.',
        category: 'Định hướng',
        tags: ['IT Tiếng Nhật', 'Chọn trường Đại học', 'Uni2Insight', 'IT Shiken', 'Kỹ sư cầu nối', 'BrSE'],
        breadcrumbHome: 'Trang chủ',
        breadcrumbBlog: 'Bài viết',
        locale: 'vi_VN',
        faqs: [
            {
                q: 'Uni2Insight là gì và có đáng tin cậy không?',
                a: 'Uni2Insight là nền tảng tổng hợp các bài review về các trường Đại học, Cao đẳng tại Việt Nam. Thông tin ở đây đến từ đánh giá ẩn danh của sinh viên thực tế nên đảm bảo tính khách quan, đa chiều.',
            },
            {
                q: 'Học IT và tiếng Nhật thì có bắt buộc phải thi chứng chỉ quốc gia không?',
                a: 'Rất cần thiết. Để làm việc trong doanh nghiệp Nhật Bản hoặc đi onsite, bạn cần có chứng chỉ IT chuẩn quốc gia Nhật Bản (như IT Passport, FE, AP) và chứng chỉ tiếng Nhật (JLPT N3-N2).',
            },
            {
                q: 'Làm thế nào để ôn tập tốt chứng chỉ IT Nhật Bản?',
                a: 'Bạn có thể truy cập website IT Shiken để làm đề thi thử miễn phí, xem giải thích chi tiết và theo dõi tiến trình học tập của mình.',
            }
        ],
    },
    en: {
        title: 'Choosing a School for IT and Japanese Studies: Check Uni2Insight & IT Shiken',
        excerpt: 'Discover how to choose the best universities for combined IT and Japanese studies in Vietnam using real student reviews on Uni2Insight.',
        category: 'Career Guide',
        tags: ['IT Japanese', 'University Reviews', 'Uni2Insight', 'IT Shiken', 'BrSE', 'Career Path'],
        breadcrumbHome: 'Home',
        breadcrumbBlog: 'Blogs',
        locale: 'en_US',
        faqs: [
            {
                q: 'What is Uni2Insight?',
                a: 'Uni2Insight is a platform aggregating reviews of universities and colleges in Vietnam from real students, offering unbiased insights.',
            },
            {
                q: 'Is IT Shiken free to use?',
                a: 'Yes, IT Shiken provides free mock exams, detailed explanations, and learning progress tracking for IT Passport and FE exams.',
            }
        ],
    },
    ja: {
        title: 'ITと日本語を両方学べる大学の選び方：Uni2InsightとIT Shikenを活用しよう',
        excerpt: 'ベトナムでITと日本語を同時に学べる最適な大学を選ぶ方法。Uni2Insightでの現役学生によるリアルなレビューと、IT Shikenでの資格対策について紹介。',
        category: 'キャリアガイド',
        tags: ['IT日本語', '大学レビュー', 'Uni2Insight', 'IT Shiken', 'ブリッジSE', 'キャリアパス'],
        breadcrumbHome: 'ホーム',
        breadcrumbBlog: 'ブログ',
        locale: 'ja_JP',
        faqs: [
            {
                q: 'Uni2Insightとは何ですか？',
                a: 'Uni2Insightは、ベトナムの大学や専門学校に関する現役学生や卒業生のリアルな口コミ・レビューをまとめたプラットフォームです。',
            },
            {
                q: 'IT Shikenは無料で利用できますか？',
                a: 'はい、IT ShikenはITパスポートや基本情報技術者（FE）試験の模擬試験、詳細な解説、学習進捗管理を無料で提供しています。',
            }
        ],
    },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const currentLang = (lang as keyof typeof localizedData) || 'vi';
    const data = localizedData[currentLang];

    return {
        title: data.title,
        description: data.excerpt,
        keywords: data.tags,
        authors: [{ name: commonData.author.name }],
        alternates: {
            canonical: `${baseUrl}/${lang}/blogs/${commonData.id}`,
            languages: {
                vi: `${baseUrl}/vi/blogs/${commonData.id}`,
                en: `${baseUrl}/en/blogs/${commonData.id}`,
                ja: `${baseUrl}/ja/blogs/${commonData.id}`,
            },
        },
        openGraph: {
            title: data.title,
            description: data.excerpt,
            url: `${baseUrl}/${lang}/blogs/${commonData.id}`,
            siteName: 'ITShiken',
            images: [
                {
                    url: `${baseUrl}${commonData.coverImage}`,
                    width: 1200,
                    height: 630,
                    alt: data.title,
                },
            ],
            locale: data.locale,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: data.excerpt,
            images: [`${baseUrl}${commonData.coverImage}`],
        },
    };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const currentLang = (lang as keyof typeof localizedData) || 'vi';
    const data = localizedData[currentLang];

    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.excerpt,
        image: `${baseUrl}${commonData.coverImage}`,
        author: {
            '@type': 'Person',
            name: commonData.author.name,
            url: commonData.author.url,
        },
        publisher: {
            '@type': 'Organization',
            name: 'IT Shiken',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/itShikenLogo.png`,
            },
        },
        datePublished: commonData.datePublished,
        dateModified: commonData.dateModified,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/${lang}/blogs/${commonData.id}`,
        },
        articleSection: data.category,
        keywords: data.tags.join(', '),
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
            },
        })),
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: data.breadcrumbHome,
                item: `${baseUrl}/${lang}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: data.breadcrumbBlog,
                item: `${baseUrl}/${lang}/blogs`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: data.title,
                item: `${baseUrl}/${lang}/blogs/${commonData.id}`,
            },
        ],
    };

    return (
        <>
            <script dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd).replace(/</g, '\\u003c') }} type="application/ld+json" />
            <script dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} type="application/ld+json" />
            <script dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }} type="application/ld+json" />
            {currentLang === 'vi' ? <ContentVi /> : currentLang === 'en' ? <ContentEn /> : <ContentJa />}
        </>
    );
}
