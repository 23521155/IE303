import type {Locale} from '@/src/utils/i18n'
const dictionaries = {
    vi: () => import('@/src/dictionaries/vi.json').then((m) => m.default),
    en: () => import('@/src/dictionaries/en.json').then((m) => m.default),
    ja: () => import('@/src/dictionaries/ja.json').then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]();
};
