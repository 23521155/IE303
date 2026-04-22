import { TakeExam } from '@/src/views/TakeExam';
import { getDictionary } from '@/src/utils/dictionaries';
import type {Locale} from '@/src/utils/i18n'
import { examService } from '@/src/services/examService';

export default async function Page({ params }: { params: Promise<{ lang: string; id: string }> }) {
    const { lang, id } = await params;

    const t = await getDictionary(lang as Locale)

    const examId = Array.isArray(id) ? id[0] : id;

    const examData = await examService.getExamById(examId);

    const draftKey = `exam_draft_${examId}`;
    const questions = examData?.questions

    return <TakeExam t={t} lang={lang} />;
}
