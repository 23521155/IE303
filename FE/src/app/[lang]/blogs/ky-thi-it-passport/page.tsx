import React from 'react';
import { Metadata } from 'next';
import ContentVi from '@/src/app/[lang]/blogs/ky-thi-it-passport/content-vi';
import ContentEn from '@/src/app/[lang]/blogs/ky-thi-it-passport/content-en';
import ContentJa from '@/src/app/[lang]/blogs/ky-thi-it-passport/content-ja';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

const commonData = {
    id: 'ky-thi-it-passport',
    coverImage: '/blog-it-passport-thumbnail.jpg',
    author: {
        name: 'Nguyễn Lê Tuấn Phi',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
    },
    datePublished: '2026-05-01',
    dateModified: '2026-05-01',
};

const localizedData = {
    vi: {
        title: 'Kỳ thi IT Passport là gì? Cẩm nang chinh phục chứng chỉ IT Nhật Bản từ A-Z',
        excerpt: 'Từ định nghĩa, cấu trúc đề thi, cách đăng ký đến lộ trình ôn luyện – tất cả trong một bài viết.',
        category: 'Chứng chỉ IT',
        tags: ['ITPassport', 'Itshiken', 'NhatBan', 'Career'],
        breadcrumbHome: 'Trang chủ',
        breadcrumbBlog: 'Bài viết',
        locale: 'vi_VN',
        faqs: [
            {
                q: 'IT Passport khác gì so với chứng chỉ FE?',
                a:
                    'IT Passport là level 1 – level cơ bản nhất, dành cho mọi đối tượng kể cả non-IT, tập trung vào kiến thức tổng quát. FE (Fundamental IT Engineer) là level 2, khó hơn và thiên về kỹ thuật chuyên sâu.',
            },
            {
                q: 'Chứng chỉ IT Passport có giá trị được bao lâu?',
                a:
                    'Vĩnh viễn. Không như nhiều chứng chỉ khác cần gia hạn, IT Passport một khi đã đậu là có giá trị mãi mãi.',
            },
            {
                q: 'Người không biết tiếng Nhật có thi được không?',
                a: 'Hoàn toàn được. Tại Việt Nam, đề thi có bản dịch tiếng Việt đi kèm nên không yêu cầu tiếng Nhật.',
            },
            {
                q: 'Tỷ lệ đậu của kỳ thi IT Passport là bao nhiêu?',
                a: 'Theo số liệu từ IPA, tỷ lệ đậu của kỳ thi IT Passport ở Nhật vào khoảng 52%.',
            },
        ],
    },
    en: {
        title: 'What is IT Passport Exam? Complete Guide from A-Z',
        excerpt: 'Definition, structure, registration, and study roadmap all in one place.',
        category: 'IT Certification',
        tags: ['ITPassport', 'Itshiken', 'Japan', 'Career'],
        breadcrumbHome: 'Home',
        breadcrumbBlog: 'Blogs',
        locale: 'en_US',
        faqs: [
            {
                q: 'How is IT Passport different from the FE certificate?',
                a:
                    'IT Passport is level 1, the most basic level for all audiences including non-IT, focusing on general knowledge. FE (Fundamental IT Engineer) is level 2, harder and more technically focused.',
            },
            {
                q: 'How long is the IT Passport certificate valid for?',
                a:
                    'Lifetime. Unlike many other certificates that need renewing, IT Passport is valid forever once passed.',
            },
            {
                q: "Can someone who doesn't know Japanese take the exam?",
                a: 'Absolutely. In Vietnam, the exam comes with a Vietnamese translation, so Japanese is not required.',
            },
            {
                q: 'What is the pass rate of the IT Passport exam?',
                a: 'According to data from IPA, the pass rate for the IT Passport exam in Japan is about 52%.',
            },
        ],
    },
    ja: {
        title: 'ITパスポート試験とは？完全ガイド',
        excerpt: '定義・試験構造・勉強方法をまとめて解説。',
        category: 'IT資格',
        tags: ['ITパスポート', 'Itshiken', '日本', 'キャリア'],
        breadcrumbHome: 'ホーム',
        breadcrumbBlog: 'ブログ',
        locale: 'ja_JP',
        faqs: [
            {
                q: 'ITパスポートはFE資格とどう違いますか？',
                a:
                    'ITパスポートはレベル1であり、非ITを含むすべての対象者に向けた最も基本的なレベルで、一般的な知識に焦点を当てています。FE（基本情報技術者）はレベル2で、より技術的です。',
            },
            {
                q: 'ITパスポート資格の有効期間はどのくらいですか？',
                a: '永久です。更新が必要な他の多くの資格とは異なり、ITパスポートは一度合格すれば永遠に有効です。',
            },
            {
                q: '日本語が分からなくても受験できますか？',
                a:
                    '全く問題ありません。ベトナムでは、試験にはベトナム語の翻訳が付属しているため、日本語は必須ではありません。',
            },
            {
                q: 'ITパスポート試験の合格率はどのくらいですか？',
                a: 'IPAのデータによると、日本でのITパスポート試験の合格率は約52％です。',
            },
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

    // Khởi tạo JSON-LD động theo ngôn ngữ
    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.excerpt,
        image: `${baseUrl}${commonData.coverImage}`,
        author: {
            '@type': 'Person',
            name: commonData.author.name,
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogJsonLd).replace(/</g, '\\u003c'),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
                }}
            />

            {/* RENDER NỘI DUNG TƯƠNG ỨNG */}
            {currentLang === 'vi' ? <ContentVi /> : currentLang === 'en' ? <ContentEn /> : <ContentJa />}
        </>
    );
}
