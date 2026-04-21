import Home from '@/src/views/Home';
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';


export async function generateMetadata({params}: { params: Promise<{ lang: string }>}) {
    const { lang } = await  params;

    return {
        alternates: {
            canonical: `https://itshiken.io.vn/${lang}`,
            languages: {
                vi: 'https://itshiken.io.vn/vi',
                en: 'https://itshiken.io.vn/en',
                ja: 'https://itshiken.io.vn/ja',
            },
        },
    };
}

export default async function Page({params}: { params: Promise<{ lang: string }>}) {
    const { lang } = await  params;
    const t = await getDictionary(lang as Locale)
    return <Home t={t} lang={lang} />;
}
