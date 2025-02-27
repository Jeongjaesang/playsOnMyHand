import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { useModalStore } from "@/store/modal";
import { ensureLoggedIn } from "@/utils/ensureLoginAndExecute";

const ProtectedRoute = () => {
  const { accessToken: isLoggedin } = useAuthStore();
  const { openLoginModal } = useModalStore();

  useEffect(() => {
    ensureLoggedIn(!!isLoggedin, openLoginModal);
  }, [isLoggedin]);

  return isLoggedin ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
