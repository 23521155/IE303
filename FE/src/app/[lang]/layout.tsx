import type { Metadata, Viewport } from 'next';

import '@/src/styles/index.css';
import {Inter } from "next/font/google";
import Header from '@/src/components/ui/header';
import Footer from '@/src/components/ui/footer';
import type {Locale} from '@/src/utils/i18n'
import { getDictionary } from '@/src/utils/dictionaries';
const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
export const metadata: Metadata = {
    title: {
        template: '%s | ITShiken',
        default: 'Thi thử online free & Luyện đề, chấm điểm tự động | ITShiken'
    },
    description: 'Nền tảng thi thử online miễn phí đa môn với hệ thống luyện đề trắc nghiệm, chấm điểm tự động và phân tích kết quả giúp bạn cải thiện điểm số nhanh chóng.',
    keywords: [
        "luyện thi IT Passport",
        "đề thi IT Passport tiếng Việt",
        "luyện thi FE",
        "đề thi FE tiếng Việt",
        "thi thử IT Passport online",
        "thi thử FE online",
        "chứng chỉ IT Nhật Bản",
        "sát hạch VITEC",
        "giải đề FE có lời giải",
        "từ vựng IT Passport"
    ],
    openGraph: {
        title: 'Thi thử online free & Luyện đề, chấm điểm tự động | ITShiken',
        description: 'Nền tảng thi thử online miễn phí đa môn với hệ thống luyện đề trắc nghiệm, chấm điểm tự động và phân tích kết quả giúp bạn cải thiện điểm số nhanh chóng.',
        url: `${baseUrl}`,
        siteName: "ITShiken",
        images: {
            url: `/thumbnail.jpg`,
            width: 1200,
            height: 630,
            alt: "ITShiken",
        },
        locale: "vi_VN",
        phoneNumbers: "0903571094",
        emails: "nguyenletuanphi910.2019@gmail.com",
        type: "website",
        countryName: "Việt Nam"
    },
    alternates: {
        canonical: `${baseUrl}`,
    },
    metadataBase: new URL(baseUrl || 'http://localhost:3000'),
};

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
    <html lang={lang}>
      <body className={`${inter.className} antialiased`}>
      <Header t={t} lang={lang}/>
      {children}
      <Footer t={t} lang={lang}/>
      </body>
    </html>
  );
}
