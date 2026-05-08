package com.edu.exam.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "exams")
public class Exam {
    @Id
    @Column(name = "id", nullable = false, length = 50)
    private String id;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "title", nullable = false)
    private Map<String, String> title;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "image", length = Integer.MAX_VALUE)
    private String image;

    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Column(name = "question_count", nullable = false)
    private Integer questionCount;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "description")
    private Map<String, String> description;

    @ColumnDefault("0")
    @Column(name = "participants")
    private Integer participants = 0;

    @ColumnDefault("0.0")
    @Column(name = "rating", precision = 3, scale = 2)
    private BigDecimal rating = BigDecimal.ZERO;

    @ColumnDefault("0")
    @Column(name = "rating_count")
    private Integer ratingCount = 0;

    @OneToMany(mappedBy = "exam")
    @OrderBy("questionOrder ASC")
    private List<Question> questions;
}