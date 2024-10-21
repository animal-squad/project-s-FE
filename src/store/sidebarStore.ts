import { create } from 'zustand';

// Zustand 스토어 생성
interface SidebarState {
  selectedSidebarItem: string;
  setSelectedSidebarItem: (item: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  selectedSidebarItem: 'Dashboard', // 기본적으로 첫 번째 항목 선택
  setSelectedSidebarItem: (item: string) => set({ selectedSidebarItem: item }),
}));