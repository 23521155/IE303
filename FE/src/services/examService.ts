import {BE_URL} from '@/src/utils/constans';

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

class ExamService {
    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${BE_URL}${endpoint}`;

        try {
            const response = await fetch(url, {
                credentials: "include",
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

        return response.json();
    }

    async getAllCategories(): Promise<Category[]> {
        const response = await fetch(`${BE_URL}/api/categories`);

        if (!response.ok) {
            throw new Error('Không thể tải danh sách danh mục');
        }

        return response.json();
    }

    async getExamById(id: string): Promise<ExamDetail | null> {
        try {
            return await this.request<ExamDetail>(`/api/exams/${id}`);
        } catch (error) {
            console.error(`Exam with id ${id} not found:`, error);
            return null;
        }
    }

    async getExamQuestions(examId: string): Promise<Question[]> {
        return this.request<Question[]>(`/api/exams/${examId}/questions`);
    }

    async submitExam(examId: string, payload: any) {
        return this.request<{attemptId: string}>(`/api/exams/${examId}/submit`, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }
}

export const examService = new ExamService();