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
  links: [
    {
      linkId: "1",
      userId: 1001,
      URL: "https://example.com",
      createdAt: new Date("2024-06-01T12:00:00Z"),
      openedAt: new Date("2024-06-02T14:00:00Z"),
      views: 120,
      tags: ["개발", "프론트엔드"],
      keywords: ["React", "TypeScript"],
      title: "React Zustand 튜토리얼",
    },
    {
      linkId: "2",
      userId: 1002,
      URL: "https://example.org",
      createdAt: new Date("2024-06-03T09:00:00Z"),
      openedAt: new Date("2024-06-04T15:00:00Z"),
      views: 80,
      tags: ["백엔드", "NestJS"],
      keywords: ["NestJS", "API"],
      title: "NestJS REST API 구축 가이드",
    },
    {
      linkId: "3",
      userId: 1003,
      URL: "https://example.net",
      createdAt: new Date("2024-06-05T10:00:00Z"),
      openedAt: new Date("2024-06-06T16:00:00Z"),
      views: 200,
      tags: ["클라우드", "AWS"],
      keywords: ["AWS", "EC2"],
      title: "AWS EC2 인스턴스 설정",
    },
    {
      linkId: "4",
      userId: 1004,
      URL: "https://example.dev",
      createdAt: new Date("2024-06-07T08:00:00Z"),
      openedAt: new Date("2024-06-08T17:00:00Z"),
      views: 50,
      tags: ["DevOps", "CI/CD"],
      keywords: ["Jenkins", "GitHub Actions"],
      title: "Jenkins와 GitHub Actions를 사용한 CI/CD",
    },
    {
      linkId: "5",
      userId: 1005,
      URL: "https://example.io",
      createdAt: new Date("2024-06-09T11:00:00Z"),
      openedAt: new Date("2024-06-10T18:00:00Z"),
      views: 150,
      tags: ["데이터베이스", "SQL"],
      keywords: ["PostgreSQL", "RDBMS"],
      title: "PostgreSQL 쿼리 최적화 팁",
    },
  ],
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
