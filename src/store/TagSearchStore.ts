import { create } from "zustand";
import axios from "axios";

// 링크 인터페이스 정의
interface Link {
  linkId: string;
  userId: number;
  URL: string;
  createdAt: Date;
  openedAt: Date;
  views: number;
  tags: string[];
  keywords: string[];
  title: string;
}

// 메타 정보 인터페이스
interface Meta {
  totalLinks: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  page: number;
  take: number;
}

// Store 상태 인터페이스
interface SearchLinkState {
  links: Link[];
  meta: Meta | null;
  searchTags: string[]; // 전역 태그 상태
  loading: boolean;
  error: string | null;
  page: number;
  fetchLinks: (
    tags?: string[],
    page?: number,
    take?: number,
    navigate?: (path: string) => void
  ) => Promise<void>;
  fetchSearchTags: (tags: string[]) => void; // 전역 상태 업데이트 함수
  setTagPage: (page: number) => void;
}

// Zustand 스토어 생성
export const useSearchLinkStore = create<SearchLinkState>((set) => ({
  links: [],
  meta: null,
  searchTags: [],
  loading: false,
  error: null,
  page: 1,

  // API 요청 함수
  fetchLinks: async (
    tags = [],
    page = 1,
    take = 10,
    navigate?: (path: string) => void
  ) => {
    set({ loading: true, error: null }); // 로딩 시작
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/link/list`,
        { tags: tags }, // body로 태그 전송
        {
          params: { page, take }, // query로 페이지와 take 전송
          withCredentials: true, // 쿠키 전송 활성화
        }
      );
      // 데이터 업데이트
      set({
        links: response.data.links,
        meta: response.data.meta,
        loading: false,
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
      set({ loading: false, error: "링크 데이터를 불러오는 데 실패했습니다." });
    }
  },

  fetchSearchTags: (tags: string[]) => {
    set({ searchTags: tags });
  },

  setTagPage: (page: number) => set({ page }),
}));
