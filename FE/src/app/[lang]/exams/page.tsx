import { ExamList } from "@/src/views/ExamList";
import { getDictionary } from '@/src/utils/dictionaries';
import type {Locale} from '@/src/utils/i18n'


export async function generateMetadata({params}: { params: Promise<{ lang: string }>}) {
    const { lang } = await  params;

    return {
        alternates: {
            canonical: `https://itshiken.io.vn/${lang}/exams`,
            languages: {
                vi: 'https://itshiken.io.vn/vi/exams',
                en: 'https://itshiken.io.vn/en/exams',
                ja: 'https://itshiken.io.vn/ja/exams',
            },
        },
    };
}
export default async function Page({params}:{params: Promise<{lang: string}>}) {
    const {lang} = await params;
    const t = await getDictionary(lang as Locale)

    return <ExamList t={t} lang={lang}  />;
}
