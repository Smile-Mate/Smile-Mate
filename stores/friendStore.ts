import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Friend {
  name?: string;
  score: number; // 1~100
  level: number; // 1~4, (Level 1: 1~25, Level 2: 25~50, Level 3: 50~75, Level 4: 75~100)
}

export interface FriendStore {
  friend: Friend;
  setFriend: (friend: Partial<Friend>) => void;
  resetFriend: () => void;
}

const defaultFriend: Friend = {
  name: '',
  score: 0,
  level: 1,
};

export const useFriendStore = create(
  persist<FriendStore>(
    set => ({
      friend: { ...defaultFriend },
      setFriend: friend => set(state => ({ friend: { ...state.friend, ...friend } })),
      resetFriend: () => set({ friend: { ...defaultFriend } }),
    }),
    { name: 'friendStore' }
  )
);
