INSERT INTO categories (id, name)
VALUES ('english', 'Ngoại Ngữ'),
       ('it', 'Công Nghệ Thông Tin'),
       ('business', 'Kinh Doanh & Tài Chính');

INSERT INTO exams (id, title, category_id, image, duration, question_count, description, participants, rating)
VALUES ('toeic-1',
        '{
          "vi": "Đề thi thử TOEIC Format 2024 - Test 1",
          "en": "TOEIC Practice Test Format 2024 - Test 1",
          "ja": "TOEIC 模擬試験フォーマット2024 - テスト1"
        }',
        'english',
        'https://images.unsplash.com/photo-1567206163313-9e34c830557a?q=80&w=1080',
        120,
        200,
        '{
          "vi": "Đề thi TOEIC theo chuẩn cấu trúc mới nhất, bao gồm 100 câu Nghe và 100 câu Đọc.",
          "en": "TOEIC exam following the latest structure, including 100 Listening and 100 Reading questions.",
          "ja": "最新の構成に準拠したTOEIC試験。リスニング100問とリーディング100問を含みます。"
        }',
        12540,
        4.8),
       ('ielts-1',
        '{
          "vi": "IELTS Academic Reading Practice Test 1",
          "en": "IELTS Academic Reading Practice Test 1",
          "ja": "IELTS アカデミックリーディング 模擬試験 1"
        }',
        'english',
        'https://images.unsplash.com/photo-1568650136602-ded24b86c5af?q=80&w=1080',
        60,
        40,
        '{
          "vi": "Bài thi thử kỹ năng Đọc IELTS Academic với 3 đoạn văn có độ khó tương đương đề thi thật.",
          "en": "IELTS Academic Reading practice test with 3 passages equivalent in difficulty to the real exam.",
          "ja": "本試験と同等の難易度の3つのパッセージを含むIELTSアカデミックリーディング模擬試験。"
        }',
        8430,
        4.9),
       ('aws-cp',
        '{
          "vi": "AWS Certified Cloud Practitioner (CLF-C02)",
          "en": "AWS Certified Cloud Practitioner (CLF-C02)",
          "ja": "AWS 認定 クラウドプラクティショナー (CLF-C02)"
        }',
        'it',
        'https://images.unsplash.com/photo-1675495666589-94cdafbcfcc8?q=80&w=1080',
        90,
        65,
        '{
          "vi": "Đề thi thử chứng chỉ AWS Cloud Practitioner. Bao gồm các câu hỏi về AWS Cloud concept, Security, Technology, và Billing.",
          "en": "AWS Cloud Practitioner certification practice test. Includes questions on AWS Cloud concept, Security, Technology, and Billing.",
          "ja": "AWS Cloud Practitioner 認定模擬試験。AWS Cloudコンセプト、セキュリティ、テクノロジー、請求に関する質問を含みます。"
        }',
        5320,
        4.7),
       ('pmp-1',
        '{
          "vi": "PMP Certification Mock Exam - Trọn bộ",
          "en": "PMP Certification Mock Exam - Full",
          "ja": "PMP 認定 模擬試験 - フルセット"
        }',
        'business',
        'https://images.unsplash.com/photo-1758691736545-5c33b6255dca?q=80&w=1080',
        230,
        180,
        '{
          "vi": "Đề thi thử chứng chỉ quản lý dự án quốc tế PMP, bám sát PMBOK Guide mới nhất.",
          "en": "International PMP project management certification practice test, closely following the latest PMBOK Guide.",
          "ja": "最新のPMBOKガイドに準拠した国際PMPプロジェクト管理認定模擬試験。"
        }',
        3200,
        4.6)