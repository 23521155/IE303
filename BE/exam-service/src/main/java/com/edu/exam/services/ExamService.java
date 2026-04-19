package com.edu.exam.services;

import com.edu.exam.dtos.CreateExamRequest;
import com.edu.exam.dtos.ExamDto;
import com.edu.exam.dtos.SubmitExamRequest;
import com.edu.exam.dtos.UpdateExamRequest;
import com.edu.exam.entities.AttemptAnswer;
import com.edu.exam.entities.Exam;
import com.edu.exam.entities.Attempt;
import com.edu.exam.entities.Question;
import com.edu.exam.exceptions.ResourceNotFoundException;
import com.edu.exam.mappers.ExamMapper;
import com.edu.exam.repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamService {
    private final ExamRepository examRepository;
    private final ExamMapper examMapper;
    private final CategoryRepository categoryRepository;
    private final ExamAttemptRepository examAttemptRepository;
    private final QuestionRepository questionRepository;
    private final AttemptAnswerRepository attemptAnswerRepository;

    public List<ExamDto> getAllExams(String search, String category) {
        List<Exam> exams;

        boolean hasSearch = search != null && !search.isBlank();
        boolean hasCategory = category != null && !category.isBlank();

        if (hasCategory && hasSearch) {
            exams = examRepository.findByCategoryAndSearch(category, search);
        } else if (hasSearch) {
            exams = examRepository.findBySearch(search);
        } else if (hasCategory) {
            exams = examRepository.findByCategory_Id(category);
        } else {
            exams = examRepository.findAll();
        }
        return exams.stream().map(examMapper::toExamDto).toList();
    }

    public ExamDto getExamById(String id) {
        return examMapper.toExamDto(examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", id)));
    }

    public ExamDto createExam(CreateExamRequest request) {
        if (examRepository.existsById(request.getId())) {
            throw new IllegalArgumentException("Exam with id: " + request.getId() + " already exists");
        }

        var category = categoryRepository.findById(request.getCategory())
                .orElseThrow(() -> new IllegalArgumentException("Invalid category"));

        Exam exam = examMapper.toEntity(request);
        exam.setCategory(category);
        return examMapper.toExamDto(examRepository.save(exam));
    }

    public void deleteExam(String id) {
        examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", id));
        examRepository.deleteById(id);
    }

    public ExamDto updateExam(String id, UpdateExamRequest request) {
        var exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", id));
        var category = categoryRepository.findById(request.getCategory())
                .orElseThrow(() -> new IllegalArgumentException("Invalid category"));

        examMapper.update(request, exam);
        exam.setCategory(category);
        return examMapper.toExamDto(examRepository.save(exam));
    }

    @Transactional
    public String submitExam(String id, SubmitExamRequest request, String userId) {
        Exam exam = getExam(id);
        List<Question> questions = getQuestions(id);
        Map<String, Integer> correctAnswersMap = questions.stream()
                .collect(Collectors.toMap(Question::getId, Question::getCorrectAnswer));

        int totalCorrect = 0;
        List<AttemptAnswer> attemptAnswers = new ArrayList<>();

        Attempt attempt = new Attempt();
        attempt.setExam(exam);
        attempt.setUserId(userId);
        attempt.setTimeSpent(request.getTimeSpent() != null ? request.getTimeSpent() : 0);

        for (Question q : questions) {
            String qId = q.getId();
            Integer selectedOption = request.getAnswers().get(qId);
            Integer correctOption = correctAnswersMap.get(qId);

            boolean isCorrect = selectedOption != null && selectedOption.equals(correctOption);
            if (isCorrect) {
                totalCorrect++;
            }

            AttemptAnswer ans = new AttemptAnswer();
            ans.setAttempt(attempt);
            ans.setQuestionId(qId);
            ans.setSelectedOption(selectedOption);
            ans.setIsCorrect(isCorrect);
            attemptAnswers.add(ans);
        }

        double score = questions.isEmpty() ? 0 : (double) totalCorrect / questions.size() * 100.0;
        score = Math.round(score * 100.0) / 100.0;

        attempt.setTotalCorrect(totalCorrect);
        attempt.setScore(score);

        attempt = examAttemptRepository.save(attempt);
        attemptAnswerRepository.saveAll(attemptAnswers);

        return attempt.getId();
    }

    private Exam getExam(String id) {
        return examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", id));
    }

    private List<Question> getQuestions(String examId) {
        return questionRepository.findByExamIdOrderByQuestionOrder(examId);
    }
}