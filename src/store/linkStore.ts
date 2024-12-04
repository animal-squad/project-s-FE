import { create } from "zustand";
import axios from "axios";

interface Link {
  linkId: string;
  userId: number;
  URL: string;
  createdAt: Date;
  openedAt: Date;
  views: number;
  tags: string[];
  title: string | null;
}

interface LinkStore {
  links: Link[];
  title: string | null;
  linkCount: number;
  isShared: boolean;
  isMine: boolean;
  isLoading: boolean;
  error: string | null;
  fetchLinks: (
    bucketId: string,
    navigate: (path: string) => void
  ) => Promise<void>;
}

export const useLinkStore = create<LinkStore>((set) => ({
  // 초기 상태에 더미 데이터 추가
  links: [
    {
      linkId: "1",
      userId: 1,
      URL: "https://example.com",
      createdAt: new Date(),
      openedAt: new Date(),
      views: 10,
      tags: ["example", "test"],
      title: "Example Link",
    },
    {
      linkId: "2",
      userId: 2,
      URL: "https://anotherexample.com",
      createdAt: new Date(),
      openedAt: new Date(),
      views: 20,
      tags: ["another", "demo"],
      title: "Another Example",
    },
  ],
  title: "Example Bucket",
  linkCount: 0,
  isShared: false,
  isMine: false,
  isLoading: false,
  error: null,

  fetchLinks: async (bucketId, navigate) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<{
        links: Link[];
        title: string | null;
        linkCount: number;
        isShared: boolean;
        isMine: boolean;
      }>(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/bucket/${bucketId}`, {
        withCredentials: true,
      });

      set({
        links: response.data.links,
        title: response.data.title,
        linkCount: response.data.linkCount,
        isShared: response.data.isShared,
        isMine: response.data.isMine,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ isLoading: false, error: error.message });
        if (error.response?.status === 403) {
          navigate("/unshared");
        } else if (error.response?.status === 401) {
          navigate("/unauthorized");
        } else {
          console.error("Failed to fetch links:", error);
        }
      }
    }
  },
}));
