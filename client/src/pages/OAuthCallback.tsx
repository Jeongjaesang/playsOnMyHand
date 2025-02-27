import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthStatus } from "@/services/authService";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      await checkAuthStatus();
      navigate("/");
    };

    authenticateUser();
  }, [navigate]);

  return <div>OAuth 로그인 중...</div>;
};

export default OAuthCallback;

// 서버에서 리다이렉트 시킴?
