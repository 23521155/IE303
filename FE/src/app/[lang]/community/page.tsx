import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { BlogList } from '@/src/views/BlogList';
import type { Metadata } from 'next';

export async function generateMetadata({params}: { params: Promise<{ lang: string }>}) {
    const { lang } = await params;

    return {
        title: 'Cộng đồng IT & Kinh nghiệm thi IT Passport',
        description: 'Tham gia cộng đồng ITShiken để thảo luận, chia sẻ kinh nghiệm ôn thi, review đề thi FE và IT Passport. Giải đáp thắc mắc về chứng chỉ CNTT Nhật Bản.',
        alternates: {
            canonical: `https://itshiken.io.vn/${lang}/community`,
            languages: {
                vi: 'https://itshiken.io.vn/vi/community',
                en: 'https://itshiken.io.vn/en/community',
                ja: 'https://itshiken.io.vn/ja/community',
            },
        },
    };
}
export default async function Page({params}:{params:Promise<{lang: string}>})  {
    const {lang} = await  params;
    const t = await getDictionary(lang as Locale)
  return <BlogList t={t} lang={lang} />;
}
