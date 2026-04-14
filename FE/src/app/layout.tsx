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
        "thi thử online",
        "luyện đề trắc nghiệm",
        "thi thử miễn phí",
        "ôn thi online",
        "đề thi trắc nghiệm",
        "thi thử đa môn",
        "luyện đề THPT",
        "thi thử tiếng Nhật",
        "luyện thi JLPT",
        "đề thi JLPT online"
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
