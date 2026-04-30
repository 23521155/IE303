import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/src/contexts/LanguageContext';
import '@/src/styles/index.css';
import {Inter } from "next/font/google";
import Header from '@/src/components/ui/header';
import Footer from '@/src/components/ui/footer';
import type {Locale} from '@/src/utils/i18n'
import { getDictionary } from '@/src/utils/dictionaries';
import {Toaster} from '@/src/components/ui/sonner';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';
export const metadata: Metadata = {
    title: {
        template: '%s | IT Shiken',
        default: 'Thi thử online free & Luyện đề, chấm điểm tự động | IT Shiken'
    },
    description: 'Nền tảng luyện thi IT Passport, FE & các chứng chỉ IT Nhật khác. Tự tin đỗ ngay lần đầu với đề thi thật, chấm tự động. Thi thử miễn phí ngay!',
    keywords: [
        "ITShiken",
        "luyện thi IT Passport",
        "Web thi thử chứng chỉ IT",
        "thi thử IT Passport online",
        "Lộ trình tự học IT Passport",
        "Đề thi IT Passport tiếng Việt",
        "Cấu trúc đề thi IT Passport",
        "chứng chỉ IT Nhật Bản",
        "Tài liệu ôn thi IT Passport PDF",
        "Thi thử IT Passport trên điện thoại"
    ],
    openGraph: {
        title: 'Thi thử online free & Luyện đề, chấm điểm tự động | IT Shiken',
        description: 'Nền tảng thi thử online miễn phí đa môn với hệ thống luyện đề trắc nghiệm, chấm điểm tự động và phân tích kết quả giúp bạn cải thiện điểm số nhanh chóng.',
        url: baseUrl,
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
              <Toaster className={'bg-primary'} />
      </body>
    </html>
  );
}
