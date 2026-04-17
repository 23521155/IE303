import Home from '@/src/views/Home';
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';

export default async function Page({params}: { params: { lang: string };}) {
    const { lang } = await params;
    const t = await getDictionary(lang as Locale)
    return <Home t={t} lang={lang} />;
}
