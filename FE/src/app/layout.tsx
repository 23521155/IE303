import type { Metadata } from 'next';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Layout } from '../components/Layout';
import '../styles/index.css';

export const metadata: Metadata = {
  title: 'Website thi thử hiện đại',
  description: 'Trang web thi thử và học tập hiện đại',
};

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
