// store/bucketstore.ts
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
  fetchFolders: (
    page?: number,
    navigate?: (path: string) => void
  ) => Promise<void>;
}

export const useBucketStore = create<FolderState>((set) => ({
  // 더미 데이터를 초기값으로 설정
  folders: [],
  meta: {
    totalBuckets: 1,
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
  fetchFolders: async (page = 1, navigate?: (path: string) => void) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/bucket`,
        {
          params: { page: Number(page), take: Number(10) }, // 페이지와 데이터 수를 파라미터로 전달
          withCredentials: true,
        }
      );
      set({
        folders: response.data.buckets,
        meta: response.data.meta,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 && navigate) {
          console.error("Unauthorized access. Redirecting to /unauthorized.");
          navigate("/unauthorized");
        } else {
          console.error("Axios error occurred:", error.message);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  },
}));
