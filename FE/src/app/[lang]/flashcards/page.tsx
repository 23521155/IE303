
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { FlashcardDecks } from '@/src/views/FlashcardDecks';


export async function generateMetadata({params}: { params: Promise<{ lang: string }>}) {
    const { lang } = await  params;

    return {
        alternates: {
            canonical: `https://itshiken.io.vn/${lang}/flashcards`,
            languages: {
                vi: 'https://itshiken.io.vn/vi/flashcards',
                en: 'https://itshiken.io.vn/en/flashcards',
                ja: 'https://itshiken.io.vn/ja/flashcards',
            },
        },
    };
}
export default async function Page({params}:{params:Promise<{lang: string}>})  {
    const {lang} = await  params;
    const t = await getDictionary(lang as Locale)
  return <FlashcardDecks t={t} lang={lang} />;
}
