
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { Materials } from '@/src/views/Materials';
import { Metadata } from 'next';
import { BE_URL } from '@/src/utils/constans';


import { cache } from 'react';
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

export async function generateMetadata({params}: { params: Promise<{ lang: string }>}) : Promise<Metadata> {
    const { lang } = await  params;

    return {

        alternates: {
            canonical: `${baseUrl}/${lang}/materials`,
            languages: {
                'x-default': `${baseUrl}/en/materials`,
                vi: `${baseUrl}/vi/materials`,
                en: `${baseUrl}/en/materials`,
                ja: `${baseUrl}/ja/materials`,
            },
        },
    };
}
export default async function Page({params}:{params:Promise<{lang: string}> }) {
    const {lang} = await params;
    const t = await getDictionary(lang as Locale)
    let url = `${BE_URL}/api/materials`;
    const response = await fetch(url);
    const data = await response.json();

    const materials = data?.content || [];
    console.log(materials)
  return <Materials t={t} lang={lang} materials={materials} />;
}
