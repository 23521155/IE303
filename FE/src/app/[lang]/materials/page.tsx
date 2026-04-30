import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { Materials } from '@/src/views/Materials';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tài liệu ôn thi FE & IT Passport chuẩn nhất',
    description: 'Kho tài liệu PDF luyện thi FE và IT Passport tiếng Việt cập nhật mới nhất. Sách ôn thi, từ vựng chuyên ngành, sơ đồ tư duy Mindmap giúp bạn học hiệu quả.',
};


export default async function Page({params}:{params:Promise<{lang: string}> }) {
    const {lang} = await params;
    const t = getDictionary(lang as Locale)
  return <Materials t={t} lang={lang} />;
}
