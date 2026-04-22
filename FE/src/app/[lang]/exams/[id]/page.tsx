import { ExamDetail } from '@/src/views/ExamDetail';
import { Exam, examService } from '@/src/services/examService';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import type { Metadata } from 'next';
const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; id: string }> }) : Promise<Metadata> {
    const { id, lang } = await params;
    const exam: Exam | null = await examService.getExamById(id as string);

    if (!exam) return { title: 'Không tìm thấy đề thi' };

    // Giả sử bạn lấy tiêu đề theo ngôn ngữ mặc định hoặc logic nào đó
    const examTitle = typeof exam.title === 'string' ? exam.title : exam.title[lang as Locale];
    const examDesc = typeof exam.description === 'string' ? exam.description : exam.description[lang as Locale];
    const categoryName = exam.category?.name || '';
    return {
        title: `Thư viện đề thi - ${examTitle}`,
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
            title: `Thư viện đề thi - ${examTitle}`,
            description: examDesc,
            url: `${baseUrl}/${lang}/exams/${id}`,
            siteName: "IT Shiken",
            images: {
                url: exam.image,
                width: 1200,
                height: 630,
                alt: "IT Shiken",
            },
            locale: lang === 'vi' ? 'vi_VN' : lang === 'ja' ? 'ja_JP' : 'en_US',
            phoneNumbers: "0903571094",
            emails: "nguyenletuanphi910.2019@gmail.com",
            type: "article",
            countryName: "Việt Nam"
        },
        alternates: {
            canonical: `${baseUrl}/${lang}/exams/${id}`,
            languages: {
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
        examService.getExamById(id as string),
        getDictionary(lang as Locale)
    ]);

    if (!examData) {
        notFound();
    }
    return <ExamDetail examData={examData} t={t} lang={lang}  />;
}
