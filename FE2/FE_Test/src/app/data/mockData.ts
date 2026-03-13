export const categories = [
  { id: "all", name: "Tất cả" },
  { id: "english", name: "Ngoại Ngữ" },
  { id: "it", name: "Công Nghệ Thông Tin" },
  { id: "business", name: "Kinh Doanh & Tài Chính" },
];

export const exams = [
  {
    id: "toeic-1",
    title: "Đề thi thử TOEIC Format 2024 - Test 1",
    category: "english",
    image: "https://images.unsplash.com/photo-1567206163313-9e34c830557a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdsaXNoJTIwbGFuZ3VhZ2UlMjBzdHVkeXxlbnwxfHx8fDE3NzMyOTAzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: 120,
    questionCount: 200,
    description: "Đề thi TOEIC theo chuẩn cấu trúc mới nhất, bao gồm 100 câu Nghe và 100 câu Đọc.",
    participants: 12540,
    rating: 4.8
  },
  {
    id: "ielts-1",
    title: "IELTS Academic Reading Practice Test 1",
    category: "english",
    image: "https://images.unsplash.com/photo-1568650136602-ded24b86c5af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwdGFraW5nJTIwZXhhbXxlbnwxfHx8fDE3NzMyOTAzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: 60,
    questionCount: 40,
    description: "Bài thi thử kỹ năng Đọc IELTS Academic với 3 đoạn văn có độ khó tương đương đề thi thật.",
    participants: 8430,
    rating: 4.9
  },
  {
    id: "aws-cp",
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    category: "it",
    image: "https://images.unsplash.com/photo-1675495666589-94cdafbcfcc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb2RpbmclMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NzMyOTAzMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: 90,
    questionCount: 65,
    description: "Đề thi thử chứng chỉ AWS Cloud Practitioner. Bao gồm các câu hỏi về AWS Cloud concept, Security, Technology, và Billing.",
    participants: 5320,
    rating: 4.7
  },
  {
    id: "pmp-1",
    title: "PMP Certification Mock Exam - Trọn bộ",
    category: "business",
    image: "https://images.unsplash.com/photo-1758691736545-5c33b6255dca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBzdGF0aXN0aWNzfGVufDF8fHx8MTc3MzI5MDMzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: 230,
    questionCount: 180,
    description: "Đề thi thử chứng chỉ quản lý dự án quốc tế PMP, bám sát PMBOK Guide mới nhất.",
    participants: 3200,
    rating: 4.6
  }
];

export const getExamQuestions = (examId: string) => {
  // Mocking 10 questions for any exam for demo purposes
  return Array.from({ length: 10 }).map((_, i) => ({
    id: `q${i + 1}`,
    text: `Câu hỏi số ${i + 1} cho đề thi này. Hãy chọn phương án đúng nhất để hoàn thành câu sau: "This is a sample question _____ testing purposes."`,
    options: [
      "A. for",
      "B. to",
      "C. with",
      "D. by"
    ],
    correctAnswer: 0 // Index 0 (A)
  }));
};
