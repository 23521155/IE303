import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { BlogList } from '@/src/views/BlogList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cộng đồng IT & Kinh nghiệm thi IT Passport',
    description: 'Tham gia cộng đồng ITShiken để thảo luận, chia sẻ kinh nghiệm ôn thi, review đề thi FE và IT Passport. Giải đáp thắc mắc về chứng chỉ CNTT Nhật Bản.',
};


export default async function Page({params}:{params:Promise<{lang: string}>})  {
    const {lang} = await  params;
    const t = getDictionary(lang as Locale)
  return <BlogList t={t} lang={lang} />;
}
