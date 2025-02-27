import { refreshAccessToken } from "./services/authService";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import PerformanceDetail from "./pages/PerformanceDetail";
import MyPage from "./pages/Mypage";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  //  useEffect(() => {
  //    refreshAccessToken();
  //  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/performance/:id" element={<PerformanceDetail />} />

            {/* ✅ Protected Routes (Require Login) */}
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/notifications" element={<Notifications />} />
            {/* </Route> */}
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}
