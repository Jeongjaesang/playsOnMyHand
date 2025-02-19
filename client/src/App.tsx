import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import PerformanceDetail from "./pages/PerformanceDetail";
import MyPage from "./pages/Mypage";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/performance/:id" element={<PerformanceDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}
