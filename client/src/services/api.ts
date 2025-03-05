import axios from "axios";
import {
  logout,
  fetchNewAccessToken,
  connectTokenToSocket,
} from "@/services/authService";
import { useAuthStore } from "@/store/auth";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // ✅ Send cookies (for refreshToken)
});
// export const api = axios.create({
//   baseURL: "https://your-api.com",
//   withCredentials: true, // ✅ Send cookies (for refreshToken)
// });

// ✅ Request Interceptor: Attach `accessToken` to every request
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json"; // ✅ 명확하게 지정
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: Handle Expired Tokens (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔄 If accessToken expired (401 Unauthorized), attempt refresh
    if (error.response?.status === 401 && !originalRequest._retried) {
      // 인증 관련 에러 -> token이 만료되었을 때, 아직 재전송을 하직 않았다면
      originalRequest._retried = true; // Prevent infinite loop, 실패하고 요청을 한 번 더 시도했음을 알림
      try {
        console.warn("🔄 Token expired, refreshing...");
        const newAccessToken = await fetchNewAccessToken();
        // 새로운 accessToken을 받아옴
        if (newAccessToken) {
          connectTokenToSocket(newAccessToken); // ✅ 상태와 WebSocket 갱신을 별도 처리
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest); // ✅ Retry original request with new token
        }
      } catch (refreshError) {
        console.error("🚨 Refresh failed, logging out...");
        logout();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
