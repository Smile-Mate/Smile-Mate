import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
}

export interface UserStore {
  user: User;
  setUser: (user: Partial<User>) => void;
  resetUser: () => void;
}

const defaultUser: User = {
  id: '',
  name: '',
};

export const useUserStore = create(
  persist<UserStore>(
    set => ({
      user: { ...defaultUser },
      setUser: user => set(state => ({ user: { ...state.user, ...user } })),
      resetUser: () => set(() => ({ user: { ...defaultUser } })),
    }),
    { name: 'userStore' }
  )
);
