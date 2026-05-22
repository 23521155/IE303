import { apiClient, type ApiEnvelope, type ServiceRequestOptions } from '@/src/services/client';

export type ProfileApiUser = {
    id: number;
    name: string;
    phoneNumber?: string | null;
    currentStatus?: string | null;
    email?: string | null;
    createdAt?: string | null;
};

export const userService = {
    async getMe(options?: ServiceRequestOptions): Promise<ProfileApiUser> {
        const response = await apiClient.get<ApiEnvelope<ProfileApiUser>>('/api/users/me', {
            credentials: 'include',
            ...options,
        });
        return response.data;
    },

    async getUserById(id: string | number, options?: ServiceRequestOptions): Promise<ProfileApiUser> {
        const response = await apiClient.get<ApiEnvelope<ProfileApiUser>>(`/api/users/${id}`, {
            credentials: 'include',
            ...options,
        });
        return response.data;
    },
};
