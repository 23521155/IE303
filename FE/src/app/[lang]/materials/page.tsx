
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { Materials } from '@/src/views/Materials';

export async function generateMetadata({params}: { params: Promise<{ lang: string }>}) {
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
  return <Materials t={t} lang={lang} />;
}
