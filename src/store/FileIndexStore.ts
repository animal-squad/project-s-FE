// store/FileIndexStore.ts
import { create } from "zustand";
import axios from "axios";

interface Bucket {
  bucketId: string;
  userId: number;
  title: string;
  linkCount: number;
  createdAt: Date;
  isShared: boolean;
}

interface Meta {
  totalBuckets: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  page: number;
  take: number;
}

interface FolderState {
  folders: Bucket[];
  meta: Meta | null;
  selectedFolderIndex: number;
  page: number;
  setSelectedFolderIndex: (index: number) => void;
  setPage: (page: number) => void;
  fetchFolders: (page?: number) => Promise<void>;
}

export const useFolderStore = create<FolderState>((set) => ({
  // 더미 데이터를 초기값으로 설정
  folders: [
    {
      bucketId: "n23NmKLT",
      userId: 1,
      title: "2024. 11. 9. 오후 4:05:48에 생성된 Bucket 의 복사본",
      linkCount: 5,
      createdAt: new Date(),
      isShared: true,
    },
    {
      bucketId: "uBMPKxfR",
      userId: 2,
      title: "2024. 11. 11. 오후 2:14:18에 생성된 Bucket",
      linkCount: 8,
      createdAt: new Date(),
      isShared: false,
    },
    {
      bucketId: "OuAPuTzZ",
      userId: 3,
      title: "공식 문서",
      linkCount: 12,
      createdAt: new Date(),
      isShared: true,
    },
  ],
  meta: {
    totalBuckets: 3,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    page: 1,
    take: 10,
  },
  selectedFolderIndex: 0,
  page: 1, // 기본값을 1로 설정
  setSelectedFolderIndex: (index) => set({ selectedFolderIndex: index }),
  setPage: (page) => set({ page }),
  fetchFolders: async (page = 1) => {
    try {
      const response = await axios.get("API_ENDPOINT_HERE", {
        params: { page, take: 10 }, // 페이지와 데이터 수를 파라미터로 전달
      });
      set({
        folders: response.data.buckets,
        meta: response.data.meta,
      });
    } catch (error) {
      console.error("Failed to fetch folders", error);
    }
  },
}));
