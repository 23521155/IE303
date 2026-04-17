import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { BlogList } from '@/src/views/BlogList';


export default async function Page({params}:{params:{lang: string}})  {
    const {lang} = await params;
    const t = getDictionary(lang as Locale)
  return <BlogList t={t} lang={lang} />;
}
