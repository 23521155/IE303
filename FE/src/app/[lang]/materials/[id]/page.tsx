import type { Metadata } from 'next';
import type { Locale } from '@/src/utils/i18n';
import { getDictionary } from '@/src/utils/dictionaries';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { BE_URL } from '@/src/utils/constans';
import { MaterialDetail } from '@/src/views/MaterialDetail';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

type Material = {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    description: string;
    fileUrl: string;
    type: string;
    createdAt: string;
};

const getMaterialCached = cache(async (id: string): Promise<Material | null> => {
    try {
        const res = await fetch(`${BE_URL}/api/materials/${id}`, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        const json = await res.json();
        return json?.data ?? null;
    } catch {
        return null;
    }
});

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
    const { lang, id } = await params;
    const material = await getMaterialCached(id);

    if (!material) return { title: 'Không tìm thấy tài liệu' };

    const title = `${material.title} | IT Shiken`;
    const description = material.description
        ? `${material.description}. Tải miễn phí tài liệu ${material.category} tại IT Shiken.`
        : `Tải miễn phí tài liệu ${material.title} - ${material.category}. Luyện thi FE và IT Passport tiếng Việt.`;

    return {
        title,
        description,
        keywords: [
            material.title,
            material.category,
            'tài liệu luyện thi IT Passport',
            'tài liệu luyện thi FE',
            'PDF IT Passport tiếng Việt',
            'sách ôn thi FE',
            'tài liệu IT Shiken miễn phí',
        ],
        openGraph: {
            title,
            description,
            url: `${baseUrl}/${lang}/materials/${id}`,
            siteName: 'IT Shiken',
            images: {
                url: material.imageUrl || `${baseUrl}/thumbnail.jpg`,
                width: 1200,
                height: 630,
                alt: material.title,
            },
            locale: lang === 'vi' ? 'vi_VN' : lang === 'ja' ? 'ja_JP' : 'en_US',
            type: 'article',
        },
        alternates: {
            canonical: `${baseUrl}/${lang}/materials/${id}`,
            languages: {
                'x-default': `${baseUrl}/en/materials/${id}`,
                vi: `${baseUrl}/vi/materials/${id}`,
                en: `${baseUrl}/en/materials/${id}`,
                ja: `${baseUrl}/ja/materials/${id}`,
            },
        },
    };
}

export default async function Page({ params }: { params: Promise<{ lang: string; id: string }> }) {
    const { lang, id } = await params;
    const [material, t] = await Promise.all([getMaterialCached(id), getDictionary(lang as Locale)]);

    if (!material) notFound();

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: lang === 'vi' ? 'Trang chủ' : lang === 'ja' ? 'ホーム' : 'Home',
                item: `${baseUrl}/${lang}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: t.studyMaterials,
                item: `${baseUrl}/${lang}/materials`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: material.title,
                item: `${baseUrl}/${lang}/materials/${id}`,
            },
        ],
    };

    const documentJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: material.title,
        description: material.description || `Tài liệu ${material.category} - ${material.title}`,
        url: `${baseUrl}/${lang}/materials/${id}`,
        learningResourceType: material.type === 'pdf' ? 'Reading' : 'Video',
        educationalLevel: 'Professional',
        fileFormat: material.type === 'pdf' ? 'application/pdf' : 'video',
        image: material.imageUrl || `${baseUrl}/thumbnail.jpg`,
        datePublished: material.createdAt,
        inLanguage: lang,
        author: {
            '@type': 'Organization',
            name: 'IT Shiken',
            url: baseUrl,
        },
        publisher: {
            '@type': 'Organization',
            name: 'IT Shiken',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/itShikenLogo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/${lang}/materials/${id}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(documentJsonLd).replace(/</g, '\\u003c'),
                }}
            />
            <MaterialDetail material={material} t={t} lang={lang} />
        </>
    );
}
