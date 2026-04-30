export const categories = [
    {
        id: 'all',
        name: {
            vi: 'Tất cả',
            en: 'All',
            ja: 'すべて',
        },
    },
    {
        id: 'english',
        name: {
            vi: 'Ngoại Ngữ',
            en: 'Languages',
            ja: '言語',
        },
    },
    {
        id: 'it',
        name: {
            vi: 'Công Nghệ Thông Tin',
            en: 'IT',
            ja: 'IT',
        },
    },
    {
        id: 'business',
        name: {
            vi: 'Kinh Doanh & Tài Chính',
            en: 'Business & Finance',
            ja: 'ビジネス・金融',
        },
    },
];

export const exams = [
    {
        id: 'toeic-1',
        title: {
            vi: 'Đề thi thử TOEIC Format 2024 - Test 1',
            en: 'TOEIC Practice Test Format 2024 - Test 1',
            ja: 'TOEIC 模擬試験フォーマット2024 - テスト1',
        },
        category: 'english',
        image:
            'https://images.unsplash.com/photo-1567206163313-9e34c830557a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdsaXNoJTIwbGFuZ3VhZ2UlMjBzdHVkeXxlbnwxfHx8fDE3NzMyOTAzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        duration: 120,
        questionCount: 200,
        description: {
            vi: 'Đề thi TOEIC theo chuẩn cấu trúc mới nhất, bao gồm 100 câu Nghe và 100 câu Đọc.',
            en: 'TOEIC exam following the latest structure, including 100 Listening and 100 Reading questions.',
            ja: '最新の構成に準拠したTOEIC試験。リスニング100問とリーディング100問を含みます。',
        },
        participants: 12540,
        rating: 4.8,
    },
    {
        id: 'ielts-1',
        title: {
            vi: 'IELTS Academic Reading Practice Test 1',
            en: 'IELTS Academic Reading Practice Test 1',
            ja: 'IELTS アカデミックリーディング 模擬試験 1',
        },
        category: 'english',
        image:
            'https://images.unsplash.com/photo-1568650136602-ded24b86c5af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwdGFraW5nJTIwZXhhbXxlbnwxfHx8fDE3NzMyOTAzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        duration: 60,
        questionCount: 40,
        description: {
            vi: 'Bài thi thử kỹ năng Đọc IELTS Academic với 3 đoạn văn có độ khó tương đương đề thi thật.',
            en: 'IELTS Academic Reading practice test with 3 passages equivalent in difficulty to the real exam.',
            ja: '本試験と同等の難易度の3つのパッセージを含むIELTSアカデミックリーディング模擬試験。',
        },
        participants: 8430,
        rating: 4.9,
    },
    {
        id: 'aws-cp',
        title: {
            vi: 'AWS Certified Cloud Practitioner (CLF-C02)',
            en: 'AWS Certified Cloud Practitioner (CLF-C02)',
            ja: 'AWS 認定 クラウドプラクティショナー (CLF-C02)',
        },
        category: 'it',
        image:
            'https://images.unsplash.com/photo-1675495666589-94cdafbcfcc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb2RpbmclMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NzMyOTAzMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        duration: 90,
        questionCount: 65,
        description: {
            vi:
                'Đề thi thử chứng chỉ AWS Cloud Practitioner. Bao gồm các câu hỏi về AWS Cloud concept, Security, Technology, và Billing.',
            en:
                'AWS Cloud Practitioner certification practice test. Includes questions on AWS Cloud concept, Security, Technology, and Billing.',
            ja:
                'AWS Cloud Practitioner 認定模擬試験。AWS Cloudコンセプト、セキュリティ、テクノロジー、請求に関する質問を含みます。',
        },
        participants: 5320,
        rating: 4.7,
    },
    {
        id: 'pmp-1',
        title: {
            vi: 'PMP Certification Mock Exam - Trọn bộ',
            en: 'PMP Certification Mock Exam - Full',
            ja: 'PMP 認定 模擬試験 - フルセット',
        },
        category: 'business',
        image:
            'https://images.unsplash.com/photo-1758691736545-5c33b6255dca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBzdGF0aXN0aWNzfGVufDF8fHx8MTc3MzI5MDMzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        duration: 230,
        questionCount: 180,
        description: {
            vi: 'Đề thi thử chứng chỉ quản lý dự án quốc tế PMP, bám sát PMBOK Guide mới nhất.',
            en:
                'International PMP project management certification practice test, closely following the latest PMBOK Guide.',
            ja: '最新のPMBOKガイドに準拠した国際PMPプロジェクト管理認定模擬試験。',
        },
        participants: 3200,
        rating: 4.6,
    },
];

export const getExamQuestions = (examId: string) => {
    // Mocking 10 questions for any exam for demo purposes
    return Array.from({ length: 10 }).map((_, i) => ({
        id: `q${i + 1}`,
        text: `Câu hỏi số ${i +
            1} cho đề thi này. Hãy chọn phương án đúng nhất để hoàn thành câu sau: "This is a sample question _____ testing purposes."`,
        options: ['A. for', 'B. to', 'C. with', 'D. by'],
        correctAnswer: 0, // Index 0 (A)
    }));
};
