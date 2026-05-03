import { ExamResult } from '@/src/views/ExamResult';
import { getDictionary } from '@/src/utils/dictionaries';
import type {Locale} from '@/src/utils/i18n'

export default async function ResultPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
    const { lang, id } = await params;
    const t = await getDictionary(lang as Locale)

    return <ExamResult t={t} lang={lang} id={id} />;
}