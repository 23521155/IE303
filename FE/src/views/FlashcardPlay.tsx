'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, X, Check, Eye, ChevronLeft, ChevronRight, RotateCcw, Trophy } from 'lucide-react';

// Dữ liệu mock
// Dữ liệu mock: Key là ID của bộ Flashcard (tương ứng với trang danh sách)
const FLASHCARD_DATABASE: Record<string, any[]> = {
    // ─── BỘ 1: IT Passport (Tập trung Chiến lược, Quản lý, CNTT Cơ bản) ───────────
    '1': [
        { id: 101, front: 'SLA (Service Level Agreement)', back: 'Thỏa thuận mức dịch vụ: Cam kết giữa nhà cung cấp và khách hàng về chất lượng dịch vụ (uptime, thời gian phản hồi).', hint: 'Ví dụ: Đảm bảo server uptime 99.9%.' },
        { id: 102, front: 'RFP (Request For Proposal)', back: 'Yêu cầu đề xuất: Tài liệu yêu cầu các nhà cung cấp gửi đề xuất (giải pháp, báo giá) cho một dự án IT.', hint: 'Bước đầu tiên để chọn nhà thầu.' },
        { id: 103, front: 'BPO (Business Process Outsourcing)', back: 'Thuê ngoài quy trình kinh doanh: Giao phó một phần quy trình nghiệp vụ (CSKH, kế toán) cho bên thứ 3.', hint: 'Giúp tập trung vào năng lực cốt lõi.' },
        { id: 104, front: 'TCO (Total Cost of Ownership)', back: 'Tổng chi phí sở hữu: Chi phí mua sắm ban đầu + chi phí vận hành, bảo trì suốt vòng đời hệ thống.', hint: 'Không chỉ nhìn vào giá mua thiết bị ban đầu.' },
        { id: 105, front: 'BCP (Business Continuity Plan)', back: 'Kế hoạch kinh doanh liên tục: Kế hoạch phục hồi nhanh chóng khi có thảm họa (thiên tai, mạng).', hint: 'Đảm bảo doanh nghiệp không bị "chết" khi có biến cố.' },
        { id: 106, front: 'NDA (Non-Disclosure Agreement)', back: 'Thỏa thuận bảo mật thông tin: Hợp đồng pháp lý nhằm đảm bảo không tiết lộ thông tin mật.', hint: 'Thường ký trước khi bắt đầu dự án.' },
        { id: 107, front: 'ERP (Enterprise Resource Planning)', back: 'Hệ thống hoạch định nguồn lực: Phần mềm quản lý tích hợp mọi hoạt động cốt lõi (nhân sự, kế toán, sản xuất).', hint: 'SAP, Oracle ERP là các ví dụ điển hình.' },
        { id: 108, front: 'SWOT Analysis', back: 'Phân tích SWOT: Phân tích chiến lược dựa trên Strengths (Mạnh), Weaknesses (Yếu), Opportunities (Cơ hội), Threats (Thách thức).', hint: 'Đánh giá vị thế cạnh tranh.' },
        { id: 109, front: 'Phishing', back: 'Tấn công giả mạo: Giả danh tổ chức uy tín (ngân hàng) qua email để lừa người dùng cung cấp mật khẩu.', hint: 'Tuyệt đối không click vào link lạ trong email.' },
        { id: 110, front: 'Ransomware', back: 'Mã độc tống tiền: Mã hóa dữ liệu của nạn nhân và yêu cầu tiền chuộc để lấy lại quyền truy cập.', hint: 'WannaCry là một ví dụ nổi tiếng.' },
        { id: 111, front: 'CRM (Customer Relationship Management)', back: 'Quản trị quan hệ khách hàng: Hệ thống quản lý thông tin và lịch sử tương tác khách hàng để tăng doanh thu.', hint: 'Ví dụ: Salesforce, HubSpot.' },
        { id: 112, front: 'SCM (Supply Chain Management)', back: 'Quản lý chuỗi cung ứng: Quản lý luồng hàng hóa từ nguyên liệu thô đến sản phẩm cuối cùng đến tay khách hàng.', hint: 'Tối ưu hóa logistics và kho bãi.' },
        { id: 113, front: 'PDCA Cycle', back: 'Chu trình PDCA: Phương pháp quản lý liên tục cải tiến quy trình: Plan (Lập kế hoạch) -> Do (Thực hiện) -> Check (Kiểm tra) -> Act (Hành động).', hint: 'Cốt lõi của quản lý chất lượng (ISO).' },
        { id: 114, front: 'KPI (Key Performance Indicator)', back: 'Chỉ số đánh giá thực hiện công việc: Các số liệu dùng để đo lường mức độ hiệu quả của một chiến dịch hoặc tổ chức.', hint: 'Ví dụ: Số lượng khách hàng mới mỗi tháng.' },
        { id: 115, front: 'SaaS (Software as a Service)', back: 'Phần mềm như một dịch vụ: Mô hình cung cấp phần mềm qua Internet, người dùng không cần cài đặt mà dùng qua trình duyệt.', hint: 'Ví dụ: Google Workspace, Office 365.' },
        { id: 116, front: 'PaaS (Platform as a Service)', back: 'Nền tảng như một dịch vụ: Cung cấp môi trường (OS, database, web server) trên cloud để lập trình viên phát triển ứng dụng.', hint: 'Ví dụ: Heroku, Google App Engine.' },
        { id: 117, front: 'IaaS (Infrastructure as a Service)', back: 'Hạ tầng như một dịch vụ: Cung cấp tài nguyên phần cứng ảo hóa (server, mạng, lưu trữ) qua Internet.', hint: 'Ví dụ: Amazon EC2, Azure Virtual Machines.' },
        { id: 118, front: 'ISMS (Information Security Management System)', back: 'Hệ thống quản lý an toàn thông tin: Khung quy tắc để quản lý, bảo vệ thông tin nhạy cảm của tổ chức.', hint: 'Tiêu chuẩn ISO 27001.' },
        { id: 119, front: 'SSO (Single Sign-On)', back: 'Đăng nhập một lần: Cơ chế cho phép người dùng dùng một tài khoản để đăng nhập vào nhiều hệ thống khác nhau.', hint: 'Ví dụ: Đăng nhập bằng Google/Facebook.' },
        { id: 120, front: 'Digital Signature', back: 'Chữ ký số: Kỹ thuật mã hóa dùng để xác thực tính toàn vẹn của dữ liệu và danh tính người gửi.', hint: 'Chống từ chối trách nhiệm (Non-repudiation).' }
    ],

    // ─── BỘ 2: FE Exam (Tập trung Thuật toán, Kiến trúc, Mạng, DB, Test) ──────────
    '2': [
        { id: 201, front: 'Agile Development', back: 'Phương pháp phát triển linh hoạt: Phát triển lặp đi lặp lại (iterations) và bàn giao phần mềm theo từng phần nhỏ.', hint: 'Thích ứng nhanh với thay đổi yêu cầu.' },
        { id: 202, front: 'Waterfall Model', back: 'Mô hình thác nước: Phương pháp phát triển tuần tự, mỗi giai đoạn phải xong trước khi chuyển sang giai đoạn tiếp.', hint: 'Khó thay đổi yêu cầu khi dự án đang chạy.' },
        { id: 203, front: 'WBS (Work Breakdown Structure)', back: 'Cấu trúc phân chia công việc: Phân rã dự án lớn thành các công việc nhỏ hơn để dễ quản lý.', hint: 'Công cụ cốt lõi trong lập kế hoạch dự án.' },
        { id: 204, front: 'DevOps', back: 'Kết hợp Development & Operations: Văn hóa rút ngắn vòng đời phát triển và phân phối liên tục (CI/CD).', hint: 'Tự động hóa là yếu tố then chốt.' },
        { id: 205, front: 'White-box Testing', back: 'Kiểm thử hộp trắng: Người kiểm thử biết rõ cấu trúc nội bộ, mã nguồn và luồng logic.', hint: 'Thường do chính lập trình viên thực hiện (Unit Test).' },
        { id: 206, front: 'Black-box Testing', back: 'Kiểm thử hộp đen: Chỉ dựa trên đầu vào/đầu ra mà không cần biết logic mã nguồn bên trong.', hint: 'Kiểm thử dựa trên chức năng (Functional testing).' },
        { id: 207, front: 'OSI Model', back: 'Mô hình OSI: Mô hình 7 tầng truyền tải mạng (Physical, Data Link, Network, Transport, Session, Presentation, Application).', hint: 'Tầng 3 là Network (IP), Tầng 4 là Transport (TCP).' },
        { id: 208, front: 'Primary Key', back: 'Khóa chính: Cột trong bảng CSDL dùng để xác định duy nhất mỗi hàng (record).', hint: 'Không chứa giá trị NULL và không trùng lặp.' },
        { id: 209, front: 'Foreign Key', back: 'Khóa ngoại: Cột trỏ đến Khóa chính của bảng khác để liên kết dữ liệu.', hint: 'Đảm bảo tính toàn vẹn tham chiếu.' },
        { id: 210, front: 'Big O Notation', back: 'Ký hiệu Big O: Biểu diễn độ phức tạp thời gian/không gian của thuật toán khi dữ liệu đầu vào tăng.', hint: 'Ví dụ: O(1), O(n), O(n log n).' },
        { id: 211, front: 'Stack (Cấu trúc dữ liệu)', back: 'Ngăn xếp: Cấu trúc dữ liệu hoạt động theo nguyên tắc LIFO (Last In, First Out - Vào sau ra trước).', hint: 'Giống như xếp chồng đĩa, lấy đĩa trên cùng ra trước.' },
        { id: 212, front: 'Queue (Cấu trúc dữ liệu)', back: 'Hàng đợi: Cấu trúc dữ liệu hoạt động theo nguyên tắc FIFO (First In, First Out - Vào trước ra trước).', hint: 'Giống như xếp hàng mua vé.' },
        { id: 213, front: 'RAID 0', back: 'Kỹ thuật lưu trữ Striping: Dữ liệu được chia nhỏ và ghi đồng thời lên nhiều ổ cứng để tăng tốc độ đọc/ghi.', hint: 'Không có khả năng chịu lỗi (1 ổ hỏng là mất hết).' },
        { id: 214, front: 'RAID 1', back: 'Kỹ thuật lưu trữ Mirroring: Dữ liệu được ghi giống hệt nhau lên 2 ổ cứng khác nhau để dự phòng.', hint: 'Chịu lỗi tốt nhưng tốn kém (hiệu suất lưu trữ chỉ 50%).' },
        { id: 215, front: 'RAID 5', back: 'Kỹ thuật lưu trữ Striping with Parity: Dữ liệu và mã kiểm tra lỗi (Parity) được phân tán trên tối thiểu 3 ổ cứng.', hint: 'Cân bằng giữa tốc độ, dung lượng và an toàn.' },
        { id: 216, front: 'Normalization (Chuẩn hóa DB)', back: 'Quá trình thiết kế CSDL để giảm thiểu dư thừa dữ liệu và ngăn chặn các bất thường khi Thêm/Sửa/Xóa.', hint: 'Các dạng chuẩn: 1NF, 2NF, 3NF.' },
        { id: 217, front: 'ACID Properties', back: '4 tính chất của một giao dịch CSDL an toàn: Atomicity (Nguyên tử), Consistency (Nhất quán), Isolation (Độc lập), Durability (Bền vững).', hint: 'Cốt lõi của các hệ quản trị CSDL quan hệ (RDBMS).' },
        { id: 218, front: 'TCP vs UDP', back: 'TCP: Giao thức truyền tin cậy, có kiểm tra lỗi (chậm hơn). UDP: Giao thức truyền không tin cậy, không kiểm tra lỗi (nhanh hơn).', hint: 'TCP dùng cho Web/Email. UDP dùng cho Livestream/Game.' },
        { id: 219, front: 'Virtual Memory', back: 'Bộ nhớ ảo: Kỹ thuật dùng một phần dung lượng ổ cứng để mô phỏng bộ nhớ RAM khi RAM vật lý bị đầy.', hint: 'Sử dụng cơ chế Paging (Phân trang).' },
        { id: 220, front: 'Polymorphism (OOP)', back: 'Tính đa hình: Đặc trưng trong lập trình hường đối tượng cho phép các đối tượng thuộc các lớp khác nhau xử lý cùng một thông điệp (hàm) theo cách riêng của chúng.', hint: 'Cùng gọi hàm "Keu()", Chó sủa gâu gâu, Mèo kêu meo meo.' }
    ],

    // ─── BỘ 3: JLPT N3 (Từ vựng thường dùng trong công việc/IT) ───────────────────
    '3': [
        { id: 301, front: '確認 (かくにん)', back: 'Xác nhận (Confirmation)', hint: 'Vd: パスワードを確認する (Xác nhận mật khẩu)' },
        { id: 302, front: '設定 (せってい)', back: 'Cài đặt / Thiết lập (Setting)', hint: 'Vd: システム設定 (Cài đặt hệ thống)' },
        { id: 303, front: '変更 (へんこう)', back: 'Thay đổi (Change/Modification)', hint: 'Vd: スケジュールを変更する (Thay đổi lịch trình)' },
        { id: 304, front: '完了 (かんりょう)', back: 'Hoàn thành (Completion)', hint: 'Vd: インストールが完了しました (Đã hoàn tất cài đặt)' },
        { id: 305, front: '準備 (じゅんび)', back: 'Chuẩn bị (Preparation)', hint: 'Vd: 会議の準備をする (Chuẩn bị cho cuộc họp)' },
        { id: 306, front: '提出 (ていしゅつ)', back: 'Nộp / Trình bày (Submission)', hint: 'Vd: 期限までにレポートを提出する (Nộp báo cáo trước hạn)' },
        { id: 307, front: '報告 (ほうこく)', back: 'Báo cáo (Report)', hint: 'Vd: 進捗を報告する (Báo cáo tiến độ)' },
        { id: 308, front: '連絡 (れんらく)', back: 'Liên lạc (Contact/Communication)', hint: 'Vd: 担当者に連絡する (Liên lạc với người phụ trách)' },
        { id: 309, front: '相談 (そうだん)', back: 'Thảo luận / Bàn bạc (Consultation)', hint: 'Vd: 上司に相談する (Thảo luận với sếp)' },
        { id: 310, front: '影響 (えいきょう)', back: 'Ảnh hưởng (Influence/Effect)', hint: 'Vd: 他のシステムへの影響 (Ảnh hưởng đến hệ thống khác)' },
        { id: 311, front: '解決 (かいけつ)', back: 'Giải quyết (Resolution)', hint: 'Vd: 問題を解決する (Giải quyết vấn đề)' },
        { id: 312, front: '状態 (じょうたい)', back: 'Trạng thái / Tình trạng (Status/Condition)', hint: 'Vd: エラーの状態 (Trạng thái lỗi)' },
        { id: 313, front: '追加 (ついか)', back: 'Thêm vào (Addition)', hint: 'Vd: 新しい機能を追加する (Thêm tính năng mới)' },
        { id: 314, front: '削除 (さくじょ)', back: 'Xóa bỏ (Deletion)', hint: 'Vd: 古いデータを削除する (Xóa dữ liệu cũ)' },
        { id: 315, front: '保存 (ほぞん)', back: 'Lưu trữ (Save)', hint: 'Vd: 変更を保存する (Lưu thay đổi)' },
        { id: 316, front: '検索 (けんさく)', back: 'Tìm kiếm (Search)', hint: 'Vd: ファイルを検索する (Tìm kiếm file)' },
        { id: 317, front: '実行 (じっこう)', back: 'Thực thi / Chạy (Execution/Run)', hint: 'Vd: プログラムを実行する (Chạy chương trình)' },
        { id: 318, front: '成功 (せいこう)', back: 'Thành công (Success)', hint: 'Vd: テストに成功する (Test thành công)' },
        { id: 319, front: '失敗 (しっぱい)', back: 'Thất bại (Failure)', hint: 'Vd: ログインに失敗しました (Đăng nhập thất bại)' },
        { id: 320, front: '原因 (げんいん)', back: 'Nguyên nhân (Cause)', hint: 'Vd: エラーの原因を調べる (Điều tra nguyên nhân lỗi)' }
    ],

    // ─── BỘ 4: Tiếng Nhật IT (Phát triển phần mềm) ──────────────────────────────
    '4': [
        { id: 401, front: '要件定義 (ようけんていぎ)', back: 'Định nghĩa yêu cầu (Requirement Definition)', hint: 'Giai đoạn đầu tiên, chốt lại tính năng khách hàng muốn.' },
        { id: 402, front: '仕様書 (しようしょ)', back: 'Tài liệu đặc tả (Specification Document)', hint: 'Tài liệu mô tả chi tiết cách phần mềm hoạt động.' },
        { id: 403, front: '基本設計 (きほんせっけい)', back: 'Thiết kế cơ bản (Basic Design / High-level Design)', hint: 'Thiết kế kiến trúc hệ thống, luồng màn hình.' },
        { id: 404, front: '詳細設計 (しょうさいせっけい)', back: 'Thiết kế chi tiết (Detail Design)', hint: 'Thiết kế đến mức hàm, logic DB để coder code theo.' },
        { id: 405, front: '実装 (じっそう)', back: 'Triển khai / Lập trình (Implementation / Coding)', hint: 'Giai đoạn viết code (ソースコードを書く).' },
        { id: 406, front: '単体テスト (たんたいテスト)', back: 'Kiểm thử đơn vị (Unit Test - UT)', hint: 'Test từng hàm, từng module độc lập.' },
        { id: 407, front: '結合テスト (けつごうテスト)', back: 'Kiểm thử tích hợp (Integration Test - IT)', hint: 'Test xem các module ghép với nhau có chạy đúng không.' },
        { id: 408, front: '総合テスト (そうごうテスト)', back: 'Kiểm thử hệ thống (System Test - ST)', hint: 'Test toàn bộ hệ thống dựa trên yêu cầu ban đầu.' },
        { id: 409, front: '運用 (うんよう)', back: 'Vận hành (Operation)', hint: 'Đưa hệ thống vào sử dụng thực tế (Release).' },
        { id: 410, front: '保守 (ほしゅ)', back: 'Bảo trì (Maintenance)', hint: 'Sửa lỗi và nâng cấp sau khi đã vận hành.' },
        { id: 411, front: '変数 (へんすう)', back: 'Biến số (Variable)', hint: 'Ví dụ: var, let, const.' },
        { id: 412, front: '関数 (かんすう)', back: 'Hàm số (Function)', hint: 'Một khối code thực hiện tác vụ cụ thể.' },
        { id: 413, front: '引数 (ひきすう)', back: 'Tham số / Đối số (Argument / Parameter)', hint: 'Giá trị truyền vào hàm (ví dụ: function(a, b)).' },
        { id: 414, front: '戻り値 (もどりち)', back: 'Giá trị trả về (Return value)', hint: 'Giá trị hàm trả ra sau khi thực thi (return x).' },
        { id: 415, front: '文字列 (もじれつ)', back: 'Chuỗi ký tự (String)', hint: 'Ví dụ: "Hello World".' },
        { id: 416, front: '整数 (せいすう)', back: 'Số nguyên (Integer)', hint: 'Số không có phần thập phân (1, 2, 3).' },
        { id: 417, front: '配列 (はいれつ)', back: 'Mảng (Array)', hint: 'Tập hợp các phần tử cùng kiểu dữ liệu.' },
        { id: 418, front: '条件分岐 (じょうけんぶんき)', back: 'Rẽ nhánh điều kiện (Conditional Branching)', hint: 'Câu lệnh if-else, switch-case.' },
        { id: 419, front: '繰り返し (くりかえし)', back: 'Vòng lặp (Loop)', hint: 'Câu lệnh for, while.' },
        { id: 420, front: 'バグを修正する (しゅうせい)', back: 'Sửa lỗi (Fix a bug)', hint: 'Động từ 修正 (しゅうせい) = Chỉnh sửa / Khắc phục.' }
    ]
};

