'use server';

import { cookies } from 'next/headers';
import { ApiError, apiClient, type ApiEnvelope } from '@/src/services/client';
import { BE_URL } from '@/src/utils/constans';

const extractCookieValue = (setCookie: string | null, name: string) => {
    if (!setCookie) return undefined;
    const pattern = new RegExp(`(?:^|,\\s*)${name}=([^;]+)`);
    return setCookie.match(pattern)?.[1];
};

const syncAuthCookies = async (setCookie: string | null) => {
    const accessToken = extractCookieValue(setCookie, 'access_token');
    const refreshToken = extractCookieValue(setCookie, 'refresh_token');

    const cookieStore = await cookies();
    if (accessToken) {
        cookieStore.set({
            name: 'access_token',
            value: accessToken,
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 15,
        });
    }

    if (refreshToken) {
        cookieStore.set({
            name: 'refresh_token',
            value: refreshToken,
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30,
        });
    }
};

export const loginAction = async (data: { email: string; password: string }) => {
    try {
        const { response, data: json } = await apiClient.postWithResponse<ApiEnvelope<any>>('/api/auth/login', data, {
            cache: 'no-store',
        });
        if (!json.success) {
            return {
                success: json.success,
                statusCode: json.statusCode,
                message: json.message,
            };
        }
        await syncAuthCookies(response.headers.get('set-cookie'));

        return { success: json.success, statusCode: json.statusCode, message: json.message };
    } catch (error) {
        if (error instanceof ApiError) {
            return { success: false, statusCode: error.status, message: error.message };
        }
        return {
            success: false,
            message: 'Cannot connect to server',
        };
    }
};

export const refreshAccessTokenAction = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!refreshToken) {
        return { success: false };
    }

    try {
        const response = await fetch(`${BE_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {
                Cookie: `refresh_token=${refreshToken}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            return { success: false };
        }

        await syncAuthCookies(response.headers.get('set-cookie'));

        return { success: true };
    } catch {
        return { success: false };
    }
};

export const registerAction = async (data: {
    name: string;
    email: string;
    phoneNumber: string;
    status: string;
    password: string;
}) => {
    try {
        const json = await apiClient.post<ApiEnvelope<any>>('/api/auth/register', data, {
            cache: 'no-store',
        });

        if (!json.success) {
            return {
                success: json.success,
                statusCode: json.statusCode,
                message: json.message,
            };
        }
        return { success: json.success, statusCode: json.statusCode, message: json.message };
    } catch (error) {
        if (error instanceof ApiError) {
            return { success: false, statusCode: error.status, message: error.message };
        }
        return {
            success: false,
            message: 'Cannot connect to server',
        };
    }
};

export const logoutAction = async () => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');
        return { success: true };
    } catch (error) {
        return { success: false, message: 'Logout failed' };
    }
};
