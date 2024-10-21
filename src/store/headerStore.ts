import { create } from 'zustand';

// Zustand 스토어 생성
interface TabState {
  selectedHeaderTab: number;
  setSelectedHeaderTab: (tabIndex: number) => void;
}

export const useTabStore = create<TabState>((set) => ({
  selectedHeaderTab: 0, // 기본적으로 첫 번째 탭 선택
  setSelectedHeaderTab: (tabIndex: number) => set({ selectedHeaderTab: tabIndex }),
}));
