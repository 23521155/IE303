import { ExamList } from "@/src/views/ExamList";
import { getDictionary } from '@/src/utils/dictionaries';
import type {Locale} from '@/src/utils/i18n'

export default async function Page({params}:{params: Promise<{lang: string}>}) {
    const {lang} = await params;
    const t = await getDictionary(lang as Locale)

    return <ExamList t={t} lang={lang}  />;
}
