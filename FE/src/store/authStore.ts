import { create } from 'zustand';

interface User {
    id: number;
    name: string;
    phoneNumber: string;
    currentStatus: string;
}

interface AuthStore {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

interface PathStore {
    path: string;
    setPath: (path: string) => void;
}

export const usePathStore = create<PathStore>((set) => ({
    path: '',
    setPath: (path) => set({ path }),
}));
