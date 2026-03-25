CREATE TABLE categories
(
    id   VARCHAR(50)
        CONSTRAINT categories_pk PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE exams
(
    id             VARCHAR(50)
        CONSTRAINT exams_pk PRIMARY KEY,
    title          JSONB       NOT NULL,
    category_id    VARCHAR(50) NOT NULL
        CONSTRAINT exams_categories_id_fk REFERENCES categories (id),
    image          TEXT,
    duration       INTEGER     NOT NULL,
    question_count INTEGER     NOT NULL,
    description    JSONB,
    participants   INTEGER       DEFAULT 0,
    rating         NUMERIC(3, 2) DEFAULT 0.0
        CONSTRAINT check_rating_range CHECK (rating >= 0 AND rating <= 5.0)
);