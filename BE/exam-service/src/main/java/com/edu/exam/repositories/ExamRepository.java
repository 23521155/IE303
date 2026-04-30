package com.edu.exam.repositories;

import com.edu.exam.entities.Exam;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

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

    @EntityGraph(attributePaths = {"category"})
    List<Exam> findAll();

    @EntityGraph(attributePaths = {"category", "questions"})
    Optional<Exam> findById(String id);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE Exam e SET e.participants = e.participants + 1 WHERE e.id = :examId")
    int incrementParticipants(@Param("examId") String examId);
}