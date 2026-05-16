import Header from '@/src/components/ui/header';
import Footer from '@/src/components/ui/footer';
import { ScrollToTop } from '@/src/components/ui/ScrollToTop';
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';

export default async function MainLayout({
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
            <Footer t={t} lang={lang} />
            <ScrollToTop />
        </>
    );
}
