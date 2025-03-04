import axios from "axios";
import { useAuthStore } from "@/store/auth";

// ✅ Refresh accessToken using refreshToken
export const fetchNewAccessToken = async (): Promise<string | null> => {
  const response = await axios.get("/api/auth/refresh", {
    withCredentials: true,
  });
  // accessToken 갱신 요청을 보내고 새로운 accessToken을 잘 받아왔다면,
  if (response.data.accessToken) {
    // 새 accessToken을 반환
    return response.data.accessToken;
  }
  return null;
};

import { updateSocketToken, disconnectSocket } from "@/socket/socket";
// import { useNotificationStore } from "@/store/notifications";

// ✅ `accessToken`을 상태와 WebSocket에 동시에 연결하는 함수
export const connectTokenToSocket = (newAccessToken: string | null) => {
  if (newAccessToken) {
    // ✅ Zustand 상태 업데이트
    useAuthStore.getState().setAccessToken(newAccessToken);

    // ✅ WebSocket 갱신 (이미 연결되어 있으면 토큰만 변경, 없으면 새 연결)
    updateSocketToken(newAccessToken);
  } else {
    // ✅ 로그아웃 처리 (토큰이 null이면 WebSocket도 해제)
    useAuthStore.getState().setAccessToken(null);
    disconnectSocket();
    // useNotificationStore.getState().clearNotifications(); // ✅ 로그아웃 시 알림 초기화
  }
};

const OAUTH_PROVIDERS = {
  google: "https://accounts.google.com/o/oauth2/auth",
  kakao: "https://kauth.kakao.com/oauth/authorize",
};

const CLIENT_ID = {
  google: "YOUR_GOOGLE_CLIENT_ID",
  kakao: "YOUR_KAKAO_CLIENT_ID",
};

const REDIRECT_URI = "https://your-app.com/auth/callback"; // 프론트엔드 주소

export const loginRequest = async (provider: "google" | "kakao") => {
  const authUrl = `${OAUTH_PROVIDERS[provider]}?client_id=${CLIENT_ID[provider]}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email profile`;
  // 로그인을 알맞게 완료하면 위 REDIRECT_URI 주소로 리다이렉트 됨, 리다이렉트 되면서 인증코드도 주소에 포함됨
  window.location.href = authUrl;
};

// ✅ Logout function
export const logout = async () => {
  try {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
  } catch (error) {
    console.error("🚨 Logout failed:", error);
  }
  useAuthStore.getState().setAccessToken(null);
};
