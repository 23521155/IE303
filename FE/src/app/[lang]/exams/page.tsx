import { ExamList } from "@/src/views/ExamList";
import { getDictionary } from '@/src/utils/dictionaries';
import type {Locale} from '@/src/utils/i18n'
import { examService } from '@/src/services/examService';
import {notFound} from "next/navigation";
import type { Metadata } from 'next';
import { cache } from 'react';
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';


const getExamsCached = cache(async () => await examService.getAllExams());
const getCategoriesCached = cache(async () => await examService.getAllCategories());


export async function generateMetadata({params}: { params: Promise<{ lang: string }>}) : Promise<Metadata> {
    const { lang } = await  params;
    const t = await getDictionary(lang as Locale)
    const [examsData, categoriesData] = await Promise.all([
        getExamsCached(),
        getCategoriesCached()
    ]);

    if(!examsData || !categoriesData) {
        return {
            title: 'Thư viện đề thi',
            description: 'Đang cập nhật dữ liệu...'
        };
    }
    const title = `${t.examLibrary} - Tổng hợp ${examsData.length}+ đề thi IT`;
    const categoryKeywords = categoriesData
        .map(cat => t[`cat_${cat.id}` as keyof typeof t] || cat.name)
        .slice(0, 8) // Lấy tối đa 8 category nổi bật nhất để tránh description quá dài
        .join(', ');
    const description = `${t.examLibDesc}. Luyện thi các chứng chỉ: ${categoryKeywords}... Cập nhật mới nhất.`;

    const topCategories = categoriesData.slice(0,10).map(cat => cat.name.toLowerCase());
    return {
        title: title,
        description: description,
        keywords: ["luyện thi IT Passport",
            "đề thi IT Passport tiếng Việt",
            "luyện thi FE",
            "đề thi FE tiếng Việt",
            "thi thử IT Passport online",
            "thi thử FE online",
            "chứng chỉ IT Nhật Bản",
            "sát hạch VITEC",
            "giải đề FE có lời giải",
            "từ vựng IT Passport",
            ...topCategories,

        ],
        openGraph: {
            title: title,
            description: description,
            url: `${baseUrl}/${lang}/exams`,
            siteName: "IT Shiken",
            images: {
                url: `/thumbnail.jpg`,
                width: 1200,
                height: 630,
                alt: "IT Shiken",
            },
            locale: lang === 'vi' ? 'vi_VN' : lang === 'ja' ? 'ja_JP' : 'en_US',
            phoneNumbers: "0903571094",
            emails: "nguyenletuanphi910.2019@gmail.com",
            type: "website",
            countryName: "Việt Nam"
        },
        alternates: {
            canonical: `${baseUrl}/${lang}/exams`,
            languages: {
                'x-default': '${baseUrl}/en/exams',
                vi: `${baseUrl}/vi/exams`,
                en: `${baseUrl}/en/exams`,
                ja: `${baseUrl}/ja/exams`,
            },
        },
    };
}
export default async function Page({params}:{params: Promise<{lang: string}>}) {
    const {lang} = await params;
    const t = await getDictionary(lang as Locale)


    const [examsData, categoriesData] = await Promise.all([
        getExamsCached(),
        getCategoriesCached()
    ]);



    if(!examsData || !categoriesData) {
        notFound();
    }


    return <ExamList t={t} lang={lang} examsData={examsData} categoriesData={categoriesData}  />;
}
