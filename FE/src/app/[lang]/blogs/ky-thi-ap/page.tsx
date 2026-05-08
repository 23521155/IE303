import React from 'react';
import { Metadata } from 'next';
import ContentVi from './content-vi';
import ContentEn from './content-en';
import ContentJa from './content-ja';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

const commonData = {
    id: 'ky-thi-ap',
    coverImage: '/blog-it-passport-thumbnail.jpg',
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
        title: 'Kỳ thi AP (Applied Information Technology Engineer) là gì?',
        excerpt: 'Chứng chỉ Kỹ sư CNTT Ứng dụng (AP) - Bước đệm vững chắc cho sự nghiệp kỹ sư phần mềm cao cấp tại Nhật Bản.',
        category: 'Chứng chỉ IT',
        tags: ['AP', 'IT AP', 'Itshiken', 'NhatBan', 'Career'],
        breadcrumbHome: 'Trang chủ',
        breadcrumbBlog: 'Bài viết',
        locale: 'vi_VN',
        faqs: [
            {
                q: 'AP khó hơn FE nhiều không?',
                a: 'AP (Ứng dụng) khó hơn FE (Cơ bản) đáng kể. Nó đòi hỏi bạn không chỉ hiểu về công nghệ mà còn phải biết áp dụng vào thực tế quản lý và chiến lược.',
            },
            {
                q: 'Ai nên thi AP?',
                a: 'Những người đã có kinh nghiệm làm việc IT từ 2-4 năm, muốn thăng tiến lên các vị trí Senior hoặc Project Manager tại các công ty Nhật.',
            }
        ],
    },
    en: {
        title: 'What is AP (Applied Information Technology Engineer) Exam?',
        excerpt: 'AP Certification - A solid stepping stone for your senior software engineering career in Japan.',
        category: 'IT Certification',
        tags: ['AP', 'IT AP', 'Itshiken', 'Japan', 'Career'],
        breadcrumbHome: 'Home',
        breadcrumbBlog: 'Blogs',
        locale: 'en_US',
        faqs: [
            {
                q: 'Is AP much harder than FE?',
                a: 'AP (Applied) is significantly harder than FE (Fundamental). It requires not only understanding technology but also applying it to management and strategy.',
            }
        ],
    },
    ja: {
        title: '応用情報技術者試験（AP）とは？',
        excerpt: 'AP資格 - 日本のシニアソフトウェアエンジニアのキャリアへの確かな足がかり。',
        category: 'IT資格',
        tags: ['AP', '応用情報技術者試験', 'Itshiken', '日本', 'キャリア'],
        breadcrumbHome: 'ホーム',
        breadcrumbBlog: 'ブログ',
        locale: 'ja_JP',
        faqs: [
            {
                q: 'APはFEよりもずっと難しいですか？',
                a: 'AP（応用）はFE（基本）よりもかなり難しいです。技術を理解するだけでなく、管理や戦略に適用することも求められます。',
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
