INSERT INTO questions (id, exam_id, text, options, correct_answer, question_order)
VALUES ('q-toeic-001', 'toeic-1',
        'The new software update will be _____ to all employees tomorrow morning.',
        '["released", "releasing", "release", "releases"]',
        0, 1),

       ('q-toeic-002', 'toeic-1',
        'Mr. Anderson is responsible _____ training the new customer service representatives.',
        '["to", "for", "with", "about"]',
        1, 2),

       ('q-ielts-001', 'ielts-1',
        'According to the first paragraph, what was the primary motivation for the expedition?',
        '["To discover new trade routes", "To map the coastline", "To study local flora and fauna", "To establish a new colony"]',
        2, 1),

       ('q-ielts-002', 'ielts-1',
        'The word "mitigate" in paragraph 3 is closest in meaning to:',
        '["Worsen", "Alleviate", "Create", "Ignore"]',
        1, 2),

       ('q-aws-001', 'aws-cp',
        'Which AWS service is used to run Docker containers without needing to provision or manage servers?',
        '["Amazon EC2", "Amazon Elastic Container Service (ECS)", "AWS Fargate", "AWS Lambda"]',
        2, 1),

       ('q-aws-002', 'aws-cp',
        'What is a key financial benefit of the AWS Cloud computing model?',
        '["Fixed hardware capacity", "Pay-as-you-go pricing", "Elimination of operational expenses (OPEX)", "Long-term server contracts"]',
        1, 2),

       ('q-pmp-001', 'pmp-1',
        'Which document is issued by the project sponsor that formally authorizes the existence of a project?',
        '["Project Management Plan", "Project Charter", "Business Case", "Stakeholder Register"]',
        1, 1),

       ('q-pmp-002', 'pmp-1',
        'During which project management process group is the project scope baseline established?',
        '["Initiating", "Planning", "Executing", "Monitoring & Controlling"]',
        1, 2);

INSERT INTO exams (id, title, category_id, image, duration, question_count, description, participants, rating)
VALUES ('toeic-2', '{
      "vi": "Đề thi thử TOEIC Format 2024 - Test 2",
      "en": "TOEIC Practice Test Format 2024 - Test 2",
      "ja": "TOEIC 模擬試験フォーマット2024 - テスト2"
    }', 'english', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1080', 120, 200, '{
      "vi": "Bộ đề TOEIC nâng cao với trọng tâm ngữ pháp, từ vựng và đọc hiểu theo cấu trúc đề mới.",
      "en": "An advanced TOEIC set focusing on grammar, vocabulary, and reading comprehension based on the latest format.",
      "ja": "最新形式に基づく、文法・語彙・読解を重視したTOEIC上級問題集。"
    }', 9870, 4.8), ('aws-saa-1', '{
      "vi": "AWS Certified Solutions Architect Associate (SAA-C03)",
      "en": "AWS Certified Solutions Architect Associate (SAA-C03)",
      "ja": "AWS 認定 ソリューションアーキテクト アソシエイト (SAA-C03)"
    }', 'it', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1080', 130, 65, '{
      "vi": "Đề thi thử AWS Solutions Architect Associate, bao gồm kiến trúc, bảo mật, độ sẵn sàng cao và tối ưu chi phí.",
      "en": "AWS Solutions Architect Associate practice test covering architecture, security, high availability, and cost optimization.",
      "ja": "アーキテクチャ、セキュリティ、高可用性、コスト最適化を含むAWS SAA模擬試験。"
    }', 6140, 4.8), ('pmp-2', '{
      "vi": "PMP Certification Mock Exam - Advanced",
      "en": "PMP Certification Mock Exam - Advanced",
      "ja": "PMP 認定 模擬試験 - 上級"
    }', 'business', 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1080', 230, 180, '{
      "vi": "Đề thi PMP nâng cao tập trung vào quản lý phạm vi, tiến độ, rủi ro và stakeholder.",
      "en": "Advanced PMP practice test focusing on scope, schedule, risk, and stakeholder management.",
      "ja": "スコープ、スケジュール、リスク、ステークホルダー管理に焦点を当てたPMP上級模擬試験。"
    }', 4280, 4.7);

