CREATE TABLE questions
(
    id             VARCHAR(50) PRIMARY KEY,
    exam_id        VARCHAR(50) NOT NULL,
    text           TEXT        NOT NULL,
    options        JSONB       NOT NULL,
    correct_answer INTEGER     NOT NULL,
    question_order INTEGER,
    FOREIGN KEY (exam_id) REFERENCES exams (id)
);