import { MetadataRoute } from 'next';
import { examService } from '@/src/services/examService';

// 1. Thêm fallback để chống lỗi lúc build
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const lastModified = new Date();

    const routes = [
        { path: '', priority: 1.0 },
        { path: 'exams', priority: 0.9 },
        { path: 'materials', priority: 0.8 },
        { path: 'flashcards', priority: 0.7 },
        { path: 'blogs', priority: 0.9 },
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
                lastModified,
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

    return sitemapEntries;
}
