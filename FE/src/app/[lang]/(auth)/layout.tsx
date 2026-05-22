import Header from '@/src/components/ui/header';
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';

export default async function AuthLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}>) {
    const { lang } = await params;
    const t = await getDictionary(lang as Locale);

    return (
        <>
            <Header t={t} lang={lang} />
            {children}
        </>
    );
}
