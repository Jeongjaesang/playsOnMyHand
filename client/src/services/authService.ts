import axios from "axios";
import { useAuthStore } from "@/store/auth";

// ✅ Check if user is logged in
export const refreshAccessToken = async () => {
  // 이 함수가 발생하는 상황: 사용자가 직접 페이지를 새로고침했을 때, 또는 앱이 처음 로드될 때

  try {
    console.warn("🔄 Checking authentication...");

    // ✅ Always refresh accessToken first (since state resets on refresh)
    const accessToken = await fetchNewAccessToken();

    if (accessToken) {
      // ✅ Directly verify session (no need to update Zustand again)
      useAuthStore.getState().setAccessToken(accessToken);
      // await axios.get("/api/auth/me", { withCredentials: true });
      // 사용자의 추가적인 정보가 필요할 때 이 요청이 필요함, 아직 필요할지 미정..
    }
  } catch (error) {
    console.error("🚨 Auth check failed, logging out:", error);
    logout();
  }
};

// ✅ Refresh accessToken using refreshToken
export const fetchNewAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get("/api/auth/refresh", {
      withCredentials: true,
    });
    // accessToken 갱신 요청을 보내고 새로운 accessToken을 잘 받아왔다면,
    if (response.data.accessToken) {
      // 새 accessToken을 반환
      return response.data.accessToken;
    }
    return null;
  } catch (error) {
    // accessToken 갱신 요청에 실패하면 로그아웃 처리
    console.error("🚨 Token refresh failed", error);
    logout(); // ✅ Log out user if refresh fails
    return null;
  }
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
