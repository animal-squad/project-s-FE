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
interface LinkSearchState {
  links: Link[];
  meta: Meta | null;
  loading: boolean;
  error: string | null;
  query: string;
  page: number;
  fetchSearchResults: (
    query?: string,
    page?: number,
    take?: number,
    navigate?: (path: string) => void
  ) => Promise<void>;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
}

// Zustand 스토어 생성
export const useLinkSearchStore = create<LinkSearchState>((set, get) => ({
  links: [],
  meta: null,
  loading: false,
  error: null,
  query: "",
  page: 1,

  // 검색어 상태 업데이트
  setQuery: (query: string) => set({ query }),

  // 페이지 상태 업데이트
  setPage: (page: number) => set({ page }),

  // 로딩 상태 업데이트
  setLoading: (loading: boolean) => set({ loading }),

  // API 요청 함수
  fetchSearchResults: async (
    query = "",
    page = 1,
    take = 10,
    navigate?: (path: string) => void
  ) => {
    const { loading } = get(); // 현재 loading 상태 가져오기
    if (loading) return; // 로딩 중이면 실행 중단

    set({ loading: true, error: null }); // 로딩 시작
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/link/search`,
        {
          params: { page, take, query },
          withCredentials: true,
        }
      );
      set({
        links: response.data.links,
        meta: response.data.meta,
        loading: false, // 로딩 종료
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
}));
