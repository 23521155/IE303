import { apiClient, type ApiEnvelope, type ServiceRequestOptions } from '@/src/services/client';

export const attemptService = {
    async getAttemptById(id: string, options?: ServiceRequestOptions) {
        const response = await apiClient.get<ApiEnvelope<any>>(`/api/attempts/${id}`, {
            credentials: 'include',
            ...options,
        });
        return response.data;
    },
};