INSERT INTO questions (id, exam_id, text, options, correct_answer, question_order)
VALUES ('q-toeic-2-003', 'toeic-2',
        'The manager asked the team to _____ the report before the end of the day.',
        '["submit", "submitted", "submitting", "submits"]',
        0, 1),

       ('q-toeic-2-004', 'toeic-2',
        'Employees are expected to arrive _____ time for the morning briefing.',
        '["at", "in", "on", "for"]',
        2, 2),

       ('q-aws-saa-001', 'aws-saa-1',
        'Which AWS service is best suited for storing frequently accessed static website content with high durability?',
        '["Amazon RDS", "Amazon S3", "Amazon DynamoDB", "Amazon Redshift"]',
        1, 1),

       ('q-aws-saa-002', 'aws-saa-1',
        'Which AWS feature helps distribute traffic across multiple targets to improve availability?',
        '["Amazon Route 53", "Elastic Load Balancing", "AWS Direct Connect", "Amazon CloudFront"]',
        1, 2),

       ('q-pmp-003', 'pmp-2',
        'What is the primary purpose of a project risk register?',
        '["To track team attendance", "To document identified risks and responses", "To record project expenses only", "To define project scope baseline"]',
        1, 1),

       ('q-pmp-004', 'pmp-2',
        'Which process group is primarily responsible for coordinating people and resources to execute the project plan?',
        '["Initiating", "Planning", "Executing", "Closing"]',
        2, 2);

INSERT INTO exams (id, title, category_id, image, duration, question_count, description, participants, rating)
VALUES ('toeic-3',
        '{
          "vi": "Đề thi TOEIC Full Test 3",
          "en": "TOEIC Full Practice Test 3",
          "ja": "TOEIC 模擬試験 3"
        }',
        'english',
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1080',
        120, 200,
        '{
          "vi": "Đề TOEIC đầy đủ với phần nghe và đọc theo format mới.",
          "en": "Full TOEIC test with listening and reading sections.",
          "ja": "リスニングとリーディングを含む完全なTOEIC試験。"
        }',
        6520, 4.7),

       ('ielts-2',
        '{
          "vi": "IELTS Listening Practice Test 1",
          "en": "IELTS Listening Practice Test 1",
          "ja": "IELTS リスニング 模擬試験 1"
        }',
        'english',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1080',
        40, 40,
        '{
          "vi": "Bài thi nghe IELTS với 4 sections giống đề thật.",
          "en": "IELTS Listening test with 4 sections like the real exam.",
          "ja": "実際の試験と同様の4セクションのリスニングテスト。"
        }',
        7120, 4.8),

       ('java-core-1',
        '{
          "vi": "Java Core Fundamentals Test",
          "en": "Java Core Fundamentals Test",
          "ja": "Java 基礎テスト"
        }',
        'it',
        'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1080',
        60, 50,
        '{
          "vi": "Kiểm tra kiến thức Java cơ bản: OOP, collections, exception.",
          "en": "Test Java basics: OOP, collections, exceptions.",
          "ja": "OOP、コレクション、例外処理などのJava基礎。"
        }',
        3890, 4.6),

       ('spring-boot-1',
        '{
          "vi": "Spring Boot Practice Test",
          "en": "Spring Boot Practice Test",
          "ja": "Spring Boot 模擬試験"
        }',
        'it',
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1080',
        70, 60,
        '{
          "vi": "Bao gồm REST API, JPA, Security.",
          "en": "Includes REST API, JPA, Security.",
          "ja": "REST API、JPA、セキュリティを含む。"
        }',
        4210, 4.7),

       ('mba-1',
        '{
          "vi": "Business Fundamentals Test",
          "en": "Business Fundamentals Test",
          "ja": "ビジネス基礎テスト"
        }',
        'business',
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1080',
        90, 80,
        '{
          "vi": "Bao gồm marketing, finance, strategy.",
          "en": "Includes marketing, finance, and strategy.",
          "ja": "マーケティング、財務、戦略を含む。"
        }',
        2980, 4.5);

INSERT INTO questions (id, exam_id, text, options, correct_answer, question_order)
VALUES
    -- TOEIC
    ('q-toeic-3-005', 'toeic-3',
     'All employees must _____ their ID cards at all times.',
     '["wear", "wore", "wearing", "worn"]',
     0, 1),

    ('q-toeic-3-006', 'toeic-3',
     'The meeting has been _____ until next Monday.',
     '["delayed", "delay", "delays", "delaying"]',
     0, 2),

    -- IELTS
    ('q-ielts-003', 'ielts-2',
     'What is the main topic of the conversation?',
     '["Education", "Travel", "Health", "Technology"]',
     1, 1),

    ('q-ielts-004', 'ielts-2',
     'What does the speaker suggest?',
     '["Cancel the trip", "Change the schedule", "Book tickets", "Wait longer"]',
     1, 2),

    -- Java
    ('q-java-001', 'java-core-1',
     'Which keyword is used to inherit a class in Java?',
     '["implements", "extends", "inherits", "instanceof"]',
     1, 1),

    ('q-java-002', 'java-core-1',
     'Which collection does not allow duplicates?',
     '["List", "Set", "Map", "Queue"]',
     1, 2),

    ('q-java-003', 'java-core-1',
     'What is the size of int in Java?',
     '["16-bit", "32-bit", "64-bit", "Depends on system"]',
     1, 3),

    -- Spring Boot
    ('q-spring-001', 'spring-boot-1',
     'Which annotation is used to create REST controller?',
     '["@Controller", "@RestController", "@Service", "@Component"]',
     1, 1),

    ('q-spring-002', 'spring-boot-1',
     'Which layer handles database operations?',
     '["Controller", "Service", "Repository", "Config"]',
     2, 2),

    ('q-spring-003', 'spring-boot-1',
     'Spring Boot uses which default server?',
     '["Jetty", "Tomcat", "Undertow", "Netty"]',
     1, 3),

    -- Business
    ('q-mba-001', 'mba-1',
     'What is SWOT analysis used for?',
     '["Financial planning", "Strategic analysis", "HR management", "Sales tracking"]',
     1, 1),

    ('q-mba-002', 'mba-1',
     'What does ROI stand for?',
     '["Rate of Income", "Return on Investment", "Revenue of Interest", "Ratio of Income"]',
     1, 2),

    ('q-mba-003', 'mba-1',
     'Which is a marketing strategy?',
     '["Segmentation", "Compilation", "Execution", "Deployment"]',
     0, 3);

