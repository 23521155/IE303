import { ExamList } from "@/src/views/ExamList";
import { getDictionary } from '@/src/utils/dictionaries';
import type {Locale} from '@/src/utils/i18n'
import { examService } from '@/src/services/examService';
import {notFound} from "next/navigation";


export async function generateMetadata({params}: { params: Promise<{ lang: string }>}) {
    const { lang } = await  params;
    const t = await getDictionary(lang as Locale)
    const [examsData, categoriesData] = await Promise.all([
        examService.getAllExams(),
        examService.getAllCategories()
    ]);

    if(!examsData || !categoriesData) {
        return notFound();
    }

    return {
        title: ``,
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


    const [examsData, categoriesData] = await Promise.all([
        examService.getAllExams(),
        examService.getAllCategories()
    ]);




    if(!examsData || !categoriesData) {
        notFound();
    }


    return <ExamList t={t} lang={lang} examsData={examsData} categoriesData={categoriesData}  />;
}
