import { create } from 'zustand';

// Zustand 스토어 생성
interface TabState {
  selectedTab: number;
  setSelectedTab: (tabIndex: number) => void;
}

export const useTabStore = create<TabState>((set) => ({
  selectedTab: 0, // 기본적으로 첫 번째 탭 선택
  setSelectedTab: (tabIndex: number) => set({ selectedTab: tabIndex }),
}));
