import {BE_URL} from '@/src/utils/constans';

export interface Exam {
    id: string;
    title: {
        vi: string;
        en: string;
        ja: string;
    };
    category: string;
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

export interface Category {
    id: string;
    name: string;
}

export const examService = {
    async getAllExams(): Promise<Exam[]> {
        const response = await fetch(`${BE_URL}/api/exams`);

        if (!response.ok) {
            throw new Error('Không thể tải danh sách đề thi');
        }

        return response.json();
    },

    async getAllCategories(): Promise<Category[]> {
        const response = await fetch(`${BE_URL}/api/categories`);

        if (!response.ok) {
            throw new Error('Không thể tải danh sách danh mục');
        }

        return response.json();
    }
}