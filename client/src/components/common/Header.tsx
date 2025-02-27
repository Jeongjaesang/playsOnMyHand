import { Link } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { useAuthStore } from "@/store/auth";
import { useModalStore } from "@/store/modal";
import { logout } from "@/services/authService";

function Header() {
  const { accessToken: isLoggedin } = useAuthStore();
  const { openLoginModal } = useModalStore();

  return (
    <header className="p-4 bg-white border-b border-gray-200">
      <div className="container flex flex-col items-center justify-between mx-auto sm:flex-row">
        <h1 className="mb-4 text-2xl font-semibold text-gray-900 sm:mb-0">
          <Link to="/">Performing Arts Hub</Link>
        </h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Link to="/notifications">
              <Bell className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Link to="/mypage">
              <User className="w-5 h-5" />
            </Link>
          </Button>
          {isLoggedin ? (
            <Button variant="outline" size="sm" onClick={logout}>
              로그아웃
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={openLoginModal}>
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
