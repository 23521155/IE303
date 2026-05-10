-- Speed up JOIN when loading questions for an exam
CREATE INDEX IF NOT EXISTS idx_questions_exam_id
    ON questions (exam_id);

-- Speed up ordered question fetch (exam_id + question_order is the common access pattern)
CREATE INDEX IF NOT EXISTS idx_questions_exam_order
    ON questions (exam_id, question_order);

-- Speed up findByCategory_Id and JOIN with categories
CREATE INDEX IF NOT EXISTS idx_exams_category_id
    ON exams (category_id);

-- Speed up ORDER BY participants DESC (used by getPopularExams / findTop3)
CREATE INDEX IF NOT EXISTS idx_exams_participants_desc
    ON exams (participants DESC);

-- Speed up rating lookups per exam
CREATE INDEX IF NOT EXISTS idx_exam_ratings_exam_id
    ON exam_ratings (exam_id);
