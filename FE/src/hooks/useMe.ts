// hooks/useMe.ts
'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/src/store/authStore';
import { userService } from '@/src/services/userService';

export function useMe() {
    const { user, setUser } = useAuthStore();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log('userMe ', user);
        if (user) {
            setLoading(false);
            return;
        }

        userService.getMe()
            .then((user) => setUser(user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    return { user, setUser, loading };
}
