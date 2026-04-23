import { TakeExam } from '@/src/views/TakeExam';
import { getDictionary } from '@/src/utils/dictionaries';
import type {Locale} from '@/src/utils/i18n'
import { ExamDetail, examService, Question } from '@/src/services/examService';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ lang: string; id: string }> }) {
    const { lang, id } = await params;

    const t = await getDictionary(lang as Locale)

    const examId: string = Array.isArray(id) ? id[0] : id;

    const examData: ExamDetail | null  = await examService.getExamById(examId);


    if(!examData) return notFound();

    const draftKey: string = `exam_draft_${examId}`;
    const questions: Question[] = examData?.questions
    return <TakeExam t={t} lang={lang} exam={examData} examId={examId} draftKey={draftKey} questions={questions} />;
}
