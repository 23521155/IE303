import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import { FlashcardDecks } from '@/src/views/FlashcardDecks';
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

const TOP_DECKS = [
    { id: '1', name: 'Từ vựng IT Passport cơ bản' },
    { id: '2', name: 'Fundamental Information Technology (FE)' },
    { id: '3', name: 'Từ vựng JLPT N3 - Trọng tâm' },
    { id: '4', name: 'Ngữ pháp Tiếng Nhật ứng dụng trong IT' },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const t = await getDictionary(lang as Locale);

    const title = `${t.flashcardLib || 'Thư viện Flashcard'} - Học từ vựng IT & Tiếng Nhật hiệu quả`;
    const description = `${t.flashcardDesc || 'Nắm vững thuật ngữ chuyên ngành và từ vựng qua hệ thống thẻ ghi nhớ thông minh.'} Luyện thi IT Passport, FE, Tiếng Nhật IT với bộ thẻ Flashcard tương tác.`;

    return {
        title: title,
        description: description,
        keywords: [
            "flashcard IT Passport",
            "từ vựng IT Passport tiếng Việt",
            "flashcard FE",
            "thuật ngữ FE",
            "từ vựng tiếng nhật IT",
            "học tiếng nhật chuyên ngành IT",
            "JLPT N3 từ vựng",
            "thẻ ghi nhớ IT Shiken",
            "luyện thi IT Nhật Bản",
            "từ vựng chuyên ngành công nghệ thông tin"
        ],
        openGraph: {
            title: title,
            description: description,
            url: `${baseUrl}/${lang}/flashcards`,
            siteName: "IT Shiken",
            images: {
                url: `${baseUrl}/thumbnail.jpg`, // Bạn có thể đổi thành ảnh cover riêng cho Flashcard nếu có
                width: 1200,
                height: 630,
                alt: "IT Shiken Flashcards",
            },
            locale: lang === 'vi' ? 'vi_VN' : lang === 'ja' ? 'ja_JP' : 'en_US',
            type: "website",
        },
        alternates: {
            canonical: `${baseUrl}/${lang}/flashcards`,
            languages: {
                'x-default': `${baseUrl}/en/flashcards`,
                vi: `${baseUrl}/vi/flashcards`,
                en: `${baseUrl}/en/flashcards`,
                ja: `${baseUrl}/ja/flashcards`,
            },
        },
    };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = await getDictionary(lang as Locale);

    // 1. JSON-LD cho Breadcrumbs (Điều hướng trang)
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: lang === 'vi' ? 'Trang chủ' : lang === 'ja' ? 'ホーム' : 'Home',
                item: `${baseUrl}/${lang}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: t.flashcardLib || 'Thư viện Flashcard',
                item: `${baseUrl}/${lang}/flashcards`,
            },
        ],
    };

    // 2. JSON-LD cho CollectionPage & ItemList (Danh sách bộ bài)
    const collectionJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/${lang}/flashcards#collection`,
        name: `${t.flashcardLib || 'Thư viện Flashcard'} - IT Shiken`,
        description: t.flashcardDesc || 'Bộ sưu tập Flashcard luyện thi IT Passport, FE và Tiếng Nhật IT.',
        url: `${baseUrl}/${lang}/flashcards`,
        inLanguage: lang,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: TOP_DECKS.map((deck, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${baseUrl}/${lang}/flashcards/${deck.id}`,
                name: deck.name,
            })),
        }
    };

    return (
        <>
            {/* Inject Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(collectionJsonLd).replace(/</g, '\\u003c'),
                }}
            />

            {/* Render Client Component */}
            <FlashcardDecks t={t} lang={lang} />
        </>
    );
}