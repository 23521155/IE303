import { ExamDetail } from '@/src/views/ExamDetail';
import { Exam, examService } from '@/src/services/examService';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string; id: string }> }) {
    const { id, lang } = await params;
    const exam: Exam | null = await examService.getExamById(id as string);

    if (!exam) return { title: 'Không tìm thấy đề thi' };

    // Giả sử bạn lấy tiêu đề theo ngôn ngữ mặc định hoặc logic nào đó
    const title = typeof exam.title === 'string' ? exam.title : exam.title[lang as Locale];

    return {
        title: `${title} - Thư viện đề thi`,
        description: typeof exam.description === 'string' ? exam.description : exam.description[lang as Locale],
        openGraph: {
            images: [exam.image],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ lang: string; id: string }> }) {
    const { id, lang } = await params;
    const examData: Exam | null = await examService.getExamById(id as string);
    const t = await getDictionary(lang as Locale)

    if (!examData) {
        notFound();
    }
    return <ExamDetail examData={examData} t={t} lang={lang}  />;
}
