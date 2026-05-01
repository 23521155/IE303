import React from 'react';
import { BlogList } from '@/src/views/BlogList';
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';



export default async function BlogPage({params}:{params:Promise<{lang: string}> }) {
    const {lang} = await params;
    const t = await getDictionary(lang as Locale)
    return (
        <BlogList t={t} lang={lang}/>
    );
}
