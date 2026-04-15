import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Layout } from '../components/Layout';
import '../styles/index.css';
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
    metadataBase: new URL(`${baseUrl}`),
};

export const viewport : Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Layout>{children}</Layout>
        </LanguageProvider>
      </body>
    </html>
  );
}
