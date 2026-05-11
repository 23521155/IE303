'use server';

import { cookies } from 'next/headers';
import { BE_URL } from '@/src/utils/constans';

export const loginAction = async (data: { email: string; password: string }) => {
    try {
        const res = await fetch(`${BE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            cache: 'no-store',
        });
        const json = await res.json();
        if (!json.success) {
            console.log('hi');
            return {
                success: json.success,
                statusCode: json.statusCode,
                message: json.message,
            };
        }
        // Lấy Cookie ở header
        const setCookie = res.headers.get('set-cookie');

        const accessTokenMatch = setCookie?.match(/token=([^;]+)/)?.[1];
        const refreshTokenMatch = setCookie?.match(/refresh_token=([^;]+)/)?.[1];

        const cookieStore = await cookies();
        if (accessTokenMatch) {
            cookieStore.set({
                name: 'access_token',
                value: accessTokenMatch,
                httpOnly: true,
                path: '/',
                sameSite: 'lax',
                maxAge: 60 * 15,
            });
        }

        if (refreshTokenMatch) {
            cookieStore.set({
                name: 'refresh_token',
                value: refreshTokenMatch,
                httpOnly: true,
                path: '/',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30,
            });
        }

        return { success: json.success, statusCode: json.statusCode, message: json.message };
    } catch (error) {
        return {
            success: false,
            message: 'Cannot connect to server',
        };
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
        const res = await fetch(`${BE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            cache: 'no-store',
        });
        const json = await res.json();

        if (!json.success) {
            return {
                success: json.success,
                statusCode: json.statusCode,
                message: json.message,
            };
        }
        return { success: json.success, statusCode: json.statusCode, message: json.message };
    } catch (error) {
        return {
            success: false,
            message: ' Cannot connect to server',
        };
    }
};

export const logoutAction = async () => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('access_token');
        return { success: true };
    } catch (error) {
        return { success: false, message: 'Logout failed' };
    }
};
