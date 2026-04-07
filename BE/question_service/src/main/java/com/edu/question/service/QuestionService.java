package com.edu.question.service;

import com.edu.question.dto.QuestionRequestDto;
import com.edu.question.dto.QuestionResponseDto;
import com.edu.question.entities.Question;
import com.edu.question.repository.QuestionRepository;
import java.util.List;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Transactional(readOnly = true)
    public List<QuestionResponseDto> getAllQuestions() {
        return questionRepository.findAll()
                .stream()
                .map(this::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public QuestionResponseDto getQuestionById(Integer questionId) throws NotFoundException {
        return toResponseDto(findQuestionEntityById(questionId));
    }

    @Transactional(readOnly = true)
    public List<QuestionResponseDto> getQuestionsByExamId(Integer examId) {
        return questionRepository.findByExamId(examId)
                .stream()
                .map(this::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<QuestionResponseDto> getQuestionsByTopic(String topic) {
        return questionRepository.findByTopic(topic)
                .stream()
                .map(this::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<QuestionResponseDto> getQuestionsByDifficulty(String difficulty) {
        return questionRepository.findByDifficulty(difficulty)
                .stream()
                .map(this::toResponseDto)
                .toList();
    }

    public QuestionResponseDto createQuestion(QuestionRequestDto questionRequestDto) {
        Question question = toEntity(questionRequestDto);
        return toResponseDto(questionRepository.save(question));
    }

    public QuestionResponseDto updateQuestion(Integer questionId, QuestionRequestDto questionRequestDto)
            throws NotFoundException {
        Question existingQuestion = findQuestionEntityById(questionId);
        existingQuestion.setExamId(questionRequestDto.getExamId());
        existingQuestion.setQuestionText(questionRequestDto.getQuestionText());
        existingQuestion.setExplanation(questionRequestDto.getExplanation());
        existingQuestion.setDifficulty(questionRequestDto.getDifficulty());
        existingQuestion.setTopic(questionRequestDto.getTopic());
        return toResponseDto(questionRepository.save(existingQuestion));
    }

    public void deleteQuestion(Integer questionId) throws NotFoundException {
        Question existingQuestion = findQuestionEntityById(questionId);
        questionRepository.delete(existingQuestion);
    }

    private Question findQuestionEntityById(Integer questionId) throws NotFoundException {
        return questionRepository.findById(questionId)
                .orElseThrow(NotFoundException::new);
    }

    private QuestionResponseDto toResponseDto(Question question) {
        return QuestionResponseDto.builder()
                .questionId(question.getQuestionId())
                .examId(question.getExamId())
                .questionText(question.getQuestionText())
                .explanation(question.getExplanation())
                .difficulty(question.getDifficulty())
                .topic(question.getTopic())
                .build();
    }

    private Question toEntity(QuestionRequestDto questionRequestDto) {
        return Question.builder()
                .examId(questionRequestDto.getExamId())
                .questionText(questionRequestDto.getQuestionText())
                .explanation(questionRequestDto.getExplanation())
                .difficulty(questionRequestDto.getDifficulty())
                .topic(questionRequestDto.getTopic())
                .build();
    }
}
