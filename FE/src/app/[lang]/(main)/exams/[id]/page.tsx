import { ExamDetail } from '@/src/views/ExamDetail';
import { Exam, examService } from '@/src/services/examService';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import type { Metadata } from 'next';
import { cache } from 'react';
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

const getExamCached = cache(async (id: string) => await  examService.getExamById(id))


export async function generateMetadata({ params }: { params: Promise<{ lang: string; id: string }> }) : Promise<Metadata> {
    const { id, lang } = await params;
    const exam: Exam | null = await getExamCached(id as string);

    if (!exam) return { title: 'Không tìm thấy đề thi' };

    // Giả sử bạn lấy tiêu đề theo ngôn ngữ mặc định hoặc logic nào đó
    const examTitle = typeof exam.title === 'string' ? exam.title : exam.title[lang as Locale];
    const examDesc = typeof exam.description === 'string' ? exam.description : exam.description[lang as Locale];
    const categoryName = exam.category?.name || '';

    const ogImageUrl = exam.image.startsWith('http') ? exam.image : `${baseUrl}${exam.image}`;
    return {
        title: examTitle,
        description: examDesc,
        keywords: [
            "luyện thi IT Passport",
            "đề thi IT Passport tiếng Việt",
            "luyện thi FE",
            "đề thi FE tiếng Việt",
            "thi thử IT Passport online",
            "thi thử FE online",
            "chứng chỉ IT Nhật Bản",
            "sát hạch VITEC",
            "giải đề FE có lời giải",
            "từ vựng IT Passport",
            categoryName,
            examTitle
        ],
        openGraph: {
            title: examTitle,
            description: examDesc,
            url: `${baseUrl}/${lang}/exams/${id}`,
            siteName: "IT Shiken",
            images: {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: examTitle,
            },
            locale: lang === 'vi' ? 'vi_VN' : lang === 'ja' ? 'ja_JP' : 'en_US',
            type: "article",
            countryName: "Việt Nam"
        },
        alternates: {
            canonical: `${baseUrl}/${lang}/exams/${id}`,
            languages: {
                'x-default': `${baseUrl}/en/exams/${id}`,
                vi: `${baseUrl}/vi/exams/${id}`,
                en: `${baseUrl}/en/exams/${id}`,
                ja: `${baseUrl}/ja/exams/${id}`,
            },
        },
    };
}

export default async function Page({ params }: { params: Promise<{ lang: string; id: string }> }) {
    const { id, lang } = await params;

    const [examData, t] = await Promise.all([
        getExamCached(id as string),
        getDictionary(lang as Locale)
    ]);

    if (!examData) {
        notFound();
    }

    const examTitle = typeof examData.title === 'string' ? examData.title : examData.title[lang as Locale];
    const examDesc = typeof examData.description === 'string' ? examData.description : examData.description[lang as Locale];
    const ogImageUrl = examData.image.startsWith('http') ? examData.image : `${baseUrl}${examData.image}`;

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
                name: t.examLibrary || (lang === 'vi' ? 'Đề thi' : 'Exams'),
                item: `${baseUrl}/${lang}/exams`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: examTitle,
                item: `${baseUrl}/${lang}/exams/${id}`,
            },
        ],
    };

    const examJsonLd: any = {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: examTitle,
        description: examDesc,
        image: ogImageUrl,
        // Khai báo rõ đây là Đề thi thử hoặc Đề thi cũ
        learningResourceType: ['Practice test', 'Past paper'],
        educationalLevel: 'Professional', // Hoặc 'Beginner', 'Intermediate'
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
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/${lang}/exams/${id}`,
        }
    };

    // Tích hợp Đánh giá sao (Nổi bật trên kết quả tìm kiếm Google)
    if ((examData as any).rating && (examData as any).ratingCount) {
        examJsonLd.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: (examData as any).rating,
            ratingCount: (examData as any).ratingCount,
            bestRating: '5',
            worstRating: '1',
        };
    }
    return <>

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
            }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(examJsonLd).replace(/</g, '\\u003c'),
            }}
        />
        <ExamDetail examData={examData} t={t} lang={lang}  />
    </>

}
