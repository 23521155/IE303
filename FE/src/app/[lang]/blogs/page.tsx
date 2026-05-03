import React from 'react';
import { BlogList } from '@/src/views/BlogList';
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';

import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';


const titles = {
    vi: 'Blog IT - Kiến thức & lộ trình học IT',
    en: 'IT Blog - Guides & Learning Path',
    ja: 'ITブログ - 学習ガイド',
}

const descriptions = {
    vi: 'Tổng hợp bài viết về IT Passport, FE và lộ trình học IT dành cho người mới.',
    en: 'Collection of articles about IT Passport, FE exam, and IT learning paths.',
    ja: 'ITパスポートやFE試験に関する記事まとめ。',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    return {
        title: titles[lang as 'vi' | 'en' | 'ja'],
        description: descriptions[lang as 'vi' | 'en' | 'ja'],

        alternates: {
            canonical: `${baseUrl}/${lang}/blogs`,
            languages: {
                vi: `${baseUrl}/vi/blogs`,
                en: `${baseUrl}/en/blogs`,
                ja: `${baseUrl}/ja/blogs`,
            },
        },

        openGraph: {
            title: titles[lang as 'vi' | 'en' | 'ja'],
            description: descriptions[lang as 'vi' | 'en' | 'ja'],
            url: `${baseUrl}/${lang}/blogs`,
            siteName: 'IT Shiken',
            type: 'website',
        },
    }
}

const blogPostsByLang = {
    vi: [
        {
            id: 'ky-thi-it-passport',
            title: 'Kỳ thi IT Passport là gì? Cẩm nang chinh phục chứng chỉ IT Nhật Bản từ A-Z',
            excerpt: 'Từ định nghĩa, cấu trúc đề thi, cách đăng ký đến lộ trình ôn luyện – tất cả trong một bài viết.',
            category: "Chứng chỉ IT",
            readTime: '30 phút',
            coverImage: '/blog-it-passport-thumbnail.jpg',
        },
        {
            id: 'ky-thi-fe',
            title: 'Kỳ thi FE là gì? Giải đáp mọi thắc mắc giúp bạn tự tin chinh phục',
            excerpt: 'Từ định nghĩa, cấu trúc đề thi, cách đăng ký đến lộ trình ôn luyện – tất cả trong một bài viết.',
            category: "Chửng chỉ IT",
            readTime: '30 phút',
            coverImage: '/blog-it-fe-thumbnail.jpg'
        },
    ],

    en: [
        {
            id: 'ky-thi-it-passport',
            title: 'What is IT Passport Exam? Complete Guide from A-Z',
            excerpt: 'Definition, structure, registration, and study roadmap all in one place.',
            category: 'IT Certification',
            readTime: '30 min',
            coverImage: '/blog-it-passport-thumbnail.jpg',
        },
        {
            id: 'ky-thi-fe',
            title: 'What is FE Exam? Everything You Need to Know',
            excerpt: 'Full explanation of FE exam structure and preparation strategy.',
            category: 'IT Certification',
            readTime: '30 min',
            coverImage: '/blog-it-fe-thumbnail.jpg'
        },
    ],

    ja: [
        {
            id: 'ky-thi-it-passport',
            title: 'ITパスポート試験とは？完全ガイド',
            excerpt: '定義・試験構造・勉強方法をまとめて解説。',
            category: 'IT資格',
            readTime: '30分',
            coverImage: '/blog-it-passport-thumbnail.jpg',
        },
        {
            id: 'ky-thi-fe',
            title: '基本情報技術者試験（FE）とは？完全解説',
            excerpt: '試験内容から対策まで徹底解説。',
            category: 'IT資格',
            readTime: '30分',
            coverImage: '/blog-it-fe-thumbnail.jpg'
        },
    ],
}

const commonFields = {
    author: 'Nguyễn Lê Tuấn Phi',
    date: '2026-05-01',
    type: 'blogs',
}

export default async function BlogPage({params}:{params:Promise<{lang: string}> }) {
    const {lang} = await params;
    const t = await getDictionary(lang as Locale)

    const blogPosts = blogPostsByLang[lang as 'vi' | 'en' | 'ja'].map(post => ({
        ...post,
        ...commonFields,
    }))


    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/${lang}/blogs#collection`,
        name: titles[lang as 'vi' | 'en' | 'ja'],
        url: `${baseUrl}/${lang}/blogs`,

        inLanguage: lang,

        mainEntity: {
            '@type': 'ItemList',
            itemListElement: blogPosts.map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${baseUrl}/${lang}/blogs/${post.id}`,
                name: post.title,
            })),
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
                }}
            />
            <BlogList t={t} lang={lang} blogPosts={blogPosts} />
        </>
    );
}
