'use server';

import { BE_AUTH_URL } from '@/src/utils/constans';
import { cookies } from 'next/headers';

export const loginAction = async (data: { email: string; password: string }) => {
    try {
        const res = await fetch(`${BE_AUTH_URL}/api/auth/login`, {
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

        const { token } = json.data;
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'access_token',
            value: token,
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24,
        });

        // cookieStore.set({
        //     name: 'refresh_token',
        //     value: refreshToken,
        //     httpOnly: true,
        //     path: '/',
        //     sameSite: 'lax',
        //     maxAge: 60 * 60 * 24 * 7,
        // });
        const phi = { success: json.success, statusCode: json.statusCode, message: json.message };
        return phi;
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
        const res = await fetch(`${BE_AUTH_URL}/api/auth/register`, {
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
