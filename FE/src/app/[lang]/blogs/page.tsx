import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { BlogList } from '@/src/views/BlogList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cộng đồng IT & Kinh nghiệm thi IT Passport',
    description: 'Tham gia cộng đồng ITShiken để thảo luận, chia sẻ kinh nghiệm ôn thi, review đề thi FE và IT Passport. Giải đáp thắc mắc về chứng chỉ CNTT Nhật Bản.',
};


export async function generateMetadata({params}: { params: Promise<{ lang: string }>}) {
    const { lang } = await  params;

    return {
        alternates: {
            canonical: `https://itshiken.io.vn/${lang}/blogs`,
            languages: {
                vi: 'https://itshiken.io.vn/vi/blogs',
                en: 'https://itshiken.io.vn/en/blogs',
                ja: 'https://itshiken.io.vn/ja/blogs',
            },
        },
    };
}
export default async function Page({params}:{params:Promise<{lang: string}>})  {
    const {lang} = await  params;
    const t = await getDictionary(lang as Locale)
  return <BlogList t={t} lang={lang} />;
}
