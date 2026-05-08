import React from 'react';
import { Metadata } from 'next';
import ContentVi from './content-vi';
import ContentEn from './content-en';
import ContentJa from './content-ja';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

const commonData = {
    id: 'lo-trinh-hoc-it',
    coverImage: '/blog-it-fe-thumbnail.jpg',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
        url: 'https://www.facebook.com/Fi.is.me.hello?locale=vi_VN',
    },
    datePublished: '2026-05-08T08:00:00+07:00',
    dateModified: '2026-05-08T08:00:00+07:00',
};

const localizedData = {
    vi: {
        title: 'Lộ trình học IT cơ bản cho người mới bắt đầu (IT Passport & FE)',
        excerpt: 'Hướng dẫn chi tiết từng bước để bước chân vào ngành IT bắt đầu từ các chứng chỉ cơ bản.',
        category: 'Lộ trình học',
        tags: ['IT', 'Roadmap', 'IT Passport', 'FE', 'Career'],
        breadcrumbHome: 'Trang chủ',
        breadcrumbBlog: 'Bài viết',
        locale: 'vi_VN',
        faqs: [
            {
                q: 'Nên bắt đầu từ đâu nếu tôi không biết gì về IT?',
                a: 'Bạn nên bắt đầu với chứng chỉ IT Passport. Nó cung cấp nền tảng kiến thức cơ bản về cả IT và quản trị doanh nghiệp.',
            },
            {
                q: 'Sau khi lấy IT Passport, tôi nên học gì tiếp theo?',
                a: 'Chứng chỉ FE (Fundamental Information Technology Engineer) là bước đi tự nhiên tiếp theo. Nó đi sâu hơn vào thuật toán, lập trình và hệ thống.',
            },
            {
                q: 'Lộ trình này mất khoảng bao lâu?',
                a: 'Trung bình, người mới sẽ mất khoảng 2-3 tháng cho IT Passport và 3-6 tháng cho FE nếu học đều đặn.',
            }
        ],
    },
    en: {
        title: 'Basic IT Learning Path for Beginners (IT Passport & FE)',
        excerpt: 'A detailed step-by-step guide to entering the IT industry starting with fundamental certifications.',
        category: 'Learning Path',
        tags: ['IT', 'Roadmap', 'IT Passport', 'FE', 'Career'],
        breadcrumbHome: 'Home',
        breadcrumbBlog: 'Blogs',
        locale: 'en_US',
        faqs: [
            {
                q: 'Where should I start if I have no IT background?',
                a: 'You should start with the IT Passport exam. It provides foundational knowledge in IT and business management.',
            },
            {
                q: 'What comes after IT Passport?',
                a: 'The FE (Fundamental Information Technology Engineer) exam is the natural next step, diving deeper into algorithms and programming.',
            }
        ],
    },
    ja: {
        title: '初心者のためのIT学習ロードマップ（ITパスポート＆FE）',
        excerpt: '基本的な資格から始めて、IT業界に参入するための詳細なステップバイステップガイド。',
        category: '学習ロードマップ',
        tags: ['IT', 'Roadmap', 'IT Passport', 'FE', 'Career'],
        breadcrumbHome: 'ホーム',
        breadcrumbBlog: 'ブログ',
        locale: 'ja_JP',
        faqs: [
            {
                q: 'ITの知識がない場合、どこから始めるべきですか？',
                a: 'ITパスポート試験から始めることをお勧めします。ITと企業経営の基礎知識を提供します。',
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
