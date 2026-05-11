import { MetadataRoute } from 'next';
import { examService } from '@/src/services/examService';
import { BE_URL } from '@/src/utils/constans';

// 1. Thêm fallback để chống lỗi lúc build
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

async function getMaterialsLastModified(): Promise<Date> {
    try {
        const res = await fetch(`${BE_URL}/api/materials?size=200`, { next: { revalidate: 3600 } });
        const json = await res.json();
        const content: { createdAt?: string }[] = json?.data?.content ?? [];
        const dates = content.map((m) => new Date(m.createdAt ?? '')).filter((d) => !isNaN(d.getTime()));
        if (dates.length > 0) return new Date(Math.max(...dates.map((d) => d.getTime())));
    } catch {}
    return new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const lastModified = new Date();
    const materialsLastModified = await getMaterialsLastModified();

    const routes = [
        { path: '', priority: 1.0, lastMod: lastModified },
        { path: 'exams', priority: 0.9, lastMod: lastModified },
        { path: 'materials', priority: 0.8, lastMod: materialsLastModified },
        { path: 'flashcards', priority: 0.7, lastMod: lastModified },
    ];

    const locales = ['vi', 'en', 'ja'];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    routes.forEach((route) => {
        // 2. Xử lý path: Trang chủ rỗng thì không thêm '/', trang con thì thêm '/'
        const cleanPath = route.path ? `/${route.path}` : '';

        locales.forEach((locale) => {
            sitemapEntries.push({
                // 3. Nối chuỗi sạch sẽ
                url: `${baseUrl}/${locale}${cleanPath}`,
                lastModified: route.lastMod,
                changeFrequency: 'weekly',
                priority: route.priority,
                alternates: {
                    languages: {
                        'x-default': `${baseUrl}/en${cleanPath}`,
                        vi: `${baseUrl}/vi${cleanPath}`,
                        en: `${baseUrl}/en${cleanPath}`,
                        ja: `${baseUrl}/ja${cleanPath}`,
                    },
                },
            });
        });
    });

    const exams = await examService.getAllExams();
    const examIds: string[] = exams.map((exam) => exam?.id).filter(Boolean) as string[];

    locales.forEach((locale) => {
        examIds.forEach((examId) => {
            const cleanPath = `/exams/${examId}`;

            sitemapEntries.push({
                url: `${baseUrl}/${locale}${cleanPath}`,
                lastModified,
                changeFrequency: 'weekly',
                priority: 0.8,
                alternates: {
                    languages: {
                        'x-default': `${baseUrl}/en${cleanPath}`,
                        vi: `${baseUrl}/vi${cleanPath}`,
                        en: `${baseUrl}/en${cleanPath}`,
                        ja: `${baseUrl}/ja${cleanPath}`,
                    },
                },
            });
        });
    });

    try {
        const res = await fetch(`${BE_URL}/api/materials?size=200`, { next: { revalidate: 3600 } });
        const json = await res.json();
        const materialItems: { id: number; createdAt?: string }[] = json?.data?.content ?? [];
        locales.forEach((locale) => {
            materialItems.forEach((material) => {
                const cleanPath = `/materials/${material.id}`;
                sitemapEntries.push({
                    url: `${baseUrl}/${locale}${cleanPath}`,
                    lastModified: material.createdAt ? new Date(material.createdAt) : lastModified,
                    changeFrequency: 'monthly',
                    priority: 0.7,
                    alternates: {
                        languages: {
                            'x-default': `${baseUrl}/en${cleanPath}`,
                            vi: `${baseUrl}/vi${cleanPath}`,
                            en: `${baseUrl}/en${cleanPath}`,
                            ja: `${baseUrl}/ja${cleanPath}`,
                        },
                    },
                });
            });
        });
    } catch {}

    const blogIds = ['ky-thi-it-passport', 'ky-thi-fe'];

    locales.forEach((locale) => {
        blogIds.forEach((blogId) => {
            const cleanPath = `/blogs/${blogId}`;

            sitemapEntries.push({
                url: `${baseUrl}/${locale}${cleanPath}`,
                lastModified,
                changeFrequency: 'weekly',
                priority: 0.9,
                alternates: {
                    languages: {
                        'x-default': `${baseUrl}/en${cleanPath}`,
                        vi: `${baseUrl}/vi${cleanPath}`,
                        en: `${baseUrl}/en${cleanPath}`,
                        ja: `${baseUrl}/ja${cleanPath}`,
                    },
                },
            });
        });
    });
    return sitemapEntries;
}
