import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/'],
                disallow: [
                    // --- ADMIN & USER ---
                    '/admin/',
                    '/login/',
                    '/register/',
                    '/profile/',
                    '/dashboard/',
                    '/forgot-password/',

                    // --- API ---
                    '/api/v1',

                    // --- SEARCH & FILTER ---
                    '/search/',
                    '/?s=*',
                    '/exams?*category=*',
                    '/materials?*sort=*',
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
