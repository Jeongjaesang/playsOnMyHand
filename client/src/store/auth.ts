import { connectSocket, disconnectSocket } from "@/socket/socket";
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,

  setAccessToken: (token) => {
    set({ accessToken: token });
    if (token) {
      connectSocket(token);
    } else {
      disconnectSocket();
    }
  },
}));
