import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Friend {
  name: string;
  score: number; // 1~100
  message?: string;
}

export interface FriendStore {
  friend: Friend;
  getLevel: () => number; // 1~4, (Level 1: 1~24, Level 2: 25~49, Level 3: 50~74, Level 4: 75~100)
  setFriend: (friend: Partial<Friend>) => void;
  resetFriend: () => void;
  addScore: (score: number) => void;
}

// TODO MIN_SCORE 적용하기
// const MIN_SCORE = 1;
const MAX_SCORE = 100;

const defaultFriend: Friend = {
  name: '',
  score: 1,
  message: undefined,
};

// 점수에 따른 레벨 계산 함수
const calculateLevel = (score: number): number => {
  if (score < 25) return 1;
  if (score < 50) return 2;
  if (score < 75) return 3;
  return 4;
};

export const useFriendStore = create(
  persist<FriendStore>(
    (set, get) => ({
      friend: { ...defaultFriend },
      getLevel: () => calculateLevel(get().friend.score),
      setFriend: friend => set(state => ({ friend: { ...state.friend, ...friend } })),
      resetFriend: () => set({ friend: { ...defaultFriend } }),
      addScore: score =>
        set(state => ({
          friend: {
            ...state.friend,
            score: Math.min(state.friend.score + score, MAX_SCORE),
          },
        })),
    }),
    { name: 'friendStore' }
  )
);
