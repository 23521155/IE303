
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { Materials } from '@/src/views/Materials';
import { Metadata } from 'next';
import { BE_URL } from '@/src/utils/constans';

export async function generateMetadata({params}: { params: Promise<{ lang: string }>}) : Promise<Metadata> {
    const { lang } = await  params;

    return {
        alternates: {
            canonical: `https://itshiken.io.vn/${lang}/materials`,
            languages: {
                vi: 'https://itshiken.io.vn/vi/materials',
                en: 'https://itshiken.io.vn/en/materials',
                ja: 'https://itshiken.io.vn/ja/materials',
            },
        },
    };
}
export default async function Page({params}:{params:Promise<{lang: string}> }) {
    const {lang} = await params;
    const t = await getDictionary(lang as Locale)
    let url = `${BE_URL}/api/materials`;
    const response = await fetch(url);
    console.log(response)
  return <Materials t={t} lang={lang} />;
}