INSERT INTO questions (id, exam_id, text, options, correct_answer, question_order)
VALUES
    ('q-toeic-003', 'toeic-1', 'The marketing director has decided to _____ the annual conference until next month.', '["postpone", "cancel", "arrange", "advance"]', 0, 3),
    ('q-toeic-004', 'toeic-1', 'The client was _____ impressed with the quality of our latest prototype.', '["extreme", "extremity", "extremes", "extremely"]', 3, 4),
    ('q-toeic-005', 'toeic-1', 'All visitors must _____ their identification badges at the front desk upon arrival.', '["present", "presents", "presenting", "presented"]', 0, 5),
    ('q-toeic-006', 'toeic-1', 'The construction of the new office building was delayed _____ heavy rainfall.', '["because", "due to", "despite", "although"]', 1, 6),
    ('q-toeic-007', 'toeic-1', 'Please review the attached document _____ before the meeting starts.', '["careful", "carefully", "carefulness", "caring"]', 1, 7),
    ('q-toeic-008', 'toeic-1', 'Ms. Lee has been working for this company _____ over fifteen years.', '["since", "during", "for", "while"]', 2, 8),
    ('q-toeic-009', 'toeic-1', 'The manager requested that the reports be submitted _____ Friday afternoon.', '["by", "until", "to", "on"]', 0, 9),
    ('q-toeic-010', 'toeic-1', 'Employees are encouraged to participate in the _____ workshops to improve their skills.', '["profession", "professional", "professionally", "professionalism"]', 1, 10),
    ('q-toeic-011', 'toeic-1', 'The laboratory equipment must be handled with the _____ care.', '["most", "utmost", "almost", "mostly"]', 1, 11),
    ('q-toeic-012', 'toeic-1', 'The CEO will deliver a keynote _____ at the international business forum.', '["speech", "speak", "speaker", "speaking"]', 0, 12),
    ('q-toeic-013', 'toeic-1', 'We are looking for a candidate who is _____ in both English and Japanese.', '["fluent", "fluently", "fluency", "fluid"]', 0, 13),
    ('q-toeic-014', 'toeic-1', 'The company offers a competitive salary _____ an excellent benefits package.', '["as well as", "instead of", "rather than", "but also"]', 0, 14),
    ('q-toeic-015', 'toeic-1', 'The budget proposal needs _____ approval from the board of directors.', '["final", "finally", "finalize", "finalist"]', 0, 15),
    ('q-toeic-016', 'toeic-1', 'The cafeteria will be closed for renovations _____ the end of the month.', '["since", "until", "during", "for"]', 1, 16),
    ('q-toeic-017', 'toeic-1', '_____ the train was late, I managed to arrive at the interview on time.', '["Despite", "Although", "However", "Nevertheless"]', 1, 17),
    ('q-toeic-018', 'toeic-1', 'The new employee proved to be highly _____ and productive.', '["rely", "reliable", "reliably", "reliability"]', 1, 18),
    ('q-toeic-019', 'toeic-1', 'The technical support team is available 24 hours a day to _____ any issues.', '["resolve", "resolving", "resolution", "resolute"]', 0, 19),
    ('q-toeic-020', 'toeic-1', 'The store offers a full _____ for items returned within thirty days.', '["refund", "repay", "return", "replace"]', 0, 20),
    ('q-toeic-021', 'toeic-1', 'Most of the staff members prefer to communicate _____ email.', '["with", "by", "from", "at"]', 1, 21),
    ('q-toeic-022', 'toeic-1', 'The marketing team is developing a new _____ to attract younger customers.', '["strategy", "strategic", "strategically", "strategize"]', 0, 22),
    ('q-toeic-023', 'toeic-1', 'Please make sure to sign the contract _____ the bottom of the page.', '["in", "on", "at", "to"]', 2, 23),
    ('q-toeic-024', 'toeic-1', 'The production department is trying to reduce waste _____ as much as possible.', '["efficiently", "efficiency", "efficient", "effect"]', 0, 24),
    ('q-toeic-025', 'toeic-1', 'The annual performance reviews will be _____ next week.', '["conducted", "conducting", "conduct", "conducts"]', 0, 25),
    ('q-toeic-026', 'toeic-1', 'The supervisor was impressed by how _____ the task was completed.', '["quick", "quickly", "quickness", "quicker"]', 1, 26),
    ('q-toeic-027', 'toeic-1', 'The company has decided to expand its operations _____ South America.', '["to", "into", "at", "for"]', 1, 27),
    ('q-toeic-028', 'toeic-1', 'The warranty _____ only to defects in materials and workmanship.', '["applies", "applying", "apply", "applied"]', 0, 28),
    ('q-toeic-029', 'toeic-1', 'The presentation was very _____ and informative.', '["persuade", "persuasive", "persuasively", "persuasion"]', 1, 29),
    ('q-toeic-030', 'toeic-1', 'Passengers are requested to remain _____ until the plane comes to a complete stop.', '["seat", "seating", "seated", "seats"]', 2, 30),
    ('q-toeic-031', 'toeic-1', 'The hotel is conveniently located _____ walking distance of the beach.', '["within", "at", "on", "by"]', 0, 31),
    ('q-toeic-032', 'toeic-1', 'We need to hire an _____ assistant to help with the paperwork.', '["administer", "administrative", "administratively", "administration"]', 1, 32),
    ('q-toeic-033', 'toeic-1', 'The factory has increased its _____ capacity by twenty percent.', '["produce", "productive", "production", "productively"]', 2, 33),
    ('q-toeic-034', 'toeic-1', 'The manager is _____ to any suggestions that might improve efficiency.', '["open", "opened", "opening", "openly"]', 0, 34),
    ('q-toeic-035', 'toeic-1', 'The project was completed ahead of schedule _____ the hard work of the team.', '["thanks to", "in spite of", "regardless of", "according to"]', 0, 35),
    ('q-toeic-036', 'toeic-1', 'The sales figures for this quarter are _____ higher than expected.', '["signify", "significant", "significantly", "significance"]', 2, 36),
    ('q-toeic-037', 'toeic-1', 'Please do not hesitate to _____ me if you have any further questions.', '["contact", "contacting", "contacted", "contacts"]', 0, 37),
    ('q-toeic-038', 'toeic-1', 'The guest speaker gave a very _____ talk on time management.', '["inspire", "inspiring", "inspiration", "inspires"]', 1, 38),
    ('q-toeic-039', 'toeic-1', 'The company is _____ committed to protecting the environment.', '["full", "fully", "fullness", "filling"]', 1, 39),
    ('q-toeic-040', 'toeic-1', 'The information in this brochure is _____ to change without notice.', '["subject", "subjective", "subjected", "subjecting"]', 0, 40),
    ('q-toeic-041', 'toeic-1', 'Ms. Garcia was _____ for her outstanding contributions to the team.', '["recognized", "recognizing", "recognize", "recognition"]', 0, 41),
    ('q-toeic-042', 'toeic-1', 'The new branch will be _____ located in the heart of the city.', '["ideal", "ideally", "ideality", "idealize"]', 1, 42),
    ('q-toeic-043', 'toeic-1', 'The workshop will provide _____ training on the new software.', '["hands-on", "handy", "handed", "handful"]', 0, 43),
    ('q-toeic-044', 'toeic-1', 'The airline offers a variety of _____ to suit every traveler''s budget.', '["fares", "fees", "prices", "costs"]', 0, 44),
    ('q-toeic-045', 'toeic-1', 'The committee will _____ the proposals and make a recommendation.', '["evaluate", "evaluating", "evaluation", "evaluative"]', 0, 45),
    ('q-toeic-046', 'toeic-1', 'The renovation project is expected to be _____ by the end of next week.', '["complete", "completed", "completing", "completes"]', 1, 46),
    ('q-toeic-047', 'toeic-1', 'The team worked _____ to meet the tight deadline.', '["diligent", "diligently", "diligence", "more diligent"]', 1, 47),
    ('q-toeic-048', 'toeic-1', 'The document must be _____ by a notary public.', '["verified", "verifying", "verify", "verifies"]', 0, 48),
    ('q-toeic-049', 'toeic-1', 'We are currently _____ for an experienced accountant.', '["looking", "search", "seek", "finding"]', 0, 49),
    ('q-toeic-050', 'toeic-1', 'The company''s success is largely _____ its dedicated employees.', '["due to", "because", "despite", "although"]', 0, 50);