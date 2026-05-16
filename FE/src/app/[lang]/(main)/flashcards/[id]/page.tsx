import { FlashcardPlay } from '@/src/views/FlashcardPlay';
import { getDictionary } from '@/src/utils/dictionaries';
import type { Locale } from '@/src/utils/i18n';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

const DECK_META: Record<string, { title: string; desc: string; category: string }> = {
    '1': { title: 'Từ vựng IT Passport cơ bản', desc: 'Bộ thẻ từ vựng trọng tâm thi chứng chỉ IT Passport Nhật Bản', category: 'IT Passport' },
    '2': { title: 'Fundamental Information Technology (FE)', desc: 'Ôn tập kiến thức cốt lõi, thuật ngữ kỳ thi FE', category: 'FE Exam' },
    '3': { title: 'Từ vựng JLPT N3 - Trọng tâm', desc: 'Bộ từ vựng tiếng Nhật JLPT N3 thường gặp trong công việc', category: 'Tiếng Nhật' },
    '4': { title: 'Ngữ pháp Tiếng Nhật ứng dụng trong IT', desc: 'Ngữ pháp và mẫu câu giao tiếp tiếng Nhật chuyên ngành IT', category: 'Tiếng Nhật IT' }
};

type Props = {
    params: Promise<{ lang: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, id } = await params;
    const t = await getDictionary(lang as Locale);

    const deck = DECK_META[id];

    // Nếu người dùng/bot nhập sai ID, trả về meta mặc định
    if (!deck) {
        return {
            title: 'Không tìm thấy bộ thẻ | IT Shiken',
            description: 'Bộ Flashcard không tồn tại hoặc đã bị xóa khỏi hệ thống.',
        };
    }

    const title = `${deck.title} - Luyện thẻ Flashcard | IT Shiken`;
    const description = `Học và ghi nhớ ${deck.title}. ${deck.desc}. Phương pháp lật thẻ (Active Recall) giúp tăng độ hiệu quả khi luyện thi ${deck.category}.`;

    return {
        title: title,
        description: description,
        keywords: [
            deck.title,
            deck.category,
            "học flashcard IT",
            "thẻ ghi nhớ IT Shiken",
            `luyện thi ${deck.category}`,
            "từ vựng chuyên ngành công nghệ thông tin",
            "phương pháp active recall"
        ],
        openGraph: {
            title: title,
            description: description,
            url: `${baseUrl}/${lang}/flashcards/${id}`,
            siteName: "IT Shiken",
            images: {
                url: `${baseUrl}/thumbnail.jpg`,
                width: 1200,
                height: 630,
                alt: `Flashcard: ${deck.title}`,
            },
            locale: lang === 'vi' ? 'vi_VN' : lang === 'ja' ? 'ja_JP' : 'en_US',
            type: "article",
        },
        alternates: {
            canonical: `${baseUrl}/${lang}/flashcards/${id}`,
            languages: {
                'x-default': `${baseUrl}/en/flashcards/${id}`,
                vi: `${baseUrl}/vi/flashcards/${id}`,
                en: `${baseUrl}/en/flashcards/${id}`,
                ja: `${baseUrl}/ja/flashcards/${id}`,
            },
        },
    };
}

export default async function Page({ params }: Props) {
    const { lang, id } = await params;
    const t = await getDictionary(lang as Locale);
    const deck = DECK_META[id];

    // Báo lỗi 404 nếu bộ thẻ không tồn tại
    if (!deck) {
        notFound();
    }

    // 1. JSON-LD: BreadcrumbList
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
            {
                '@type': 'ListItem',
                position: 3,
                name: deck.title,
                item: `${baseUrl}/${lang}/flashcards/${id}`,
            },
        ],
    };

    // 2. JSON-LD: LearningResource
    const learningResourceJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        '@id': `${baseUrl}/${lang}/flashcards/${id}#resource`,
        name: deck.title,
        description: deck.desc,
        url: `${baseUrl}/${lang}/flashcards/${id}`,
        learningResourceType: 'Flashcard Set',
        educationalUse: 'Interactive Learning',
        educationalRole: 'Student',
        inLanguage: lang,
        teaches: deck.category,
        provider: {
            '@type': 'Organization',
            name: 'IT Shiken',
            url: baseUrl
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(learningResourceJsonLd).replace(/</g, '\\u003c'),
                }}
            />

            <FlashcardPlay t={t} lang={lang} />
        </>
    );
}