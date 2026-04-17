
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { FlashcardDecks } from '@/src/views/FlashcardDecks';

export default async function Page({params}:{params:{lang: string}})  {
    const {lang} =  params;
    const t = getDictionary(lang as Locale)
  return <FlashcardDecks t={t} lang={lang} />;
}
