import Home from '@/src/views/Home';
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';
export async function generateMetadata({params}: { params: Promise<{ lang: string }>}): Promise<Metadata> {
    const { lang } = await  params;

    return {
        alternates: {
            canonical: `${baseUrl}/${lang}`,
            languages: {
                'x-default': `${baseUrl}/en`,
                vi: `${baseUrl}/vi`,
                en: `${baseUrl}/en`,
                ja: `${baseUrl}/ja`,
            },
        },
    };
}

export default async function Page({params}: { params: Promise<{ lang: string }>}) {
    const { lang } = await  params;
    const t = await getDictionary(lang as Locale)
    return <Home t={t} lang={lang} />;
}
