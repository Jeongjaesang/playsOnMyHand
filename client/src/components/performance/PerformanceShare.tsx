import { CopyLinkButton, ShareButton } from "@/components/common/buttons";

interface PerformanceShareProps {
  onShare: (platform: string) => void;
}

export function PerformanceShare({ onShare }: PerformanceShareProps) {
  return (
    <div className="mb-6">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">공유하기</h2>
      <div className="flex flex-wrap gap-2">
        <ShareButton platform="kakao" onShare={onShare} />
        <ShareButton platform="twitter" onShare={onShare} />
        <ShareButton platform="facebook" onShare={onShare} />
        <CopyLinkButton />
      </div>
    </div>
  );
}
