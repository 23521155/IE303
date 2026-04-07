package com.edu.question.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "question_tag_map")
@IdClass(QuestionTagMapId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionTagMap {

    @Id
    @Column(name = "question_id")
    private Integer questionId;

    @Id
    @Column(name = "tag_id")
    private Integer tagId;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false, insertable = false, updatable = false)
    private Question question;

    @ManyToOne
    @JoinColumn(name = "tag_id", nullable = false, insertable = false, updatable = false)
    private QuestionTags tag;
}
