import { create } from "zustand";
import axios from "axios";

interface UserState {
  userId: number | null;
  email: string;
  name: string;
  photo: string;
  setUser: (userData: {
    userId: number;
    email: string;
    name: string;
    photo: string;
  }) => void;
  clearUser: () => void;
  userFetch: () => Promise<void>;
}

export const userStore = create<UserState>((set) => ({
  userId: null,
  email: "",
  name: "",
  photo: "",
  setUser: (userData) => set(userData),
  clearUser: () => set({ userId: null, email: "", name: "", photo: "" }),

  // API를 통해 사용자 데이터를 가져오는 함수
  userFetch: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/user`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      set(response.data); // 상태 업데이트
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },
}));
