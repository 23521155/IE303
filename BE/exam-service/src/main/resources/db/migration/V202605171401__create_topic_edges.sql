CREATE TABLE IF NOT EXISTS topic_edges (
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    from_topic_id VARCHAR(50) NOT NULL,
    to_topic_id VARCHAR(50) NOT NULL,
    relation_type VARCHAR(50) NOT NULL,

    CONSTRAINT fk_topic_edges_from FOREIGN KEY (from_topic_id) REFERENCES topics(id) ON DELETE CASCADE,
    CONSTRAINT fk_topic_edges_to FOREIGN KEY (to_topic_id) REFERENCES topics(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_topic_edges_from ON topic_edges(from_topic_id);
CREATE INDEX IF NOT EXISTS idx_topic_edges_to ON topic_edges(to_topic_id);
CREATE INDEX IF NOT EXISTS idx_topic_edges_relation ON topic_edges(relation_type);

INSERT INTO topic_edges (id, from_topic_id, to_topic_id, relation_type) VALUES
-- Computer Basics là nền tảng của mọi thứ tech
('te_01', 'tp_11', 'tp_12', 'PREREQUISITE'),
('te_02', 'tp_11', 'tp_13', 'PREREQUISITE'),
('te_03', 'tp_11', 'tp_14', 'PREREQUISITE'),
('te_04', 'tp_11', 'tp_15', 'PREREQUISITE'),
('te_05', 'tp_11', 'tp_16', 'PREREQUISITE'),

-- Networking chain
('te_06', 'tp_16', 'tp_17', 'PREREQUISITE'),
('te_07', 'tp_16', 'tp_18', 'PREREQUISITE'),
('te_08', 'tp_17', 'tp_19', 'PREREQUISITE'),
('te_09', 'tp_17', 'tp_30', 'PREREQUISITE'),
('te_10', 'tp_18', 'tp_30', 'PREREQUISITE'),

-- Security chain
('te_11', 'tp_19', 'tp_20', 'PREREQUISITE'),
('te_12', 'tp_19', 'tp_21', 'PREREQUISITE'),
('te_13', 'tp_20', 'tp_21', 'RELATED'),

-- Database chain
('te_14', 'tp_12', 'tp_22', 'PREREQUISITE'),
('te_15', 'tp_22', 'tp_23', 'PREREQUISITE'),
('te_16', 'tp_22', 'tp_24', 'PREREQUISITE'),
('te_17', 'tp_23', 'tp_24', 'RELATED'),
('te_18', 'tp_24', 'tp_33', 'PREREQUISITE'),

-- Software Development chain
('te_19', 'tp_12', 'tp_28', 'PREREQUISITE'),
('te_20', 'tp_28', 'tp_29', 'PREREQUISITE'),
('te_21', 'tp_29', 'tp_25', 'PREREQUISITE'),
('te_22', 'tp_25', 'tp_26', 'PREREQUISITE'),
('te_23', 'tp_26', 'tp_27', 'PREREQUISITE'),
('te_24', 'tp_25', 'tp_35', 'PREREQUISITE'),

-- Modern Tech
('te_25', 'tp_15', 'tp_31', 'PREREQUISITE'),
('te_26', 'tp_16', 'tp_31', 'PREREQUISITE'),
('te_27', 'tp_29', 'tp_32', 'PREREQUISITE'),
('te_28', 'tp_33', 'tp_32', 'RELATED'),
('te_29', 'tp_23', 'tp_33', 'PREREQUISITE'),
('te_30', 'tp_30', 'tp_32', 'RELATED'),
('te_31', 'tp_30', 'tp_31', 'RELATED'),

-- Business Systems
('te_32', 'tp_22', 'tp_34', 'PREREQUISITE'),
('te_33', 'tp_26', 'tp_34', 'PREREQUISITE'),
('te_34', 'tp_35', 'tp_34', 'RELATED'),

-- Strategy & Management chain
('te_35', 'tp_01', 'tp_08', 'PREREQUISITE'),
('te_36', 'tp_01', 'tp_09', 'PREREQUISITE'),
('te_37', 'tp_08', 'tp_09', 'RELATED'),
('te_38', 'tp_09', 'tp_40', 'PREREQUISITE'),
('te_39', 'tp_08', 'tp_10', 'PREREQUISITE'),
('te_40', 'tp_10', 'tp_39', 'PREREQUISITE'),
('te_41', 'tp_10', 'tp_21', 'RELATED'),

-- Project & Operations
('te_42', 'tp_07', 'tp_41', 'PREREQUISITE'),
('te_43', 'tp_07', 'tp_42', 'RELATED'),
('te_44', 'tp_05', 'tp_07', 'PREREQUISITE'),
('te_45', 'tp_05', 'tp_36', 'PREREQUISITE'),
('te_46', 'tp_36', 'tp_37', 'PREREQUISITE'),
('te_47', 'tp_36', 'tp_45', 'RELATED'),
('te_48', 'tp_41', 'tp_26', 'RELATED'),

-- HR & Legal
('te_49', 'tp_06', 'tp_02', 'RELATED'),
('te_50', 'tp_02', 'tp_46', 'PREREQUISITE'),
('te_51', 'tp_02', 'tp_47', 'PREREQUISITE'),
('te_52', 'tp_46', 'tp_25', 'RELATED'),

-- Finance & Audit
('te_53', 'tp_03', 'tp_40', 'RELATED'),
('te_54', 'tp_03', 'tp_38', 'PREREQUISITE'),
('te_55', 'tp_08', 'tp_38', 'PREREQUISITE'),
('te_56', 'tp_48', 'tp_49', 'PREREQUISITE'),
('te_57', 'tp_48', 'tp_33', 'RELATED'),
('te_58', 'tp_48', 'tp_32', 'RELATED'),

-- Documentation & Standards
('te_59', 'tp_44', 'tp_26', 'RELATED'),
('te_60', 'tp_44', 'tp_27', 'RELATED'),
('te_61', 'tp_43', 'tp_39', 'RELATED'),
('te_62', 'tp_04', 'tp_34', 'RELATED'),
('te_63', 'tp_50', 'tp_32', 'RELATED'),
('te_64', 'tp_50', 'tp_30', 'RELATED')
ON CONFLICT (id) DO NOTHING;
