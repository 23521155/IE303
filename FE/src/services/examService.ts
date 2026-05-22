import { ApiError, apiClient, type ApiEnvelope, type ServiceRequestOptions } from '@/src/services/client';

export interface Exam {
    id: string;
    title: {
        vi: string;
        en: string;
        ja: string;
    };
    category: Category;
    image: string;
    duration: number;
    questionCount: number;
    description: {
        vi: string;
        en: string;
        ja: string;
    };
    participants: number;
    rating: number;
    ratingCount?: number;
}

export interface ExamDetail extends Exam {
    questions: Question[];
}

export interface Category {
    id: string;
    name: string;
}

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
    questionOrder?: number;
}

export interface RatingSummary {
    rating: number;
    ratingCount: number;
    userRating: number | null;
}

export const examService = {
    async getAllExams(options?: ServiceRequestOptions): Promise<Exam[]> {
        const response = await apiClient.get<ApiEnvelope<Exam[]>>('/api/exams', options);
        return response.data;
    },

    async getPopularExams(options?: ServiceRequestOptions): Promise<Exam[]> {
        const response = await apiClient.get<ApiEnvelope<Exam[]>>('/api/exams/popular', {
            next: { revalidate: 86400 },
            credentials: 'include',
            ...options,
        });
        return response.data;
    },

    async getAllCategories(options?: ServiceRequestOptions): Promise<Category[]> {
        const response = await apiClient.get<ApiEnvelope<Category[]>>('/api/categories', options);
        return response.data;
    },

    async getExamById(id: string, options?: ServiceRequestOptions): Promise<ExamDetail | null> {
        try {
            const response = await apiClient.get<ApiEnvelope<ExamDetail>>(`/api/exams/${id}`, {
                credentials: 'include',
                ...options,
            });
            return response.data;
        } catch (error) {
            if (error instanceof ApiError && error.status === 404) {
                return null;
            }

            console.error(`Exam with id ${id} not found:`, error);
            return null;
        }
    },

    async getExamQuestions(examId: string, options?: ServiceRequestOptions): Promise<Question[]> {
        const response = await apiClient.get<ApiEnvelope<Question[]>>(`/api/exams/${examId}/questions`, {
            credentials: 'include',
            ...options,
        });
        return response.data;
    },

    async submitExam(
        examId: string,
        payload: Record<string, unknown>,
        options?: ServiceRequestOptions,
    ): Promise<{ attemptId: string }> {
        const response = await apiClient.post<ApiEnvelope<{ attemptId: string }>>(
            `/api/exams/${examId}/submit`,
            payload,
            {
                credentials: 'include',
                ...options,
            },
        );
        return response.data;
    },

    async getRatingSummary(examId: string, options?: ServiceRequestOptions): Promise<RatingSummary> {
        const response = await apiClient.get<ApiEnvelope<RatingSummary>>(`/api/exams/${examId}/rating`, {
            credentials: 'include',
            ...options,
        });
        return response.data;
    },

    async submitRating(
        examId: string,
        rating: number,
        options?: ServiceRequestOptions,
    ): Promise<RatingSummary> {
        const response = await apiClient.post<ApiEnvelope<RatingSummary>>(
            `/api/exams/${examId}/rating`,
            { rating },
            {
                credentials: 'include',
                ...options,
            },
        );
        return response.data;
    },
};