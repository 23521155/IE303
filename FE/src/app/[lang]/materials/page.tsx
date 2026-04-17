
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { Materials } from '@/src/views/Materials';

export default async function Page({params}:{params: {lang: string}}) {
    const {lang} = await params;
    const t = getDictionary(lang as Locale)
  return <Materials t={t} lang={lang} />;
}
