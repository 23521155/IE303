export const BE_URL =
    typeof window === 'undefined' ? (process.env.BE_URL ?? 'http://62.72.46.7:8080') : '';
