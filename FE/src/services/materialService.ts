import { ApiError, apiClient, type ApiEnvelope, type ServiceRequestOptions } from '@/src/services/client';

export type MaterialType = 'pdf' | 'video' | 'theory' | string;

export interface Material {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    description: string;
    fileUrl: string;
    type: MaterialType;
    createdAt: string;
}

export interface MaterialPage {
    content: Material[];
    last: boolean;
    totalElements: number;
}

export interface GetMaterialsParams {
    page?: number;
    size?: number;
    category?: string;
}

const EMPTY_PAGE: MaterialPage = {
    content: [],
    last: true,
    totalElements: 0,
};

export const materialService = {
    async getMaterials(
        params: GetMaterialsParams = {},
        options?: ServiceRequestOptions,
    ): Promise<MaterialPage> {
        const response = await apiClient.get<ApiEnvelope<MaterialPage>>('/api/materials', {
            ...options,
            query: {
                page: params.page ?? 0,
                size: params.size ?? 15,
                category: params.category,
            },
        });

        return response.data ?? EMPTY_PAGE;
    },

    async getMaterialById(
        id: string | number,
        options?: ServiceRequestOptions,
    ): Promise<Material | null> {
        try {
            const response = await apiClient.get<ApiEnvelope<Material>>(`/api/materials/${id}`, options);
            return response.data ?? null;
        } catch (error) {
            if (error instanceof ApiError && error.status === 404) {
                return null;
            }

            throw error;
        }
    },

    getMaterialFileUrl(id: string | number, download = false) {
        return `/api/materials/${id}/file${download ? '?download=true' : ''}`;
    },
};