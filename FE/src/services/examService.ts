import { BE_URL } from '@/src/utils/constans';

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

class ExamService {
    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${BE_URL}${endpoint}`;

        try {
            const response = await fetch(url, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API request failed for ${endpoint}:`, error);
            throw error;
        }
    }

    async getAllExams(): Promise<Exam[]> {
        const response = await fetch(`${BE_URL}/api/exams`);

        if (!response.ok) {
            throw new Error('Không thể tải danh sách đề thi');
        }

        const res = await response.json();

        return res.data;
    }

    async getPopularExams(): Promise<Exam[]> {
        const res = await this.request<{ data: Exam[] }>('/api/exams/popular', {
            next: { revalidate: 86400 },
        });
        return res.data;
    }

    async getAllCategories(): Promise<Category[]> {
        const response = await fetch(`${BE_URL}/api/categories`);

        if (!response.ok) {
            throw new Error('Không thể tải danh sách danh mục');
        }

        const res = await response.json();
        return res.data;
    }

    async getExamById(id: string): Promise<ExamDetail | null> {
        try {
            const res = await this.request<{ data: ExamDetail }>(`/api/exams/${id}`);
            return res.data;
        } catch (error) {
            console.error(`Exam with id ${id} not found:`, error);
            return null;
        }
    }

    async getExamQuestions(examId: string): Promise<Question[]> {
        return this.request<Question[]>(`/api/exams/${examId}/questions`);
    }

    async submitExam(examId: string, payload: any) {
        const res = await this.request<{ data: { attemptId: string } }>(`/api/exams/${examId}/submit`, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        return res.data;
    }

    async getRatingSummary(examId: string): Promise<RatingSummary> {
        const res = await this.request<{ data: RatingSummary }>(`/api/exams/${examId}/rating`);
        return res.data;
    }

    async submitRating(examId: string, rating: number): Promise<RatingSummary> {
        const res = await this.request<{ data: RatingSummary }>(`/api/exams/${examId}/rating`, {
            method: 'POST',
            body: JSON.stringify({ rating }),
        });
        return res.data;
    }
}

export const examService = new ExamService();
