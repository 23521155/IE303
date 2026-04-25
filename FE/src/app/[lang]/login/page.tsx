import { Login } from '@/src/views/Login';
import { getDictionary } from '@/src/utils/dictionaries';
import type {Locale} from '@/src/utils/i18n'
export default async function Page({params} : {params : Promise<{lang : string}>}) {
    const { lang } = await params;
    const t = await getDictionary(lang as Locale);
    return <Login t={t} lang={lang} />;
}
