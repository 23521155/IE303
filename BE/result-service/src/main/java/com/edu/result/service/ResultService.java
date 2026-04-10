package com.edu.result.service;

import com.edu.result.entity.Answer;
import com.edu.result.entity.ExamAttempt;
import com.edu.result.entity.Question;
import com.edu.result.repository.AnswerRepository;
import com.edu.result.repository.ExamAttemptRepository;
import com.edu.result.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultService {
    private final ExamAttemptRepository attemptRepo;
    private final AnswerRepository answerRepo;
    private final QuestionRepository questionRepo;

    public record AnswerSubmission(String questionId, Integer selectedAnswer) {}
    @Transactional
    public ExamAttempt submitAndGradeExam(Integer attemptId, List<AnswerSubmission> submissions) {
        ExamAttempt attempt = attemptRepo.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found!"));

        int correctCount = 0;

        for (AnswerSubmission submission : submissions) {
            Question question = questionRepo.findById(submission.questionId())
                    .orElseThrow(() -> new RuntimeException("Option not found!"));

            boolean isCorrect = submission.selectedAnswer() != null &&
                    submission.selectedAnswer().equals(question.getCorrectAnswer());
            if (isCorrect) {
                correctCount++;
            }

            Answer newAnswer = new Answer();
            newAnswer.setExamAttempt(attempt);
            newAnswer.setQuestion(question);
            newAnswer.setSelectedAnswer(submission.selectedAnswer());
            newAnswer.setIsCorrect(isCorrect);
            answerRepo.save(newAnswer);
        }

        int totalQuestions = attempt.getTotalQuestions();
        float finalScore = ((float) correctCount / totalQuestions) * 100;

        attempt.setCorrectAnswers(correctCount);
        attempt.setScore(finalScore);
        attempt.setSubmittedAt(LocalDateTime.now());

        return attemptRepo.save(attempt);
    }
}