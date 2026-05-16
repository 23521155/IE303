import React from 'react';
import { Metadata } from 'next';
import ContentVi from '@/src/app/[lang]/blogs/ky-thi-fe/content-vi';
import ContentEn from '@/src/app/[lang]/blogs/ky-thi-fe/content-en';
import ContentJa from '@/src/app/[lang]/blogs/ky-thi-fe/content-ja';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itshiken.io.vn';

const commonData = {
    id: 'ky-thi-fe',
    coverImage: '/blog-it-fe-thumbnail.jpg',
    author: {
        name: 'Nguyễn Lê Tuấn Phi',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
        url: 'https://www.facebook.com/Fi.is.me.hello?locale=vi_VN',
    },
    datePublished: '2026-05-01T08:00:00+07:00',
    dateModified: '2026-05-01T08:00:00+07:00',
};

const localizedData = {
    vi: {
        title: 'Kỳ thi FE là gì? Giải đáp mọi thắc mắc giúp bạn tự tin chinh phục',
        excerpt: 'Từ định nghĩa, cấu trúc đề thi, cách đăng ký đến lộ trình ôn luyện – tất cả trong một bài viết.',
        category: 'Chứng chỉ IT',
        tags: ['FE', 'IT FE', 'Itshiken', 'NhatBan', 'Career'],
        breadcrumbHome: 'Trang chủ',
        breadcrumbBlog: 'Bài viết',
        locale: 'vi_VN',
        faqs: [
            {
                q: 'FE có khó không? Tỷ lệ đậu bao nhiêu?',
                a:
                    'Tỷ lệ đậu FE tại Việt Nam trung bình dưới 25% – khá thấp. Điều này không có nghĩa là không thi được, mà là nhiều bạn ôn chưa đúng cách hoặc bỏ qua phần đề chiều. Nếu ôn đủ 3 tháng theo đúng lộ trình, cơ hội đậu là hoàn toàn thực tế.',
            },
            {
                q: 'Không có bằng đại học, có nên thi FE không?',
                a:
                    'Đây là một trong những lý do mà rất nhiều người chọn FE. Chứng chỉ FE được chính phủ Nhật công nhận để thay thế bằng đại học khi xin visa lao động kỹ sư CNTT.',
            },
            {
                q: 'Nên chọn ngôn ngữ lập trình nào cho đề chiều?',
                a:
                    'Đề chiều cho phép bạn chọn 1 trong 5 ngôn ngữ: C, Java, Python, Assembly, Excel. Lời khuyên phổ biến nhất từ cộng đồng là chọn ngôn ngữ bạn đang dùng hàng ngày.',
            },
            {
                q: 'Đậu một phần, có cần thi lại cả hai không?',
                a:
                    'Không. Nếu bạn đậu một phần (sáng hoặc chiều), kết quả đó được bảo lưu sang kỳ thi ngay liền sau. Bạn chỉ cần thi lại phần chưa đậu.',
            },
            {
                q: 'Mình là dân non-IT, có nên thi FE không?',
                a:
                    'Thành thật mà nói: FE khá thách thức với người hoàn toàn không có nền tảng IT vì có phần lập trình và thuật toán. Nếu bạn là non-IT, nên bắt đầu với IT Passport trước để xây nền.',
            },
        ],
    },
    en: {
        title: 'What is the FE Exam? Everything you need to know to pass',
        excerpt: 'From definition, exam structure, registration to a detailed study roadmap.',
        category: 'IT Certification',
        tags: ['FE', 'IT FE', 'Itshiken', 'Japan', 'Career'],
        breadcrumbHome: 'Home',
        breadcrumbBlog: 'Blogs',
        locale: 'en_US',
        faqs: [
            {
                q: 'Is FE difficult? What is the pass rate?',
                a:
                    "The average FE pass rate in Vietnam is under 25% – quite low. This doesn't mean it's impossible to pass, but rather many people study incorrectly or neglect the afternoon section.",
            },
            {
                q: "Should I take the FE exam if I don't have a university degree?",
                a:
                    'This is one of the reasons many people choose FE. The FE certificate is recognized by the Japanese government to replace a university degree when applying for an IT engineer working visa.',
            },
            {
                q: 'Which programming language should I choose for the afternoon exam?',
                a:
                    'The afternoon exam allows you to choose 1 of 5 languages: C, Java, Python, Assembly, Excel. The most common advice is to choose the language you use daily.',
            },
            {
                q: 'If I pass one section, do I need to retake both?',
                a:
                    'No. If you pass one section (morning or afternoon), that result is reserved for the immediate next exam. You only need to retake the remaining section.',
            },
            {
                q: 'I am a non-IT person, should I take the FE exam?',
                a:
                    'To be honest: FE is quite challenging for someone with absolutely no IT background because of the programming and algorithm sections. Start with IT Passport first.',
            },
        ],
    },
    ja: {
        title: 'FE試験とは？合格のための完全ガイド',
        excerpt: '定義、試験の構成、申し込み方法から学習ロードマップまで。',
        category: 'IT資格',
        tags: ['FE', '基本情報技術者試験', 'Itshiken', '日本', 'キャリア'],
        breadcrumbHome: 'ホーム',
        breadcrumbBlog: 'ブログ',
        locale: 'ja_JP',
        faqs: [
            {
                q: 'FEは難しいですか？合格率はどのくらいですか？',
                a:
                    'ベトナムでのFEの平均合格率は25%未満であり、かなり低いです。これは合格不可能という意味ではなく、多くの人が間違った勉強法をしているということです。',
            },
            {
                q: '大学の学位を持っていなくてもFE試験を受けるべきですか？',
                a:
                    'これが、多くの人がFEを選ぶ理由の1つです。FE資格は、ITエンジニアの就労ビザを申請する際に、大学の学位の代わりとして日本政府に認められています。',
            },
            {
                q: '午後試験ではどのプログラミング言語を選ぶべきですか？',
                a:
                    '午後試験では、C、Java、Python、アセンブラ、表計算の5つの言語から1つを選択できます。毎日使用している言語を選択することをお勧めします。',
            },
            {
                q: '1つのセクションに合格した場合、両方を再受験する必要がありますか？',
                a:
                    'いいえ。1つのセクション（午前または午後）に合格した場合、その結果は直後の試験に免除（保留）されます。不合格のセクションのみ再受験します。',
            },
            {
                q: '私は非IT分野の人間ですが、FE試験を受けるべきですか？',
                a:
                    '正直に言うと、プログラミングとアルゴリズムのセクションがあるため、ITの背景が全くない人にとってFEはかなり困難です。まずITパスポートから始めましょう。',
            },
        ],
    },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const currentLang = (lang as keyof typeof localizedData) || 'vi';
    const data = localizedData[currentLang];

    return {
        title: data.title,
        description: data.excerpt,
        keywords: data.tags,
        authors: [{ name: commonData.author.name }],
        alternates: {
            canonical: `${baseUrl}/${lang}/blogs/${commonData.id}`,
            languages: {
                vi: `${baseUrl}/vi/blogs/${commonData.id}`,
                en: `${baseUrl}/en/blogs/${commonData.id}`,
                ja: `${baseUrl}/ja/blogs/${commonData.id}`,
            },
        },
        openGraph: {
            title: data.title,
            description: data.excerpt,
            url: `${baseUrl}/${lang}/blogs/${commonData.id}`,
            siteName: 'ITShiken',
            images: [
                {
                    url: `${baseUrl}${commonData.coverImage}`,
                    width: 1200,
                    height: 630,
                    alt: data.title,
                },
            ],
            locale: data.locale,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: data.excerpt,
            images: [`${baseUrl}${commonData.coverImage}`],
        },
    };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const currentLang = (lang as keyof typeof localizedData) || 'vi';
    const data = localizedData[currentLang];

    // Tạo JSON-LD động theo ngôn ngữ
    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.excerpt,
        image: `${baseUrl}${commonData.coverImage}`,
        author: {
            '@type': 'Person',
            name: commonData.author.name,
            url: commonData.author.url,
        },
        publisher: {
            '@type': 'Organization',
            name: 'IT Shiken',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/itShikenLogo.png`,
            },
        },
        datePublished: commonData.datePublished,
        dateModified: commonData.dateModified,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/${lang}/blogs/${commonData.id}`,
        },
        articleSection: data.category,
        keywords: data.tags.join(', '),
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
            },
        })),
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: data.breadcrumbHome,
                item: `${baseUrl}/${lang}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: data.breadcrumbBlog,
                item: `${baseUrl}/${lang}/blogs`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: data.title,
                item: `${baseUrl}/${lang}/blogs/${commonData.id}`,
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogJsonLd).replace(/</g, '\\u003c'),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
                }}
            />

            {/* RENDER NỘI DUNG TƯƠNG ỨNG */}
            {currentLang === 'vi' ? <ContentVi /> : currentLang === 'en' ? <ContentEn /> : <ContentJa />}
        </>
    );
}
