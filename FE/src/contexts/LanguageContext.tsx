'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'vi' | 'en' | 'ja';

interface Translations {
    [key: string]: {
        vi: string;
        en: string;
        ja: string;
    };
}

const translations: Translations = {
    // Navigation
    home: { vi: 'Trang Chủ', en: 'Home', ja: 'ホーム' },
    exams: { vi: 'Đề Thi', en: 'Exams', ja: '試験' },
    materials: { vi: 'Tài Liệu', en: 'Materials', ja: '資料' },
    flashcards: { vi: 'Flashcard', en: 'Flashcards', ja: '単語帳' },
    blog: { vi: 'Cộng đồng', en: 'Community', ja: 'コミュニティ' },

    // Auth
    login: { vi: 'Đăng Nhập', en: 'Login', ja: 'ログイン' },
    register: { vi: 'Đăng Ký', en: 'Register', ja: '登録' },
    logout: { vi: 'Đăng xuất', en: 'Logout', ja: 'ログアウト' },
    profile: { vi: 'Hồ sơ cá nhân', en: 'Profile', ja: 'プロフィール' },
    settings: { vi: 'Cài đặt tài khoản', en: 'Settings', ja: '設定' },
    loggedInAs: { vi: 'Đăng nhập dưới tên', en: 'Logged in as', ja: 'ログイン中' },

    // Home Page
    heroTitle1: { vi: 'Vượt qua mọi kỳ thi', en: 'Pass any exam', ja: 'あらゆる試験に合格する' },
    heroTitle2: { vi: 'chứng chỉ quốc tế', en: 'international certificates', ja: '国際資格' },
    heroDesc: {
        vi:
            'Nền tảng thi thử trực tuyến cung cấp các đề thi chuẩn xác, giao diện hiện đại giúp bạn làm quen và tự tin đạt điểm cao trong kỳ thi thực tế.',
        en:
            'Online mock exam platform providing accurate tests and modern interface to help you get familiar and confidently achieve high scores in real exams.',
        ja:
            '正確なテストと最新のインターフェースを提供するオンライン模擬試験プラットフォーム。実際の試験で高得点を獲得する自信をつけます。',
    },
    startExam: { vi: 'Bắt đầu thi thử', en: 'Start Practice', ja: '模擬試験を開始' },
    learnMore: { vi: 'Tìm hiểu thêm', en: 'Learn More', ja: '詳細を見る' },
    freeToUse: { vi: 'Miễn phí sử dụng', en: 'Free to use', ja: '完全無料' },
    updatedExams: { vi: 'Đề thi cập nhật liên tục', en: 'Constantly updated exams', ja: '継続的に更新される試験' },
    featuredExams: { vi: 'Đề thi nổi bật', en: 'Featured Exams', ja: '注目の試験' },
    featuredDesc: {
        vi: 'Các đề thi chứng chỉ phổ biến nhất được hàng nghìn học viên lựa chọn để ôn luyện mỗi ngày.',
        en: 'The most popular certification exams chosen by thousands of students for daily practice.',
        ja: '毎日何千人もの学生に選ばれている最も人気のある資格試験。',
    },
    viewAllExams: { vi: 'Xem tất cả đề thi', en: 'View all exams', ja: 'すべての試験を見る' },
    whyChooseUs: { vi: 'Tại sao chọn chúng tôi?', en: 'Why choose us?', ja: '選ばれる理由' },
    whyDesc: {
        vi: 'Nền tảng được thiết kế tối ưu giúp bạn đạt điểm số cao nhất.',
        en: 'Platform optimized to help you achieve the highest score.',
        ja: '最高得点を達成するために最適化されたプラットフォーム。',
    },
    readyForExam: { vi: 'Bạn đã sẵn sàng cho kỳ thi?', en: 'Ready for the exam?', ja: '試験の準備はできましたか？' },
    readyDesc: {
        vi:
            'Đăng ký tài khoản miễn phí để lưu kết quả, theo dõi tiến độ học tập và mở khóa thêm nhiều đề thi chất lượng cao.',
        en: 'Register a free account to save results, track learning progress, and unlock more high-quality exams.',
        ja: '無料アカウントを登録して、結果を保存し、学習の進捗を追跡し、さらに高品質な試験をアンロックしましょう。',
    },
    createAccount: { vi: 'Tạo tài khoản ngay', en: 'Create Account', ja: 'アカウント作成' },
    exploreExams: { vi: 'Khám phá đề thi', en: 'Explore Exams', ja: '試験を探す' },
    viewDetails: { vi: 'Xem chi tiết', en: 'View Details', ja: '詳細を見る' },
    minutes: { vi: 'phút', en: 'minutes', ja: '分' },

    // Features
    feat1Title: { vi: 'Đề thi sát thực tế', en: 'Realistic Exams', ja: '実践的な試験' },
    feat1Desc: {
        vi:
            'Ngân hàng câu hỏi khổng lồ, được cập nhật liên tục bám sát cấu trúc đề thi mới nhất của các tổ chức giáo dục.',
        en:
            'A massive question bank, continuously updated closely following the latest exam structure of educational organizations.',
        ja: '教育機関の最新の試験構成に沿って継続的に更新される膨大な問題バンク。',
    },
    feat2Title: { vi: 'Đa dạng chứng chỉ', en: 'Diverse Certificates', ja: '多様な資格' },
    feat2Desc: {
        vi: 'Từ ngoại ngữ (IELTS, TOEIC), chứng chỉ IT (AWS, Cisco) đến các chứng chỉ chuyên ngành kế toán, tài chính.',
        en:
            'From foreign languages (IELTS, TOEIC), IT certificates (AWS, Cisco) to specialized accounting and finance certificates.',
        ja: '外国語（IELTS、TOEIC）、IT資格（AWS、Cisco）から会計、財務の専門資格まで。',
    },
    feat3Title: { vi: 'Giao diện thông minh', en: 'Smart Interface', ja: 'スマートなインターフェース' },
    feat3Desc: {
        vi:
            'Môi trường thi thử giả lập 99% thực tế, đếm ngược thời gian, chấm điểm tự động và phân tích kết quả chi tiết.',
        en: '99% realistic mock exam environment, countdown timer, automatic scoring, and detailed result analysis.',
        ja: '99％リアルな模擬試験環境、カウントダウンタイマー、自動採点、詳細な結果分析。',
    },

    // Footer
    footerDesc: {
        vi:
            'Nền tảng luyện thi trực tuyến hàng đầu với kho đề thi đa dạng, chất lượng cao giúp bạn đạt kết quả tốt nhất trong các kỳ thi chứng chỉ quốc tế.',
        en:
            'The leading online exam preparation platform with a diverse, high-quality exam bank to help you achieve the best results in international certification exams.',
        ja:
            '国際資格試験で最高の結果を達成するのに役立つ、多様で高品質な試験バンクを備えた主要なオンライン試験対策プラットフォーム。',
    },
    allRightsReserved: {
        vi: 'Bảo lưu mọi quyền.',
        en: 'All rights reserved.',
        ja: '無断転載を禁じます。',
    },
    categories: { vi: 'Danh mục', en: 'Categories', ja: 'カテゴリー' },
    foreignLang: { vi: 'Ngoại Ngữ', en: 'Foreign Languages', ja: '外国語' },
    itComp: { vi: 'Công Nghệ Thông Tin', en: 'Information Technology', ja: '情報技術' },
    business: { vi: 'Kinh Doanh', en: 'Business', ja: 'ビジネス' },
    support: { vi: 'Hỗ trợ', en: 'Support', ja: 'サポート' },
    userGuide: { vi: 'Hướng dẫn sử dụng', en: 'User Guide', ja: '利用ガイド' },
    faq: { vi: 'Câu hỏi thường gặp', en: 'FAQ', ja: 'よくある質問' },
    contact: { vi: 'Liên hệ', en: 'Contact', ja: 'お問い合わせ' },

    // Categories
    cat_all: { vi: 'Tất cả', en: 'All', ja: 'すべて' },
    cat_english: { vi: 'Ngoại Ngữ', en: 'Foreign Languages', ja: '外国語' },
    cat_it: { vi: 'Công Nghệ Thông Tin', en: 'IT', ja: '情報技術' },
    cat_business: { vi: 'Kinh Doanh & Tài Chính', en: 'Business & Finance', ja: 'ビジネス・金融' },

    // Exam List
    examLibrary: { vi: 'Thư viện đề thi', en: 'Exam Library', ja: '試験ライブラリ' },
    examLibDesc: {
        vi: 'Hơn 500+ đề thi chứng chỉ quốc tế được cập nhật thường xuyên từ các nguồn uy tín.',
        en: 'Over 500+ international certification exams regularly updated from reputable sources.',
        ja: '信頼できるソースから定期的に更新される500以上の国際認定試験。',
    },
    searchExams: {
        vi: 'Tìm kiếm đề thi, chứng chỉ...',
        en: 'Search exams, certificates...',
        ja: '試験、資格を検索...',
    },
    found: { vi: 'Tìm thấy', en: 'Found', ja: '見つかった' },
    examsCount: { vi: 'đề thi', en: 'exams', ja: '試験' },
    latest: { vi: 'Mới nhất', en: 'Latest', ja: '最新' },
    questions: { vi: 'câu hỏi', en: 'questions', ja: '質問' },
    takeExamNow: { vi: 'Thi ngay', en: 'Take Exam', ja: '今すぐ受験' },
    noResults: { vi: 'Không tìm thấy kết quả', en: 'No results found', ja: '結果が見つかりません' },
    noResultsDesc: {
        vi: 'Không có đề thi nào phù hợp với từ khóa',
        en: 'No exams match the keyword',
        ja: 'キーワードに一致する試験はありません',
    },
    clearFilter: { vi: 'Xóa bộ lọc', en: 'Clear filters', ja: 'フィルターをクリア' },

    // Exam Detail & Take Exam & Result
    back: { vi: 'Quay lại', en: 'Back', ja: '戻る' },
    notFoundExam: { vi: 'Không tìm thấy đề thi', en: 'Exam not found', ja: '試験が見つかりません' },
    examNotFoundDesc: {
        vi: 'Đề thi bạn yêu cầu không tồn tại hoặc đã bị xóa.',
        en: 'The requested exam does not exist or has been deleted.',
        ja: 'リクエストされた試験は存在しないか、削除されました。',
    },
    backToList: { vi: 'Trở về danh sách', en: 'Back to list', ja: 'リストに戻る' },
    time: { vi: 'Thời gian', en: 'Time', ja: '時間' },
    questionCount: { vi: 'Số câu hỏi', en: 'Questions', ja: '質問数' },
    participants: { vi: 'Lượt thi', en: 'Participants', ja: '参加者' },
    rating: { vi: 'Đánh giá', en: 'Rating', ja: '評価' },
    intro: { vi: 'Giới thiệu chung', en: 'Introduction', ja: '概要' },
    examNotice: { vi: 'Lưu ý trước khi làm bài', en: 'Notice before taking the exam', ja: '受験前の注意事項' },
    notice1: {
        vi: 'Hãy chuẩn bị môi trường yên tĩnh, đảm bảo kết nối internet ổn định để không làm gián đoạn bài làm.',
        en: 'Please prepare a quiet environment, ensure stable internet connection to not interrupt the exam.',
        ja: '静かな環境を準備し、安定したインターネット接続を確保して、試験が中断されないようにしてください。',
    },
    notice2: {
        vi: 'Khi ấn nút "Bắt đầu thi", thời gian sẽ lập tức đếm ngược và không thể tạm dừng.',
        en: 'When clicking "Start Exam", the time will immediately count down and cannot be paused.',
        ja: '「試験開始」ボタンを押すと、時間はすぐにカウントダウンを開始し、一時停止することはできません。',
    },
    notice3: {
        vi: 'Bài thi sẽ tự động nộp khi hết thời gian quy định hoặc khi bạn chọn nút nộp bài.',
        en: 'The exam will automatically submit when the time is up or when you click the submit button.',
        ja: '制限時間が終了するか、提出ボタンをクリックすると、試験は自動的に提出されます。',
    },
    startDoingExam: { vi: 'Bắt đầu làm bài', en: 'Start Exam', ja: '試験を開始' },
    introDesc: {
        vi:
            'Đề thi được biên soạn kỹ lưỡng bởi đội ngũ chuyên gia, mô phỏng hoàn toàn cấu trúc, độ khó và thời gian của kỳ thi thật. Hoàn thành bài thi giúp bạn đánh giá năng lực hiện tại, làm quen với áp lực phòng thi và tối ưu hóa điểm số.',
        en:
            'The exam is carefully compiled by a team of experts, completely simulating the structure, difficulty and time of the real exam. Completing the exam helps you evaluate your current ability, get used to the pressure of the exam room and optimize your score.',
        ja:
            '試験は専門家チームによって慎重に編集され、実際の試験の構造、難易度、時間を完全にシミュレートしています。試験を完了すると、現在の能力を評価し、試験室のプレッシャーに慣れ、スコアを最適化するのに役立ちます。',
    },
    question: { vi: 'Câu', en: 'Question', ja: '質問' },
    submitExam: { vi: 'Nộp bài', en: 'Submit', ja: '提出' },
    submitting: { vi: 'Đang nộp...', en: 'Submitting...', ja: '提出中...' },
    confirmSubmit: {
        vi: 'Bạn có chắc chắn muốn nộp bài ngay bây giờ?',
        en: 'Are you sure you want to submit now?',
        ja: '今すぐ提出してもよろしいですか？',
    },
    prevQuestion: { vi: 'Câu trước', en: 'Previous', ja: '前へ' },
    nextQuestion: { vi: 'Câu sau', en: 'Next', ja: '次へ' },
    questionList: { vi: 'Danh sách câu hỏi', en: 'Question List', ja: '質問リスト' },
    answered: { vi: 'Đã trả lời', en: 'Answered', ja: '回答済み' },
    unanswered: { vi: 'Chưa trả lời', en: 'Unanswered', ja: '未回答' },
    currentQuestion: { vi: 'Đang làm', en: 'Current', ja: '現在の質問' },
    examResultNotFound: { vi: 'Không tìm thấy kết quả', en: 'Result not found', ja: '結果が見つかりません' },
    examCompleted: { vi: 'Hoàn thành bài thi!', en: 'Exam Completed!', ja: '試験完了！' },
    scoreLabel: { vi: 'Điểm', en: 'Score', ja: 'スコア' },
    correctAnswers: { vi: 'Câu đúng', en: 'Correct', ja: '正解' },
    wrongAnswers: { vi: 'Câu sai', en: 'Incorrect', ja: '不正解' },
    retry: { vi: 'Làm lại', en: 'Retry', ja: 'やり直す' },
    viewDetailsBtn: { vi: 'Xem chi tiết', en: 'View Details', ja: '詳細を見る' },
    reviewAnswers: { vi: 'Xem lại bài làm', en: 'Review Answers', ja: '回答をレビュー' },

    // Materials
    studyMaterials: { vi: 'Tài liệu ôn thi', en: 'Study Materials', ja: '学習資料' },
    materialsDesc: {
        vi: 'Khám phá kho tài liệu phong phú giúp bạn đạt điểm cao.',
        en: 'Explore a rich repository of materials to help you score high.',
        ja: '高得点に役立つ豊富な資料を探索してください。',
    },
    searchMaterials: { vi: 'Tìm kiếm tài liệu...', en: 'Search materials...', ja: '資料を検索...' },
    allMaterials: { vi: 'Tất cả tài liệu', en: 'All Materials', ja: 'すべての資料' },
    ebooksPdf: { vi: 'Ebooks & PDF', en: 'Ebooks & PDF', ja: 'Ebooks & PDF' },
    videoLectures: { vi: 'Video bài giảng', en: 'Video Lectures', ja: 'ビデオ講義' },
    downloads: { vi: 'lượt tải', en: 'downloads', ja: 'ダウンロード' },
    views: { vi: 'lượt xem', en: 'views', ja: '視聴回数' },
    download: { vi: 'Tải xuống', en: 'Download', ja: 'ダウンロード' },
    watchNow: { vi: 'Xem ngay', en: 'Watch Now', ja: '今すぐ見る' },
    noMaterialsFound: {
        vi: 'Không tìm thấy tài liệu phù hợp.',
        en: 'No matching materials found.',
        ja: '一致する資料は見つかりませんでした。',
    },

    // Flashcards
    flashcardLib: { vi: 'Kho Flashcard Ôn Tập', en: 'Flashcard Library', ja: 'フラッシュカードライブラリ' },
    flashcardDesc: {
        vi:
            'Ghi nhớ từ vựng và khái niệm IT Passport, FE và Tiếng Nhật dễ dàng hơn với phương pháp lặp lại ngắt quãng (Spaced Repetition).',
        en: 'Memorize IT Passport, FE and Japanese vocabulary and concepts more easily with Spaced Repetition method.',
        ja: '間隔反復（Spaced Repetition）法を使用して、ITパスポート、FE、日本語の語彙と概念をより簡単に記憶します。',
    },
    cards: { vi: 'thẻ', en: 'cards', ja: 'カード' },
    createdBy: { vi: 'Tạo bởi:', en: 'Created by:', ja: '作成者:' },
    studyNow: { vi: 'Học ngay', en: 'Study Now', ja: '今すぐ学習' },
    term: { vi: 'Thuật ngữ', en: 'Term', ja: '用語' },
    definition: { vi: 'Định nghĩa', en: 'Definition', ja: '定義' },
    clickToFlip: { vi: 'Nhấp để lật thẻ', en: 'Click to flip', ja: 'クリックして裏返す' },
    showHint: { vi: 'Hiện ví dụ / gợi ý', en: 'Show hint / example', ja: 'ヒント / 例文を表示' },
    hint: { vi: 'Gợi ý', en: 'Hint', ja: 'ヒント' },
    notRemembered: { vi: 'Chưa nhớ', en: 'Not remembered', ja: 'まだ覚えていない' },
    repeatLater: { vi: 'Lặp lại sau', en: 'Repeat later', ja: '後で繰り返す' },
    remembered: { vi: 'Đã nhớ', en: 'Remembered', ja: '覚えた' },
    completed: { vi: 'Hoàn thành', en: 'Completed', ja: '完了' },
    prev: { vi: 'Trước', en: 'Prev', ja: '前へ' },
    next: { vi: 'Tiếp', en: 'Next', ja: '次へ' },
    flipToSeeAnswer: { vi: 'Lật xem đáp án', en: 'Flip to see answer', ja: '裏返して答えを見る' },

    // Profile
    excellentStudent: { vi: 'Học viên tiêu biểu', en: 'Excellent Student', ja: '優秀な学生' },
    joined: { vi: 'Tham gia:', en: 'Joined:', ja: '参加日:' },
    completedExams: { vi: 'Đã làm', en: 'Completed', ja: '完了' },
    accuracyRate: { vi: 'Tỉ lệ đúng', en: 'Accuracy', ja: '正解率' },
    studyHours: { vi: 'Giờ ôn luyện', en: 'Study Hours', ja: '学習時間' },
    avgScore: { vi: 'Điểm TB', en: 'Avg Score', ja: '平均点' },
    examHistory: { vi: 'Lịch sử thi', en: 'Exam History', ja: '試験履歴' },
    savedMaterials: { vi: 'Tài liệu đã lưu', en: 'Saved Materials', ja: '保存された資料' },
    statusCompleted: { vi: 'Hoàn thành', en: 'Completed', ja: '完了' },
    result: { vi: 'Kết quả', en: 'Result', ja: '結果' },
    correctCount: { vi: 'Số câu đúng', en: 'Correct Answers', ja: '正解数' },
    viewAllHistory: { vi: 'Xem tất cả lịch sử', en: 'View all history', ja: 'すべての履歴を見る' },
    noSavedMaterials: { vi: 'Chưa có tài liệu nào', en: 'No saved materials', ja: '保存された資料はありません' },
    noSavedMaterialsDesc: {
        vi: 'Bạn chưa lưu tài liệu học tập nào vào danh sách.',
        en: "You haven't saved any study materials to your list.",
        ja: 'リストに学習資料を保存していません。',
    },
    exploreMaterials: { vi: 'Khám phá tài liệu', en: 'Explore Materials', ja: '資料を探索する' },

    // Auth (Login / Register)
    welcomeBack: {
        vi: 'Chào mừng bạn quay lại hệ thống thi thử',
        en: 'Welcome back to the exam platform',
        ja: '試験システムへお帰りなさい',
    },
    emailAddress: { vi: 'Địa chỉ Email', en: 'Email Address', ja: 'メールアドレス' },
    password: { vi: 'Mật khẩu', en: 'Password', ja: 'パスワード' },
    rememberMe: { vi: 'Ghi nhớ đăng nhập', en: 'Remember me', ja: 'ログインを保持する' },
    forgotPassword: { vi: 'Quên mật khẩu?', en: 'Forgot password?', ja: 'パスワードをお忘れですか？' },
    orContinueWith: { vi: 'Hoặc tiếp tục với', en: 'Or continue with', ja: 'または次で続ける' },
    loginWithGoogle: { vi: 'Đăng nhập bằng Gmail', en: 'Login with Google', ja: 'Googleでログイン' },
    noAccount: { vi: 'Chưa có tài khoản?', en: "Don't have an account?", ja: 'アカウントを持っていませんか？' },
    registerNow: { vi: 'Đăng ký ngay', en: 'Register now', ja: '今すぐ登録' },
    createAccountHeader: { vi: 'Tạo tài khoản', en: 'Create Account', ja: 'アカウント作成' },
    joinNow: {
        vi: 'Tham gia ngay để bắt đầu luyện thi',
        en: 'Join now to start practicing',
        ja: '今すぐ参加して練習を始めましょう',
    },
    fullName: { vi: 'Họ và tên', en: 'Full Name', ja: '氏名' },
    phoneNumber: { vi: 'Số điện thoại', en: 'Phone Number', ja: '電話番号' },
    currentStatus: { vi: 'Tình trạng hiện tại', en: 'Current Status', ja: '現在の状況' },
    chooseStatus: { vi: 'Chọn tình trạng của bạn', en: 'Choose your status', ja: '状況を選択してください' },
    statusMS: { vi: 'Học sinh Trung học (THCS)', en: 'Middle School Student', ja: '中学生' },
    statusHS: { vi: 'Học sinh Cấp 3 (THPT)', en: 'High School Student', ja: '高校生' },
    statusUni: { vi: 'Sinh viên Đại học/Cao đẳng', en: 'University/College Student', ja: '大学生・専門学生' },
    statusGrad: { vi: 'Học viên Cao học', en: 'Graduate Student', ja: '大学院生' },
    statusWorking: { vi: 'Người đi làm', en: 'Working Professional', ja: '社会人' },
    statusOther: { vi: 'Khác', en: 'Other', ja: 'その他' },
    confirmPassword: { vi: 'Xác nhận mật khẩu', en: 'Confirm Password', ja: 'パスワードの確認' },
    registerBtn: { vi: 'Đăng ký tài khoản', en: 'Register Account', ja: 'アカウントを登録' },
    registerWithGoogle: { vi: 'Đăng ký bằng Gmail', en: 'Register with Google', ja: 'Googleで登録' },
    alreadyHaveAccount: {
        vi: 'Đã có tài khoản?',
        en: 'Already have an account?',
        ja: 'すでにアカウントをお持ちですか？',
    },
    backToLogin: { vi: 'Về đăng nhập', en: 'Back to login', ja: 'ログインに戻る' },
    passwordMismatch: {
        vi: 'Mật khẩu xác nhận không khớp!',
        en: 'Passwords do not match!',
        ja: 'パスワードが一致しません！',
    },

    // Blog
    community: { vi: 'Cộng đồng', en: 'Community', ja: 'コミュニティ' },
    whatsNew: { vi: 'Có gì mới?', en: "What's new?", ja: '最近どう？' },
    postBtn: { vi: 'Đăng', en: 'Post', ja: '投稿' },
    admin: { vi: 'Quản trị viên', en: 'Admin', ja: '管理者' },
    replies: { vi: 'bình luận', en: 'replies', ja: '返信' },
    likes: { vi: 'lượt thích', en: 'likes', ja: 'いいね' },
    endOfFeed: { vi: 'Bạn đã xem hết nội dung!', en: 'You have caught up!', ja: 'すべてのコンテンツを見ました！' },
    thread: { vi: 'Bài viết', en: 'Thread', ja: 'スレッド' },
    replyTo: { vi: 'Trả lời', en: 'Reply to', ja: '返信先' },
    justNow: { vi: 'Vừa xong', en: 'Just now', ja: 'たった今' },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('vi');
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('app_language');
            if (saved) {
                setLanguage(saved as Language);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('app_language', language);
        }
    }, [language, isMounted]);

    const t = (key: string) => {
        if (translations[key]) {
            return translations[key][language];
        }
        return key;
    };

    return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
