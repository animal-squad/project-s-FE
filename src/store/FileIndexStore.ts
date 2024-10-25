import { create } from "zustand";

interface FolderStore {
  selectedFolderIndex: number | null;
  setSelectedFolderIndex: (index: number | null) => void;
}

export const useFolderStore = create<FolderStore>((set) => ({
  selectedFolderIndex: null,
  setSelectedFolderIndex: (index) => set({ selectedFolderIndex: index }),
}));
