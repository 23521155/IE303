import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/src/contexts/LanguageContext';
import '@/src/styles/index.css';
import {Inter } from "next/font/google";
import Header from '@/src/components/ui/header';
import Footer from '@/src/components/ui/footer';
import type {Locale} from '@/src/utils/i18n'
import { getDictionary } from '@/src/utils/dictionaries';
import {Toaster} from '@/src/components/ui/sonner';
import { ThemeProvider } from '@/src/components/theme-provider';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const t = await getDictionary(lang as Locale);
    const thumbnail = `/thumbnail-${lang}.png`;

    return {
        metadataBase: new URL(baseUrl),
        title: {
            template: '%s | IT Shiken',
            default: t.metaTitle
        },
        description: t.metaDescription,
        keywords: t.metaKeywords.split(', '),
        openGraph: {
            title: t.metaTitle,
            description: t.metaDescription,
            url: `/${lang}`,
            siteName: "ITShiken",
            images: [
                {
                    url: thumbnail,
                    width: 1200,
                    height: 630,
                    alt: "ITShiken",
                }
            ],
            locale: lang === 'vi' ? 'vi_VN' : lang === 'ja' ? 'ja_JP' : 'en_US',
            type: "website",
        },
    };
}

export const viewport : Viewport = {
    width: 'device-width',
    initialScale: 1,
}

const inter = Inter({
    subsets: ["latin", "vietnamese"],
    weight: ["300", "400", "500", "600", "700"],
});



export default async function RootLayout({
  children, params,
}: Readonly<{
  children: React.ReactNode;
    params: Promise <{ lang: string }>;
}>) {
    const { lang } = await params;
 const t = await getDictionary(lang as Locale)
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          <LanguageProvider>
              <Header t={t} lang={lang}/>
              {children}
              <Footer t={t} lang={lang}/>
              <Toaster className={'bg-primary'} />
          </LanguageProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
