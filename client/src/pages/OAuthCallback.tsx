import { useAuthStore } from "@/store/auth";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  // OauthProvider의 로그인 폼에서 로그인이 성공하여 리다이렉트 되는 페이지,
  // 주소에 인증코드가 담겨있다.
  const { setAccessToken } = useAuthStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;

    axios.post("/api/auth/callback", { code }).then((res) => {
      setAccessToken(res.data.accessToken);
      navigate("/"); // 로그인 후 홈으로 이동
    });
  }, [searchParams, setAccessToken, navigate]);

  return <div>OAuth 로그인 중...</div>;
};

export default OAuthCallback;

// 서버에서 리다이렉트 시킴?
