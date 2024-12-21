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
  meta: {
    totalLinks: 25,
    totalPages: 2,
    hasNextPage: true,
    hasPrevPage: false,
    page: 2,
    take: 10,
  },
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
        { tags, page, take }, // 태그, 페이지, 한 페이지의 항목 수를 body로 전송
        { withCredentials: true } // 쿠키 전송 활성화
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
