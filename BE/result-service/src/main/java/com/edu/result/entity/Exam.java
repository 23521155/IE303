package com.edu.result.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "exams")
public class Exam {
    @Id
    @Column(name = "id", nullable = false, length = 50)
    private String id;
}