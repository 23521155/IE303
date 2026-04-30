import { BlogPost } from '@/src/views/BlogPost';
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';

export default async function Page({params}:{params:Promise<{lang: string, id: string}>}) {
    const {lang} = await params;
    const t = await getDictionary(lang as Locale);
    return <BlogPost t={t} lang={lang} />;
}
