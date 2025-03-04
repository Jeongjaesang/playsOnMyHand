import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import PerformanceDetail from "./pages/PerformanceDetail";
import MyPage from "./pages/Mypage";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Example from "./components/common/Example";
import {
  connectTokenToSocket,
  fetchNewAccessToken,
} from "./services/authService";
import OAuthCallback from "./pages/OAuthCallback";
import { useWebSocketNotifications } from "./hooks/useWebSocketNotifications";

const queryClient = new QueryClient();

export default function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     setLoading(true); // ✅ 로딩 상태 ON
  //     const token = await fetchNewAccessToken();
  //     if (token) {
  //       connectTokenToSocket(token);
  //     }
  //     setLoading(false); // ✅ 토큰 가져오기 완료 후 로딩 상태 OFF
  //   };

  //   initializeAuth();
  // }, []);

  // if (loading) {
  //   return <div>🔄 로딩 중...</div>; // ✅ 토큰을 가져오기 전에는 로딩 화면을 표시
  // }

  // useWebSocketNotifications(); // ✅ WebSocket 알림 관리 훅 추가

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            {/* <Route path="/example" element={<Example />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/performance/:id" element={<PerformanceDetail />} />

            {/* ✅ Protected Routes (Require Login) */}
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/callback" element={<OAuthCallback />} />
            {/* </Route> */}
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}
