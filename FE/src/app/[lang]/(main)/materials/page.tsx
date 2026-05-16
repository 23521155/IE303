import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { Materials } from '@/src/views/Materials';
import type { Metadata } from 'next';
import { BE_URL } from '@/src/utils/constans';
import { cache } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

const getMaterialsCached = cache(async () => {
    try {
        const res = await fetch(`${BE_URL}/api/materials?page=0&size=15`, { next: { revalidate: 3600 } });
        const json = await res.json();
        const data = json?.data;
        return {
            content: data?.content ?? [],
            last: data?.last ?? true,
            totalElements: data?.totalElements ?? 0,
        };
    } catch {
        return { content: [], last: true, totalElements: 0 };
    }
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const t = await getDictionary(lang as Locale);
    const materials = await getMaterialsCached();

    const count = materials.totalElements || materials.content.length;
    const title = `${t.studyMaterials} - ${count}+ tài liệu PDF & Video luyện thi IT`;
    const description = `${t.materialsDesc}. Tải miễn phí ${count}+ tài liệu PDF, video bài giảng luyện thi FE và IT Passport tiếng Việt chuẩn nhất.`;

    return {
        title,
        description,
        keywords: [
            'tài liệu luyện thi IT Passport',
            'tài liệu luyện thi FE',
            'PDF IT Passport tiếng Việt',
            'sách ôn thi FE',
            'tài liệu IT Shiken miễn phí',
            'mindmap IT Passport',
            'bài giảng video FE',
            'sách IT Nhật Bản',
            'tài liệu học IT miễn phí',
            'ôn thi chứng chỉ IT',
        ],
        openGraph: {
            title,
            description,
            url: `${baseUrl}/${lang}/materials`,
            siteName: 'IT Shiken',
            images: {
                url: `${baseUrl}/thumbnail.jpg`,
                width: 1200,
                height: 630,
                alt: 'IT Shiken',
            },
            locale: lang === 'vi' ? 'vi_VN' : lang === 'ja' ? 'ja_JP' : 'en_US',
            type: 'website',
        },
        alternates: {
            canonical: `${baseUrl}/${lang}/materials`,
            languages: {
                'x-default': `${baseUrl}/en/materials`,
                vi: `${baseUrl}/vi/materials`,
                en: `${baseUrl}/en/materials`,
                ja: `${baseUrl}/ja/materials`,
            },
        },
    };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = await getDictionary(lang as Locale);
    const materials = await getMaterialsCached();

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
        ],
    };

    const collectionJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/${lang}/materials#collection`,
        name: `${t.studyMaterials} - ${materials.totalElements}+ tài liệu luyện thi IT`,
        description: `${t.materialsDesc}. Tài liệu PDF và video luyện thi IT.`,
        url: `${baseUrl}/${lang}/materials`,
        inLanguage: lang,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: materials.content.slice(0, 20).map((material: { id: number; title: string }, index: number) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${baseUrl}/${lang}/materials`,
                name: material.title || `Tài liệu ${material.id}`,
            })),
        },
    };

    console.log(materials)
    
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
                    __html: JSON.stringify(collectionJsonLd).replace(/</g, '\\u003c'),
                }}
            />
            <Materials t={t} lang={lang} initialData={materials} />
        </>
    );
}
