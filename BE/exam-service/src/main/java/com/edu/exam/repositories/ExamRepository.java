package com.edu.exam.repositories;

import com.edu.exam.entities.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, String> {
    @Query(value = """
                SELECT * FROM exams e
                WHERE e.category_id = :category
                AND EXISTS (
                    SELECT 1 FROM jsonb_each_text(e.title) AS x(key, value)
                    WHERE x.value ILIKE '%' || :search || '%'
            )
            """, nativeQuery = true)
    List<Exam> findByCategoryAndSearch(String category, String search);

    @Query(value = """
                SELECT * FROM exams e
                WHERE EXISTS (
                    SELECT 1 FROM jsonb_each_text(e.title) AS x(key, value)
                    WHERE x.value ILIKE '%' || :search || '%'
            )
            """, nativeQuery = true)
    List<Exam> findBySearch(String search);

    List<Exam> findByCategory_Id(String category);
}