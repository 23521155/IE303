import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { Materials } from '@/src/views/Materials';
import { Metadata } from 'next';
import { BE_URL } from '@/src/utils/constans';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

export async function generateMetadata({params}: { params: Promise<{ lang: string }>}) : Promise<Metadata> {
    const { lang } = await params;

    return {
        title: 'Tài liệu ôn thi FE & IT Passport chuẩn nhất',
        description: 'Kho tài liệu PDF luyện thi FE và IT Passport tiếng Việt cập nhật mới nhất. Sách ôn thi, từ vựng chuyên ngành, sơ đồ tư duy Mindmap giúp bạn học hiệu quả.',
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

export default async function Page({params}:{params:Promise<{lang: string}> }) {
    const {lang} = await params;
    const t = await getDictionary(lang as Locale);
    
    let url = `${BE_URL}/api/materials`;
    let materials = [];
    try {
        const response = await fetch(url);
        const data = await response.json();
        materials = data?.content || [];
    } catch (error) {
        console.error("Failed to fetch materials:", error);
    }

    return <Materials t={t} lang={lang} materials={materials} />;
}
