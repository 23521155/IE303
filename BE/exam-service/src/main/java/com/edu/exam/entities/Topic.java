package com.edu.exam.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "topics", uniqueConstraints = {
        @UniqueConstraint(name = "uk_topic_exam_name", columnNames = {"exam_type", "name"})
})
public class Topic {

    @Id
    @Column(name = "id", nullable = false, length = 50)
    private String id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "category_name", length = 100)
    private String categoryName;

    @Column(name = "exam_type", length = 50)
    private String examType;

    @Column(name = "level")
    private Integer level;
}