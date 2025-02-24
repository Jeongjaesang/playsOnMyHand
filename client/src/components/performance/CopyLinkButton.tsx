import { useState } from "react";
import { Button } from "@/components/shadcn/button";
import { Link, Check } from "lucide-react";
// import { useToast } from "@/components/shadcn/use-toast";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  // const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      // toast({
      //   title: "링크가 복사되었습니다.",
      //   duration: 2000,
      // });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // toast({
      //   title: "링크 복사에 실패했습니다.",
      //   variant: "destructive",
      // });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="flex items-center space-x-2"
    >
      {copied ? <Check className="w-5 h-5" /> : <Link className="w-5 h-5" />}
      <span>링크 복사</span>
    </Button>
  );
}
