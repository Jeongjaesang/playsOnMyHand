import { Button } from "@/components/shadcn/button";
import { getIcon } from "@/utils/getIcon";
import { ShareSns } from "@/types/shareSns";

interface ShareButtonProps {
  platform: ShareSns;
  onShare: (platform: ShareSns) => void;
}

export function ShareButton({ platform, onShare }: ShareButtonProps) {
  const getPlatformLabel = () => {
    switch (platform) {
      case "kakao":
        return "카카오톡";
      case "twitter":
        return "트위터";
      case "facebook":
        return "페이스북";
    }
  };

  const getButtonStyle = () => {
    switch (platform) {
      case "kakao":
        return "bg-[#FEE500] text-black hover:bg-[#FEE500]/90 ";
      case "twitter":
        return "bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90 hover:text-white ";
      case "facebook":
        return "bg-[#1877F2] text-white hover:bg-[#1877F2]/90 hover:text-white ";
      default:
        return "";
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onShare(platform)}
      className={`flex items-center space-x-2 cursor-pointer ${getButtonStyle()}`}
    >
      {getIcon(platform)}
      <span>{getPlatformLabel()}</span>
    </Button>
  );
}
