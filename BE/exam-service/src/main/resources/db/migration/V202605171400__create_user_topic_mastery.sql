CREATE TABLE IF NOT EXISTS user_topic_mastery (
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    topic_id VARCHAR(50) NOT NULL,
    mastery_score DOUBLE PRECISION NOT NULL DEFAULT 0,
    error_rate INTEGER NOT NULL DEFAULT 0,
    total_attempts INTEGER NOT NULL DEFAULT 0,
    correct_answers INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_topic_mastery_topic FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
    CONSTRAINT uk_user_topic UNIQUE (user_id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_user_topic_mastery_user_id ON user_topic_mastery(user_id);
CREATE INDEX IF NOT EXISTS idx_user_topic_mastery_topic_id ON user_topic_mastery(topic_id);
CREATE INDEX IF NOT EXISTS idx_user_topic_mastery_mastery_score ON user_topic_mastery(mastery_score DESC);
