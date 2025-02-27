import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";

// react-icons
import { FaGoogle } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useModalStore } from "@/store/modal";

const onSocialLogin = (provider: string) => {
  console.log(provider); // 임시로 설정
};

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useModalStore();

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
      <DialogOverlay>
        <DialogContent className="sm:max-w-[425px] [&_.fixed.bg-black]:bg-black/25 ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              로그인
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col pt-4 space-y-4">
            <Button
              onClick={() => onSocialLogin("naver")}
              className="w-full bg-[#03C75A] text-white hover:bg-[#03C75A]/90"
            >
              <SiNaver className="w-5 h-5 mr-2" />
              네이버로 로그인
            </Button>
            <Button
              onClick={() => onSocialLogin("kakao")}
              className="w-full bg-[#FEE500] text-black hover:bg-[#FEE500]/90"
            >
              <RiKakaoTalkFill className="w-5 h-5 mr-2" />
              카카오로 로그인
            </Button>
            <Button
              onClick={() => onSocialLogin("google")}
              variant="outline"
              className="w-full"
            >
              <FaGoogle className="w-5 h-5 mr-2" />
              Google로 로그인
            </Button>
          </div>
          <p className="mt-4 text-sm text-center text-gray-500">
            계속 진행하면 Performing Arts Hub의{" "}
            <a href="#" className="text-primary hover:underline">
              이용약관
            </a>
            과{" "}
            <a href="#" className="text-primary hover:underline">
              개인정보 처리방침
            </a>
            에 동의하는 것으로 간주됩니다.
          </p>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
