import { create } from "zustand";
import { connectSocket, disconnectSocket } from "@/socket/socket";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  // accessToken: "token value",

  setAccessToken: (token) => {
    set({ accessToken: token });
    if (token) {
      connectSocket();
    } else {
      disconnectSocket();
    }
  },
}));
