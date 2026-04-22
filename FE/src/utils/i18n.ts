// utils/i18n.ts
export const locales = ['vi', 'en', 'ja'] as const;

export const defaultLocale = 'vi';

export type Locale = typeof locales[number];
