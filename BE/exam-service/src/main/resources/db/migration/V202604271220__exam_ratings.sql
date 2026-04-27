CREATE TABLE exam_ratings
(
    id         VARCHAR(50) PRIMARY KEY,
    exam_id    VARCHAR(50) NOT NULL,
    user_id    VARCHAR(50) NOT NULL,
    rating     INTEGER     NOT NULL CONSTRAINT check_exam_rating_range CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP   NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP   NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_exam_ratings_exam FOREIGN KEY (exam_id) REFERENCES exams (id),
    CONSTRAINT uq_exam_ratings_exam_user UNIQUE (exam_id, user_id)
);

ALTER TABLE exams
    ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0;