export function FlashcardPlay({ t, lang }: { t: any; lang: string }) {
    const params = useParams();
    // params.id có thể là chuỗi '1', '2'... tùy vào cấu trúc routing của bạn
    const id = params.id as string;

    // Lấy bộ thẻ dựa vào ID trên URL
    const currentDeck = FLASHCARD_DATABASE[id];

    // States điều hướng
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showHint, setShowHint] = useState(false);

    // States kết quả
    const [isCompleted, setIsCompleted] = useState(false);
    const [rememberedCount, setRememberedCount] = useState(0);

    // Xử lý Not Found nếu bộ bài không tồn tại
    if (!currentDeck || currentDeck.length === 0) {
        return (
            <div className="min-h-[85vh] bg-background flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-2xl font-bold text-secondary dark:text-white mb-4">Không tìm thấy bộ thẻ</h1>
                <p className="text-muted-foreground mb-6">Bộ Flashcard này không tồn tại hoặc đã bị xóa.</p>
                <Link
                    href={`/${lang}/flashcards`}
                    className="px-6 py-2 bg-primary text-white rounded-full font-medium"
                >
                    {t.backToList || 'Về thư viện'}
                </Link>
            </div>
        );
    }

    const currentCard = currentDeck[currentIndex];
    const progress = ((currentIndex + (isCompleted ? 1 : 0)) / currentDeck.length) * 100;
    const accuracy = Math.round((rememberedCount / currentDeck.length) * 100);

    // Chuyển câu bằng mũi tên (bỏ qua, không tính điểm)
    const handleNext = () => {
        if (currentIndex < currentDeck.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsFlipped(false);
            setShowHint(false);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsFlipped(false);
            setShowHint(false);
        }
    };

    // Đánh giá thẻ
    const handleGrade = (remembered: boolean) => {
        if (remembered) {
            setRememberedCount((prev) => prev + 1);
        }

        if (currentIndex < currentDeck.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setIsFlipped(false);
            setShowHint(false);
        } else {
            setIsCompleted(true);
        }
    };

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setShowHint(false);
        setIsCompleted(false);
        setRememberedCount(0);
    };

    const padded = (n: number) => String(n).padStart(2, '0');

    // Tên tiêu đề tạm để hiển thị (Bạn có thể map ID này với mảng FLASHCARD_DECKS trang danh sách)
    const deckTitles: Record<string, string> = {
        '1': 'IT Passport cơ bản',
        '2': 'Fundamental IT (FE)',
        '3': 'Từ vựng JLPT N3',
        '4': 'Tiếng Nhật IT'
    };

    return (
        <div className="min-h-[85vh] bg-background transition-colors duration-300 flex flex-col px-4 sm:px-6 lg:px-8 py-8 pb-32">
            <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
                {/* ─── Minimalist header ─────────────────────────────────── */}
                <div className="flex items-center justify-between mb-10">
                    <Link
                        href={`/${lang}/flashcards`}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t.backToList || 'Quay lại'}
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground hidden sm:block">
                            {deckTitles[id] || 'Flashcard'}
                        </span>
                        <div className="w-px h-4 bg-border hidden sm:block" />
                        <span className="font-mono text-sm tabular-nums text-foreground/70">
                            {isCompleted ? padded(currentDeck.length) : padded(currentIndex + 1)}{' '}
                            <span className="text-muted-foreground/40">/</span> {padded(currentDeck.length)}
                        </span>
                    </div>
                </div>

                {/* ─── Thin progress indicator ───────────────────────────── */}
                <div className="w-full h-[2px] bg-border/40 rounded-full mb-10 overflow-hidden">
                    <div
                        className="h-full bg-primary/60 transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* ─── Card canvas & Results Board ───────────────────────── */}
                <div
                    className={`relative flex-1 min-h-[420px] select-none ${!isCompleted ? 'cursor-pointer' : ''}`}
                    onClick={!isCompleted ? toggleFlip : undefined}
                >
                    <div className="absolute inset-0 rounded-[2rem] shadow-2xl pointer-events-none" />

                    {!isCompleted ? (
                        <>
                            {/* Front face — Question / Term */}
                            <div className="absolute inset-0 bg-white dark:bg-[#111827] border border-border/60 rounded-[2rem] flex flex-col items-center justify-center p-10 overflow-hidden">
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
                                    style={{
                                        backgroundImage:
                                            'radial-gradient(circle, var(--color-secondary) 1px, transparent 1px)',
                                        backgroundSize: '24px 24px',
                                    }}
                                />
                                <span className="relative font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground/50 mb-8">
                                    {t.term || 'Thuật ngữ'}
                                </span>
                                <h2 className="relative text-4xl md:text-5xl font-bold text-secondary dark:text-white text-center leading-tight">
                                    {currentCard.front}
                                </h2>
                                <p className="relative mt-10 flex items-center gap-2 text-[0.65rem] font-mono uppercase tracking-widest text-muted-foreground/35">
                                    <Eye className="w-3.5 h-3.5" />
                                    {t.clickToFlip || 'Nhấn để lật'}
                                </p>
                            </div>

                            {/* Back face — Answer / Definition — diagonal clip-path reveal */}
                            <div
                                className="absolute inset-0 bg-slate-50 dark:bg-[#1a2235] border border-border/60 rounded-[2rem] flex flex-col items-center justify-center p-10 overflow-hidden"
                                style={{
                                    clipPath: isFlipped ? 'circle(142% at 0% 0%)' : 'circle(0% at 0% 0%)',
                                    transition: 'clip-path 700ms ease-in-out',
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />

                                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-primary/60 mb-8">
                                    {t.definition || 'Định nghĩa'}
                                </span>
                                <p className="text-2xl md:text-3xl font-medium text-secondary dark:text-white text-center leading-relaxed max-w-xl">
                                    {currentCard.back}
                                </p>

                                {/* Hint */}
                                <div className="mt-10 w-full max-w-md">
                                    {!showHint ? (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowHint(true);
                                            }}
                                            className="mx-auto flex items-center gap-2 text-[0.65rem] font-mono uppercase tracking-widest text-muted-foreground/50 hover:text-foreground px-4 py-2 rounded-full border border-border/40 hover:border-border transition-colors cursor-pointer"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            {t.showHint || 'Xem gợi ý'}
                                        </button>
                                    ) : (
                                        <div className="bg-primary/5 dark:bg-primary/[0.08] p-5 rounded-2xl border border-primary/20 text-center animate-in fade-in duration-300">
                                            <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-primary/60 mb-2">
                                                {t.hint || 'Gợi ý'}
                                            </span>
                                            <p className="text-sm text-foreground/70 leading-relaxed">
                                                {currentCard.hint}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        /* ─── Results Board ─── */
                        <div className="absolute inset-0 bg-white dark:bg-[#111827] border border-border/60 rounded-[2rem] flex flex-col items-center justify-center p-10 overflow-hidden animate-in zoom-in-95 duration-500">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                <Trophy className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-3xl font-bold text-secondary dark:text-white mb-2">
                                {t.sessionComplete || 'Hoàn thành bài học!'}
                            </h2>
                            <p className="text-muted-foreground text-sm mb-10 text-center max-w-md">
                                Bạn đã ôn tập xong {currentDeck.length} thẻ. Dưới đây là kết quả đánh giá trí nhớ của
                                bạn.
                            </p>

                            <div className="grid grid-cols-2 gap-6 w-full max-w-xs">
                                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-2xl border border-border/50">
                                    <span className="font-mono text-3xl font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                                        {rememberedCount}
                                    </span>
                                    <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                                        {t.remembered || 'Đã thuộc'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-2xl border border-border/50">
                                    <span className="font-mono text-3xl font-semibold text-primary mb-1">
                                        {accuracy}%
                                    </span>
                                    <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                                        Độ chính xác
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── Floating Command Bar ──────────────────────────────────── */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-background/80 backdrop-blur-xl border border-border/60 rounded-full shadow-2xl p-1.5 flex items-center gap-0.5 transition-all duration-300">
                    {!isCompleted ? (
                        !isFlipped ? (
                            <>
                                <button
                                    onClick={handlePrev}
                                    disabled={currentIndex === 0}
                                    className="h-10 w-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
                                    aria-label={t.prev || 'Trang trước'}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <div className="w-px h-5 bg-border/60 mx-0.5 flex-shrink-0" />
                                <button
                                    onClick={toggleFlip}
                                    className="h-10 px-6 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
                                >
                                    {t.flipToSeeAnswer || 'Xem đáp án'}
                                </button>
                                <div className="w-px h-5 bg-border/60 mx-0.5 flex-shrink-0" />
                                <button
                                    onClick={handleNext}
                                    disabled={currentIndex === currentDeck.length - 1}
                                    className="h-10 w-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
                                    aria-label={t.next || 'Trang sau'}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => handleGrade(false)}
                                    className="h-10 px-5 rounded-full flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                    {t.notRemembered || 'Chưa thuộc'}
                                </button>
                                <div className="w-px h-5 bg-border/60 mx-0.5 flex-shrink-0" />
                                <button
                                    onClick={() => handleGrade(true)}
                                    className="h-10 px-5 rounded-full flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                                >
                                    <Check className="w-4 h-4" />
                                    {t.remembered || 'Đã thuộc'}
                                </button>
                            </>
                        )
                    ) : (
                        <>
                            <button
                                onClick={handleRestart}
                                className="h-10 px-5 rounded-full flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
                            >
                                <RotateCcw className="w-4 h-4" />
                                {t.studyAgain || 'Học lại'}
                            </button>
                            <div className="w-px h-5 bg-border/60 mx-0.5 flex-shrink-0" />
                            <Link
                                href={`/${lang}/flashcards`}
                                className="h-10 px-5 rounded-full flex items-center gap-2 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors cursor-pointer"
                            >
                                {t.backToLibrary || 'Về thư viện'}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
