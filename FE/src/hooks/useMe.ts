// hooks/useMe.ts
'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/src/store/authStore';

export function useMe() {
    const { user, setUser } = useAuthStore();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log('userMe ', user);
        if (user) return; // đã có rồi thì không gọi lại

        fetch('http://localhost:8081/api/users/me', {
            credentials: 'include', // ← quan trọng để gửi cookie!
        })
            .then((res) => res.json())
            .then((data) => setUser(data.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    return { user, setUser, loading };
}
